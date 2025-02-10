// form

import { Controller, useFormContext } from 'react-hook-form';
import { useSettingsContext } from '@/components/settings';
import {
  Box,
  Checkbox,
  Chip,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectProps,
  TextField,
  TextFieldProps,
} from '@mui/material';
import { SIZE_FIELD, STYLE_CONSTANTS, textColor } from '../../constants/app.constants';

// @mui



// ----------------------------------------------------------------------

type ColorType = '#ccc' | '#fff' | '#000';
type BackgroundColorType =
  | '#ccc'
  | '#fff'
  | '#333'
  | '#000'
  | '#CED8DD'
  | '#f6fff8'
  | '#F6D2CB'
  | '#e9ecef'
  | '#fff';
type PlaceholderColorType = '#fff' | '#333' | '#000';

type RHFSelectProps = TextFieldProps & {
  name: string;
  native?: boolean;
  maxHeight?: boolean | number;
  children: React.ReactNode;
  handleChange?: any;
  label?: string;
  isLabel?: boolean;
  shrink?: boolean;
  isRequired?: boolean;
  inputColor?: ColorType;
  backgroundColor?: BackgroundColorType;
  onScrollEvent?: () => void;
  placeholderColor?: PlaceholderColorType;
  size?: 'small' | 'medium' | 'large';
};

export function RHFSelect({
  name,
  native,
  maxHeight = 220,
  helperText,
  children,
  handleChange,
  label,
  isRequired,
  inputColor,
  shrink,
  onScrollEvent,
  backgroundColor,
  placeholderColor,
  isLabel,
  size,
  ...other
}: RHFSelectProps) {
  const { control } = useFormContext();
  const { themeMode } = useSettingsContext();
  const isDark = themeMode === 'dark';
  const colorValue = !isDark ? inputColor : 'inherit';
  const backgroundColorValue = !isDark ? backgroundColor : 'inherit';
  const placeholderColorValue = !isDark ? placeholderColor : 'inherit';
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const Component = !isLabel ? (
          <TextField
            size={size}
            InputProps={{
              style: { color: colorValue, backgroundColor: backgroundColorValue },
            }}
            {...field}
            label={
              label && (
                <>
                  {label}
                  {isRequired && <span className="required">*</span>}
                </>
              )
            }
            InputLabelProps={{
              shrink: shrink || !!field.value,
              style: {
                color: placeholderColorValue,
              },
            }}
            onChange={(e) => {
              if (typeof handleChange === 'function') {
                field.onChange(e);
                handleChange(e);
              } else {
                field.onChange(e);
              }
            }}
            select
            fullWidth
            SelectProps={{
              native,
              MenuProps: {
                PaperProps: {
                  sx: {
                    ...(!native && {
                      px: 1,
                      maxHeight: typeof maxHeight === 'number' ? maxHeight : 'unset',
                      '& .MuiMenuItem-root': {
                        px: 1,
                        borderRadius: 0.75,
                        typography: 'body2',
                        textTransform: 'capitalize',
                      },
                    }),
                  },
                  onScroll: (event: any) => {
                    const target = event.target;

                    if (
                      target.scrollTop + target.clientHeight >= target.scrollHeight &&
                      onScrollEvent
                    ) {
                      onScrollEvent();
                    }
                  },
                },
              },
              sx: { textTransform: 'capitalize' },
            }}
            error={!!error}
            helperText={error ? error?.message : helperText}
            {...other}
          >
            {children}
          </TextField>
        ) : (
          <Grid container alignItems="center" spacing={1}>
            <Grid item xs={12} sm={3} md={3} lg={3} xl={4}>
              <InputLabel
                sx={{
                  color: isDark ? textColor.white : textColor.black,
                  fontSize: size === SIZE_FIELD.SMALL ? '0.9rem' : '1rem',
                }}
              >
                {label} {isRequired && <span className="required">*</span>}
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={9} md={9} lg={9} xl={8}>
              <TextField
                size={size}
                InputProps={{
                  style: {
                    color: colorValue,
                    backgroundColor: backgroundColorValue,
                  },
                }}
                {...field}
                InputLabelProps={{
                  shrink: shrink || !!field.value,
                  style: {
                    color: placeholderColorValue,
                  },
                }}
                onChange={(e) => {
                  if (typeof handleChange === 'function') {
                    field.onChange(e);
                    handleChange(e);
                  } else {
                    field.onChange(e);
                  }
                }}
                select
                fullWidth
                SelectProps={{
                  native,
                  MenuProps: {
                    PaperProps: {
                      sx: {
                        ...(!native && {
                          px: 1,
                          maxHeight: typeof maxHeight === 'number' ? maxHeight : 'unset',
                          '& .MuiMenuItem-root': {
                            px: 1,
                            borderRadius: 0.75,
                            typography: 'body2',
                            textTransform: 'capitalize',
                          },
                        }),
                      },
                      onScroll: (event: any) => {
                        const target = event.target;
                        if (
                          target.scrollTop + target.clientHeight === target.scrollHeight &&
                          onScrollEvent
                        ) {
                          onScrollEvent();
                        }
                      },
                    },
                  },
                  sx: { textTransform: 'capitalize' },
                }}
                error={!!error}
                helperText={error ? error?.message : helperText}
                {...other}
              >
                {children}
              </TextField>
            </Grid>
          </Grid>
        );
        return Component;
      }}
    />
  );
}

// ----------------------------------------------------------------------

type RHFMultiSelectProps = SelectProps & {
  name: string;
  label?: string;
  chip?: boolean;
  checkbox?: boolean;
  placeholder?: string;
  helperText?: React.ReactNode;
  shrink?: boolean;
  isRequired?: boolean;
  inputColor?: ColorType;
  backgroundColor?: BackgroundColorType;
  onScrollEvent?: () => void;
  placeholderColor?: PlaceholderColorType;
  options: {
    label: string;
    value: string;
  }[];
  size?: string;
};

export function RHFMultiSelect({
  name,
  chip,
  label,
  options,
  checkbox,
  placeholder,
  helperText,
  isRequired,
  inputColor,
  shrink,
  onScrollEvent,
  backgroundColor,
  placeholderColor,
  sx,
  size,
  ...other
}: RHFMultiSelectProps) {
  const { control } = useFormContext();
  const colorValue = inputColor ?? 'auto';
  const backgroundColorValue = backgroundColor ?? 'auto';
  const placeholderColorValue = placeholderColor ?? 'auto';
  const renderValues = (selectedIds: string[]) => {
    const selectedItems = options?.filter((item) => selectedIds.includes(item.value));
    if (!selectedItems.length && placeholder) {
      return (
        <Box component="em" sx={{ color: 'text.disabled' }}>
          {placeholder}
        </Box>
      );
    }
    if (chip) {
      return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {selectedItems?.map((item) => (
            <Chip key={item.value} size="small" label={item.label} />
          ))}
        </Box>
      );
    }

    return selectedItems?.map((item) => item.label).join(', ');
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl sx={sx}>
          {label && (
            <InputLabel sx={{ color: 'black' }} id={name}>
              {' '}
              {label}{' '}
            </InputLabel>
          )}
          <Select
            {...field}
            multiple
            size={size}
            displayEmpty={!!placeholder}
            labelId={name}
            input={<OutlinedInput fullWidth label={label} error={!!error} />}
            renderValue={renderValues as any}
            MenuProps={{
              PaperProps: {
                sx: { px: 1, maxHeight: 280 },
              },
            }}
            {...other}
          >
            {placeholder && (
              <MenuItem
                disabled
                value=""
                sx={{
                  py: 1,
                  px: 2,
                  borderRadius: 0.75,
                  typography: 'body2',
                }}
              >
                <em> {placeholder} </em>
              </MenuItem>
            )}

            {options?.map((option) => {
              const selected = field.value.includes(option.value);

              return (
                <MenuItem
                  key={option.value}
                  value={option.value}
                  sx={{
                    py: 1,
                    px: 2,
                    borderRadius: 0.75,
                    typography: 'body2',
                    ...(selected && {
                      fontWeight: 'fontWeightMedium',
                    }),
                    ...(checkbox && {
                      p: 0.25,
                    }),
                  }}
                >
                  {checkbox && <Checkbox disableRipple size="small" checked={selected} />}

                  {option.label}
                </MenuItem>
              );
            })}
          </Select>

          {(!!error || helperText) && (
            <FormHelperText error={!!error}>{error ? error?.message : helperText}</FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
}
