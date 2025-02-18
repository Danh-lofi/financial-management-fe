import { paramCase } from 'change-case';
import { useCallback, useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import PageWrapper from '@/components/page-wrapper';
import { DEFAULT_PAGINATION } from '@/constants/app.constants';
import { useLocales } from '@/locales';
import i18n from '@/locales/i18n';
import LoadingComponent from '@/pages/components/Loading';
import { deleteListUser, getListUser, getRoleList } from '@/redux/slices/dashboard/user';
import { dispatch, useSelector } from '@/redux/store';
import { UserTableRow } from '@/sections/@dashboard/fm/setting-pages/userSetting/list';
import {
  Button,
  Card,
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
import { ProjectSettingTableToolbar } from '../../../../@/sections/@dashboard/fm/setting-pages/project/list';
import UserSettingTableToolbar from '../../../../@/sections/@dashboard/fm/setting-pages/userSetting/list/UserSettingTableToolbar';
import { PATH_DASHBOARD } from '../../@/routes/paths';

// @mui









// routes

// sections









// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'userId', label: i18n.t<string>('userId'), align: 'left', width: 200 },
  { id: 'userName', label: i18n.t<string>('userName'), align: 'left', width: 200 },
  { id: 'email', label: i18n.t<string>('email'), align: 'left' },
  // { id: 'phoneNumber', label: i18n.t<string>('phoneNumber'), align: 'left', width: 200 },
  { id: 'role', label: i18n.t<string>('role'), align: 'left', width: 400 },
  { id: 'project', label: i18n.t<string>('project'), align: 'left', width: 200 },
  {
    id: '',
    style: {
      position: 'sticky',
      right: 0,
    },
  },
];

// ----------------------------------------------------------------------

export default function UserListSettingPage() {
  const { t } = useLocales();
  const { userList, userCount, roleList } = useSelector((state) => state.user);
  const [params, setParams] = useState({
    pageIndex: DEFAULT_PAGINATION.PAGE_INDEX,
    pageSize: DEFAULT_PAGINATION.PAGE_SIZE,
    keyword: '',
  });
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
  const [loading, setLoading] = useState<boolean>(false);

  const { themeStretch } = useSettingsContext();

  const navigate = useNavigate();

  const [filterName, setFilterName] = useState('');

  const [openConfirm, setOpenConfirm] = useState(false);

  const denseHeight = dense ? 52 : 72;

  const isNotFound = !userList.length;

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleFilterName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterName(event.target.value);
  };

  const handleDeleteRow = async (id: number) => {
    await dispatch(deleteListUser([id]));
    getUserList(params);
  };

  const handleDeleteRows = async (selectedRows: string[]) => {
    // convert string array to number array
    const selectedIds = selectedRows.map((x) => +x);
    await dispatch(deleteListUser(selectedIds));
    getUserList(params);
  };

  const handleEditRow = (id: string) => {
    navigate(PATH_DASHBOARD.fm.setting.editProject(paramCase(id.toString())));
  };

  const handleClick = async () => {
    await setParams({
      ...params,
      pageIndex: 1,
      keyword: filterName,
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
  const getUserList = async (options: any) => {
    setLoading(true);
    try {
      await dispatch(getListUser(options));
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getUserList(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  useEffect(() => {
    dispatch(getRoleList());
  }, []);
  return (
    <PageWrapper title={t('user')}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={t('listOfUser')}
          links={[
            { name: t('dashboard'), href: PATH_DASHBOARD.root },
            { name: t('user'), href: PATH_DASHBOARD.fm.setting.userList },
            { name: t('list') },
          ]}
        />
        <Card sx={{ mt: 3 }}>
          <UserSettingTableToolbar />
          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <TableSelectedAction
              dense={dense}
              numSelected={selected.length}
              rowCount={userList.length}
              onSelectAllRows={(checked) =>
                onSelectAllRows(
                  checked,
                  userList?.map((row: any) => row.id)
                )
              }
              action={
                <Tooltip title="Delete">
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
                  rowCount={userList.length}
                  numSelected={selected.length}
                  onSort={onSort}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      userList?.map((row: any) => row.Id)
                    )
                  }
                />
                {loading ? (
                  <LoadingComponent loading={loading} />
                ) : (
                  <TableBody>
                    {userList?.map((row: any) => (
                      <UserTableRow
                        getUserList={getUserList}
                        key={row.Id}
                        row={row}
                        selected={selected.includes(row.Id)}
                        onSelectRow={() => onSelectRow(row.Id)}
                        onDeleteRow={() => handleDeleteRow(row.Id)}
                        // onEditRow={() => handleEditRow(row.Id)}
                      />
                    ))}

                    <TableNoData isNotFound={isNotFound} />
                  </TableBody>
                )}
              </Table>
            </Scrollbar>
          </TableContainer>

          <TablePaginationCustom
            count={userCount}
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
    </PageWrapper>
  );
}
