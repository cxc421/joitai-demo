import { atom } from "jotai";
import { ShapeAtom } from "./types";

const selectedShapeAtomAtom = atom<ShapeAtom | null>(null);

export const selectShapeAtom = atom(null, (_get, set, shapeAtom: ShapeAtom) => {
  set(selectedShapeAtomAtom, shapeAtom);
});

export const isSelectedAtomCreator = (shapeAtom: ShapeAtom) =>
  atom((get) => get(selectedShapeAtomAtom) === shapeAtom);

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
      set(selectedShapeAtom, (prev) => ({
        ...prev,
        color,
      }));
    }
  }
);
