import LoadingComponent from 'pages/components/Loading';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import {
  assignAllowance,
  getAllowanceList,
  getEmployeeContract,
} from 'redux/slices/dashboard/contract';
import { dispatch, useSelector } from 'redux/store';
import FormProvider, { RHFSelect } from '@/components/hook-form';
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
  Typography
} from '@mui/material';

export type addAllowance = {
  allowance: [];
};

interface Props {
  openCreate: boolean;
  handleClose: any;
  record: any;
  employeeId?: string | number;
  // getInsurance?: () => void;
}

const listAllowance = ['allowance1', 'allowance2', 'allowance3', 'allowance4', 'allowance5'];

const CreateAnnexForm = ({
  openCreate,
  handleClose,
  record,
  employeeId,
}: //  getInsurance
Props) => {
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
    const submitValue: assignAllowance = {
      ...data,
      contractId: record.row.contract_id,
      contractDetailId: record.row.id,
    };
    console.log(submitValue);
    await dispatch(assignAllowance(submitValue));
    if (employeeId) {
      await dispatch(getEmployeeContract({employeeId}));
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
    if (record) {
      getListAllowance(record.row.contract_id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [record]);

  useEffect(() => {
    reset({
      allowance1Id: record?.row.allowance1Id ?? 0,
      allowance2Id: record?.row.allowance2Id ?? 0,
      allowance3Id: record?.row.allowance3Id ?? 0,
      allowance4Id: record?.row.allowance4Id ?? 0,
      allowance5Id: record?.row.allowance5Id ?? 0,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allowanceList]);

  // useEffect
  useEffect(() => {
    if (record) {
      reset();
      getListAllowance(record.row.contract_id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [record]);

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

export default CreateAnnexForm;
