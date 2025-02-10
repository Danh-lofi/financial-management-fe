import LoadingComponent from 'pages/components/Loading';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import {
  deleteAllowance,
  getAllowanceList,
  getEmployeeContract,
  updateAllowance,
} from 'redux/slices/dashboard/contract';
import { dispatch, useSelector } from 'redux/store';
import ConfirmDialog from '@/components/confirm-dialog/ConfirmDialog';
import FormProvider, { RHFSelect, RHFTextField } from '@/components/hook-form';
import { useLocales } from '@/locales';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  Typography,
} from '@mui/material';

export type addAllowance = {
  allowance: [];
};

interface Props {
  openUpdate: boolean;
  handleClose: any;
  currentContract: number;
}


const UpdateAllowanceForm = ({
  openUpdate,
  handleClose,
  currentContract,
}: //  getInsurance
Props) => {
  const { t } = useLocales();
  // useSelector
  const { allowanceList } = useSelector((state) => state.contract);

  // useParams
  const params = useParams();

  // useState
  const [openConfirm, setOpenConfirm] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  // Confirm Delete
  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  // useForm
  const methods = useForm<any>({
    defaultValues: {
      allowanceCurrent: allowanceList[0]?.id,
      allowanceName: allowanceList[0]?.name,
      allowanceValue: allowanceList[0]?.value,
    },
  });

  const {
    reset,
    watch,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;
  const values = watch();
  const handleChangeAllowance = async (e: any) => {
    const value = e.target.value;
    const currentAllowance = allowanceList?.find((item) => {
      return item.id === value;
    });
    reset({
      allowanceCurrent: currentAllowance?.id,
      allowanceName: currentAllowance?.name,
      allowanceValue: currentAllowance?.value,
    });
  };
  // Handle submit form
  const onSubmit = async (data: any) => {
    const submitValue = {
      id: data.allowanceCurrent,
      contract_id: currentContract,
      name: data.allowanceName,
      value: Number(data.allowanceValue),
    };
    await dispatch(updateAllowance(submitValue));
    handleCloseConfirm();
    handleClose();
  };

  // Handle Allowance
  const getListAllowance = async (id: string | number) => {
    setLoading(true);
    try {
      await dispatch(getAllowanceList(id));
    } finally {
      setLoading(false);
    }
  };
  // Handle Delete
  const handleDelete = async () => {
    await dispatch(deleteAllowance(values.allowanceCurrent));
    const employeeId = params.id;
    if (employeeId) {
      await dispatch(getEmployeeContract({ employeeId }));
    }
    handleCloseConfirm();
    handleClose();
  };

  // useEffect
  useEffect(() => {
    if (currentContract) {
      getListAllowance(currentContract);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentContract, openUpdate]);
  useEffect(() => {
    reset({
      allowanceCurrent: allowanceList[0]?.id,
      allowanceName: allowanceList[0]?.name,
      allowanceValue: allowanceList[0]?.value,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allowanceList]);

  return (
    <Dialog fullWidth maxWidth="sm" open={openUpdate} onClose={handleClose}>
      <FormProvider onSubmit={handleSubmit(onSubmit)} methods={methods}>
        <DialogTitle>{t('updateAllowance')}</DialogTitle>
        <DialogContent>
          {loading ? (
            <Box sx={{ textAlign: 'center' }}>
              <LoadingComponent loading={loading} />
            </Box>
          ) : (
            <Grid sx={{ pt: 1 }} container spacing={3}>
              <Grid item xs={12} sm={12} md={12}>
                <Typography sx={{ mb: 1 }} variant="overline">
                  {t('allowance')}
                </Typography>
                <RHFSelect
                  handleChange={handleChangeAllowance}
                  defaultValue={allowanceList[0].id}
                  shrink={false}
                  name="allowanceCurrent"
                  sx={{ width: '100%' }}
                  placeholder={t('allowance')}
                >
                  {allowanceList?.map((item) => {
                    return (
                      <MenuItem sx={{ p: 1 }} key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    );
                  })}
                </RHFSelect>
              </Grid>
              <Grid container spacing={2} item xs={12} sm={12} md={12}>
                <Grid item xs={12} sm={12} md={6}>
                  <RHFTextField name="allowanceName" label={t('allowanceName')} />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <RHFTextField name="allowanceValue" label={t('allowanceValue')} />
                </Grid>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined" color="inherit">
            {t('close')}
          </Button>
          <Button onClick={handleOpenConfirm} variant="contained" color="error">
            {t('delete')}
          </Button>
          <Button type="submit" variant="contained">
            {t('add')}
          </Button>
        </DialogActions>
      </FormProvider>
      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Delete"
        content={<>Are you sure want to delete this item?</>}
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDelete();
            }}
          >
            Delete
          </Button>
        }
      />
    </Dialog>
  );
};

export default UpdateAllowanceForm;
