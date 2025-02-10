import { differenceInYears, isBefore, parseISO } from 'date-fns';
import moment from 'moment';
import { useEffect, useState } from 'react';
import {
  getEmployeeContract,
  getEmployeeProfile,
  getOneEmployee,
} from 'redux/slices/dashboard/employee';
import { dispatch, useSelector } from 'redux/store';
import { FileDetailsDrawer } from 'sections/@dashboard/file';
import { Utils } from 'utils/utils';
import FileThumbnail from '@/components/file-thumbnail';
import { PermissionWrapper } from '@/components/permission/PermissionWrapper';
import { useSettingsContext } from '@/components/settings';
import { PermissionAction, PermissionList, backgroundColor } from '@/constants/app.constants';
import { useLocales } from '@/locales';
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  IconButton,
  MenuItem,
  Stack,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { EmployeeForm } from '../../../../../@types/employee';
import ConfirmDialog from '../../../../../components/confirm-dialog';
import Iconify from '../../../../../components/iconify';
import MenuPopover from '../../../../../components/menu-popover';

// @mui










// @types


// components







// ----------------------------------------------------------------------

type Props = {
  row: EmployeeForm;
  selected: boolean;
  onEditRow: VoidFunction;
  onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
};

export default function EmployeeTableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
}: Props) {
  const { t } = useLocales();
  const theme = useTheme();
  const { themeMode } = useSettingsContext();
  const [isWorking, setIsWorking] = useState(true);
  const isDark = themeMode === 'dark';
  const {
    g_id,
    project_id,
    employeeProjectCode,
    fullName,
    position_id,
    gender,
    dateOfBirth,
    phoneNumber,
    workingDate,
    jobStartDate,
    jobEndDate,
    id,
    avatar_url,
  } = row;
  useEffect(() => {
    if (jobEndDate) {
      const today = new Date();
      const endJob = parseISO(jobEndDate);
      const status = isBefore(endJob, today);
      setIsWorking(!status);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { projectList } = useSelector((state) => state.project);
  const { positionList } = useSelector((state) => state.position);
  const [openUploadFile, setOpenUploadFile] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const projectName = projectList.find((item) => item.id === Number(project_id))?.name;
  const positionName = positionList.find((item) => item.id === Number(position_id))?.name;
  const handleCopy = () => {};
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const dummyData = {
    id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b17_files',
    name: 'india-data-large-gk-chesterton-mother.esp',
    size: 2823529.411764706,
    type: 'esp',
    isFavorited: false,
    shared: [],
    url: 'https://www.cloud.com/s/c218bo6kjuqyv66/india-data-large-gk-chesterton-mother.esp',
    tags: ['Docs', 'Projects', 'Work', 'Training', 'Sport', 'Foods'],
    dateCreated: '2023-03-26T11:36:22.468Z',
    dateModified: '2023-03-26T11:36:22.468Z',
  };

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  };

  const handleOpenDetails = async () => {
    // await dispatch(getEmployeeProfile({
    //   employeeId: id
    // }))
    await dispatch(
      getEmployeeContract({
        employeeId: id,
      })
    );
    setOpenDetails(true);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const handleFavorite = () => {
    setFavorited(!favorited);
  };

  const handleCloseDetails = () => {
    setOpenDetails(false);
  };

  return (
    <>
      <TableRow>
        <TableCell
          style={{
            position: 'sticky',
            left: 0,
            backgroundColor: isDark ? theme.palette.mode : backgroundColor.white,
            zIndex: 8,
          }}
          padding="checkbox"
        >
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>
        <TableCell>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt="test" src={avatar_url} />
            <Typography variant="subtitle2" noWrap>
              {g_id}
            </Typography>
          </Stack>
        </TableCell>
        <TableCell align="left">
          <p>{projectName}</p>
        </TableCell>
        <TableCell align="left">
          <p>{employeeProjectCode}</p>
        </TableCell>
        <TableCell align="left">
          <p>{fullName}</p>
        </TableCell>
        <TableCell align="left">
          <p>{positionName}</p>
        </TableCell>
        <TableCell align="left">
          <p>{gender ? t('male') : t('female')}</p>
        </TableCell>
        <TableCell align="left">
          <p>{moment(dateOfBirth).format('DD-MM-YYYY')}</p>
        </TableCell>
        <TableCell align="left">
          <p>{phoneNumber}</p>
        </TableCell>
        <TableCell align="left">
          <p> {jobStartDate && moment(jobStartDate).format('DD-MM-YYYY')}</p>
        </TableCell>
        <TableCell align="left">
          <p> {jobEndDate && moment(jobEndDate).format('DD-MM-YYYY')}</p>
        </TableCell>
        <TableCell align="left">
          <p> {isWorking ? t('working') : t('notWorking')}</p>
        </TableCell>
        {/* <TableCell align="left">
          <p>{position_id}</p>
        </TableCell>
        <TableCell align="left">
          <p>{workingDate ? moment(workingDate).format('DD/MM/YYYY') : ''}</p>
        </TableCell>
        <TableCell align="left">
          <p>{jobEndDate ? moment(jobEndDate).format('DD/MM/YYYY') : ''}</p>
        </TableCell>
        <TableCell align="left">
          <Box onClick={handleOpenDetails}>
            <FileThumbnail file="folder" />
          </Box>
        </TableCell> */}
        <TableCell
          style={{
            position: 'sticky',
            right: 0,
            backgroundColor: isDark ? theme.palette.mode : backgroundColor.white,
            zIndex: 8,
          }}
          align="right"
        >
          {Utils.checkPermission(PermissionList.EMPLOYEE, PermissionAction.UPDATE) ||
          Utils.checkPermission(PermissionList.EMPLOYEE, PermissionAction.DELETE) ? (
            <IconButton color={openPopover ? 'inherit' : 'default'} onClick={handleOpenPopover}>
              <Iconify icon="eva:more-vertical-fill" />
            </IconButton>
          ) : (
            ''
          )}
        </TableCell>
      </TableRow>

      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <PermissionWrapper
          actionId={PermissionAction.DELETE}
          functionId={PermissionList.EMPLOYEE}
          children={
            <MenuItem
              onClick={() => {
                handleOpenConfirm();
                handleClosePopover();
              }}
              sx={{ color: 'error.main' }}
            >
              <Iconify icon="eva:trash-2-outline" />
              {t('delete')}
            </MenuItem>
          }
        />
        <PermissionWrapper
          actionId={PermissionAction.UPDATE}
          functionId={PermissionList.EMPLOYEE}
          children={
            <MenuItem
              onClick={() => {
                onEditRow();
                handleClosePopover();
              }}
            >
              <Iconify icon="eva:edit-fill" />
              {t('edit')}
            </MenuItem>
          }
        />
      </MenuPopover>
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
              onDeleteRow();
              setOpenConfirm(false);
            }}
          >
            {t('delete')}
          </Button>
        }
      />

      <FileDetailsDrawer
        employeeId={id}
        item={dummyData}
        favorited={favorited}
        onFavorite={handleFavorite}
        onCopyLink={handleCopy}
        open={openDetails}
        onClose={handleCloseDetails}
        onDelete={onDeleteRow}
      />
    </>
  );
}
