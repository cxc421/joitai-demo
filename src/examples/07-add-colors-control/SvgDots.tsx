import { atom, useAtom } from "jotai";
import type { Point } from "./types";
import { addShapeAtom } from "./SvgShapes";

const dotsAtom = atom<Point[]>([]);

export const addDotAtom = atom(null, (_get, set, update: Point) => {
  set(dotsAtom, (prev) => [...prev, update]);
});

export const commitDotsAtom = atom(null, (get, set) => {
  set(addShapeAtom, get(dotsAtom));
  set(dotsAtom, []);
});

const SvgDots = () => {
  const [dots] = useAtom(dotsAtom);

  return (
    <g>
      {dots.map(([x, y], idx) => (
        <circle key={idx} cx={x} cy={y} r="2" fill="#aaa" />
      ))}
    </g>
  );
};

export { SvgDots };
