import { SlicedDate } from "./types";

export const structureDate = (date: Date): SlicedDate => {
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  return { year, month, day };
};

export const getDate = (params: SlicedDate): Date => {
  const dateParams = Object.values(params) as [number, number, number];
  return new Date(...dateParams);
};

export const chunk = (arr: Array<number>, size: number) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );
