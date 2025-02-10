// @mui
import { DataGrid } from '@mui/x-data-grid';
// ----------------------------------------------------------------------

type Props = {
  data: any[];
  columns?: any;
  isCheckbox?: boolean;
};

export default function DataGridBasic({ data, columns,
isCheckbox = true }: Props) {
  return (
    <DataGrid
      columns={columns}
      rows={data}
      experimentalFeatures={{ newEditingApi: true }}
      checkboxSelection = {isCheckbox}
      disableSelectionOnClick
    />
  );
}
