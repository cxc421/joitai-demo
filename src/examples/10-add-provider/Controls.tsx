import { useAtom } from "jotai";
import { setColorAtom } from "./selection";
import { deleteSelectedShpaeAtom } from "./SvgShapes";
import { undoAtom } from "./hostory";

const colors = [
  { value: "", label: "Default" },
  { value: "red", label: "Red" },
  { value: "green", label: "Green" },
  { value: "blue", label: "Blue" },
];

export const Controls = () => {
  const [currentColor, setColor] = useAtom(setColorAtom);
  const [isSelected, deleteSelectedShape] = useAtom(deleteSelectedShpaeAtom);
  const [hasHistory, undoHistory] = useAtom(undoAtom);

  return (
    <div>
      <div>
        <span>Colors:</span>
        {colors.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setColor(value)}
            disabled={currentColor === null || currentColor === value}
          >
            {label}
          </button>
        ))}
      </div>
      <div style={{ marginTop: 4 }}>
        <span>Options:</span>
        <button onClick={deleteSelectedShape} disabled={!isSelected}>
          Delete
        </button>
        <button onClick={undoHistory} disabled={!hasHistory}>
          Undo
        </button>
      </div>
    </div>
  );
};
