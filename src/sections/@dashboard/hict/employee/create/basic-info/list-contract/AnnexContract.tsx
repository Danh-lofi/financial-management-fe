import { AddCircleOutline } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import { addDays, differenceInDays } from 'date-fns';

import { Box, Button, Card, Grid, IconButton, Tooltip, Typography, useTheme } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { t } from 'i18next';
import { useParams } from 'react-router';

import { useSettingsContext } from '../../../../../../../components/settings';
import { backgroundColor } from '../../../../../../../constants/app.constants';
import { fDate } from '../../../../../../../utils/formatTime';

type IProps = {
  annex: IDetailContract[] | [];
  isUnlimited: boolean;
  isEdit: boolean;
  onUpdateAllowance: () => void;
  onAddItemToAnnex: () => void;
  onProcessRowUpdate: (updatedRow: IDetailContract, originalRow: IDetailContract) => void;
  onOpenConfirm: (annexId: number) => void;
  onOpenAllowance: (annex: IDetailContract) => void;
};

const AnnexContract = ({
  annex,
  isUnlimited,
  isEdit,
  onUpdateAllowance,
  onAddItemToAnnex,
  onProcessRowUpdate,
  onOpenConfirm,
  onOpenAllowance,
}: IProps) => {
  const theme = useTheme();
  const { themeMode } = useSettingsContext();

  const ERROR_MAIN = theme.palette.error.main;
  const PRIMARY_MAIN = theme.palette.primary.main;

  const isDark = themeMode === 'dark';

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: `${t('annex')}`,
      width: 200,
      editable: true,
    },
    // {
    //   field: 'duration',
    //   headerName: `${t('duration')}`,
    //   width: 100,
    //   editable: false,
    //   valueGetter: (cell: any) => {
    //     if (isUnlimited) return '~';
    //     const startDate = cell.getValue(cell.id, 'startDate') as Date;
    //     const endDate = cell.getValue(cell.id, 'endDate') as Date;

    //     if (startDate && endDate) {
    //       const dates = differenceInDays(endDate, startDate);
    //       return Number(dates);
    //     }
    //     return '';
    //   },
    // },
    {
      field: 'startDate',
      headerName: `${t('effectiveDate')}`,
      width: 200,
      editable: true,
      type: 'date',
      valueFormatter: (date: any) => {
        const formattedDate = fDate(date.value as Date, 'dd/MM/yyyy');
        return formattedDate;
      },
    },
    {
      field: 'endDate',
      headerName: `${t('expirationDate')}`,
      width: 200,
      editable: !isUnlimited,
      type: 'date',
      valueFormatter: (date: any) => {
        if (isUnlimited) {
          return '';
        }
        const formattedDate = fDate(date.value as Date, 'dd/MM/yyyy');
        return formattedDate;
      },
    },

    {
      field: 'position',
      headerName: `${t('jobPosition')}`,
      width: 200,
      editable: true,
    },
    {
      field: 'insuranceRate',
      headerName: `${t('insuranceRate')}`,
      width: 150,
      editable: true,
      type: 'number',
    },
    {
      field: 'basicSalary',
      headerName: `${t('basicSalary')}`,
      width: 150,
      editable: true,
      type: 'number',
    },
    {
      field: 'allowance1',
      headerName: `${t('allowance')} 1`,
      width: 200,
      type: 'number',
    },
    {
      field: 'allowance2',
      headerName: `${t('allowance')} 2`,
      width: 200,
      type: 'number',
    },
    {
      field: 'allowance3',
      headerName: `${t('allowance')} 3`,
      width: 200,
      type: 'number',
    },
    {
      field: 'allowance4',
      headerName: `${t('allowance')} 4`,
      width: 200,
      type: 'number',
    },
    {
      field: 'allowance5',
      headerName: `${t('allowance')} 5`,
      width: 200,
      type: 'number',
    },
    {
      field: 'total',
      headerName: `${t('total')}`,
      width: 200,
      editable: false,
      type: 'number',
      valueGetter: (cell: any) =>
        Number(cell.getValue(cell.id, 'basicSalary') ?? 0) +
        Number(cell.getValue(cell.id, 'allowance1Value') ?? 0) +
        Number(cell.getValue(cell.id, 'allowance2Value') ?? 0) +
        Number(cell.getValue(cell.id, 'allowance3Value') ?? 0) +
        Number(cell.getValue(cell.id, 'allowance4Value') ?? 0) +
        Number(cell.getValue(cell.id, 'allowance5Value') ?? 0),
    },
    {
      field: 'note',
      headerName: `${t('note')}`,
      width: 200,
      editable: true,
    },
    {
      field: 'actions',
      headerName: '',
      sortable: false,
      width: 160,
      renderCell: (record: any) => {
        const Icon = record.id !== 0 && (
          <Tooltip title={t('addAllowance')}>
            <IconButton
              size="large"
              onClick={() => {
                onOpenAllowance(record.row);
              }}
            >
              <AddCircleOutline sx={{ color: PRIMARY_MAIN }} />
            </IconButton>
          </Tooltip>
        );
        return (
          <>
            <Tooltip title={t('removeAllowance')}>
              <IconButton size="large" onClick={() => onOpenConfirm(record.id)}>
                <DeleteIcon sx={{ color: ERROR_MAIN }} />
              </IconButton>
            </Tooltip>
            {Icon}
          </>
        );
      },
    },
  ];

  return (
    <Card
      sx={{
        p: 3,
        mb: 3,
        backgroundColor: () => {
          return isDark ? theme.palette.mode : backgroundColor.white;
        },
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={12}>
          <Grid container item spacing={1} xs={12} sm={12} md={12}>
            <Grid item container alignItems="center" xs={12} sm={6} md={6} xl={8}>
              <Typography variant="h6">{t('annex')}</Typography>
            </Grid>

            {/* <Grid item textAlign="right" xs={6} sm={3} md={3} xl={2}>
              <Button variant="contained" onClick={() => onUpdateAllowance()}>
                {t('updateAllowance')}
              </Button>
            </Grid> */}
            <Grid item xs={12} sm={6} md={4} xl={4} textAlign="right">
              {isEdit && (
                <Button variant="contained" onClick={() => onUpdateAllowance()}>
                  {t('updateAllowance')}
                </Button>
              )}
              <Button
                sx={{ ml: 1 }}
                variant="outlined"
                startIcon={<AddCircleOutline />}
                onClick={onAddItemToAnnex}
              >
                {t('addAnnex')}
              </Button>
            </Grid>
          </Grid>

          <Grid sx={{ mt: 1 }} container spacing={3} item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Grid container item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Typography sx={{ fontStyle: 'italic', fontSize: '0.9rem' }} variant="body1">
                {t('toUseCell')}
              </Typography>
              <Box height={400} width={1}>
                <DataGrid
                  columns={columns}
                  rows={annex}
                  experimentalFeatures={{ newEditingApi: true }}
                  checkboxSelection={false}
                  disableSelectionOnClick
                  processRowUpdate={(updatedRow, oldRow) => {
                    console.log("🚀 ~ file: AnnexContract.tsx:247 ~ updatedRow:", updatedRow)
                    
                    onProcessRowUpdate(updatedRow, oldRow)}}
                />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

export default AnnexContract;
