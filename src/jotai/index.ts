import { useEffect, useState, useSyncExternalStore } from "react";

type TAtom<T> = {
  get: () => T;
  set: (newValue: T) => void;
  subscribe: (callback: (newValue: T) => void) => () => void;
};

export const Atom = <AtomType>(initialValue: AtomType): TAtom<AtomType> => {
  let value = initialValue;
  const subscribers = new Set();
  return {
    get: () => {
      return value;
    },
    set: (newValue: AtomType) => {
      value = newValue;
      subscribers.forEach((subscriber) => {
        subscriber(newValue);
      });
    },
    subscribe: (callback) => {
      subscribers.add(callback);
      return () => {
        subscribers.delete(callback);
      };
    },
  };
};

export const useAtom = <AtomType>(atom: TAtom<AtomType>) => {
  const [state, setState] = useState();
  const { set, subscribe } = Atom(atom);
  useEffect(() => {
    subscribe(setState);
  }, []);
  return [state, set];
  //   return [useSyncExternalStore(atom.subscribe, atom.get), atom.set];
};
