import { useSyncExternalStore } from "react";

const subscribe = (listener) => {
  window.addEventListener("resize", listener);
  return () => {
    window.removeEventListener("resize", listener);
  };
};

const getSnapShot = () => {
  return window.innerWidth;
};

export const useGetWidth = () => {
  return useSyncExternalStore(subscribe, getSnapShot);
};
