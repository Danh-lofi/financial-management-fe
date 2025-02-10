import React, { useEffect, useState } from 'react';
import { Autocomplete, Box, TextField, Typography } from '@mui/material';

type MSelectProps = {
  required?: boolean;
  label?: string;
  value?: string;
  placeholder?: string;
  onChange?: (value: string | undefined) => void;
  onGetData?: (value: string | undefined) => void;
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
  defaultValue?: string;
  allowClear?: boolean;
  mode?: 'multiple' | 'tags';
  autoFocus?: boolean;
};

const WSelectTable = ({
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
  mode,
  autoFocus = false,
}: MSelectProps) => {
  const [focus, setFocus] = useState(false);
  const [localValue, setLocalValue] = useState<string | undefined>(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleInputChange = (event: any, newValue: any) => {
    const selectedValue = mode === 'multiple' ? newValue : newValue?.value || undefined;
    setLocalValue(selectedValue);
    onChange?.(selectedValue);
    onGetData?.(selectedValue);
  };

  const handleOptionSelected = (option: any) =>
    mode === 'multiple' ? option : options.find((opt) => opt.value === option);

  return (
    <Box
      className={`MSelect float-label ${focus ? 'focus' : ''} ${disabled ? 'disabled' : ''}`}
      style={style}
      onClick={onClick}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
        <Typography variant="body1">
          {label}
          {required && <span style={{ color: 'red' }}> *</span>}
        </Typography>
        {optional && <Typography variant="caption">{optional}</Typography>}
      </Box>
      <Autocomplete
        multiple={mode === 'multiple'}
        options={options}
        getOptionLabel={(option) => option.label || ''}
        // eslint-disable-next-line @typescript-eslint/no-shadow
        isOptionEqualToValue={(option, value) => option.value === (value as any)?.value}
        value={handleOptionSelected(localValue)}
        onChange={handleInputChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label={placeholder || label}
            variant="outlined"
            fullWidth
            disabled={disabled}
            autoFocus={autoFocus}
          />
        )}
        disableCloseOnSelect={mode === 'multiple'}
        filterSelectedOptions
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />
      {description && (
        <Typography variant="caption" color="textSecondary" mt={1}>
          {description}
        </Typography>
      )}
    </Box>
  );
};

export default WSelectTable;
