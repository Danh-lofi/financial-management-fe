import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import {
  createMedicalFacility,
  getMedicalFacilityDetail,
  updateMedicalFacility,
} from 'redux/slices/dashboard/medicalFacility';
import { getListProvinceApi } from 'redux/slices/dashboard/province';
import { dispatch, useSelector } from 'redux/store';
import { MedicalFacilityFormSchema } from 'utils/schemas';
import { useLocales } from '@/locales';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack } from '@mui/material';
import { IMedicalFacilityForm } from '../../../../../@types/medicalFacility';
import FormProvider from '../../../../../components/hook-form';
import { useSnackbar } from '../../../../../components/snackbar';
import { PATH_DASHBOARD } from '../../../../../routes/paths';
import MedicalFacilityFormInfo from './MedicalFacilityFormInfo';

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

export default function CreateMedicalFacilityForm({ isEdit = false, initValue }: Props) {
  const navigate = useNavigate();
  const params = useParams();
  const { medicalFacilityDetail } = useSelector((state) => state.medicalFacility);
  const { provinceList } = useSelector((state) => state.province);

  const { enqueueSnackbar } = useSnackbar();
  const { t } = useLocales();

  const defaultValues = {
    provinceId: '',
    medicalFacilityId: '',
    medicalFacilityName: '',
    priority: '',
  };

  const methods = useForm<IMedicalFacilityForm>({
    resolver: yupResolver(MedicalFacilityFormSchema),
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
    if (isEdit && medicalFacilityDetail) {
      reset({
        provinceId: medicalFacilityDetail?.province_id,
        medicalFacilityId: medicalFacilityDetail.id,
        medicalFacilityName: medicalFacilityDetail.name,
        priority: medicalFacilityDetail.priority,
      });
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, medicalFacilityDetail]);

  const onSubmit = async (data: IMedicalFacilityForm) => {
    const dataApi = {
      id: isEdit ? medicalFacilityDetail.id : 0,
      name: data.medicalFacilityName,
      code: data.medicalFacilityId,
      priority: data.priority,
      province_id: data.provinceId,
    };
    if (!isEdit) {
      dispatch(
        createMedicalFacility({
          data: dataApi,
          navigate: () => {
            navigate(PATH_DASHBOARD.hict.setting.medicalFacility);
          },
        })
      );
    } else {
      dispatch(
        updateMedicalFacility({
          data: dataApi,
          navigate: () => {
            navigate(PATH_DASHBOARD.hict.setting.medicalFacility);
          },
        })
      );
    }
  };

  const getMedicalDetail = async (id: any) => {
    await dispatch(
      getListProvinceApi({
        pageIndex: 1,
        pageSize: 100,
      })
    );
    await dispatch(getMedicalFacilityDetail(id));
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
      getMedicalDetail(params.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={24}>
          <MedicalFacilityFormInfo control={control} />
          <Card sx={{ px: 3, py: 1, mt: 3 }}>
            <Stack alignItems="flex-end">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LoadingButton
                  onClick={() => navigate(PATH_DASHBOARD.hict.setting.medicalFacility)}
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
