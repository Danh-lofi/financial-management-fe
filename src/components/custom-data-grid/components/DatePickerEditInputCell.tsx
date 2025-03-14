import { Autocomplete, TextField } from '@mui/material';
import { GridRenderCellParams, useGridApiContext } from '@mui/x-data-grid';
import { DatePicker } from '@mui/x-date-pickers';
type IProps = {
  params: GridRenderCellParams;
};
const DatePickerEditInputCell = ({ params }: IProps) => {
  const { id, value, field } = params;
  const apiRef = useGridApiContext();

  const handleChange = async (newValue: any) => {
    await apiRef.current.setEditCellValue({ id, field, value: newValue });
    apiRef.current.stopCellEditMode({ id, field });
  };

  return (
    <DatePicker
      value={value}
      onChange={(date) => {
        handleChange(date);
      }}
      renderInput={(rest) => <TextField {...rest} />}
    />
  );
};

export default DatePickerEditInputCell;
