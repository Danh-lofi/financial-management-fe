/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useEffect, useState } from 'react';
import Switch from '@mui/material/Switch';

type MSwitchProps = {
  defaultChecked?: boolean;
  onRowChange?: (data: any[], isEdit: boolean) => void;
  checked?: boolean;
  row?: any;
  key?: string;
  onCellChange?: (data: { row: any[]; key?: string; value: boolean }) => void;
};

const WSwitchTable = ({
  defaultChecked = false,
  onRowChange = () => {},
  checked = false,
  row,
  key,
  onCellChange,
}: MSwitchProps) => {
  const [localValue, setLocalValue] = useState<boolean>(checked);

  useEffect(() => {
    setLocalValue(checked);
  }, [checked]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    if (key) {
      onRowChange({ ...row, [key]: isChecked ? '1' : '0', isEdit: true }, true);
    }
    onCellChange?.({ row, key, value: isChecked });
    setLocalValue(isChecked);
  };

  return <Switch defaultChecked={defaultChecked} checked={localValue} onChange={handleChange} />;
};

export default WSwitchTable;
