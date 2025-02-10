// form

import { Controller, useFormContext } from 'react-hook-form';
import { useSettingsContext } from '@/components/settings';
import { SIZE_FIELD, backgroundColor as bgColor, textColor } from '@/constants/app.constants';
import { Grid, InputLabel, TextField, TextFieldProps } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { CalendarPickerView, DatePicker } from '@mui/x-date-pickers';

// @mui






type ColorType = '#ccc' | '#fff' | '#000';
type BackgroundColorType =
  | '#ccc'
  | '#333'
  | '#000'
  | '#CED8DD'
  | '#CBDDCA'
  | '#fff'
  | '#e9ecef'
  | '#f6fff8';
type PlaceholderColorType = '#fff' | '#333' | '#000' | '#CED8DD';

type Props = TextFieldProps & {
  name: string;
  label?: string;
  isRequired?: boolean;
  shrink?: boolean;
  readOnly?: boolean;
  inputColor?: ColorType;
  backgroundColor?: BackgroundColorType;
  placeholderColor?: PlaceholderColorType;
  isLabel?: boolean;
  size?: 'small' | 'medium' | 'large';
  views?: CalendarPickerView[];
  onlyYear?: boolean;
  disabled?: boolean;
  handleChange?: any;
};

const RHFDatePicker = ({
  name,
  label,
  isRequired,
  shrink = true,
  readOnly = false,
  inputColor,
  backgroundColor,
  placeholderColor,
  isLabel,
  size = 'medium',
  disabled = false,
  handleChange,
  onlyYear = false,
  views = ['day', 'month', 'year'],
}: Props) => {
  const { control } = useFormContext();
  const theme = useTheme();
  const { themeMode } = useSettingsContext();
  const isDark = themeMode === 'dark';
  const colorValue = !isDark ? inputColor : 'inherit';
  const backgroundColorValue = !isDark ? backgroundColor : 'inherit';
  const placeholderColorValue = !isDark ? placeholderColor : 'inherit';

  views.includes('month');
  let inputFormat = 'dd/MM/yyyy';
  if (onlyYear) {
    inputFormat = 'yyyy';
  } else if (!views.includes('day')) {
    inputFormat = 'MM/yyyy';
  }
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const Component = isLabel ? (
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
              <DatePicker
                views={onlyYear ? ['year'] : views}
                disabled={disabled}
                inputFormat={inputFormat}
                value={field.value}
                onChange={(date) => {
                  if (typeof handleChange === 'function') {
                    handleChange(date);
                    field.onChange(date);
                  }
                  field.onChange(date);
                }}
                InputProps={{
                  readOnly,
                  style: { color: colorValue, backgroundColor: backgroundColorValue },
                }}
                renderInput={(rest) => (
                  <TextField
                    disabled={disabled}
                    size={size}
                    InputLabelProps={{
                      shrink: false,
                      sx: {
                        color: placeholderColorValue,
                      },
                    }}
                    sx={{
                      backgroundColor: () => {
                        return isDark ? theme.palette.mode : bgColor.white;
                      },
                      borderRadius: '10px',
                    }}
                    InputProps={{
                      readOnly,
                      style: { color: colorValue, backgroundColor: backgroundColorValue },
                    }}
                    {...rest}
                    error={!!error}
                    helperText={error?.message}
                    fullWidth
                  />
                )}
              />
            </Grid>
          </Grid>
        ) : (
          <DatePicker
            views={onlyYear ? ['year'] : views}
            label={
              <>
                {label}
                {isRequired && <span className="required">*</span>}
              </>
            }
            disabled={disabled}
            inputFormat={inputFormat}
            value={field.value}
            onChange={(date) => {
              if (typeof handleChange === 'function') {
                handleChange(date);
                field.onChange(date);
              }
              field.onChange(date);
            }}
            InputProps={{
              readOnly,
              style: { color: colorValue, backgroundColor: backgroundColorValue },
            }}
            renderInput={(rest) => (
              <TextField
                disabled={disabled}
                size={size}
                InputLabelProps={{
                  shrink: shrink,
                  sx: {
                    color: placeholderColorValue,
                  },
                }}
                sx={{
                  backgroundColor: () => {
                    return isDark ? theme.palette.mode : bgColor.white;
                  },
                  borderRadius: '10px',
                }}
                InputProps={{
                  readOnly,
                  style: { color: colorValue, backgroundColor: backgroundColorValue },
                }}
                {...rest}
                error={!!error}
                helperText={error?.message}
                fullWidth
              />
            )}
          />
        );

        return Component;
      }}
    />
  );
};

export default RHFDatePicker;
