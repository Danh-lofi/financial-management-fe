import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useLocales } from '@/locales';
import { createPosition, updatePosition } from '@/redux/slices/dashboard/position';
import { dispatch, useSelector } from '@/redux/store';
import { PATH_DASHBOARD } from '@/routes/paths';
import { DepartmentFormInfoSchema, PositionFormInfoSchema } from '@/utils/schemas';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton, TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Card, Grid, Stack, Tab } from '@mui/material';
import { IPosition } from '../../../../../../@types/position';
import FormProvider from '../../../../../../components/hook-form';
import { useSnackbar } from '../../../../../../components/snackbar';
import { CustomFile } from '../../../../../../components/upload';
import PositionFormInfo from './PositionFormInfo';

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

export default function CreatePositionForm({ isEdit = false, initValue }: Props) {
  const navigate = useNavigate();
  const { positionDetail } = useSelector((state) => state.position);
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useLocales();

  const defaultValues = {
    positionId: isEdit ? positionDetail?.code : '',
    positionName: isEdit ? positionDetail?.name : '',
  };

  const methods = useForm<IPosition>({
    resolver: yupResolver(PositionFormInfoSchema),
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
    if (isEdit && positionDetail) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, positionDetail]);

  const onSubmit = async (data: IPosition) => {
    const dataApi = {
      id: isEdit ? positionDetail.id : 0,
      code: data.positionId,
      name: data.positionName,
    };

    if (!isEdit) {
      dispatch(
        createPosition({
          data: dataApi,
          navigate: () => {
            navigate(PATH_DASHBOARD.fm.setting.position);
          },
        })
      );
    } else {
      dispatch(
        updatePosition({
          data: dataApi,
          navigate: () => {
            navigate(PATH_DASHBOARD.fm.setting.position);
          },
        })
      );
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={24}>
          <PositionFormInfo control={control} />
          <Card sx={{ px: 3, py: 1, mt: 3 }}>
            <Stack alignItems="flex-end">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LoadingButton
                  onClick={() => navigate(PATH_DASHBOARD.fm.setting.position)}
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
