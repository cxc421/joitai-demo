import { atom, useAtom } from "jotai";
import type { Point } from "./types";

const shapeAtom = atom({ path: "" });

const pointsToPath = (points: readonly Point[]) =>
  points.reduce((acc, point) => {
    if (!acc) return `M ${point[0]} ${point[1]}`;
    return acc + ` L ${point[0]} ${point[1]}`;
  }, "");

export const setShapeAtom = atom(
  null,
  (_get, set, update: readonly Point[]) => {
    set(shapeAtom, { path: pointsToPath(update) });
  }
);

export const SvgShape = () => {
  const [shape] = useAtom(shapeAtom);
  return (
    <g>
      <path d={shape.path} fill="none" stroke="black" strokeWidth="3" />
    </g>
  );
};
