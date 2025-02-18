import { paramCase } from 'change-case';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import PageWrapper from '@/components/page-wrapper';
import { useLocales } from '@/locales';
import i18n from '@/locales/i18n';
import {
  Button,
  Card,
  Container,
  IconButton,
  Table,
  TableBody,
  TableContainer,
  Tooltip
} from '@mui/material';
import { _userList } from '../../../../../_mock/arrays';
import ConfirmDialog from '../../../../../components/confirm-dialog';
import CustomBreadcrumbs from '../../../../../components/custom-breadcrumbs';
import Iconify from '../../../../../components/iconify';
import Scrollbar from '../../../../../components/scrollbar';
import { useSettingsContext } from '../../../../../components/settings';
import {
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TablePaginationCustom,
  TableSelectedAction,
  emptyRows,
  useTable,
} from '../../../../../components/table';
import {
  PolicyEmployeeTableRow,
  PolicyEmployeeTableToolbar,
} from '../../../../@/sections/@dashboard/fm/setting-pages/policy/list';
import { PATH_DASHBOARD } from '../../@/routes/paths';

// @mui




// routes


// sections








// ----------------------------------------------------------------------

const ROLE_OPTIONS = ['all', 'full stack developer'];

const TABLE_HEAD = [
  {
    id: 'codeOfPolicyList',
    label: i18n.t<string>('codeOfPolicyList'),
    align: 'left',
    minWidth: 250,
  },
  {
    id: 'nameOfBudgetExpenseList',
    label: i18n.t<string>('nameOfBudgetExpenseList'),
    align: 'left',
    minWidth: 300,
  },
  { id: 'quantity', label: i18n.t<string>('quantity'), align: 'left', minWidth: 150 },
  { id: 'fromLevel', label: i18n.t<string>('fromLevel'), align: 'left' },
  { id: 'toLevel', label: i18n.t<string>('toLevel'), align: 'left' },
  { id: 'effectiveDate', label: i18n.t<string>('effectiveDate'), align: 'left', minWidth: 150 },
  { id: 'applicableTo', label: i18n.t<string>('applicableTo'), align: 'left', minWidth: 150 },
  { id: 'legalAcceptable', label: i18n.t<string>('legalAcceptable'), align: 'left', minWidth: 150 },
  { id: 'industry', label: i18n.t<string>('industry'), align: 'left', minWidth: 150 },
  { id: 'region', label: i18n.t<string>('region'), align: 'left', minWidth: 150 },
  { id: 'department', label: i18n.t<string>('department'), align: 'left', minWidth: 150 },
  { id: 'level', label: i18n.t<string>('level'), align: 'left', minWidth: 150 },
  { id: 'position', label: i18n.t<string>('position'), align: 'left', minWidth: 150 },
  { id: 'employeeId', label: i18n.t<string>('employeeId'), align: 'left', minWidth: 150 },
  { id: 'employeeName', label: i18n.t<string>('employeeName'), align: 'left', minWidth: 200 },
  { id: 'phoneNumber', label: i18n.t<string>('phoneNumber'), align: 'left', minWidth: 150 },
  { id: 'purpose', label: i18n.t<string>('purpose'), align: 'left', minWidth: 150 },
  {
    id: 'referenceCardNumber',
    label: i18n.t<string>('referenceCardNumber'),
    align: 'left',
    minWidth: 150,
  },
  {
    id: 'numberOfDaysOccurrences',
    label: i18n.t<string>('numberOfDaysOccurrences'),
    align: 'left',
    minWidth: 150,
  },
  {
    id: 'scheduleFromDate',
    label: i18n.t<string>('scheduleFromDate'),
    align: 'left',
    minWidth: 150,
  },
  { id: 'scheduleToDate', label: i18n.t<string>('scheduleToDate'), align: 'left', minWidth: 150 },
  {
    id: 'advancePaymentDate',
    label: i18n.t<string>('advancePaymentDate'),
    align: 'left',
    minWidth: 150,
  },
  { id: 'refundDate', label: i18n.t<string>('refundDate'), align: 'left', minWidth: 150 },
  {
    id: 'uploadedDocuments',
    label: i18n.t<string>('uploadedDocuments'),
    align: 'left',
    minWidth: 150,
  },
  {
    id: 'additionalExplanation',
    label: i18n.t<string>('additionalExplanation'),
    align: 'left',
    minWidth: 150,
  },

  {
    id: '',
    label: '',
    align: 'center',
    style: {
      position: 'sticky',
      right: 0,
      zIndex: 8,
    },
  },
];

const dummyData = [
  {
    codeOfPolicyList: '101',
    nameOfBudgetExpenseList: 'Chi phí tiếp khách',
    quantity: 'lần',
    fromLevel: '2,000,000',
    toLevel: '9,000,000',
    effectiveDate: '1/1/2023',
    applicableTo: 'user1',
    legalAcceptable: 'Công ty-HCM',
    industry: 'Food',
    region: 'HCM',
    department: 'HO',
    level: 'Quản lý',
    position: 'Giám đốc nhân sự',
    employeeId: '12331',
    employeeName: 'Nguyễn Văn A',
    phoneNumber: '369429932',
    purpose: 'Công tác',
    referenceCardNumber: '123456789',
    numberOfDaysOccurrences: '2',
    scheduleFromDate: '4/1/2023',
    scheduleToDate: '4/2/2023',
    advancePaymentDate: '4/3/2023',
    refundDate: '4/4/2023',
    uploadedDocuments: 'Icon upload',
    additionalExplanation: 'Something',
  },
];

// ----------------------------------------------------------------------

export default function PolicyEmployeePage() {
  const { t } = useLocales();

  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    //
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();

  const { themeStretch } = useSettingsContext();

  const navigate = useNavigate();
  const [values, setValues] = useState('');

  const [tableData, setTableData] = useState(_userList);

  const [filterName, setFilterName] = useState('');

  const [filterRole, setFilterRole] = useState('all');

  const [openConfirm, setOpenConfirm] = useState(false);

  const [filterStatus, setFilterStatus] = useState('all');

  const denseHeight = dense ? 52 : 72;

  const isFiltered = filterName !== '' || filterRole !== 'all' || filterStatus !== 'all';

  const isNotFound = !tableData.length;

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleFilterName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleFilterRole = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setFilterRole(event.target.value);
  };

  const handleDeleteRow = (id: string) => {};

  const handleDeleteRows = (selectedRows: string[]) => {};

  const handleEditRow = (id: string) => {
    navigate(PATH_DASHBOARD.fm.employeeManagement.editEmployee(paramCase('1')));
  };

  const handleResetFilter = () => {
    setFilterName('');
    setFilterRole('all');
    setFilterStatus('all');
  };

  return (
    <PageWrapper title={t('employee')}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={t('listOfPolicyEmployee')}
          links={[
            { name: t('dashboard'), href: PATH_DASHBOARD.root },
            {
              name: t('policyEmployee'),
              href: PATH_DASHBOARD.fm.setting.policyEmployee,
            },
            { name: t('list') },
          ]}
          action={
            <Button
              component={RouterLink}
              to={PATH_DASHBOARD.fm.setting.createPolicyEmployee}
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              {t('new')}
            </Button>
          }
        />
        <Card sx={{ mt: 3 }}>
          <PolicyEmployeeTableToolbar filterName={filterName} onFilterName={handleFilterName} />

          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <TableSelectedAction
              dense={dense}
              numSelected={selected.length}
              rowCount={tableData.length}
              onSelectAllRows={(checked) =>
                onSelectAllRows(
                  checked,
                  tableData.map((row) => row.id)
                )
              }
              action={
                <Tooltip title={t('delete')}>
                  <IconButton color="primary" onClick={handleOpenConfirm}>
                    <Iconify icon="eva:trash-2-outline" />
                  </IconButton>
                </Tooltip>
              }
            />

            <Scrollbar>
              <Table size={dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={tableData.length}
                  numSelected={selected.length}
                  onSort={onSort}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      tableData.map((row) => row.id)
                    )
                  }
                />

                <TableBody>
                  {dummyData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <PolicyEmployeeTableRow
                        key={row.codeOfPolicyList}
                        row={row}
                        selected={selected.includes(row.codeOfPolicyList)}
                        onSelectRow={() => onSelectRow(row.codeOfPolicyList)}
                        onDeleteRow={() => handleDeleteRow(row.codeOfPolicyList)}
                        onEditRow={() => handleEditRow(row.codeOfPolicyList)}
                      />
                    ))}

                  <TableEmptyRows
                    height={denseHeight}
                    emptyRows={emptyRows(page, rowsPerPage, tableData.length)}
                  />

                  <TableNoData isNotFound={isNotFound} />
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>

          <TablePaginationCustom
            count={tableData.length}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={onChangePage}
            onRowsPerPageChange={onChangeRowsPerPage}
            dense={dense}
            onChangeDense={onChangeDense}
          />
        </Card>
      </Container>

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Delete"
        content={
          <>
            Are you sure want to delete <strong> {selected.length} </strong> items?
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDeleteRows(selected);
              handleCloseConfirm();
            }}
          >
            Delete
          </Button>
        }
      />
    </PageWrapper>
  );
}
