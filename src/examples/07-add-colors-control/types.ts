import type { PrimitiveAtom } from "jotai";

export type Point = readonly [number, number];

export type ShapeAtom = PrimitiveAtom<{
  path: string;
  color?: string;
}>;
