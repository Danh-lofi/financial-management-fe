import { ArrowDropDown, ArrowRight } from '@mui/icons-material';

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

export function CellExpanderFormatter({
  tabIndex,
  expanded,
  onCellExpand,
}: CellExpanderFormatterProps) {
  function handleKeyDown(e: React.KeyboardEvent<HTMLSpanElement>) {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      onCellExpand();
    }
  }

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div className={cellExpandClassname} onClick={onCellExpand} onKeyDown={handleKeyDown}>
      {expanded ? <ArrowDropDown /> : <ArrowRight />}
    </div>
  );
}
