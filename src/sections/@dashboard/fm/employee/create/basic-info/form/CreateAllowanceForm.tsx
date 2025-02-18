import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import FormProvider, { RHFSelect } from '@/components/hook-form';
import { useLocales } from '@/locales';
import LoadingComponent from '@/pages/components/Loading';
import {
  assignAllowance,
  getAllowanceList,
  getEmployeeContract,
} from '@/redux/slices/dashboard/contract';
import { dispatch, useSelector } from '@/redux/store';
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
  openCreate: boolean;
  annex?: IDetailContract;
  projectId: string | number;
  handleClose: () => void;
}

const CreateAllowanceForm = ({ openCreate, annex, projectId, handleClose }: Props) => {
  // useSelector
  const { allowanceList } = useSelector((state) => state.contract);
  const { t } = useLocales();
  const params = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [selected, setSelected] = useState([]);
  const methods = useForm<assignAllowance>({
    defaultValues: {
      allowance1Id: 0,
      allowance2Id: 0,
      allowance3Id: 0,
      allowance4Id: 0,
      allowance5Id: 0,
    },
  });
  const {
    reset,
    watch,
    control,
    setValue,
    setError,
    handleSubmit,
    clearErrors,
    formState: { isSubmitting, errors },
  } = methods;

  const onSubmit = async (data: assignAllowance) => {
    if (!annex) return;
    const submitValue: assignAllowance = {
      ...data,
      contractId: annex.contract_id,
      contractDetailId: annex.id,
    };
    await dispatch(assignAllowance(submitValue));
    if (params.id) {
      await dispatch(getEmployeeContract({ employeeId: params.id, projectId }));
    }
    handleClose();
  };

  const getListAllowance = async (id: string | number) => {
    setLoading(true);
    try {
      await dispatch(getAllowanceList(id));
    } finally {
      setLoading(false);
    }
  };

  // useEffect
  useEffect(() => {
    if (annex) {
      getListAllowance(annex.contract_id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [annex]);

  useEffect(() => {
    if (!annex) return;
    reset({
      allowance1Id: annex.allowance1Id ?? 0,
      allowance2Id: annex.allowance2Id ?? 0,
      allowance3Id: annex.allowance3Id ?? 0,
      allowance4Id: annex.allowance4Id ?? 0,
      allowance5Id: annex.allowance5Id ?? 0,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allowanceList]);

  // useEffect
  useEffect(() => {
    if (annex) {
      reset();
      getListAllowance(annex.contract_id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [annex]);

  return (
    <Dialog fullWidth maxWidth="sm" open={openCreate} onClose={handleClose}>
      <FormProvider onSubmit={handleSubmit(onSubmit)} methods={methods}>
        <DialogTitle>{t('addAllowance')}</DialogTitle>
        <DialogContent>
          {loading ? (
            <Box sx={{ textAlign: 'center' }}>
              <LoadingComponent loading={loading} />
            </Box>
          ) : (
            <Grid sx={{ pt: 1 }} container spacing={3}>
              <Grid item xs={12} sm={12} md={12}>
                <Typography sx={{ mb: 1 }} variant="overline">
                  {t('allowance')} 1
                </Typography>
                <RHFSelect
                  defaultValue={0}
                  shrink={false}
                  name="allowance1Id"
                  sx={{ width: '100%' }}
                  placeholder={t('allowance')}
                >
                  <MenuItem sx={{ p: 1 }} value={0}>
                    {t('notAllowance')}
                  </MenuItem>
                  {allowanceList?.map((item) => {
                    return (
                      <MenuItem sx={{ p: 1 }} key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    );
                  })}
                </RHFSelect>
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <Typography sx={{ mb: 1 }} variant="overline">
                  {t('allowance')} 2
                </Typography>
                <RHFSelect
                  defaultValue={0}
                  shrink={false}
                  name="allowance2Id"
                  sx={{ width: '100%' }}
                  placeholder={t('allowance')}
                >
                  <MenuItem sx={{ p: 1 }} value={0}>
                    {t('notAllowance')}
                  </MenuItem>
                  {allowanceList?.map((item) => {
                    return (
                      <MenuItem sx={{ p: 1 }} key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    );
                  })}
                </RHFSelect>
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <Typography sx={{ mb: 1 }} variant="overline">
                  {t('allowance')} 3
                </Typography>
                <RHFSelect
                  defaultValue={0}
                  shrink={false}
                  name="allowance3Id"
                  sx={{ width: '100%' }}
                  placeholder={t('allowance')}
                >
                  <MenuItem sx={{ p: 1 }} value={0}>
                    {t('notAllowance')}
                  </MenuItem>
                  {allowanceList?.map((item) => {
                    return (
                      <MenuItem sx={{ p: 1 }} key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    );
                  })}
                </RHFSelect>
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <Typography sx={{ mb: 1 }} variant="overline">
                  {t('allowance')} 4
                </Typography>
                <RHFSelect
                  defaultValue={0}
                  shrink={false}
                  name="allowance4Id"
                  sx={{ width: '100%' }}
                  placeholder={t('allowance')}
                >
                  <MenuItem sx={{ p: 1 }} value={0}>
                    {t('notAllowance')}
                  </MenuItem>
                  {allowanceList?.map((item) => {
                    return (
                      <MenuItem sx={{ p: 1 }} key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    );
                  })}
                </RHFSelect>
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <Typography sx={{ mb: 1 }} variant="overline">
                  {t('allowance')} 5
                </Typography>
                <RHFSelect
                  defaultValue={0}
                  shrink={false}
                  name="allowance5Id"
                  sx={{ width: '100%' }}
                  placeholder={t('allowance')}
                >
                  <MenuItem sx={{ p: 1 }} value={0}>
                    {t('notAllowance')}
                  </MenuItem>
                  {allowanceList?.map((item) => {
                    return (
                      <MenuItem sx={{ p: 1 }} key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    );
                  })}
                </RHFSelect>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined" color="inherit">
            {t('close')}
          </Button>
          <Button type="submit" variant="contained">
            {t('add')}
          </Button>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
};

export default CreateAllowanceForm;
