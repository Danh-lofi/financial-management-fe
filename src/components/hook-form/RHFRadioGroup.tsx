// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import {
  Radio,
  FormLabel,
  RadioGroup,
  FormControl,
  FormHelperText,
  RadioGroupProps,
  FormControlLabel,
} from '@mui/material';

// ----------------------------------------------------------------------

type Props = RadioGroupProps & {
  name: string;
  options: { label: string; value: any }[];
  label?: string;
  spacing?: number;
  helperText?: React.ReactNode;
  placeholderColor?: string;
  isRequired?: boolean;
};

export default function RHFRadioGroup({
  row,
  name,
  label,
  options,
  spacing,
  helperText,
  isRequired,placeholderColor,
  ...other
}: Props) {
  const { control } = useFormContext();
  const labelledby = label ? `${name}-${label}` : '';
  const placeholderColorValue =  placeholderColor ?? 'auto';

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl component="fieldset">
          {label && (
            <FormLabel component="legend" id={labelledby} sx={{ typography: 'body2',color: placeholderColorValue }}>
              {label} {isRequired && <span className="required">*</span>}
            </FormLabel>
          )}

          <RadioGroup {...field} aria-labelledby={labelledby} row={row} {...other}>
            {options.map((option) => (
              <FormControlLabel
                key={option.value}
                value={option.value}
                control={<Radio />}
                label={option.label}
                sx={{
                  '&:not(:last-of-type)': {
                    mb: 0,
                    // mb: spacing || 0,
                  },
                  ...(row && {
                    mr: 0,
                    '&:not(:last-of-type)': {
                      mr: spacing || 2,
                    },
                  }),
                }}
              />
            ))}
          </RadioGroup>

          {(!!error || helperText) && (
            <FormHelperText error={!!error} sx={{ mx: 0 }}>
              {error ? error?.message : helperText}
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
}
