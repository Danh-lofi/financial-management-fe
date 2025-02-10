import { paramCase } from 'change-case';
import i18next from 'i18next';
import LoadingComponent from 'pages/components/Loading';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getListDistrictApi } from 'redux/slices/dashboard/district';
import { deleteWardApi, getListWardApi } from 'redux/slices/dashboard/ward';
import { dispatch, useSelector } from 'redux/store';
import { WardTableRow, WardTableToolbar } from 'sections/@dashboard/hict/ward/list';
import { Utils } from 'utils/utils';
import PageWrapper from '@/components/page-wrapper';
import { DEFAULT_PAGINATION, GETALL_DISTRICT, PermissionList } from '@/constants/app.constants';
import { useLocales } from '@/locales';
import { Button, Card, Container, Table, TableBody, TableContainer } from '@mui/material';
import { _userList } from '../../../../../_mock/arrays';
import ConfirmDialog from '../../../../../components/confirm-dialog';
import CustomBreadcrumbs from '../../../../../components/custom-breadcrumbs';
import Scrollbar from '../../../../../components/scrollbar';
import { useSettingsContext } from '../../../../../components/settings';
import {
  TableHeadCustom,
  TableNoData,
  TablePaginationCustom,
  useTable
} from '../../../../../components/table';
import { PATH_DASHBOARD } from '../../../../../routes/paths';

// @mui











// routes



// sections







// ----------------------------------------------------------------------

const ROLE_OPTIONS = ['all', 'full stack developer'];

const TABLE_HEAD = [
  { id: 'wardId', label: i18next.t('wardId'), align: 'left' },
  { id: 'wardName', label: i18next.t('wardName'), align: 'left' },
  {
    id: '',
    label: '',
    style: {
      position: 'sticky',
      right: 0,
      zIndex: 8,
    },
  },
];

// ----------------------------------------------------------------------

export default function WardPage() {
  const { t } = useLocales();
  const { wardList, wardCount } = useSelector((state) => state.ward);
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
  } = useTable();

  const { themeStretch } = useSettingsContext();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const [values, setValues] = useState('');

  const [params, setParams] = useState({
    pageIndex: DEFAULT_PAGINATION.PAGE_INDEX,
    pageSize: DEFAULT_PAGINATION.PAGE_SIZE,
    keyword: '',
    districtId: '',
  });

  const [province, setProvince] = useState('');

  const [district, setDistrict] = useState('');

  const [tableData, setTableData] = useState(_userList);

  const [filterName, setFilterName] = useState('');

  const [openConfirm, setOpenConfirm] = useState(false);

  const denseHeight = dense ? 52 : 72;

  const isNotFound = !tableData.length;

  const dummyData = [{ district_Id: '1', wardId: '1', wardName: 'ward 1' }];

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleFilterName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterName(event.target.value);
  };

  const handleDeleteRow = async (id: string) => {
    console.log(id);
    await dispatch(
      deleteWardApi({
        id,
        params,
      })
    );
  };

  const handleDeleteRows = (selectedRows: string[]) => {};

  const handleEditRow = (id: string | number) => {
    navigate(PATH_DASHBOARD.hict.setting.editWard(paramCase(id.toString())));
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
  const handleClick = async () => {
    setParams({
      ...params,
      pageIndex: 1,
      districtId: district,
      keyword: filterName,
    });
  };

  const handleChangeProvince = async (e: any) => {
    setProvince(e.target.value);
    const dataApi = {
      pageIndex: GETALL_DISTRICT.PAGE_INDEX,
      pageSize: GETALL_DISTRICT.PAGE_SIZE,
      provinceId: e.target.value,
    };
    await dispatch(getListDistrictApi(dataApi));
  };

  const handleChangeDistrict = (e: any) => {
    setDistrict(e.target.value);
  };

  const getListWard = async (options: any) => {
    setLoading(true);
    try {
      await dispatch(getListWardApi(options));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getListWard(params);
  }, [params]);


  useEffect(() => {
    Utils.checkViewPermission(PermissionList.WARD)
  },[])
  return (
    <PageWrapper title={t('ward')}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={t('listOfWard')}
          links={[
            { name: t('dashboard'), href: PATH_DASHBOARD.root },
            { name: t('ward'), href: PATH_DASHBOARD.hict.setting.ward },
            { name: t('list') },
          ]}
          // action={
          //   <Button
          //     component={RouterLink}
          //     to={PATH_DASHBOARD.hict.setting.createWard}
          //     variant="contained"
          //     startIcon={<Iconify icon="eva:plus-fill" />}
          //   >
          //     {t('new')}
          //   </Button>
          // }
        />
        <Card sx={{ mt: 3 }}>
          <WardTableToolbar
            onChangeProvince={handleChangeProvince}
            onChangeDistrict={handleChangeDistrict}
            handleClick={handleClick}
            filterName={filterName}
            onFilterName={handleFilterName}
          />

          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <Scrollbar>
              <Table size={dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={wardList.length}
                  numSelected={selected.length}
                  onSort={onSort}
                />
      
                {loading ? (
                  <LoadingComponent loading={loading} />
                ) : 
                <TableBody>
                {wardList.map((row) => (
                  <WardTableRow
                    key={row.id}
                    row={row}
                    onDeleteRow={() => handleDeleteRow(row.id)}
                    onEditRow={() => handleEditRow(row.id)}
                  />
                ))}

                <TableNoData isNotFound={isNotFound} />
              </TableBody>
                }
        
              </Table>
            </Scrollbar>
          </TableContainer>

          <TablePaginationCustom
            count={wardCount}
            page={params.pageIndex - 1}
            rowsPerPage={params.pageSize}
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
        title={t('delete')}
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
          {t('delete')}
          </Button>
        }
      />
    </PageWrapper>
  );
}
