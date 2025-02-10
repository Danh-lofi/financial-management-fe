import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { createDayoff, updateDayoff } from 'redux/slices/dashboard/dayoff';
import { dispatch, useSelector } from 'redux/store';
import { DayoffFormInfoSchema } from 'utils/schemas';
import { useLocales } from '@/locales';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack } from '@mui/material';
import { IDayoff } from '../../../../../../@types/dayoff';
import FormProvider from '../../../../../../components/hook-form';
import { useSnackbar } from '../../../../../../components/snackbar';
import { PATH_DASHBOARD } from '../../../../../../routes/paths';
import DayoffFormInfo from './DayoffFormInfo';

// ----------------------------------------------------------------------

type Props = {
  isEdit?: boolean;
  initValue?: any;
};

export default function CreateDayoffForm({ isEdit = false, initValue }: Props) {
  const navigate = useNavigate();
  const { dayoffDetail } = useSelector((state) => state.dayoff);
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useLocales();

  const defaultValues = {
    dayoffId: isEdit ? dayoffDetail?.code : '',
    dayoffName: isEdit ? dayoffDetail?.name : '',
  };

  const methods = useForm<IDayoff>({
    resolver: yupResolver(DayoffFormInfoSchema),
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
    if (isEdit && dayoffDetail) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, dayoffDetail]);

  const onSubmit = async (data: IDayoff) => {
    const dataApi = {
      id: isEdit ? dayoffDetail.id : 0,
      code: data.dayoffId,
      name: data.dayoffName,
    };

    if (!isEdit) {
      dispatch(
        createDayoff({
          data: dataApi,
          navigate: () => {
            navigate(PATH_DASHBOARD.hict.setting.dayoff);
          },
        })
      );
    } else {
      dispatch(
        updateDayoff({
          data: dataApi,
          navigate: () => {
            navigate(PATH_DASHBOARD.hict.setting.dayoff);
          },
        })
      );
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={24}>
          <DayoffFormInfo control={control} />
          <Card sx={{ px: 3, py: 1, mt: 3 }}>
            <Stack alignItems="flex-end">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LoadingButton
                  onClick={() => navigate(PATH_DASHBOARD.hict.setting.dayoff)}
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
