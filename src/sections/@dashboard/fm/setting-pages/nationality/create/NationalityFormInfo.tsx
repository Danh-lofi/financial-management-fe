import { useState } from 'react';
import { RHFTextField } from '@/components/hook-form';
import { useLocales } from '@/locales';
import {
  Box,
  Card,
  Grid
} from '@mui/material';

type Props = {
  control: any;
};

const NationalityFormInfo = ({ control }: Props) => {
  const { t } = useLocales();
  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false);

  return (
    <Box>
      <Card sx={{ px: 3, py: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <RHFTextField
              name="nationalityId"
              isRequired
              label={t('nationalityId')}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <RHFTextField
              name="nationalityName"
              isRequired
              label={t('nationalityName')}
            />
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default NationalityFormInfo;
