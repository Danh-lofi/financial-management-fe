/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import { TextField } from '@mui/material';
import { isNaN } from 'lodash';

export function useRenderCellNumberInput({
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
  };

  const formatNumber = (num: string | number | null | undefined) => {
    if (num === null || num === undefined) return '';
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); // Format with commas
  };

  const parseNumber = (num: string) => {
    return num.replace(/,/g, ''); // Remove commas
  };

  return (
    <TextField
      type="text"
      autoFocus
      fullWidth
      placeholder="Số dòng"
      value={formatNumber(value)}
      onKeyDown={(e) => e.key === 'Tab' && handleChangeInput()}
      onBlur={handleChangeInput}
      onChange={(e) => {
        const parsedValue = parseNumber(e.target.value);
        if (!isNaN(Number(parsedValue))) {
          setValue(parsedValue);
        }
      }}
      onKeyPress={(e) => e.key === 'Enter' && handleChangeInput()}
      disabled={row['row-disabled'] && baseColumn['row-disabled']}
      inputProps={{
        min: baseColumn.min ?? Number.MIN_SAFE_INTEGER,
        max: baseColumn.max ?? Number.MAX_SAFE_INTEGER,
      }}
    />
  );
}
