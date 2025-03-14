import { Autocomplete, TextField } from '@mui/material';
import { GridRenderCellParams, useGridApiContext } from '@mui/x-data-grid';
type IProps = {
  params: GridRenderCellParams;
  options: { label: string; value: string }[];
};
const AutocompleteEditInputCell = ({ params, options }: IProps) => {
  const { id, value, field } = params;
  const apiRef = useGridApiContext();

  const handleChange = async (newValue: any) => {
    console.log("🚀 ~ handleChange ~ newValue:", newValue)
    await apiRef.current.setEditCellValue({ id, field, value: newValue.value });
    apiRef.current.stopCellEditMode({ id, field });
  };

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={options}
      onChange={(event, newValue) => handleChange(newValue)}
      value={value}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} />}
    />
  );
};

export default AutocompleteEditInputCell;
