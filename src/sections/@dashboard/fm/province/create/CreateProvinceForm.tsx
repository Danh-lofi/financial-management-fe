import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useLocales } from '@/locales';
import { createProvinceApi, getProvinceDetailApi, updateProvinceApi } from '@/redux/slices/dashboard/province';
import { dispatch, useSelector } from '@/redux/store';
import { ProvinceFormSchema } from '@/utils/schemas';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack } from '@mui/material';
import { IProvince } from '../../../../../@types/address';
import FormProvider from '../../../../../components/hook-form';
import { useSnackbar } from '../../../../../components/snackbar';
import { PATH_DASHBOARD } from '../../@/routes/paths';
import ProvinceFormInfo from './ProvinceFormInfo';

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
};

export default function CreateProvinceForm({ isEdit = false }: Props) {
  const navigate = useNavigate();
  const params = useParams()
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useLocales();
  const { provinceDetail } = useSelector((state) => state.province);
  const defaultValues = {
    provinceId: isEdit ? provinceDetail?.code : '',
    provinceName: isEdit ? provinceDetail?.name : '',
  };

  const methods = useForm<IProvince>({
    resolver: yupResolver(ProvinceFormSchema),
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
    if (isEdit && provinceDetail) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, provinceDetail]);

  const onSubmit = async (data: IProvince) => {
    const dataApi = {
      id: isEdit ? provinceDetail.id : 0,
      code: data.provinceId,
      name: data.provinceName,
    };

    if (!isEdit) {
      dispatch(
        createProvinceApi({
          data: dataApi,
          navigate: () => {
            navigate(PATH_DASHBOARD.fm.setting.province);
          },
        })
      );
    } else {
      dispatch(
        updateProvinceApi({
          data: dataApi,
          navigate: () => {
            navigate(PATH_DASHBOARD.fm.setting.province);
          },
        })
      );
    }
  };

  useEffect(()=> {
    if(params.id) {
      dispatch(getProvinceDetailApi(params.id))
    }
  }, [params.id])

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={24}>
          <ProvinceFormInfo control={control} />
          <Card sx={{ px: 3, py: 1, mt: 3 }}>
            <Stack alignItems="flex-end">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LoadingButton
                  onClick={() => navigate(PATH_DASHBOARD.fm.setting.province)}
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
