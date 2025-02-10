const cellExpandClassname = `
  block-size: 100%;
  align-content: center;
  text-align: center;
  cursor: pointer;
`;

interface CellExpanderFormatterProps {
  tabIndex: number;
  expanded: boolean;
  onCellExpand: () => void;
}

export function renderCellEditDateExpand({ tabIndex, expanded, onCellExpand }: CellExpanderFormatterProps) {
  function handleKeyDown(e: React.KeyboardEvent<HTMLSpanElement>) {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      onCellExpand();
    }
  }
  console.log("get in");

  return (
    <div className={cellExpandClassname} onClick={onCellExpand} onKeyDown={handleKeyDown}>
      <span tabIndex={tabIndex}>{expanded ? "\u25BC" : "\u25B6"}</span>
    </div>
  );
}
