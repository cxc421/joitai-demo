import { atom, useAtom } from "jotai";
import type { Point } from "./types";
import { SvgDots, addDotAtom, commitDotsAtom } from "./SvgDots";
import { SvgShapes } from "./SvgShapes";

// Atoms

const isDrawingAtom = atom(false);

const handleMouseDownAtom = atom(null, (_, set) => {
  set(isDrawingAtom, true);
});

const handleMouseUpAtom = atom(null, (_, set) => {
  set(isDrawingAtom, false);
  set(commitDotsAtom);
});

const handleMouseMoveAtom = atom(null, (get, set, update: Point) => {
  if (get(isDrawingAtom)) {
    set(addDotAtom, update);
  }
});

const SvgRoot = () => {
  const [, handleMouseDown] = useAtom(handleMouseDownAtom);
  const [, handleMouseUp] = useAtom(handleMouseUpAtom);
  const [, handleMouseMove] = useAtom(handleMouseMoveAtom);

  return (
    <svg
      width="200"
      height="200"
      viewBox="0 0 200 200"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={(e) => handleMouseMove([e.clientX, e.clientY])}
    >
      <rect width="200" height="200" fill="#eee" />
      <SvgShapes />
      <SvgDots />
    </svg>
  );
};

export { SvgRoot };
