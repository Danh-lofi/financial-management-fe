import i18n from 'locales/i18n';
import { useState } from 'react';
import { RHFCheckbox } from '@/components/hook-form';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { DataGrid, GridRowId, GridRowParams } from '@mui/x-data-grid';

const columns = [
  { field: 'id', hide: true },
  { field: 'username', width: 150, editable: true },
  {
    field: 'typeOfContract',
    headerName: i18n.t<string>('typeOfContract'),
    width: 150,
    editable: true,
  },
  {
    field: 'appendix',
    headerName: i18n.t<string>('appendix'),
    width: 150,
    editable: true,
  },
  {
    field: 'age',
    headerName: i18n.t<string>('typeOfContract'),
    width: 150,
    editable: true,
  },
  {
    field: 'age',
    headerName: i18n.t<string>('typeOfContract'),
    width: 150,
    
    editable: true,
  },
  {
    field: 'age',
    headerName: i18n.t<string>('typeOfContract'),
    width: 150,
    
    editable: true,
  },
  {
    field: 'age',
    headerName: i18n.t<string>('typeOfContract'),
    width: 150,
    
    editable: true,
  },
  {
    field: 'age',
    headerName: i18n.t<string>('typeOfContract'),
    width: 150,
    
    editable: true,
  },
  {
    field: 'age',
    headerName: i18n.t<string>('typeOfContract'),
    width: 150,
    
    editable: true,
  },
  {
    field: 'age',
    headerName: i18n.t<string>('typeOfContract'),
    width: 150,
    
    editable: true,
  },
  {
    field: 'age',
    headerName: i18n.t<string>('typeOfContract'),
    width: 150,
    
    editable: true,
  },
  {
    field: 'age',
    headerName: i18n.t<string>('typeOfContract'),
    width: 150,
    
    editable: true,
  },
  {
    field: 'age',
    headerName: i18n.t<string>('typeOfContract'),
    width: 150,
    
    editable: true,
  },
  {
    field: 'age',
    headerName: i18n.t<string>('typeOfContract'),
    width: 150,
    
    editable: true,
  },
  {
    field: 'age',
    headerName: i18n.t<string>('typeOfContract'),
    width: 150,
    
    editable: true,
  },
];

let idCounter = 0;
const createRandomRow = () => {
  idCounter += 1;
  return {
    action: <RHFCheckbox label="" name="labor" />,
    id: idCounter,
    username: 'Toan',
    age: 18,
  };
};

export default function ContractTableSection() {
  const [rows, setRows] = useState(() => [
    createRandomRow(),
    createRandomRow(),
    createRandomRow(),
    createRandomRow(),
  ]);

  const handleUpdateRow = () => {};

  const handleUpdateAllRows = () => {};

  const handleDeleteRow = () => {};

  const handleAddRow = () => {
    setRows((prevRows) => [...prevRows, createRandomRow()]);
  };

  const processRowUpdate = (newRow: any) => {
    const updatedRow = { ...newRow, isNew: false };
    console.log(updatedRow);
    return updatedRow;
  };
  return (
    <Box sx={{ width: '100%' }}>
      <Stack direction="row" spacing={1}>
        <Button size="small" onClick={handleDeleteRow}>
          Delete a row
        </Button>
        <Button size="small" onClick={handleAddRow}>
          Add a row
        </Button>
      </Stack>
      <Box sx={{ height: 400, mt: 1 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          editMode="row"
          processRowUpdate={processRowUpdate}
          experimentalFeatures={{ newEditingApi: true }}
          checkboxSelection
          hideFooterPagination
        />
      </Box>
    </Box>
  );
}
