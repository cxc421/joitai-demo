import { atom, useAtom } from "jotai";
import type { Point, ShapeAtom } from "./types";
import { selectShapeAtom, isSelectedAtomCreator } from "./selection";
import { useMemo } from "react";

const pointsToPath = (points: readonly Point[]) =>
  points.reduce((acc, point) => {
    if (!acc) return `M ${point[0]} ${point[1]}`;
    return acc + ` L ${point[0]} ${point[1]}`;
  }, "");

export const createShapeAtom = (points: readonly Point[]): ShapeAtom =>
  atom({ path: pointsToPath(points) });

export const SvgShape = ({ shapeAtom }: { shapeAtom: ShapeAtom }) => {
  const [shape] = useAtom(shapeAtom);
  const [, selectShape] = useAtom(selectShapeAtom);
  const isSelectedAtom = useMemo(
    () => isSelectedAtomCreator(shapeAtom),
    [shapeAtom]
  );
  const [isSelected] = useAtom(isSelectedAtom);

  return (
    <g onClick={() => selectShape(shapeAtom)}>
      <path
        d={shape.path}
        fill="none"
        stroke="red"
        strokeWidth="12"
        opacity={isSelected ? "0.3" : "0"}
      />
      <path
        d={shape.path}
        fill="none"
        stroke={shape.color || "black"}
        strokeWidth="3"
      />
    </g>
  );
};
