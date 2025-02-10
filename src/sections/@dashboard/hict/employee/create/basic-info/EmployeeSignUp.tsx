import CreateComponent from 'pages/components/CreateComponent';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import { registerAccount } from 'redux/slices/dashboard/employee';
import { dispatch, useSelector } from 'redux/store';
import { EmployeeSignUpSchema } from 'utils/schemas';
import { RHFSelect, RHFTextField } from '@/components/hook-form';
import FormProvider from '@/components/hook-form/FormProvider';
import Iconify from '@/components/iconify/Iconify';
import { useLocales } from '@/locales';
import { yupResolver } from '@hookform/resolvers/yup';
import { Card, Grid, IconButton, InputAdornment, InputLabel, MenuItem } from '@mui/material';
import { EmployeeForm, IEmployeeSignUp } from '../../../../../../@types/employee';
import { useSettingsContext } from '../../../../../../components/settings';
import { PAYCHECKS, SIZE_FIELD, textColor } from '../../../../../../constants/app.constants';
import Snake from '../../../../../../utils/snackbar';

type Props = {
  isEdit?: boolean;
  currentUser?: EmployeeForm;
};

const EmployeeSignUp = ({ isEdit = false, currentUser }: Props) => {
  const { t } = useLocales();
  // store
  const { employeeDetails } = useSelector((state) => state.employee);
  const { themeMode } = useSettingsContext();
  const isDark = themeMode === 'dark';

  // params
  const params = useParams();

  // state
  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  //

  const methods = useForm<IAccount>({
    resolver: yupResolver(EmployeeSignUpSchema),
    defaultValues: {
      employeeId: Number(params.id) ?? 0,
      fullName: employeeDetails?.fullName ?? '',
      email: '',
      userName: '',
      password: '',
      confirmPassword: '',
    },
  });
  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  const onSubmit = async (data: IEmployeeSignUp) => {
    if (!params.id) {
      Snake.error(t('employeeIdRequired'));
      return;
    }
    const submitData = {
      ...data,
      employeeId: Number(params.id),
    };
    dispatch(registerAccount(submitData));
  };

  useEffect(() => {
    const { fullName, email, g_id } = employeeDetails;
    reset({
      employeeId: Number(params.id) ?? 0,
      fullName: fullName ?? '',
      email: email ?? '',
      userName: g_id ?? '',
    });
  }, [employeeDetails, params, reset]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Card sx={{ px: 3, py: 3 }}>
        <Grid container spacing={3}>
          <Grid
            container
            alignItems="center"
            spacing={1}
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
          >
            <Grid item xs={12} sm={12} md={12} lg={2} xl={2}>
              <InputLabel
                sx={{
                  color: isDark ? textColor.white : textColor.black,
                }}
              >
                {t('name')}
                <span className="required">*</span>
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={12} md={10} lg={10} xl={10}>
              <RHFTextField name="fullName" label="" size={SIZE_FIELD.SMALL} disabled />
            </Grid>
          </Grid>

          <Grid
            container
            alignItems="center"
            spacing={1}
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
          >
            <Grid item xs={12} sm={12} md={12} lg={2} xl={2}>
              <InputLabel
                sx={{
                  color: isDark ? textColor.white : textColor.black,
                }}
              >
                {t('email')}
                <span className="required">*</span>
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={12} md={10} lg={10} xl={10}>
              <RHFTextField disabled name="email" label="" size={SIZE_FIELD.SMALL} />
            </Grid>
          </Grid>

          <Grid
            container
            alignItems="center"
            spacing={1}
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
          >
            <Grid item xs={12} sm={12} md={12} lg={2} xl={2}>
              <InputLabel
                sx={{
                  color: isDark ? textColor.white : textColor.black,
                }}
              >
                {t('username')}
                <span className="required">*</span>
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={12} md={10} lg={10} xl={10}>
              <RHFTextField disabled name="userName" label="" size={SIZE_FIELD.SMALL} />
            </Grid>
          </Grid>

          <Grid
            container
            alignItems="center"
            spacing={1}
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
          >
            <Grid item xs={12} sm={12} md={12} lg={2} xl={2}>
              <InputLabel
                sx={{
                  color: isDark ? textColor.white : textColor.black,
                }}
              >
                {t('password')}
                <span className="required">*</span>
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={12} md={10} lg={10} xl={10}>
              <RHFTextField
                isRequired
                name="password"
                label=""
                size={SIZE_FIELD.SMALL}
                type={showPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>

          <Grid
            container
            alignItems="center"
            spacing={1}
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
          >
            <Grid item xs={12} sm={12} md={12} lg={2} xl={2}>
              <InputLabel
                sx={{
                  color: isDark ? textColor.white : textColor.black,
                }}
              >
                {t('verifyPassword')}
                <span className="required">*</span>
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={12} md={10} lg={10} xl={10}>
              <RHFTextField
                isRequired
                name="confirmPassword"
                label=""
                size={SIZE_FIELD.SMALL}
                type={showConfirmPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        edge="end"
                      >
                        <Iconify icon={showConfirmPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>

          <Grid
            container
            alignItems="center"
            spacing={1}
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
          >
            <Grid item xs={12} sm={12} md={12} lg={2} xl={2}>
              <InputLabel
                sx={{
                  color: isDark ? textColor.white : textColor.black,
                }}
              >
                {t('selectPaycheck')}
                <span className="required">*</span>
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={12} md={10} lg={10} xl={10}>
              <RHFSelect
                isRequired
                name="paycheckId"
                label={t('')}
                placeholder={t('paycheck')}
                size={SIZE_FIELD.SMALL}
              >
                {PAYCHECKS?.map((item, index) => (
                  <MenuItem key={index} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </RHFSelect>
            </Grid>
          </Grid>
        </Grid>
      </Card>
      <CreateComponent isEdit={isEdit} isSubmitting={isSubmitting} />
    </FormProvider>
  );
};

export default EmployeeSignUp;
