import { atom } from "jotai";
import { ShapeAtom } from "./types";
import { saveHistoryAtom } from "./hostory";

// Hold current selected shape atom data
const selectedShapeAtomAtom = atom<ShapeAtom | null>(null);

// Set selected shape atom
export const selectShapeAtom = atom(null, (_get, set, shapeAtom: ShapeAtom) => {
  set(selectedShapeAtomAtom, shapeAtom);
});

// Create an atom to determine input shapeAtom is selectedShapeAtomAtom or not
export const isSelectedAtomCreator = (shapeAtom: ShapeAtom) =>
  atom((get) => get(selectedShapeAtomAtom) === shapeAtom);

// Get current selected shape atom color & Set cureent selected shape atom color
export const setColorAtom = atom(
  (get) => {
    const selectedShapeAtom = get(selectedShapeAtomAtom);
    if (selectedShapeAtom) {
      return get(selectedShapeAtom).color || "";
    }
    return null;
  },
  (get, set, color: string) => {
    const selectedShapeAtom = get(selectedShapeAtomAtom);
    if (selectedShapeAtom) {
      set(saveHistoryAtom);
      set(selectedShapeAtom, (prev) => ({
        ...prev,
        color,
      }));
    }
  }
);

// Getter of selectedShapeAtomAtom
export const selectedAtom = atom((get) => get(selectedShapeAtomAtom));

// Set selectedShapeAtomAtom to null to release object reference, let JS engine trigger garbage collection
export const unselectAtom = atom(null, (_get, set) => {
  set(selectedShapeAtomAtom, null);
});
