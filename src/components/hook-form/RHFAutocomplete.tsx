// form

import { Controller, useFormContext } from 'react-hook-form';
import { useSettingsContext } from '@/components/settings';
import { Autocomplete, AutocompleteProps, Grid, InputLabel, TextField } from '@mui/material';
import { SIZE_FIELD, STYLE_CONSTANTS } from '../../constants/app.constants';

// @mui



// ----------------------------------------------------------------------
type ColorType = '#ccc' | '#fff' | '#000';
type BackgroundColorType = '#ccc' | '#333' | '#000' | '#CED8DD' | '#F6D2CB' | '#fff';
type PlaceholderColorType = '#fff' | '#333' | '#000';
interface Props<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined
> extends AutocompleteProps<T, Multiple, DisableClearable, FreeSolo> {
  name: string;
  label?: string;
  isLabel?: boolean;
  helperText?: React.ReactNode;
  handleChange?: any;
  shrink?: boolean;
  isRequired?: boolean;
  inputColor?: ColorType;
  backgroundColor?: BackgroundColorType;
  placeholderColor?: PlaceholderColorType;
  size?: SIZE_FIELD;
  handleScroll?: any;
  placeholder?: string;
}

export default function RHFAutocomplete<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined
>({
  name,
  label,
  isLabel,
  helperText,
  handleChange,
  isRequired,
  inputColor,
  shrink,
  backgroundColor,
  placeholderColor,
  size,
  handleScroll,
  placeholder,
  ...other
}: Omit<Props<T, Multiple, DisableClearable, FreeSolo>, 'renderInput'>) {
  const { control, setValue } = useFormContext();
  const { themeMode, onToggleMode } = useSettingsContext();
  const isDark = themeMode === 'dark';
  const colorValue = !isDark ? inputColor : 'inherit';
  const backgroundColorValue = !isDark ? backgroundColor : 'inherit';
  const placeholderColorValue = !isDark ? placeholderColor : 'inherit';

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ref, ...field }, fieldState: { error } }) => {
        const Component = isLabel ? (
          <Grid container alignItems="center">
            <Grid item xs={12} sm={3} md={3} sx={{ mb: 1 }}>
              <InputLabel sx={{ color: STYLE_CONSTANTS.COLOR_LABEL }}>
                {label} {isRequired && <span className="required">*</span>}
              </InputLabel>
            </Grid>
            <Grid xs={12} sm={9} md={9} sx={{ mb: 1 }}>
              <Autocomplete
                {...field}
                onChange={(event, newValue) => {
                  setValue(name, newValue, { shouldValidate: true });
                }}
                ListboxProps={{
                  onScroll: (event: React.SyntheticEvent) => {
                    const listboxNode = event.currentTarget;

                    if (
                      listboxNode.scrollTop + listboxNode.clientHeight ===
                        listboxNode.scrollHeight &&
                      handleScroll
                    ) {
                      handleScroll();
                    }
                  },
                }}
                renderInput={(params) => (
                  <TextField
                    inputRef={ref}
                    {...field}
                    placeholder={placeholder}
                    label={
                      <>
                        {label}
                        {isRequired && <span className="required">*</span>}
                      </>
                    }
                    error={!!error}
                    helperText={error ? error?.message : helperText}
                    {...params}
                    size={size}
                    InputProps={{
                      ...params.InputProps,
                      style: { color: colorValue, backgroundColor: backgroundColorValue },
                    }}
                    InputLabelProps={{
                      style: {
                        color: placeholderColorValue,
                      },
                    }}
                  />
                )}
                {...other}
              />
            </Grid>
          </Grid>
        ) : (
          <Autocomplete
            {...field}
            onChange={(event, newValue) => {
              setValue(name, newValue, { shouldValidate: true });
            }}
            ListboxProps={{
              onScroll: (event: React.SyntheticEvent) => {
                const listboxNode = event.currentTarget;
                if (
                  listboxNode.scrollTop + listboxNode.clientHeight === listboxNode.scrollHeight &&
                  handleScroll
                ) {
                  handleScroll();
                }
              },
            }}
            renderInput={(params) => (
              <TextField
                inputRef={ref}
                {...field}
                label={
                  <>
                    {label}
                    {isRequired && <span className="required">*</span>}
                  </>
                }
                error={!!error}
                helperText={error ? error?.message : helperText}
                {...params}
                size={size}
                InputProps={{
                  ...params.InputProps,
                  style: { color: colorValue, backgroundColor: backgroundColorValue },
                }}
                InputLabelProps={{
                  shrink,
                  style: {
                    color: placeholderColorValue,
                  },
                }}
              />
            )}
            {...other}
          />
        );
        return Component;
      }}
    />
  );
}
