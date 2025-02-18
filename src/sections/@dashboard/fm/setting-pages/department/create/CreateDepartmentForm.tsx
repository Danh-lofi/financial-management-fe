import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useLocales } from '@/locales';
import { createDepartment, updateDepartment } from '@/redux/slices/dashboard/department';
import { dispatch, useSelector } from '@/redux/store';
import { PATH_DASHBOARD } from '@/routes/paths';
import { DepartmentFormInfoSchema } from '@/utils/schemas';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack } from '@mui/material';
import { IDepartment } from '../../../../../../@types/department';
import FormProvider from '../../../../../../components/hook-form';
import { useSnackbar } from '../../../../../../components/snackbar';
import DepartmentFormInfo from './DepartmentFormInfo';

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

export default function CreateDepartmentForm({ isEdit = false, initValue }: Props) {
  const navigate = useNavigate();
  const { departmentDetail } = useSelector((state) => state.department);
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useLocales();

  const defaultValues = {
    departmentId: isEdit ? departmentDetail?.code : '',
    departmentName: isEdit ? departmentDetail?.name : '',
  };

  const methods = useForm<IDepartment>({
    resolver: yupResolver(DepartmentFormInfoSchema),
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
    if (isEdit && departmentDetail) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, departmentDetail]);

  const onSubmit = async (data: IDepartment) => {
    const dataApi = {
      id: isEdit ? departmentDetail.id : 0,
      code: data.departmentId,
      name: data.departmentName,
    };

    if (!isEdit) {
      dispatch(
        createDepartment({
          data: dataApi,
          navigate: () => {
            navigate(PATH_DASHBOARD.fm.setting.department);
          },
        })
      );
    } else {
      dispatch(
        updateDepartment({
          data: dataApi,
          navigate: () => {
            navigate(PATH_DASHBOARD.fm.setting.department);
          },
        })
      );
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={24}>
          <DepartmentFormInfo control={control} />
          <Card sx={{ px: 3, py: 1, mt: 3 }}>
            <Stack alignItems="flex-end">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LoadingButton
                  onClick={() => navigate(PATH_DASHBOARD.fm.setting.department)}
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
