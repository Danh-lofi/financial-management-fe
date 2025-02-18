import { useAuthContext } from 'auth/useAuthContext';
import moment from 'moment';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import FormProvider, { RHFTextField } from '@/components/hook-form';
import RHFDatePicker from '@/components/hook-form/RHFDatePicker';
import { useSettingsContext } from '@/components/settings';
import { useLocales } from '@/locales';
import { createSalaryBasic } from '@/redux/slices/dashboard/employee';
import { dispatch } from '@/redux/store';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

interface FormProps {
  fromDate: Date | string;
  toDate: Date | string;
  salaryBasic: number | string;
  allowance: number | string;
  updateBy?: number | string;
  createdBy?: number | string;
}
interface Props {
  openCreate: boolean;
  handleClose: any;
  getSalary?: any;
}

const CreateSalaryHistory = ({ openCreate, handleClose, getSalary }: Props) => {
  const { t } = useLocales();
  const theme = useTheme();
  const params = useParams();
  const { themeMode, onToggleMode } = useSettingsContext();
  const isDark = themeMode === 'dark';
  const { user } = useAuthContext();

  const defaultValues = {
    fromDate: new Date(),
    toDate: new Date(),
    salaryBasic: '',
    allowance: '',
    updateBy: '',
    createdBy: '',
  };

  const methods = useForm<FormProps>({
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

  useEffect(() => {}, []);

  const onSubmit = async (data: FormProps) => {
    const submitValues = {
      id: 0,
      employee_id: params.id,
      fromDate: data.fromDate ? moment(data.fromDate).format('YYYY-MM-DD') : null,
      toDate: data.toDate ? moment(data.toDate).format('YYYY-MM-DD') : null,
      salaryBasic: data.salaryBasic,
      allowance: data.allowance,
      updateBy: user?.employeeId,
      createdBy: user?.employeeId,
    };
    console.log(submitValues);
    await dispatch(createSalaryBasic(submitValues))
    getSalary(params.id)
    await handleClose()
    reset()
  };

  return (
    <Dialog fullWidth maxWidth="md" open={openCreate} onClose={handleClose}>
      <FormProvider onSubmit={handleSubmit(onSubmit)} methods={methods}>
        <DialogTitle sx={{ backgroundColor: '#f6fff8' }}>{t('addDependentPerson')}</DialogTitle>
        <DialogContent>
          <Grid sx={{ pt: 1 }} container spacing={3}>
            <Grid item xs={12} sm={12} md={6}>
              <RHFDatePicker name="fromDate" label={t('startDate')} />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <RHFDatePicker name="toDate" label={t('endDate')} />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <RHFTextField
                placeholderColor="#000"
                backgroundColor="#fff"
                inputColor="#000"
                // isRequired
                name="salaryBasic"
                label={t('salary')}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <RHFTextField
                placeholderColor="#000"
                backgroundColor="#fff"
                inputColor="#000"
                // isRequired
                name="allowance"
                label={t('position')}
              />
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

export default CreateSalaryHistory;
