import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  EmployeeBankingInformationSchema,
  EmployeeContactInfoSchema,
  EmployeeIncomeTaxInformationSchema,
  EmployeeInsuranceInfoSchema,
} from 'utils/schemas';
import * as Yup from 'yup';
import { useLocales } from '@/locales';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton, TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Card, Grid, Stack, Tab } from '@mui/material';
import FormProvider from '../../../../../../components/hook-form';
import { useSnackbar } from '../../../../../../components/snackbar';
import { CustomFile } from '../../../../../../components/upload';
import { PATH_DASHBOARD } from '../../../../../../routes/paths';
import PolicyEmployeeInfo from './PolicyEmployeeInfo';

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

const TAB_VALUES = {
  policy: 'Policy',
};

export default function CreatePolicyEmployeeForm({ isEdit = false, initValue }: Props) {
  const navigate = useNavigate();
  const [tab, setTab] = useState(TAB_VALUES.policy);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  const { enqueueSnackbar } = useSnackbar();
  const { t } = useLocales();

  const defaultValues = {
    
  }

 

  const methods = useForm<any>({
    // resolver: yupResolver(),
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
    if (isEdit && initValue) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, initValue]);

  const onSubmit = async (data: any) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
      navigate(PATH_DASHBOARD.user.list);
      console.log('DATA', data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={24}>
          <PolicyEmployeeInfo control={control} />
          <Card sx={{ px: 3, py: 1, mt: 3 }}>
            <Stack alignItems="flex-end">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LoadingButton
                  onClick={() => navigate(PATH_DASHBOARD.hict.setting.policyEmployee)}
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
