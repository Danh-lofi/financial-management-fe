import { useState } from 'react';
import { RHFSelect, RHFTextField, RHFUploadBox } from '@/components/hook-form';
import { useLocales } from '@/locales';
import {
  Avatar,
  Button,
  Checkbox,
  IconButton,
  MenuItem,
  Stack,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import { IPolicyEmployee } from '../../../../../../@types/policy';
import ConfirmDialog from '../../../../../../components/confirm-dialog';
import Iconify from '../../../../../../components/iconify';
import Label from '../../../../../../components/label';
import MenuPopover from '../../../../../../components/menu-popover';

// @mui

// @types


// components





// ----------------------------------------------------------------------

type Props = {
  row: IPolicyEmployee;
  selected: boolean;
  onEditRow: VoidFunction;
  onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
};

export default function PolicyEmployeeTableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
}: Props) {
  const { t } = useLocales();
  const {
    codeOfPolicyList,
    nameOfBudgetExpenseList,
    quantity,
    fromLevel,
    toLevel,
    effectiveDate,
    applicableTo,
    legalAcceptable,
    industry,
    region,
    department,
    level,
    position,
    employeeId,
    employeeName,
    phoneNumber,
    purpose,
    referenceCardNumber,
    numberOfDaysOccurrences,
    scheduleFromDate,
    scheduleToDate,
    advancePaymentDate,
    refundDate,
    uploadedDocuments,
    additionalExplanation,
  } = row;

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
      <TableRow selected={selected}>
        <TableCell
          style={{
            position: 'sticky',
            left: 0,
            backgroundColor: 'white',
            zIndex: 800,
          }}
          padding="checkbox"
        >
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>
        <TableCell align="left">{codeOfPolicyList}</TableCell>
        <TableCell align="left">{nameOfBudgetExpenseList}</TableCell>
        <TableCell align="left">{quantity}</TableCell>
        <TableCell align="left">{fromLevel}</TableCell>
        <TableCell align="left">{toLevel}</TableCell>
        <TableCell align="left">{effectiveDate}</TableCell>
        <TableCell align="left">{applicableTo}</TableCell>
        <TableCell align="left">{legalAcceptable}</TableCell>
        <TableCell align="left">{industry}</TableCell>
        <TableCell align="left">{region}</TableCell>
        <TableCell align="left">{department}</TableCell>
        <TableCell align="left">{level}</TableCell>
        <TableCell align="left">{position}</TableCell>
        <TableCell align="left">{employeeId}</TableCell>
        <TableCell align="left">{employeeName}</TableCell>
        <TableCell align="left">{phoneNumber}</TableCell>
        <TableCell align="left">{purpose}</TableCell>
        <TableCell align="left">{referenceCardNumber}</TableCell>
        <TableCell align="left">{numberOfDaysOccurrences}</TableCell>
        <TableCell align="left">{scheduleFromDate}</TableCell>
        <TableCell align="left">{scheduleToDate}</TableCell>
        <TableCell align="left">{advancePaymentDate}</TableCell>
        <TableCell align="left">{refundDate}</TableCell>
        <TableCell align="left">
          <IconButton aria-label="upload picture" component="label">
            <input hidden accept="image/*" type="file" />
            <Iconify icon="eva:cloud-upload-fill" width={28} />
          </IconButton>
        </TableCell>

        <TableCell align="left">{additionalExplanation}</TableCell>
        <TableCell
          style={{
            position: 'sticky',
            right: 0,
            backgroundColor: 'white',
            zIndex: 800,
          }}
          align="right"
        >
          <IconButton color={openPopover ? 'inherit' : 'default'} onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        arrow="right-top"
        sx={{ width: 140 }}
      >
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
        <MenuItem
          onClick={() => {
            onEditRow();
            handleClosePopover();
          }}
        >
          <Iconify icon="eva:edit-fill" />
          {t('edit')}
        </MenuItem>
      </MenuPopover>
      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title={t('delete')}
        content={t('deleteConfirm')}
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Delete
          </Button>
        }
      />
    </>
  );
}
