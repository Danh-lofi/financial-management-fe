interface ChildRowDeleteButtonProps {
  tabIndex: number;
  isDeleteSubRowEnabled: boolean;
  onDeleteSubRow: () => void;
}

export function ChildRowDeleteButton({ tabIndex, onDeleteSubRow, isDeleteSubRowEnabled }: ChildRowDeleteButtonProps) {
  function handleKeyDown(e: React.KeyboardEvent<HTMLSpanElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      onDeleteSubRow();
    }
  }

  return (
    <>
      {isDeleteSubRowEnabled && (
        <div onClick={onDeleteSubRow}>
          <span tabIndex={tabIndex} onKeyDown={handleKeyDown}>
            ❌
          </span>
        </div>
      )}
    </>
  );
}
