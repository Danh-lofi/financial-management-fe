import { isAfter } from 'date-fns';
import moment from 'moment';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import FormProvider, { RHFDatePicker, RHFSelect, RHFTextField } from '@/components/hook-form';
import { OBJECT_TYPE } from '@/constants/app.constants';
import { useLocales } from '@/locales';
import { createInsuranceHistory } from '@/redux/slices/dashboard/employee';
import { getStatus } from '@/redux/slices/dashboard/objectType';
import { dispatch, useSelector } from '@/redux/store';
import { EmployeeInsuranceHistory, EmployeeInsuranceProgress } from '@/utils/schemas';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { IInsuranceHistory } from '../../../../../../../@types/employee';

interface Props {
  openCreate: boolean;
  handleClose: any;
  getInsurance: () => void;
}

const CreateReceiveHistoryForm = ({ openCreate, handleClose, getInsurance }: Props) => {
  const { t } = useLocales();
  const params = useParams();

  const defaultValues = {
    year: '',
    description: '',
    type: '',
    typeDetail: '',
    amount: '',
    account: '',
    fromDate: new Date(),
    toDate: new Date(),
    total: '',
    accum: '',
  };

  const methods = useForm<IInsuranceHistory>({
    resolver: yupResolver(EmployeeInsuranceHistory),
    defaultValues,
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
  const values = watch();

  // Get Date
  // const startDate = fromDate.getDate()
  // const endDate = toDate.getDate()

  const onSubmit = async (data: IInsuranceHistory) => {
    const fromDate = moment(data.fromDate).format('YYYY-MM-DD');
    const toDate = moment(data.toDate).format('YYYY-MM-DD');
    const year = moment(data.year).format('YYYY');
    const submitValue = {
      id: 0,
      ...data,
      employee_id: params.id,
      fromDate,
      toDate,
      year,
    };
    await dispatch(createInsuranceHistory(submitValue));
    await handleClose();
    await getInsurance();
    await reset();
  };

  return (
    <Dialog fullWidth maxWidth="md" open={openCreate} onClose={handleClose}>
      <FormProvider onSubmit={handleSubmit(onSubmit)} methods={methods}>
        <DialogTitle>{t('addReceiveHistory')}</DialogTitle>
        <DialogContent>
          <Grid sx={{ pt: 1 }} container spacing={3}>
            <Grid item xs={12} sm={12} md={6}>
              <RHFDatePicker isRequired name="year" label={t('year')} onlyYear />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <RHFTextField shrink={false} name="description" isRequired label={t('monthTurn')} />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <RHFTextField shrink={false} name="type" isRequired label={t('modeType')} />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <RHFTextField shrink={false} name="typeDetail" isRequired label={t('modeDetail')} />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <RHFTextField shrink={false} name="amount" isRequired label={t('amountReceive')} />
            </Grid>

            <Grid item xs={12} sm={12} md={6}>
              <RHFTextField
                isRequired
                shrink={false}
                name="account"
                label={t('subsidizedAccount')}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                {t('numberDateOffSubsidized')}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <RHFDatePicker isRequired name="fromDate" label={t('startDate')} />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <RHFDatePicker isRequired name="toDate" label={t('endDate')} />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <RHFTextField shrink={false} isRequired name="total" label={t('totalDate')} />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <RHFTextField shrink={false} isRequired name="accum" label={t('accumulatedYTD')} />
            </Grid>
          </Grid>
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

export default CreateReceiveHistoryForm;
