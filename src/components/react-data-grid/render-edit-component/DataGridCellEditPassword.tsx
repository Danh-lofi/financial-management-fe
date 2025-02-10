/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */

import React, { useState } from 'react';
import { TextField } from '@mui/material';

type RenderCellEditPasswordProps = {
  row: any;
  key: string;
  onRowChange: (value: any, isEdit: boolean) => void;
};

export function useRenderCellEditPassword({ row, key, onRowChange }: RenderCellEditPasswordProps) {
  const [value, setValue] = useState(row[key]);

  const handleBlurOrEnter = () => {
    onRowChange({ ...row, [key]: value, isEdit: !row.isNew }, true);
  };

  return (
    <TextField
      type="password"
      value={value}
      onChange={(event) => setValue(event.target.value)}
      onBlur={handleBlurOrEnter}
      onKeyPress={(event) => {
        if (event.key === 'Enter') handleBlurOrEnter();
      }}
      fullWidth
      variant="outlined"
      size="small"
    />
  );
}
