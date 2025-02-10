import React from 'react';

import { CellExpanderFormatter } from './components/CellExpanderFormatter';

// Import React

// Define types for the props
interface RowData {
  id: string;
  childrens?: RowData[];
  isExpanded?: boolean;
  format: string; // Adjust this according to your actual data type
}

interface RenderCellProps {
  row: RowData;
  tabIndex: number;
  dispatch: React.Dispatch<any>;
  allowDelete: boolean;
}

const RenderCell: React.FC<RenderCellProps> = ({ row, tabIndex, dispatch }) => {
  const hasChildren = row.childrens && row.childrens.length > 0;
  const style = hasChildren ? undefined : { marginInlineStart: 30 };

  return (
    <div
      style={{
        display: 'flex',
        gap: '10px',
        blockSize: '100%',
        alignItems: 'center',
      }}
    >
      {hasChildren && (
        <CellExpanderFormatter
          tabIndex={tabIndex}
          expanded={row.isExpanded === true}
          onCellExpand={() => dispatch({ id: row.id, type: 'toggleSubRow' })}
        />
      )}

      <div style={style}>{row.format}</div>
    </div>
  );
};

// Export the renderCell function
export default RenderCell;
