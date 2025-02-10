import { format } from 'date-fns';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { useLocales } from '@/locales';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Card, Grid, MenuItem, Stack, Typography } from '@mui/material';
import AccountApi from '../../../../apis/account.api';
import { useAuthContext } from '../../../../auth/useAuthContext';
import FormProvider, {
  RHFDatePicker,
  RHFSelect,
  RHFTextField,
} from '../../../../components/hook-form';
import { useSnackbar } from '../../../../components/snackbar';
import { UploadAvatar } from '../../../../components/upload';
import { fData } from '../../../../utils/formatNumber';

// form



// @mui


// auth

// utils

// assets
// components






// ----------------------------------------------------------------------

const OPTIONS = [
  { value: 'ASSESS', label: 'Khách hàng' },
  { value: 'DRIVER', label: 'Tài xế' },
  { value: 'DRIVERHOST', label: 'Chủ nhà xe' },
];

type IFormValue = {
  userid: string;
  username: string;
  email: string;
  telphone: string;
  address: string;
  birthday: string;
  usergroupcode: string;
};

export default function AccountGeneral() {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useLocales();
  const { user, refresh } = useAuthContext();
  const [upload, setUpload] = useState<File>();

  const UpdateInfoSchema = Yup.object().shape({
    userid: Yup.string().required('Vui lòng không bỏ trống trường này'),
    username: Yup.string().required('Vui lòng không bỏ trống trường này'),
    email: Yup.string().required('Vui lòng không bỏ trống trường này').email('Email không hợp lệ'),
    telphone: Yup.string()
      .required('Vui lòng không bỏ trống trường này')
      .matches(/^0\d{9,11}$/, 'Số điện thoại không hợp lệ'),
    address: Yup.string().required('Vui lòng không bỏ trống trường này'),
    birthday: Yup.date().required('Vui lòng không bỏ trống trường này'),
    usergroupcode: Yup.string().required('Vui lòng không bỏ trống trường này'),
  });

  const methods = useForm<IFormValue>({
    resolver: yupResolver(UpdateInfoSchema),
    defaultValues: { ...user },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const handleDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];

    setUpload(file);
  }, []);

  const handleUploadProfile = useCallback(
    async (data: IFormValue) => {
      try {
        const res = await AccountApi.updateUserInfo({
          Email: data.email,
          Telphone: data.telphone,
          UserName: data.username,
          Address: data.address,
          BirthDay: new Date(data.birthday),
        });
        await refresh();
        enqueueSnackbar(res?.data?.message, {
          variant: res?.data?.success ? 'success' : 'warning',
        });
      } catch (error) {
        enqueueSnackbar(error?.response?.data.message, { variant: 'error' });
      }
    },
    [enqueueSnackbar, refresh]
  );

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Card sx={{ py: 10, px: 3, textAlign: 'center', height: '100%' }}>
          <div>
            <UploadAvatar
              file={upload && URL.createObjectURL(upload)}
              maxSize={3145728}
              onDrop={handleDrop}
              helperText={
                <Typography
                  variant="caption"
                  sx={{
                    mt: 2,
                    mx: 'auto',
                    display: 'block',
                    textAlign: 'center',
                    color: 'text.secondary',
                  }}
                >
                  Allowed *.jpeg, *.jpg, *.png, *.gif
                  <br /> max size of {fData(3145728)}
                </Typography>
              }
            />
          </div>
        </Card>
      </Grid>

      <Grid item xs={12} md={8}>
        <Card sx={{ p: 3 }}>
          <FormProvider methods={methods} onSubmit={handleSubmit(handleUploadProfile)}>
            <Grid item alignItems="start" xs={12} sm={12} md={12} xl={3} sx={{ mb: '16px' }}>
              <Typography fontWeight="700" fontSize={20}>
                Thông tin cá nhân
              </Typography>
            </Grid>
            <Stack spacing={2}>
              <Grid item>
                <RHFSelect
                  label={'Nhóm khách hàng'}
                  name="usergroupcode"
                  isRequired
                  disabled
                  backgroundColor="#e9ecef"
                  isLabel
                  size="small"
                >
                  {OPTIONS?.map((item, index) => (
                    <MenuItem key={index} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </RHFSelect>
              </Grid>
              <Grid item>
                <RHFTextField label={'Họ tên'} isLabel isRequired name="username" size="small" />
              </Grid>
              <Grid item>
                <RHFTextField label={'Email'} isLabel isRequired name="email" size="small" />
              </Grid>
              <Grid item>
                <RHFTextField
                  label={'Số điện thoại'}
                  isLabel
                  isRequired
                  name="telphone"
                  size="small"
                />
              </Grid>
              <Grid item>
                <RHFDatePicker
                  label={'Ngày sinh'}
                  isLabel
                  isRequired
                  name="birthday"
                  size="small"
                />
              </Grid>

              <Grid item>
                <RHFTextField label={'Địa chỉ'} isLabel isRequired name="address" size="small" />
              </Grid>

              <Grid container justifyContent="flex-end" direction="row">
                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                  {t('saveChanges')}
                </LoadingButton>
              </Grid>
            </Stack>
          </FormProvider>
        </Card>
      </Grid>
    </Grid>
  );
}
