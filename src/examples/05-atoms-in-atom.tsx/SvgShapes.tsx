import { atom, useAtom } from "jotai";
import type { ShapeAtom, Point } from "./types";
import { createShapeAtom, SvgShape } from "./SvgShape";

const shapeAtomsAtom = atom<ShapeAtom[]>([]);

export const addShapeAtom = atom(
  null,
  (_get, set, update: readonly Point[]) => {
    const shapeAtom = createShapeAtom(update);
    set(shapeAtomsAtom, (prev) => [...prev, shapeAtom]);
  }
);

export const SvgShapes = () => {
  const [shapeAtoms] = useAtom(shapeAtomsAtom);
  return (
    <g>
      {shapeAtoms.map((shapeAtom, i) => {
        const key = shapeAtom.toString();
        console.log(`${i}: ${key}`);
        return <SvgShape key={key} shapeAtom={shapeAtom} />;
      })}
    </g>
  );
};
