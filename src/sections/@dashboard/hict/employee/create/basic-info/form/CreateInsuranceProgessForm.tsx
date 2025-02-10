import moment from 'moment';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import { createInsuranceProgress } from 'redux/slices/dashboard/employee';
import { getListPosition } from 'redux/slices/dashboard/position';
import { dispatch, useSelector } from 'redux/store';
import { EmployeeInsuranceProgress } from 'utils/schemas';
import FormProvider, { RHFDatePicker, RHFSelect, RHFTextField } from '@/components/hook-form';
import { useLocales } from '@/locales';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
} from '@mui/material';
import { IInsuranceProgress } from '../../../../../../../@types/employee';

interface Props {
  openCreate: boolean;
  handleClose: any;
  getInsurance: () => void;
}

const CreateInsuranceProgessForm = ({ openCreate, handleClose, getInsurance }: Props) => {
  const { t } = useLocales();
  const { positionList } = useSelector((state) => state.position);
  const params = useParams();
  // const { status } = useSelector((state) => state.objectType);
  const defaultValues = {
    fromDate: new Date(),
    toDate: new Date(),
    position: '',
    paymentRate: '',
    plan: '',
    profileNumber: '',
    note: '',
  };

  const methods = useForm<IInsuranceProgress>({
    resolver: yupResolver(EmployeeInsuranceProgress),
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

  // useEffect(() => {
  //   dispatch(
  //     getStatus({
  //       objectType: OBJECT_TYPE.insurance.insuranceStatus,
  //     })
  //   );
  // }, []);
  const onSubmit = async (data: IInsuranceProgress) => {
    const toDate = moment(data.toDate).format('YYYY-MM-DD');
    const fromDate = moment(data.fromDate).format('YYYY-MM-DD');
    const submitValues = {
      id: 0,
      ...data,
      employee_id: params.id,
      toDate,
      fromDate,
    };
    console.log(submitValues);
    await dispatch(createInsuranceProgress(submitValues));
    await handleClose();
    await getInsurance();
    await reset();
    // await dispatch(
    //   createInsuranceProgess({
    //     submitValues,
    //     getInsurance,
    //     handleClose,
    //     reset: () => reset(defaultValues),
    //   })
    // );
  };

  useEffect(() => {
    dispatch(
      getListPosition({
        pageIndex: 1,
        pageSize: 1000,
      })
    );
  }, []);

  return (
    <Dialog fullWidth maxWidth="md" open={openCreate} onClose={handleClose}>
      <FormProvider onSubmit={handleSubmit(onSubmit)} methods={methods}>
        <DialogTitle>{t('addProgessInsurance')}</DialogTitle>
        <DialogContent>
          <Grid sx={{ pt: 1 }} container spacing={3}>
            <Grid item xs={12} sm={12} md={6}>
              <RHFDatePicker isRequired label={t('startDate')} name="fromDate" />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <RHFDatePicker isRequired label={t('endDate')} name="toDate" />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <RHFSelect
                isRequired
                name="position"
                label={t('position')}
                placeholder={t('position')}
              >
                {positionList?.map((item, index) => (
                  <MenuItem key={index} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </RHFSelect>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <RHFTextField shrink={false} isRequired name="paymentRate" label={t('salary')} />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <RHFTextField shrink={false} name="plan" isRequired label={t('plan')} />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <RHFTextField
                shrink={false}
                name="profileNumber"
                isRequired
                label={t('documentNumber')}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <RHFTextField shrink={false} name="note" label={t('note')} />
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

export default CreateInsuranceProgessForm;
