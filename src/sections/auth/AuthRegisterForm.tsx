import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import * as Yup from 'yup';
import AccountApi from '@/apis/account.api';
import { PATH_AUTH } from '@/routes/paths';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Alert, IconButton, InputAdornment, MenuItem, Stack } from '@mui/material';
import FormProvider, { RHFSelect, RHFTextField } from '../../components/hook-form';
import Iconify from '../../components/iconify';
import SnakeBar from '../../utils/snackbar';

// @mui


// form





// components




// ----------------------------------------------------------------------

type FormValuesProps = {
  username: string;
  password: string;
  confirmPassword: string;
  name: string;
  phone?: string;
  email?: string;
  // ! for show alert after submit
  afterSubmit?: string;
};

const OPTIONS = [
  { value: 'ASSESS', label: 'Khách hàng' },
  { value: 'DRIVER', label: 'Tài xế' },
  { value: 'DRIVERHOST', label: 'Chủ nhà xe' },
];

export default function AuthRegisterForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    username: Yup.string().required('Vui lòng không bỏ trống trường này'),
    password: Yup.string().required('Vui lòng không bỏ trống trường này'),
    confirmPassword: Yup.string()
      .required('Vui lòng không bỏ trống trường này')
      .oneOf([Yup.ref('password')], 'Nhập lại mật khẩu không chính xác'),
    name: Yup.string().required('Vui lòng không bỏ trống trường này'),
    phone: Yup.string()
      .required('Vui lòng không bỏ trống trường này')
      .matches(/^0\d{9,11}$/, 'Số điện thoại không hợp lệ'),
    email: Yup.string().required('Vui lòng không bỏ trống trường này').email('Email không hợp lệ'),
  });

  const defaultValues = {
    username: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: '',
    email: '',
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
    mode: 'onChange',
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    try {
      await AccountApi.register(data);
      reset();
      SnakeBar.success('Đăng ký tài khoản thành công');
      navigate(PATH_AUTH.login);
    } catch (error) {
      console.error(error);
      setError('afterSubmit', {
        ...error,
        message: error.message || error,
      });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2.5}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField
            isRequired
            name="username"
            label="Tên đăng nhập"
            shrink={false}
            size="small"
          />
        </Stack>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField
            isRequired
            name="password"
            label="Mật khẩu"
            shrink={false}
            size="small"
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
          <RHFTextField
            isRequired
            name="confirmPassword"
            label="Nhập lại mật khẩu"
            shrink={false}
            size="small"
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
        </Stack>
        <RHFTextField isRequired name="name" label="Họ và tên" shrink={false} size="small" />
        <RHFTextField isRequired name="email" label="Email" shrink={false} size="small" />
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField
            isRequired
            name="phone"
            label="Số điện thoại"
            shrink={false}
            size="small"
          />
        </Stack>

        <LoadingButton
          fullWidth
          color="inherit"
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitSuccessful || isSubmitting}
          sx={{
            bgcolor: 'text.primary',
            color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
            '&:hover': {
              bgcolor: 'text.primary',
              color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
            },
          }}
        >
          Tạo tài khoản
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
