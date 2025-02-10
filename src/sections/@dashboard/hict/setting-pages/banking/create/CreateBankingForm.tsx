import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { createBanking, getBankingDetail, updateBanking } from 'redux/slices/dashboard/banking';
import { getStatus } from 'redux/slices/dashboard/objectType';
import { dispatch, useSelector } from 'redux/store';
import { BankingFormSchema } from 'utils/schemas';
import ObjectType from '@/apis/objecType.api';
import { OBJECT_TYPE } from '@/constants/app.constants';
import { useLocales } from '@/locales';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Card, Grid, Stack } from '@mui/material';
import { IBankingForm } from '../../../../../../@types/banking';
import FormProvider from '../../../../../../components/hook-form';
import { useSnackbar } from '../../../../../../components/snackbar';
import { PATH_DASHBOARD } from '../../../../../../routes/paths';
import BankingFormInfo from './BankingFormInfo';

// ----------------------------------------------------------------------

type Props = {
  isEdit?: boolean;
  initValue?: any;
};

export default function CreateBankingForm({ isEdit = false, initValue }: Props) {
  const navigate = useNavigate();
  const params = useParams();
  const { bankingDetail } = useSelector((state) => state.banking);
  const { enqueueSnackbar } = useSnackbar();
  const { status } = useSelector((state) => state.objectType);
  const { t } = useLocales();

  const defaultValues = {
    bankingId: '',
    bankingName: '',
    transferType: '',
  };

  const methods = useForm<IBankingForm>({
    resolver: yupResolver(BankingFormSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  useEffect(() => {
    if (isEdit && bankingDetail) {
      reset({
        bankingId: bankingDetail.id,
        bankingName: bankingDetail.name,
        transferType: bankingDetail.transferType,
      });
    }
    if (!isEdit) {
      reset(defaultValues);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, bankingDetail]);

  const onSubmit = async (data: IBankingForm) => {
    const dataApi = {
      id: isEdit ? bankingDetail.id : 0,
      banking_id: data.bankingId,
      name: data.bankingName,
      transferType: data.transferType,
    };
    if (isEdit) {
      dispatch(
        createBanking({
          data: dataApi,
          navigate: () => {
            navigate(PATH_DASHBOARD.hict.setting.banking);
          },
        })
      );
    } else {
      dispatch(
        updateBanking({
          data: dataApi,
          navigate: () => {
            navigate(PATH_DASHBOARD.hict.setting.banking);
          },
        })
      );
    }
  };

  const getDetailBank = async (id: any) => {
    await dispatch(
      getStatus({
        objectType: OBJECT_TYPE.bank.bankStatus,
      })
    );
    await dispatch(getBankingDetail(params.id));
  };

  useEffect(() => {
    dispatch(
      getStatus({
        objectType: OBJECT_TYPE.bank.bankStatus,
      })
    );
  }, []);

  useEffect(() => {
    if (params.id) {
      getDetailBank(params.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={24}>
          <BankingFormInfo methods={methods} />
          <Card sx={{ px: 3, py: 1, mt: 3 }}>
            <Stack alignItems="flex-end">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LoadingButton
                  onClick={() => navigate(PATH_DASHBOARD.hict.setting.banking)}
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
