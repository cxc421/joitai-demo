import { atom, SetStateAction } from "jotai";
import { ShapeAtom, ShapeAtomValue } from "./types";
import { unselectAtom } from "./selection";

// Array of shape atom
const internalShapeAtomsAtom = atom<ShapeAtom[]>([]);
// Array of shape atom value array
const historyAtom = atom<ShapeAtomValue[][]>([]);

export const saveHistoryAtom = atom(null, (get, set, _update) => {
  // Transfer array of shape atom to array of shape atom value
  const shapes = get(internalShapeAtomsAtom).map((shapeAtom) => get(shapeAtom));
  // Add latest shape atom values to first position
  set(historyAtom, (prev) => [shapes, ...prev]);
});

export const shapeAtomsAtom = atom(
  (get) => get(internalShapeAtomsAtom),
  (_get, set, update: SetStateAction<ShapeAtom[]>) => {
    // Each time set new shape atom array, save to history
    // then replace the current internalShapeAtomsAtom
    set(saveHistoryAtom);
    set(internalShapeAtomsAtom, update);
  }
);

export const undoAtom = atom(
  (get) => {
    const hastHistory = get(historyAtom).length > 0;
    return hastHistory;
  },
  (get, set, _update) => {
    const history = get(historyAtom);
    const [shapes, ...otherHistory] = history;

    set(internalShapeAtomsAtom, (prev) =>
      shapes.map((shape, index) =>
        get(prev[index]) === shape ? prev[index] : atom(shape)
      )
    );

    set(historyAtom, otherHistory);
    set(unselectAtom);
  }
);
