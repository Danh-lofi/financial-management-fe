import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import AccountApi from '@/apis/account.api';
import { useLocales } from '@/locales';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Card, IconButton, InputAdornment, Stack } from '@mui/material';
import { IUserAccountChangePassword } from '../../../../@types/user';
import FormProvider, { RHFTextField } from '../../../../components/hook-form';
import Iconify from '../../../../components/iconify';
import { useSnackbar } from '../../../../components/snackbar';

// form



// @mui


// @types


// components




// ----------------------------------------------------------------------
type FormValuesProps = IUserAccountChangePassword;

export default function AccountChangePassword() {
  // const passwordReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&])(?=.{8,})/;
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useLocales();

  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    confirmNewPassword: false,
  });

  const togglePassword = (name: 'oldPassword' | 'newPassword' | 'confirmNewPassword') => {
    setShowPassword((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const ChangePassWordSchema = Yup.object().shape({
    oldPassword: Yup.string().required(t('validate.employee.oldPasswordRequired')),
    newPassword: Yup.string()
      .required(t('validate.employee.password'))
      // .matches(passwordReg, t('validate.employee.passwordInvalid'))
      .test(
        'no-match',
        t('validate.employee.newPasswordInvalid'),
        (value, { parent }) => value !== parent.oldPassword
      ),
    confirmNewPassword: Yup.string()
      .required(t('validate.employee.verifyPassword'))
      .oneOf([Yup.ref('newPassword')], t('validate.employee.verifyPasswordInvalid')),
  });

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(ChangePassWordSchema),
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = methods;

  const onSubmit = useCallback(
    async (data: FormValuesProps) => {
      try {
        const res = await AccountApi.changePassword({
          password: data.oldPassword,
          newpassword: data.newPassword,
          renewpassword: data.confirmNewPassword,
        });
        reset({
          oldPassword: '',
          newPassword: '',
          confirmNewPassword: '',
        });
        enqueueSnackbar(res?.data?.message, {
          variant: res?.data?.success ? 'success' : 'warning',
        });
      } catch (error) {
        enqueueSnackbar(error?.response?.data.message, { variant: 'error' });
      }
    },
    [enqueueSnackbar, reset]
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <Stack spacing={3} alignItems="flex-end" sx={{ p: 3 }}>
          <RHFTextField
            isLabel
            isRequired
            size="small"
            name="oldPassword"
            type={showPassword.oldPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => togglePassword('oldPassword')} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            label={t('oldPassword')}
          />

          <RHFTextField
            isLabel
            isRequired
            size="small"
            name="newPassword"
            type={showPassword.newPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => togglePassword('newPassword')} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            label={t('newPassword')}
          />

          <RHFTextField
            isLabel
            isRequired
            size="small"
            name="confirmNewPassword"
            type={showPassword.confirmNewPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => togglePassword('confirmNewPassword')} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            label={t('confirmNewPassword')}
          />

          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            {t('saveChanges')}
          </LoadingButton>
        </Stack>
      </Card>
    </FormProvider>
  );
}
