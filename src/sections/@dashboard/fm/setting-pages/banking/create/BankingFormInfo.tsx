import { useState } from 'react';
import { RHFSelect, RHFTextField } from '@/components/hook-form';
import { useLocales } from '@/locales';
import { useSelector } from '@/redux/store';
import { Box, Button, Card, Grid, MenuItem } from '@mui/material';

type Props = {
  methods?: any;
};

const BankingFormInfo = ({ methods }: Props) => {
  const { t } = useLocales();
  const { status } = useSelector((state) => state.objectType);

  return (
    <Box>
      <Card sx={{ px: 3, py: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <RHFTextField isRequired name="bankingId" label={t('bankingId')} />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <RHFTextField name="bankingName" isRequired label={t('bankingName')} />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <RHFSelect
              isRequired
              name="transferType"
              label={t('transferType')}
              placeholder={t('transferType')}
            >
              {status?.map((item, index) => (
                <MenuItem key={index} value={item.objectCode}>
                  {item.objectName}
                </MenuItem>
              ))}
            </RHFSelect>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default BankingFormInfo;
