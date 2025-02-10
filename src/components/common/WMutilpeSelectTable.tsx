import React, { useEffect, useState } from 'react';
import { Autocomplete, AutocompleteChangeReason, Box, TextField, Typography } from '@mui/material';

type MSelectProps = {
  required?: boolean;
  label?: string;
  value?: string | string[];
  placeholder?: string;
  onChange?: (value: string | string[]) => void;
  onGetData?: (value: string | string[] | undefined) => void;
  onClick?: () => void;
  prefix?: string | React.ReactNode;
  rows?: number;
  cols?: number;
  style?: React.CSSProperties;
  optional?: string;
  description?: string;
  disabled?: boolean;
  options: { value: string; label: string }[];
  name?: string;
  defaultValue?: string | string[];
  allowClear?: boolean;
  mode?: 'multiple' | 'tags';
  autoFocus?: boolean;
};

const WMutilpeSelectTable = ({
  required,
  options = [],
  value,
  defaultValue,
  label = '',
  allowClear = false,
  placeholder = '',
  style = {},
  onChange,
  onGetData,
  optional = '',
  description = '',
  onClick,
  disabled = false,
  autoFocus = false,
}: MSelectProps) => {
  const [focus, setFocus] = useState(false);
  const [localValue, setLocalValue] = useState<string[] | undefined>(
    // eslint-disable-next-line no-nested-ternary
    Array.isArray(value) ? value : value ? [value] : undefined
  );

  useEffect(() => {
    // eslint-disable-next-line no-nested-ternary
    setLocalValue(Array.isArray(value) ? value : value ? [value] : undefined);
  }, [value]);

  const handleInputChange = (
    event: React.SyntheticEvent,
    // eslint-disable-next-line @typescript-eslint/no-shadow
    value: any,
    reason: AutocompleteChangeReason
  ) => {
    setLocalValue(value || undefined);
    const output = value || [];
    onChange?.(output);
    onGetData?.(output);
  };

  return (
    <Box
      className={`MSelect float-label ${focus ? 'focus' : ''} ${disabled ? 'disabled' : ''}`}
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
      <Box className="MSelect-input" mt={1}>
        <Autocomplete
          multiple
          options={options}
          getOptionLabel={(option) => option?.label ?? ''}
          // eslint-disable-next-line @typescript-eslint/no-shadow
          isOptionEqualToValue={(option, value) => option?.value === value?.value}
          value={
            localValue
              ?.map((val) => options.find((opt) => opt.value === val))
              .filter((opt) => opt) || []
          }
          onChange={handleInputChange}
          renderInput={(params) => (
            <TextField
              {...params}
              label={placeholder || label}
              variant="outlined"
              fullWidth
              autoFocus={autoFocus}
              disabled={disabled}
            />
          )}
          disableCloseOnSelect
          filterSelectedOptions
          disabled={disabled}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
        />
      </Box>
      {description && (
        <Typography variant="caption" color="textSecondary" className="MSelect-description">
          {description}
        </Typography>
      )}
    </Box>
  );
};

export default WMutilpeSelectTable;
