import moment from 'moment';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import DataGridBasic from 'sections/_examples/mui/data-grid/DataGridBasic';
import EmployeeApi from '@/apis/employee.api';
import ConfirmDialog from '@/components/confirm-dialog/ConfirmDialog';
import { useLocales } from '@/locales';
import { deleteSalaryBasic } from '@/redux/slices/dashboard/employee';
import { dispatch } from '@/redux/store';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, Card, CardHeader, IconButton, Tooltip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CreateSalaryHistory from './form/CreateSalaryHistory';

type Props = {};

const EmployeeSalaryHistory = (props: Props) => {
  const [tableData, setTableData] = useState([]);
  const params = useParams();
  const { t } = useLocales();
  const theme = useTheme();
  const [row, setRow] = useState(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openCreate, setOpenCreate] = useState<boolean>(false);
  const ERROR_MAIN = theme.palette.error.main;
  const PRIMARY_MAIN = theme.palette.primary.main;
  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };
  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };
  const handleClose = (e: any) => {
    setOpenCreate(false);
  };
  const columns = [
    {
      field: 'fromDate',
      headerName: t('startDateRelationship'),
      width: 250,
      renderCell: (record: any) => {
        return moment(record.row.startDate).format('DD-MMMM-YYYY');
      },
    },
    {
      field: 'toDate',
      headerName: t('endDateRelationship'),
      width: 250,
      renderCell: (record: any) => {
        return moment(record.row.endDate).format('DD-MMMM-YYYY');
      },
    },
    { field: 'salaryBasic', headerName: t('salary'), editable: true, width: 250 },
    { field: 'allowance', headerName: t('position'), editable: true, width: 250 },
    {
      field: 'actions',
      headerName: '',
      sortable: false,
      width: 80,
      renderCell: (record: any) => {
        return (
          <Tooltip title={t('delete')}>
            <IconButton
              size="large"
              onClick={() => {
                setRow(record);
                handleOpenConfirm();
              }}
            >
              <DeleteIcon sx={{ color: ERROR_MAIN }} />
            </IconButton>
          </Tooltip>
        );
      },
    },
  ];
  const getSalary = async (id:any) => {
    const { data } = await EmployeeApi.getListSalary(id);
    console.log(data);
    setTableData(data);
  };
  const handleDeleteSalary = async (data: any) => {
    await dispatch(deleteSalaryBasic(data.id))
    await getSalary(params.id)
  };
  useEffect(() => {
    if (params.id) {
      getSalary(params.id);
    }
  }, [params.id]);
  return (
    <>
      <Card sx={{ mt: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <CardHeader title={t('salary')} sx={{ mb: 2 }} />
          <Tooltip onClick={() => setOpenCreate(true)} title={t('addDependentPerson')}>
            <IconButton size="large">
              <AddCircleIcon sx={{ color: PRIMARY_MAIN }} fontSize="large" />
            </IconButton>
          </Tooltip>
        </Box>
        <Box sx={{ height: 550 }}>
          <DataGridBasic columns={columns} data={tableData} />
        </Box>
      </Card>
      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title={t('delete')}
        content={t('deleteConfirm')}
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDeleteSalary(row);
              setOpenConfirm(false);
            }}
          >
            {t('delete')}
          </Button>
        }
      />
      <CreateSalaryHistory getSalary={getSalary} openCreate={openCreate} handleClose={handleClose} />
    </>
  );
};

export default EmployeeSalaryHistory;
