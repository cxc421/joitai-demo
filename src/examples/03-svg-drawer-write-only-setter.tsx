import { useRef, useEffect } from "react";
import { atom, useAtom } from "jotai";

type Point = [number, number];

// Atoms
const dotsAtom = atom<Point[]>([]);

const isDrawingAtom = atom(false);

const handleMouseDownAtom = atom(null, (_, set) => {
  set(isDrawingAtom, true);
});

const handleMouseUpAtom = atom(null, (_, set) => {
  set(isDrawingAtom, false);
});

const handleMouseMoveAtom = atom(null, (get, set, update: Point) => {
  if (get(isDrawingAtom)) {
    set(dotsAtom, (prev) => [...prev, update]);
  }
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

const useCommitCount = () => {
  const commitCountRef = useRef(0);
  useEffect(() => {
    commitCountRef.current += 1;
  });
  return commitCountRef.current;
};

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
      <text x="3" y="12" fontSize="12px">
        Commits: {useCommitCount()}
      </text>
      <SvgDots />
    </svg>
  );
};

const App = () => (
  <div>
    <SvgRoot />
  </div>
);

export default App;
