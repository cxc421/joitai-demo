import { atom, useAtom } from "jotai";
import type { Point } from "./types";
import { createShapeAtom, SvgShape } from "./SvgShape";
import { selectShapeAtom, selectedAtom, unselectAtom } from "./selection";
import { shapeAtomsAtom } from "./hostory";

export const addShapeAtom = atom(
  null,
  (_get, set, update: readonly Point[]) => {
    if (update.length < 2) return;
    const shapeAtom = createShapeAtom(update);
    set(shapeAtomsAtom, (prev) => [...prev, shapeAtom]);
    set(selectShapeAtom, shapeAtom);
  }
);

export const deleteSelectedShpaeAtom = atom(
  (get) => !!get(selectedAtom),
  (get, set) => {
    const selectedShape = get(selectedAtom);
    if (selectedShape) {
      set(shapeAtomsAtom, (shapeAtoms) =>
        shapeAtoms.filter((shapeAtom) => shapeAtom !== selectedShape)
      );
      set(unselectAtom);
    }
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
