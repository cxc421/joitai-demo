import { useRef, useEffect } from "react";

const useCommitCount = () => {
  const commitCountRef = useRef(0);
  useEffect(() => {
    commitCountRef.current += 1;
  });
  return commitCountRef.current;
};

function CommitCount() {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        background: "green",
        color: "white",
        fontSize: 16,
        width: 20,
        height: 20,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: `solid 1px #333`,
      }}
    >
      {useCommitCount()}
    </div>
  );
}

export { CommitCount };
