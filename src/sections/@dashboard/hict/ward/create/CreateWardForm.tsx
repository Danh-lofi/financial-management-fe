import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { getListDistrictApi } from 'redux/slices/dashboard/district';
import { createWardApi, updateWardApi } from 'redux/slices/dashboard/ward';
import { dispatch, useSelector } from 'redux/store';
import { WardFormSchema } from 'utils/schemas';
import { GETALL_DISTRICT } from '@/constants/app.constants';
import { useLocales } from '@/locales';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack } from '@mui/material';
import { IWard } from '../../../../../@types/address';
import FormProvider from '../../../../../components/hook-form';
import { useSnackbar } from '../../../../../components/snackbar';
import { PATH_DASHBOARD } from '../../../../../routes/paths';
import WardFormInfo from './WardFormInfo';

// form


// @mui


// utils







// routes

// @types

// assets
// components




// ----------------------------------------------------------------------

type Props = {
  isEdit?: boolean;
  initValue?: any;
};

export default function CreateWardForm({ isEdit = false, initValue }: Props) {
  const navigate = useNavigate();
  const { wardDetail } = useSelector((state) => state.ward);
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useLocales();

  const defaultValues = {
    wardId: isEdit ? wardDetail.code : '',
    wardName: isEdit ? wardDetail.name : '',
  };

  const methods = useForm<IWard>({
    resolver: yupResolver(WardFormSchema),
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

  const onSubmit = async (data: IWard) => {
    const dataApi = {
      id: isEdit ? wardDetail.id : 0,
      code: data.wardId,
      name: data.wardName,
      district_id: Number(data.districtId),
    };
    if (!isEdit) {
      await dispatch(
        createWardApi({
          data: dataApi,
          navigate: () => navigate(PATH_DASHBOARD.hict.setting.ward),
        })
      );
    } else {
      await dispatch(
        updateWardApi({
          data: dataApi,
          navigate: () => navigate(PATH_DASHBOARD.hict.setting.ward),
        })
      );
    }
  };
  useEffect(() => {
    if (isEdit && wardDetail) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, wardDetail]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={24}>
          <WardFormInfo control={control} />
          <Card sx={{ px: 3, py: 1, mt: 3 }}>
            <Stack alignItems="flex-end">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LoadingButton
                  onClick={() => navigate(PATH_DASHBOARD.hict.setting.ward)}
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
