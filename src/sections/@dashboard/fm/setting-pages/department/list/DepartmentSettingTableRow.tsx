import { useState } from 'react';
import { useSettingsContext } from '@/components/settings';
import { PermissionAction, PermissionList, backgroundColor } from '@/constants/app.constants';
import { useLocales } from '@/locales';
import { Utils } from '@/utils/utils';
import {
  Button,
  Checkbox,
  IconButton,
  MenuItem,
  TableCell,
  TableRow,
  useTheme,
} from '@mui/material';
import { IDepartment } from '../../../../../../@types/department';
import ConfirmDialog from '../../../../../../components/confirm-dialog';
import Iconify from '../../../../../../components/iconify';
import MenuPopover from '../../../../../../components/menu-popover';

// @mui

// @types


// components




// ----------------------------------------------------------------------

type Props = {
  row: IDepartment;
  selected: boolean;
  onEditRow: VoidFunction;
  onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
};

export default function DepartmentSettingTableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
}: Props) {
  const { t } = useLocales();
  // Theme
  const theme = useTheme();
  const { themeMode } = useSettingsContext();
  const isDark = themeMode === 'dark';
  const { code, name } = row;

  const [openConfirm, setOpenConfirm] = useState(false);

  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  return (
    <>
      <TableRow>
        <TableCell
          style={{
            position: 'sticky',
            left: 0,
            backgroundColor: isDark ? theme.palette.mode : backgroundColor.white,
            zIndex: 800,
          }}
          padding="checkbox"
        >
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>
        <TableCell align="left">{code}</TableCell>
        <TableCell align="left">{name}</TableCell>
        <TableCell
          style={{
            position: 'sticky',
            right: 0,
            backgroundColor: isDark ? theme.palette.mode : backgroundColor.white,
            zIndex: 800,
          }}
          align="right"
        >
          {Utils.checkPermission(PermissionList.DEPARTMENT, PermissionAction.UPDATE) ||
          Utils.checkPermission(PermissionList.DEPARTMENT, PermissionAction.DELETE) ? (
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
        {Utils.checkPermission(PermissionList.DEPARTMENT, PermissionAction.DELETE) ? (
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
        ) : (
          ''
        )}
        {Utils.checkPermission(PermissionList.DEPARTMENT, PermissionAction.UPDATE) ? (
          <MenuItem
            onClick={() => {
              onEditRow();
              handleClosePopover();
            }}
          >
            <Iconify icon="eva:edit-fill" />
            {t('edit')}
          </MenuItem>
        ) : (
          ''
        )}
      </MenuPopover>
      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title={t('delete')}
        content={t('deleteConfirm')}
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            {t('delete')}
          </Button>
        }
      />
    </>
  );
}
