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

const PositionFormInfo = ({ control }: Props) => {
  const { t } = useLocales();
  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false);

  return (
    <Box>
      <Card sx={{ px: 3, py: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <RHFTextField
              name="positionId"
              isRequired
              label={t('positionId')}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <RHFTextField
              name="positionName"
              isRequired
              label={t('positionName')}
            />
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default PositionFormInfo;
