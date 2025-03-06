import { Dispatch, SetStateAction, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import snackbar from '@/utils/snackbar';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadingIcon from '@mui/icons-material/Downloading';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import SaveIcon from '@mui/icons-material/Save';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { Box, Button, Grid } from '@mui/material';
import { DataGrid, GridCallbackDetails, GridColumns, GridRowModel, GridSelectionModel, GridValidRowModel } from '@mui/x-data-grid';
import ConfirmDialog from '../confirm-dialog';

type IProps = {
  rows: GridValidRowModel[];
  columns: GridColumns<GridValidRowModel>;
  disableSelectionOnClick?: boolean;
  checkboxSelection?: boolean;
  pageSize?: number;
  rowsPerPageOptions?: number[];
  loading?: boolean;
  setRow: Dispatch<SetStateAction<any[]>>;
  onImportExcel?: () => void;
  onExportExcel?: () => void;
  isAddNewRow?: boolean;
  onDeleteRows?: (ids: string[]) => Promise<void>;
  onSave?: (rows: GridValidRowModel[]) => void;
  onReload?: () => void;
};
const CustomDataGrid = ({
  rows,
  columns,
  disableSelectionOnClick = true,
  checkboxSelection = true,
  pageSize = 5,
  rowsPerPageOptions = [5],
  loading = false,
  setRow,
  isAddNewRow = true,
  onDeleteRows,
  onExportExcel,
  onImportExcel,
  onSave,
  onReload,
}: IProps) => {
  const [isConfirm, setIsConfirm] = useState<boolean>(false);
  const [selectionIds, setSelectionIds] = useState<string[]>([]);
  const updateRow = async (row: GridRowModel) => {
    setRow((prev) => {
      const newRows = prev.map((r) => {
        if (r.id === row.id) {
          return { ...row, isEdit: true };
        }
        return { ...r };
      });
      return newRows;
    });
  };

  const addNewRowHandle = () => {
    const newRow: GridRowModel & { isEdit: boolean } = {
      id: uuidv4(),
      isEdit: true,
    };
    setRow((prev) => [newRow, ...prev]);
  };

  const deleteRowHandle = async () => {
    if (!selectionIds.length) {
      snackbar.error('Vui lòng chọn dữ liệu cần xóa');
      toggleConfirmDialogHandle();
      return
    }
    onDeleteRows && await onDeleteRows(selectionIds);
    toggleConfirmDialogHandle();
  }

  const toggleConfirmDialogHandle = () => {
    setIsConfirm(!isConfirm);
  };



  const saveHandle = () => {
    // Get List Row has isEdit
    const saveRows = rows.filter((row) => row.isEdit);
    onSave && onSave(saveRows);
  };
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <Grid justifyContent={'flex-end'} container spacing={1} padding={2}>
        {onReload && (
          <Grid item>
            <Button
              onClick={onReload}
              sx={{
                mr: 2,
              }}
              color="info"
              variant="outlined"
              startIcon={<RotateLeftIcon />}
            >
              Reload
            </Button>
          </Grid>
        )}
        {onImportExcel && (
          <Grid item>
            <Button
              onClick={(e: any) => {
                // handleExport();
              }}
              sx={{
                mr: 2,
              }}
              color="success"
              variant="outlined"
              startIcon={<UploadFileIcon />}
            >
              Nhập Excel
            </Button>
          </Grid>
        )}
        {onExportExcel && (
          <Grid item>
            <Button
              onClick={(e: any) => {
                // handleExport();
              }}
              sx={{
                mr: 2,
              }}
              color="success"
              variant="outlined"
              startIcon={<DownloadingIcon />}
            >
              Xuất Excel
            </Button>
          </Grid>
        )}
        {onDeleteRows && (
          <Grid item>
            <Button
              onClick={toggleConfirmDialogHandle}
              sx={{
                mr: 2,
              }}
              color="error"
              variant="outlined"
              startIcon={<DeleteIcon />}
            >
              Xóa
            </Button>
          </Grid>
        )}
        {isAddNewRow && (
          <Grid item>
            <Button
              onClick={addNewRowHandle}
              sx={{
                mr: 2,
              }}
              variant="outlined"
              startIcon={<AddIcon />}
            >
              Thêm mới
            </Button>
          </Grid>
        )}
        {onSave && (
          <Grid item>
            <Button
              onClick={saveHandle}
              sx={{
                mr: 2,
              }}
              variant="outlined"
              startIcon={<SaveIcon />}
            >
              Lưu
            </Button>
          </Grid>
        )}
      </Grid>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={pageSize}
        rowsPerPageOptions={rowsPerPageOptions}
        checkboxSelection={checkboxSelection}
        disableSelectionOnClick={disableSelectionOnClick}
        experimentalFeatures={{ newEditingApi: true }}
        processRowUpdate={updateRow}
        // onProcessRowUpdateError={handleProcessRowUpdateError}
        loading={loading}
        onSelectionModelChange={(selectionModel: GridSelectionModel, details: GridCallbackDetails) => {
          setSelectionIds(selectionModel as string[]);          
        }}
      />
      <ConfirmDialog
        open={isConfirm}
        onClose={toggleConfirmDialogHandle}
        title="Xác nhận"
        content="Bạn có chắc chắn muốn xóa?"
        action={
          <Button onClick={deleteRowHandle} variant="contained" color="error">
            Xóa
          </Button>
        }
      />
    </Box>
  );
};

export default CustomDataGrid;
