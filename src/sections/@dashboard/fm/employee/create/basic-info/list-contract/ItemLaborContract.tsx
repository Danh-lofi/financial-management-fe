import { t } from 'i18next';
import React, { useState } from 'react';
import {
  getEmployeeContract,
  updateCurrentContract,
} from '@/redux/slices/dashboard/contract';
import { AddCircleOutline } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Card, Checkbox, Grid, Typography, useTheme } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { dispatch } from '../../../../../../../@/redux/store';
import { RHFCheckbox } from '../../../../../../../components/hook-form';
import { useSettingsContext } from '../../../../../../../components/settings';
import { backgroundColor } from '../../../../../../../constants/app.constants';

type IProps = {
  contract: IContract | null;
  columns: GridColDef[];
  isDisabled: boolean;
  listDisabled: number[];
  loading: boolean;
  index: number;
  onUpdateAllowance: (id: number) => void;
  onAddItemDetail: (index: number) => void;
  onProcessRowUpdate: (
    updatedRow: IDetailContract,
    originalRow: IDetailContract,
    contract: IDetailContract[],
    indexOfContract: number
  ) => void;
  onFocus: () => void;
  onBlur: (index: number) => void;
  onSubmitUpdateDetails: (details: IDetailContract[], index: number) => void;
};
const ItemLaborContract = ({
  contract,
  columns,
  isDisabled,
  listDisabled,
  loading,
  index,
  onUpdateAllowance,
  onAddItemDetail,
  onProcessRowUpdate,
  onFocus,
  onBlur,
  onSubmitUpdateDetails,
}: IProps) => {
  const theme = useTheme();
  const { themeMode } = useSettingsContext();
  if (!contract) return <></>;
  const isDark = themeMode === 'dark';

  return (
    <Card
      key={contract.id}
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
            <Grid item container alignItems="center" xs={12} sm={6} md={6} xl={7}>
              <Grid item xs={11} sm={11} md={11} xl={11}>
                <Typography sx={{ ml: 2, mr: 2 }} variant="h6">
                  {contract.contractType}
                </Typography>
              </Grid>
            </Grid>

            <>
              <Grid item textAlign="right" xs={6} sm={3} md={3} xl={3}>
                <Button variant="contained" onClick={() => onUpdateAllowance(contract.id)}>
                  {t('updateAllowance')}
                </Button>
              </Grid>
              <Grid item xs={6} sm={3} md={2} xl={2}>
                <Button
                  sx={{ ml: 1 }}
                  variant="outlined"
                  startIcon={<AddCircleOutline />}
                  onClick={() => onAddItemDetail(index)}
                >
                  {t('addAnnex')}
                </Button>
              </Grid>
            </>
          </Grid>

          <>
            <Grid sx={{ mt: 1 }} container spacing={3} item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Grid container item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Typography sx={{ fontStyle: 'italic', fontSize: '0.9rem' }} variant="body1">
                  {t('toUseCell')}
                </Typography>
                <Box height={400} width={1}>
                  <DataGrid
                    columns={columns}
                    rows={contract.details}
                    experimentalFeatures={{ newEditingApi: true }}
                    checkboxSelection={false}
                    disableSelectionOnClick
                    processRowUpdate={(updatedRow, oldRow) =>
                      onProcessRowUpdate(updatedRow, oldRow, contract.details, index)
                    }
                    onCellEditStart={onFocus}
                    onCellEditStop={() => onBlur(index)}
                  />
                </Box>
              </Grid>
            </Grid>

            <Box sx={{ textAlign: 'right', marginBlock: 3 }}>
              <LoadingButton
                disabled={isDisabled || listDisabled.findIndex((item) => item === index) === -1}
                loading={loading}
                onClick={() => onSubmitUpdateDetails(contract.details, index)}
                type="button"
                variant="contained"
              >
                {t('update')}
              </LoadingButton>
            </Box>
          </>
        </Grid>
      </Grid>
    </Card>
  );
};

export default ItemLaborContract;
