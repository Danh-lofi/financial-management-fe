import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { createProject, updateProject } from 'redux/slices/dashboard/project';
import { dispatch, useSelector } from 'redux/store';
import {
  EmployeeBankingInformationSchema,
  EmployeeContactInfoSchema,
  EmployeeIncomeTaxInformationSchema,
  EmployeeInsuranceInfoSchema,
  ProjectFormInfoSchema,
} from 'utils/schemas';
import * as Yup from 'yup';
import { useLocales } from '@/locales';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton, TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Card, Grid, Stack, Tab } from '@mui/material';
import { IProject } from '../../../../../../@types/project';
import FormProvider from '../../../../../../components/hook-form';
import { useSnackbar } from '../../../../../../components/snackbar';
import { CustomFile } from '../../../../../../components/upload';
import { PATH_DASHBOARD } from '../../../../../../routes/paths';
import ProjectFormInfo from './ProjectFormInfo';

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

export default function CreateProjectForm({ isEdit = false, initValue }: Props) {
  const navigate = useNavigate();
  const { projectDetail } = useSelector((state) => state.project);
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useLocales();

  const defaultValues = {
    projectId: isEdit ? projectDetail?.code : '',
    projectName: isEdit ? projectDetail?.name : '',
  };

  const methods = useForm<IProject>({
    resolver: yupResolver(ProjectFormInfoSchema),
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
    if (isEdit && projectDetail) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, projectDetail]);

  const onSubmit = async (data: IProject) => {
    const dataApi = {
      id: isEdit ? projectDetail.id : 0,
      code: data.projectId,
      name: data.projectName,
    };

    if (!isEdit) {
      dispatch(
        createProject({
          data: dataApi,
          navigate: () => {
            navigate(PATH_DASHBOARD.hict.setting.project);
          },
        })
      );
    } else {
      dispatch(
        updateProject({
          data: dataApi,
          navigate: () => {
            navigate(PATH_DASHBOARD.hict.setting.project);
          },
        })
      );
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={24}>
          <ProjectFormInfo control={control} />
          <Card sx={{ px: 3, py: 1, mt: 3 }}>
            <Stack alignItems="flex-end">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LoadingButton
                  onClick={() => navigate(PATH_DASHBOARD.hict.setting.project)}
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
