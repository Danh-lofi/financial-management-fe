/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { Autocomplete, TextField, Box, Typography } from '@mui/material';

type WCascadeTableProps = {
  required?: boolean;
  label?: string;
  value?: string[];
  placeholder?: string;
  onChange?: (event: any, value: string[] | null) => void;
  onGetData?: (value: string[]) => void;
  onClick?: () => void;
  prefix?: string | React.ReactNode;
  rows?: number;
  cols?: number;
  style?: React.CSSProperties;
  optional?: string;
  description?: string;
  disabled?: boolean;
  options: { value: string; label?: string; children?: any[] }[];
  name?: string;
  defaultValue?: string[];
  allowClear?: boolean;
  autoFocus?: boolean;
};

const WCascadeTable = ({
  required,
  options = [],
  value,
  defaultValue,
  label = '',
  allowClear = false,
  placeholder = '',
  style = {},
  onChange,
  optional = '',
  description = '',
  onClick,
  disabled = false,
  autoFocus = false,
}: WCascadeTableProps) => {
  const [localValue, setLocalValue] = useState<string[] | undefined>(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  if (!placeholder) placeholder = label;

  // Flattening options for MUI Autocomplete
  const flattenOptions = (opts: any[], parentLabel = ''): any[] => {
    return opts.reduce((acc, option) => {
      const labelPath = parentLabel ? `${parentLabel} > ${option.label}` : option.label;
      acc.push({ label: labelPath, value: option.value });
      if (option.children && option.children.length > 0) {
        acc.push(...flattenOptions(option.children, labelPath));
      }
      return acc;
    }, []);
  };

  const flattenedOptions = flattenOptions(options);

  return (
    <Box
      className={`MSelect float-label ${disabled ? 'disabled' : ''}`}
      style={style}
      onClick={onClick}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="body1">
          {label}
          {required && <span style={{ color: 'red' }}> *</span>}
        </Typography>
        <Typography variant="caption" color="textSecondary">
          {optional}
        </Typography>
      </Box>
      <Autocomplete
        options={flattenedOptions}
        value={
          localValue?.map((val) => flattenedOptions.find((opt) => opt.value === val) || '') || []
        }
        getOptionLabel={(option) => option.label || ''}
        onChange={(event, newValue) => {
          const selectedValues = newValue ? newValue.map((item) => item.value) : [];
          setLocalValue(selectedValues);
          if (onChange) onChange(event, selectedValues);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={placeholder}
            variant="outlined"
            fullWidth
            autoFocus={autoFocus}
            disabled={disabled}
          />
        )}
        // eslint-disable-next-line @typescript-eslint/no-shadow
        isOptionEqualToValue={(option, value) => option.value === value.value}
        disableClearable={!allowClear}
        multiple
        sx={{ width: '100%', ...style }}
      />
      {description && (
        <Typography variant="caption" color="textSecondary" className="MSelect-description">
          {description}
        </Typography>
      )}
    </Box>
  );
};

export default WCascadeTable;
