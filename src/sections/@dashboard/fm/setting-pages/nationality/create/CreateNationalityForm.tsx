import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useLocales } from '@/locales';
import { createNationality, updateNationality } from '@/redux/slices/dashboard/nationality';
import { dispatch, useSelector } from '@/redux/store';
import { PATH_DASHBOARD } from '@/routes/paths';
import { NationalityFormSchema } from '@/utils/schemas';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack } from '@mui/material';
import { INationalityForm } from '../../../../../../@types/nationality';
import FormProvider from '../../../../../../components/hook-form';
import { useSnackbar } from '../../../../../../components/snackbar';
import NationalityFormInfo from './NationalityFormInfo';

// form

// @mui



// utils





// routes

// @types


// assets
// components




// ----------------------------------------------------------------------

// interface FormValuesProps extends Omit<IEmployee, 'avatarUrl'> {
//   avatarUrl: CustomFile | string | null;
// }

type Props = {
  isEdit?: boolean;
  initValue?: any;
};

export default function CreateNationalityForm({ isEdit = false, initValue }: Props) {
  const navigate = useNavigate();
  const { nationalityDetail } = useSelector((state) => state.nationality);
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useLocales();

  const defaultValues = {
    nationalityId: isEdit ? nationalityDetail?.code : '',
    nationalityName: isEdit ? nationalityDetail?.name : '',
  };

  const methods = useForm<INationalityForm>({
    resolver: yupResolver(NationalityFormSchema),
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
    if (isEdit && nationalityDetail) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, nationalityDetail]);

  const onSubmit = async (data: INationalityForm) => {
    const dataApi = {
      id: isEdit ? nationalityDetail.id : 0,
      code: data.nationalityId,
      name: data.nationalityName,
    };
    if (!isEdit) {
      dispatch(
        createNationality({
          data: dataApi,
          navigate: () => {
            navigate(PATH_DASHBOARD.fm.setting.nationality);
          },
        })
      );
    } else {
      dispatch(
        updateNationality({
          data: dataApi,
          navigate: () => {
            navigate(PATH_DASHBOARD.fm.setting.nationality);
          },
        })
      );
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={24}>
          <NationalityFormInfo control={control} />
          <Card sx={{ px: 3, py: 1, mt: 3 }}>
            <Stack alignItems="flex-end">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LoadingButton
                  onClick={() => navigate(PATH_DASHBOARD.fm.setting.nationality)}
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
