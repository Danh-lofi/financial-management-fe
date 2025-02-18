import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useLocales } from '@/locales';
import { PATH_DASHBOARD } from '@/routes/paths';
import { DocumentFormInfoSchema } from '@/utils/schemas';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton, TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Card, Grid, Stack, Tab } from '@mui/material';
import { IDepartment, IDocument } from '../../../../../../@types/setting';
import FormProvider from '../../../../../../components/hook-form';
import { useSnackbar } from '../../../../../../components/snackbar';
import { CustomFile } from '../../../../../../components/upload';
import DocumentFormInfo from './DocumentFormInfo';

// form


// @mui



// utils



// routes

// @types

// assets
// components





// ----------------------------------------------------------------------

interface FormValuesProps extends Omit<IDocument, 'departmentMember'> {
  documentType: string;
}

type Props = {
  isEdit?: boolean;
  initValue?: any;
};

export default function CreateDocumentForm({ isEdit = false, initValue}: Props) {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();
  const { t } = useLocales();

  const defaultValues = {}

  const methods = useForm<IDocument>({
    resolver: yupResolver(DocumentFormInfoSchema),
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

  const onSubmit = async (data: IDocument) => {
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
          <DocumentFormInfo control={control} />
          <Card sx={{ px: 3, py: 1, mt: 3 }}>
            <Stack alignItems="flex-end">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LoadingButton
                  onClick={() => navigate(PATH_DASHBOARD.fm.setting.document)}
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
