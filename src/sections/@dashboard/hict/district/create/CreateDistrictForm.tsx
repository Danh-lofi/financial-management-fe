import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import {
  createDistrictApi,
  getDistrictDetailApi,
  updateDistrictApi,
} from 'redux/slices/dashboard/district';
import { getListProvinceApi } from 'redux/slices/dashboard/province';
import { dispatch, useSelector } from 'redux/store';
import { DistrictFormSchema } from 'utils/schemas';
import { useLocales } from '@/locales';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack } from '@mui/material';
import { IDistrict } from '../../../../../@types/address';
import FormProvider from '../../../../../components/hook-form';
import { useSnackbar } from '../../../../../components/snackbar';
import { PATH_DASHBOARD } from '../../../../../routes/paths';
import DistrictFormInfo from './DistrictFormInfo';

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

export default function CreateDistrictForm({ isEdit = false, initValue }: Props) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const params = useParams();

  const { t } = useLocales();
  const { districtDetail } = useSelector((state) => state.district);
  const { provinceList } = useSelector((state) => state.province);

  const defaultValues = useMemo(
    () => ({
      provinceId:  districtDetail.province_id ??  '',
      districtId:  districtDetail.code ??  '',
      districtName:  districtDetail.name ??  '',
    }),

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [districtDetail]
  );

  const methods = useForm<IDistrict>({
    resolver: yupResolver(DistrictFormSchema),
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
    if (isEdit && districtDetail) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, districtDetail]);

  const onSubmit = async (data: IDistrict) => {
    const dataApi = {
      id: isEdit ? districtDetail.id : 0,
      code: data.districtId,
      name: data.districtName,
      province_id: data.provinceId,
    };

    if (!isEdit) {
      dispatch(
        createDistrictApi({
          data: dataApi,
          navigate: () => {
            navigate(PATH_DASHBOARD.hict.setting.district);
          },
        })
      );
    } else {
      dispatch(
        updateDistrictApi({
          data: dataApi,
          navigate: () => {
            navigate(PATH_DASHBOARD.hict.setting.district);
          },
        })
      );
    }
  };

  const getDistrictDetail = async (id: number | string) => {
    await dispatch(getDistrictDetailApi(id));
  };


  useEffect(() => {
    dispatch(
      getListProvinceApi({
        pageIndex: 1,
        pageSize: 100,
      })
    );
  }, []);

  useEffect(() => {
    if (params.id) {
      getDistrictDetail(params.id);
    }
  }, [params.id]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={24}>
          <DistrictFormInfo control={control} />
          <Card sx={{ px: 3, py: 1, mt: 3 }}>
            <Stack alignItems="flex-end">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LoadingButton
                  onClick={() => navigate(PATH_DASHBOARD.hict.setting.district)}
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
