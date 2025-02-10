/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import { TextField } from '@mui/material';

export function useRenderCellTextInput({
  row = {},
  key = '',
  onRowChange,
  baseColumn = [],
}: {
  row: any;
  key: string;
  onRowChange: (value: any, isEdit: boolean) => void;
  baseColumn: any;
}) {
  const [value, setValue] = useState(row[key]);

  const handleChangeInput = () => {
    onRowChange({ ...row, [key]: value, isEdit: !row.isNew }, true);
    baseColumn.onCellChange?.({ row, key, value });
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const charCode = event.target.value;

    if (baseColumn.isText) {
      // Prevent numbers if `isText` is true
      if (/[0-9]/.test(charCode)) {
        event.preventDefault();
      } else {
        setValue(event.target.value);
      }
    } else if (baseColumn.isNumber) {
      // Allow only numeric input if `isNumber` is true
      if (!!charCode && !/^\d+$/.test(charCode)) {
        event.preventDefault();
      } else {
        setValue(event.target.value);
      }
    } else {
      setValue(event.target.value);
    }
  };

  return (
    <TextField
      variant="outlined"
      autoFocus
      disabled={row['row-disabled'] && baseColumn['row-disabled']}
      inputProps={{
        maxLength: baseColumn.maxLength,
      }}
      onKeyDown={(e) => e.key === 'Tab' && handleChangeInput()}
      onBlur={handleChangeInput}
      onChange={onChange}
      onKeyPress={(e) => e.key === 'Enter' && handleChangeInput()}
      value={value}
      fullWidth
    />
  );
}
