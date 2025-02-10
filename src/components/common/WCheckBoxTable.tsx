/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

type MCheckBoxProps = {
  name?: string;
  defaultChecked?: boolean;
  label?: string;
  onGetData?: (value: boolean) => void;
  onRowChange?: (row: any[], isEdit: boolean) => void;
  key?: string;
  row?: any;
  value?: boolean;
  disabled?: boolean;
  onCellChange?: (data: { row: any[]; key?: string; value: boolean }) => void;
  style?: React.CSSProperties;
};

const WCheckBoxTable = ({
  name = '',
  defaultChecked = false,
  label = '',
  onGetData,
  onRowChange,
  key,
  row,
  value,
  disabled = false,
  onCellChange,
  style,
}: MCheckBoxProps) => {
  const [_localValue, setLocalValue] = useState<boolean>(false);

  const handleChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;

    onGetData?.(checked);

    if (key && row) {
      onRowChange?.(
        {
          ...row,
          [key]: checked,
          isEdit: !row.isNew,
        },
        true
      );
    }

    onCellChange?.({ row, key, value: checked });
    setLocalValue(checked);
  };

  return (
    <FormControlLabel
      control={
        <Checkbox
          name={name}
          checked={value}
          disabled={disabled}
          defaultChecked={defaultChecked}
          onChange={handleChangeCheckbox}
          style={style}
        />
      }
      label={label}
    />
  );
};

export default WCheckBoxTable;
