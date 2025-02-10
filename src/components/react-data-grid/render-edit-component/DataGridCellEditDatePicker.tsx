/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { DateTimePicker } from '@mui/x-date-pickers';
import { TextField } from '@mui/material';
// eslint-disable-next-line import/no-extraneous-dependencies
import dayjs, { Dayjs } from 'dayjs';

export function renderCellEditDatePicker({
  row,
  key,
  baseColumn,
  onRowChange,
}: {
  row: any;
  key: string;
  baseColumn: any;
  onRowChange: (value: any, isEdit: boolean) => void;
}) {
  const handleRowChange = (value: string | null) => {
    onRowChange({ ...row, [key]: value, isEdit: !row.isNew }, true);
    baseColumn?.onCellChange?.({ row, key, value });
  };

  return (
    <DateTimePicker
      value={row[key] ? dayjs(row[key]) : null}
      onChange={(date: Dayjs | null) => {
        handleRowChange(date ? date.format('YYYY-MM-DD HH:mm:ss') : null);
      }}
      ampm={false} // 24-hour format
      inputFormat="YYYY-MM-DD HH:mm:ss"
      renderInput={(params) => (
        <TextField
          {...params}
          fullWidth
          variant="standard"
          autoFocus
          InputProps={{
            style: {
              height: '100%',
            },
          }}
        />
      )}
      disabled={row['row-disabled'] && baseColumn['row-disabled']}
      onError={(error) => console.error(error)}
      openTo="day"
    />
  );
}
