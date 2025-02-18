import axios from 'axios';
import { paramCase } from 'change-case';
import { useCallback, useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import EmployeeApi from '@/apis/employee.api';
import PageWrapper from '@/components/page-wrapper';
import { PermissionWrapper } from '@/components/permission/PermissionWrapper';
import {
  DEFAULT_PAGINATION,
  LOCAL_STORAGE_KEYS,
  PermissionAction,
  PermissionList,
} from '@/constants/app.constants';
import { useLocales } from '@/locales';
import i18n from '@/locales/i18n';
import LoadingComponent from '@/pages/components/Loading';
import { deleteEmployeeRow, getEmployeeList } from '@/redux/slices/dashboard/employee';
import { dispatch, useSelector } from '@/redux/store';
import ModalExportEmployee from '@/sections/@dashboard/fm/employee/export/ModalExportEmployee';
import { LocalUtils } from '@/utils/local';
import { Utils } from '@/utils/utils';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Container,
  IconButton,
  Table,
  TableBody,
  TableContainer,
  Tooltip,
} from '@mui/material';
import ConfirmDialog from '../../../../../components/confirm-dialog';
import CustomBreadcrumbs from '../../../../../components/custom-breadcrumbs';
import Iconify from '../../../../../components/iconify';
import Scrollbar from '../../../../../components/scrollbar';
import { useSettingsContext } from '../../../../../components/settings';
import {
  TableHeadCustom,
  TableNoData,
  TablePaginationCustom,
  TableSelectedAction,
  useTable,
} from '../../../../../components/table';
import SnakeBar from '../../../../../utils/snackbar';
import ModalImport from '../../../../@/sections/@dashboard/fm/employee/import';
import {
  EmployeeTableRow,
  EmployeeTableToolbar,
} from '../../../../@/sections/@dashboard/fm/employee/list';
import { PATH_DASHBOARD } from '../../@/routes/paths';

// @mui












// routes


// sections










// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'g_id', label: i18n.t<string>('employeeId'), align: 'left', minWidth: '150px' },
  { id: 'project_id', label: i18n.t<string>('projectName'), align: 'left', minWidth: '150px' },
  {
    id: 'employeeProjectCode',
    label: i18n.t<string>('employeeProjectCode'),
    align: 'left',
    minWidth: '200px',
  },
  { id: 'fullName', label: i18n.t<string>('name'), align: 'left', minWidth: '150px' },
  { id: 'position', label: i18n.t<string>('position'), align: 'left', minWidth: '150px' },

  { id: 'gender', label: i18n.t<string>('gender'), align: 'left', minWidth: '150px' },
  { id: 'birthDate', label: i18n.t<string>('dateOfBirth'), align: 'left', minWidth: '150px' },
  { id: 'phoneNumber', label: i18n.t<string>('phoneNumber'), align: 'left', minWidth: '150px' },
  { id: 'startDate', label: i18n.t<string>('jobStartDate'), align: 'left', minWidth: '160px' },
  { id: 'endDate', label: i18n.t<string>('jobEndDate'), align: 'left', minWidth: '160px' },
  { id: 'status', label: i18n.t<string>('statusActtion'), align: 'left', minWidth: '150px' },

  // { id: 'position', label: i18n.t<string>('position'), align: 'left', minWidth: '150px' },
  // { id: 'workingDate', label: i18n.t<string>('joiningDate'), align: 'left', minWidth: '200px' },
  // { id: 'jobEndDate', label: i18n.t<string>('leavingDate'), align: 'left', minWidth: '200px' },
  // { id: '', label: '', align: 'left', minWidth: '50px' },

  {
    id: '',
    style: {
      position: 'sticky',

      right: 0,
    },
  },
];
// ----------------------------------------------------------------------

export default function EmployeeListPage() {
  const { t } = useLocales();
  const { employeeList, employeeCount } = useSelector((state) => state.employee);
  const [openImport, setOpenImport] = useState<boolean>(false);
  const [openExport, setOpenExport] = useState<boolean>(false);

  const [params, setParams] = useState({
    keyword: '',
    pageIndex: DEFAULT_PAGINATION.PAGE_INDEX,
    pageSize: DEFAULT_PAGINATION.PAGE_SIZE,
    project_id: '',
    orderKey: 'id',
    orderType: 'desc',
  });
  const {
    dense,
    order,
    onSort,
    orderBy,
    setPage,
    selected,
    onSelectRow,
    onSelectAllRows,
    onChangeDense,
    setSelected,
  } = useTable();

  const { themeStretch } = useSettingsContext();

  const navigate = useNavigate();

  const [loadingDownload, setLoadingDownload] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);

  const [openConfirm, setOpenConfirm] = useState(false);

  const isNotFound = !employeeList.length;

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleDeleteRow = async (id: string) => {
    await dispatch(deleteEmployeeRow({ id, params }));
  };

  const handleDeleteRows = async (selectedRows: string[]) => {
    let errorCount = 0;
    selectedRows.forEach((row: any) => {
      EmployeeApi.deleteEmployee(row).catch((err) => {
        errorCount += 1;
      });
    });
    if (errorCount === 0) {
      setSelected([]);
      setParams({
        keyword: '',
        project_id: '',
        pageIndex: 1,
        pageSize: params.pageSize,
        orderKey: 'id',
        orderType: 'desc',
      });
      SnakeBar.success(t('deleteSuccess'));
    }
  };

  const handleEditRow = (id: string) => {
    navigate(PATH_DASHBOARD.fm.employeeManagement.editEmployee(paramCase(id.toString())));
  };

  const getListEmployee = async (options: any) => {
    setLoading(true);
    try {
      await dispatch(getEmployeeList(options));
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadSelected = async (selectedRows: string[]) => {
    setLoadingDownload(true);
    const res = await axios({
      url: `${process.env.REACT_APP_API_ENPOINT}/${process.env.REACT_APP_API_PREFIX}/employee/download-employees-files`,
      method: 'GET',
      params: {
        employeeIds: selectedRows.toString(),
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${LocalUtils.get(LOCAL_STORAGE_KEYS.ACCESS_TOKEN)}`,
      },
      responseType: 'blob',
    }).then((response) => {
      const url = window.URL.createObjectURL(response.data);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'employee-selected-files.rar';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      setLoadingDownload(false);
    });
  };
  // const handleClick = async () => {
  //   await getListEmployee({
  //     ...params,
  //     pageIndex: 1,
  //     keyword: filterName,
  //     project_id: projectSelected,
  //   });
  // };
  const handleSort = async (orderKey: string, orderType: string) => {
    await getListEmployee({
      ...params,
      pageIndex: DEFAULT_PAGINATION.PAGE_INDEX,
      pageSize: DEFAULT_PAGINATION.PAGE_SIZE,
      orderKey,
      orderType,
    });
  };
  const onChangePage = useCallback(
    (event: unknown, newPage: number) => {
      setParams({
        ...params,
        pageIndex: newPage + 1,
      });
    },
    [params]
  );

  const onChangeRowsPerPage = useCallback(
    (event: any) => {
      setParams({
        ...params,
        pageSize: event.target.value,
      });
    },
    [params]
  );

  const handleClose = (e: any) => {
    setOpenImport(false);
  };
  const handleCloseExport = useCallback(() => {
    setOpenExport(false);
  }, []);

  const handleImport = (e: any) => {
    setOpenImport(true);
  };

  const handleExport = useCallback(() => {
    setOpenExport(true);
  }, []);

  useEffect(() => {
    // Utils.checkViewPermission(PermissionList.EMPLOYEE);
  }, []);
  useEffect(() => {
    getListEmployee(params);
  }, [params]);

  return (
    <PageWrapper title={t('employee')}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={t('listOfEmployee')}
          links={[
            { name: t('dashboard'), href: PATH_DASHBOARD.root },
            { name: t('employee'), href: PATH_DASHBOARD.fm.employeeManagement.employeeStatus },
            { name: t('list') },
          ]}
          action={
            <>
              <Button
                onClick={(e: any) => {
                  handleExport();
                }}
                sx={{
                  mr: 2,
                }}
                variant="outlined"
                startIcon={<FileUploadIcon />}
              >
                {t('export')}
              </Button>
              <Button
                onClick={(e: any) => {
                  handleImport(e);
                }}
                sx={{
                  mr: 2,
                }}
                variant="outlined"
                startIcon={<Iconify icon="eva:download-outline" />}
              >
                {t('import')}
              </Button>
              <PermissionWrapper
                functionId={PermissionList.EMPLOYEE}
                actionId={PermissionAction.CREATE}
                children={
                  <Button
                    component={RouterLink}
                    to={PATH_DASHBOARD.fm.employeeManagement.createEmployee}
                    variant="contained"
                    startIcon={<Iconify icon="eva:plus-fill" />}
                  >
                    {t('new')}
                  </Button>
                }
              />
            </>
          }
        />
        <Card sx={{ mt: 3 }}>
          <Box>
            <EmployeeTableToolbar setParams={setParams} params={params} />
          </Box>

          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <TableSelectedAction
              dense={dense}
              numSelected={selected.length}
              rowCount={employeeList.length}
              onSelectAllRows={(checked) =>
                onSelectAllRows(
                  checked,
                  employeeList.map((row) => row.id)
                )
              }
              action={
                <>
                  {loadingDownload ? (
                    <CircularProgress thickness={4} size={20} />
                  ) : (
                    <Tooltip title="Download">
                      <IconButton
                        color="primary"
                        onClick={() => {
                          handleDownloadSelected(selected);
                        }}
                      >
                        <Iconify icon="eva:download-outline" />
                      </IconButton>
                    </Tooltip>
                  )}

                  <Tooltip title={t('delete')}>
                    <IconButton color="primary" onClick={handleOpenConfirm}>
                      <Iconify icon="eva:trash-2-outline" />
                    </IconButton>
                  </Tooltip>
                </>
              }
            />

            <Scrollbar>
              <Table size={dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={employeeList.length}
                  numSelected={selected.length}
                  onSort={onSort}
                  handleSort={handleSort}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      employeeList.map((row) => row.id)
                    )
                  }
                />
                {loading ? (
                  <LoadingComponent loading={loading} />
                ) : (
                  <TableBody>
                    {employeeList?.map((row) => (
                      <EmployeeTableRow
                        key={row.id}
                        row={row}
                        selected={selected.includes(row.id)}
                        onSelectRow={() => onSelectRow(row.id)}
                        onDeleteRow={() => handleDeleteRow(row.id)}
                        onEditRow={() => handleEditRow(row.id)}
                      />
                    ))}
                    <TableNoData isNotFound={isNotFound} />
                  </TableBody>
                )}
              </Table>
            </Scrollbar>
          </TableContainer>

          <TablePaginationCustom
            count={employeeCount}
            page={params.pageIndex - 1}
            rowsPerPage={params.pageSize}
            onPageChange={onChangePage}
            onRowsPerPageChange={onChangeRowsPerPage}
            dense={dense}
            onChangeDense={onChangeDense}
          />
        </Card>

        {/* <Card sx={{ mt: 3 }}>
          <CardHeader
            title={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Article /> {t('quickGuide')}
              </Box>
            }
          />
          <EmployeeQuickGuide />
        </Card> */}
      </Container>

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
              handleDeleteRows(selected);
              handleCloseConfirm();
            }}
          >
            {t('delete')}
          </Button>
        }
      />
      <ModalImport handleClose={handleClose} openImport={openImport} getList={getListEmployee} />
      <ModalExportEmployee handleClose={handleCloseExport} openExport={openExport} />
    </PageWrapper>
  );
}
