import { useState } from 'react';
import { Utils } from 'utils/utils';
import ConfirmDialog from '@/components/confirm-dialog/ConfirmDialog';
import Iconify from '@/components/iconify/Iconify';
import MenuPopover from '@/components/menu-popover/MenuPopover';
import { useSettingsContext } from '@/components/settings';
import { PermissionAction, PermissionList, backgroundColor } from '@/constants/app.constants';
import { useLocales } from '@/locales';
import { Button, IconButton, MenuItem, TableCell, TableRow, useTheme } from '@mui/material';
import { IMedicalFacility } from '../../../../../@types/medicalFacility';

// @mui

// @types








// components

// ----------------------------------------------------------------------

type Props = {
  row: IMedicalFacility;
  onEditRow: VoidFunction;
  onDeleteRow: VoidFunction;
};

export default function MedicalFacilityTableRow({ row, onEditRow, onDeleteRow }: Props) {
  const { t } = useLocales();
  // Theme
  const theme = useTheme();
  const { themeMode } = useSettingsContext();
  const isDark = themeMode === 'dark';
  const { id, name, code, province_id, priority } = row;

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

  const renderPriority = (priorityNumber: number) => {
  
    switch (priorityNumber) {
      case 0:
        return t('noPriority');
      case 1:
        return t('highPriority');
      case 2:
        return t('averagePriority');
      default:
        return t('lowPriority');
    }
  };
  return (
    <>
      <TableRow>
        {/* <TableCell align="left">{id}</TableCell> */}

        <TableCell align="left">{province_id}</TableCell>
        <TableCell align="left">{code}</TableCell>
        <TableCell align="left">{name}</TableCell>
        <TableCell align="left">{renderPriority(Number(priority))}</TableCell>
        <TableCell
          style={{
            position: 'sticky',
            right: 0,
            backgroundColor: isDark ? theme.palette.mode : backgroundColor.white,
            zIndex: 800,
          }}
          align="right"
        >
          {Utils.checkPermission(PermissionList.MEDICAL_FACILITY, PermissionAction.UPDATE) ||
          Utils.checkPermission(PermissionList.MEDICAL_FACILITY, PermissionAction.DELETE) ? (
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
        {Utils.checkPermission(PermissionList.MEDICAL_FACILITY, PermissionAction.DELETE) ? (
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
        {Utils.checkPermission(PermissionList.MEDICAL_FACILITY, PermissionAction.UPDATE) ? (
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
