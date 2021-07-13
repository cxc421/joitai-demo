import { atom, useAtom } from "jotai";
import type { Point, ShapeAtom } from "./types";

const pointsToPath = (points: readonly Point[]) =>
  points.reduce((acc, point) => {
    if (!acc) return `M ${point[0]} ${point[1]}`;
    return acc + ` L ${point[0]} ${point[1]}`;
  }, "");

export const createShapeAtom = (points: readonly Point[]): ShapeAtom =>
  atom({ path: pointsToPath(points) });

export const SvgShape = ({ shapeAtom }: { shapeAtom: ShapeAtom }) => {
  const [shape] = useAtom(shapeAtom);
  return (
    <g>
      <path d={shape.path} fill="none" stroke="black" strokeWidth="3" />
    </g>
  );
};
