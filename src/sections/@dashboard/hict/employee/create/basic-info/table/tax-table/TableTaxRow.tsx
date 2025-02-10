import { Fragment, useState } from 'react';
import { useSettingsContext } from '@/components/settings';
import { useLocales } from '@/locales';
import { Button, IconButton, Link, MenuItem, TableCell, TableRow, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ConfirmDialog from '../../../../../../../../components/confirm-dialog/ConfirmDialog';
import Iconify from '../../../../../../../../components/iconify/Iconify';
import MenuPopover from '../../../../../../../../components/menu-popover/MenuPopover';
import { backgroundColor } from '../../../../../../../../constants/app.constants';
import i18n from '../../../../../../../../locales/i18n';
import { fDate } from '../../../../../../../../utils/formatTime';

type Props = {
  row: IRelationshipTax;
  methods: any;
  indexRow: number;
  onOpenEdit: any;
  onDeleteRow: (taxId: number | string) => void;
};

const TableTaxRow = ({ row, methods, indexRow, onOpenEdit, onDeleteRow }: Props) => {
  const {
    id,
    documentCode,
    document_url,
    employee_id,
    endDate,
    fullName,
    identityCard,
    note,
    relationship,
    startDate,
    taxCode,
    typeOfDocument,
    dateOfBirth,
  } = row;
  const { t } = useLocales();
  const theme = useTheme();
  const { themeMode } = useSettingsContext();
  const isDark = themeMode === 'dark';
  // State
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const {
    control,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = methods;

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  return (
    <Fragment key={id}>
      <TableRow>
        <TableCell>{indexRow + 1}</TableCell>
        <TableCell>{fullName}</TableCell>
        <TableCell>{fDate(dateOfBirth, 'dd/MM/yyyy')}</TableCell>
        <TableCell>{taxCode}</TableCell>
        <TableCell>{identityCard}</TableCell>
        <TableCell>{relationship}</TableCell>
        <TableCell>{fDate(startDate, 'dd/MM/yyyy')}</TableCell>
        <TableCell>{fDate(endDate, 'dd/MM/yyyy')}</TableCell>
        <TableCell>{documentCode}</TableCell>
        <TableCell>
          {document_url ? 
          <Link href={document_url ?? ''} target="_blank" underline="hover">
            {t('documentRegister')}
          </Link>
          :
          <Typography sx={{fontStyle: "italic"}}>{t('noUpload')}</Typography>
          }
        </TableCell>
        <TableCell>{note}</TableCell>
        <TableCell
          sx={{
            position: 'sticky',
            right: 0,
            backgroundColor: () => {
              return isDark ? theme.palette.mode : backgroundColor.white;
            },
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
            onOpenEdit({ isOpen: true, relation: row });
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
        title={i18n.t<string>('delete')}
        content={i18n.t<string>('deleteConfirm')}
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              onDeleteRow(row.id);
              handleCloseConfirm();
            }}
          >
            {i18n.t<string>('delete')}
          </Button>
        }
      />
    </Fragment>
  );
};

export default TableTaxRow;
