// form

import { Controller, useFormContext } from 'react-hook-form';
import { useSettingsContext } from '@/components/settings';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import {
  Autocomplete,
  AutocompleteProps,
  Checkbox,
  Grid,
  InputLabel,
  TextField,
} from '@mui/material';
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
}

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function RHFAutocompleteMulti<
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
  multiple,
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
                multiple={multiple}
                // filterSelectedOptions
                disableCloseOnSelect
                onChange={(event, newValue) => {
                  setValue(name, newValue, { shouldValidate: true });
                }}
                renderInput={(params) => (
                  <TextField {...params} label={label} placeholder={label} />
                )}
                renderOption={(props, option: any, { selected }) => {
                  return (
                    <li {...props}>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option.label}
                    </li>
                  );
                }}
                {...other}
              />
            </Grid>
          </Grid>
        ) : (
          <Autocomplete
            {...field}
            multiple={multiple}
            // filterSelectedOptions
            disableCloseOnSelect
            onChange={(event, newValue) => {
              setValue(name, newValue, { shouldValidate: true });
            }}
            renderInput={(params) => <TextField {...params} label={label} placeholder={label} />}
            renderOption={(props, option: any, { selected }) => {
              return (
                <li {...props}>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option.label}
                </li>
              );
            }}
            {...other}
          />
        );
        return Component;
      }}
    />
  );
}
