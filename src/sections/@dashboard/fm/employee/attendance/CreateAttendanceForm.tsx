import { useEffect, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useLocales } from '@/locales';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { MobileDateTimePicker, MobileTimePicker } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { IAttendance } from '../../../../../@types/attendance';
import FormProvider, { RHFSelect, RHFTextField } from '../../../../../components/hook-form';
import { useSnackbar } from '../../../../../components/snackbar';
import { CustomFile } from '../../../../../components/upload';
import { PATH_DASHBOARD } from '../../@/routes/paths';

// form






// @mui


// utils

// routes

// @types

// assets
// components




// ----------------------------------------------------------------------

interface FormValuesProps extends Omit<IAttendance, 'avatarUrl'> {
  avatarUrl: CustomFile | string | null;
}

type Props = {
  isEdit?: boolean;
  currentUser?: IAttendance;
};

const systemUsers = [
  {
    label: 'testing@gmail.com',
    value: 'testing@gmail.com',
  },
];

export default function CreateAttendanceForm({ isEdit = false, currentUser }: Props) {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();
  const { t } = useLocales();

  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required(t("validate.attendance.name")),
    description: Yup.string().required(t("validate.attendance.desc")),
    clock: Yup.string().required(t("validate.attendance.clock")),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentUser?.name || '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentUser]
  );

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (isEdit && currentUser) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentUser]);

  const onSubmit = async (data: FormValuesProps) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
      navigate(PATH_DASHBOARD.user.list);
      console.log('DATA', data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={24}>
          <Card sx={{ p: 3, mt: 3 }}>
            <Typography sx={{ mb: 2 }} variant="h6">
              {t('attendanceInfo')}
            </Typography>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(1, 1fr)',
              }}
            >
              <RHFTextField name="name" label={t('attendanceName')} />
              <RHFTextField name="description" label={t('attendanceDescription')} />
              <Controller
                name="clock"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <MobileDateTimePicker
                    label={t('clock')}
                    inputFormat="dd/MM/yyyy hh:mm:ss"
                    value={field.value}
                    onChange={(date) => field.onChange(date)}
                    renderInput={(params) => <TextField {...params} />}
                  />
                )}
              />
              <RHFSelect name="onBehalf" label={t('onBehalf')} placeholder={t('onBehalf')}>
                <MenuItem value="">{t('none')}</MenuItem>
                {systemUsers.map((item, index) => (
                  <MenuItem key={index} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </RHFSelect>
            </Box>
          </Card>

          <Card sx={{ px: 3, py: 1, mt: 3 }}>
            <Stack alignItems="flex-end">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LoadingButton
                  onClick={() => navigate(PATH_DASHBOARD.fm.employeeManagement.employeeStatus)}
                  type="submit"
                  variant="outlined"
                >
                  {t('back')}
                </LoadingButton>

                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                  {!isEdit ? t('create') : t('save')}
                </LoadingButton>
              </Box>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
