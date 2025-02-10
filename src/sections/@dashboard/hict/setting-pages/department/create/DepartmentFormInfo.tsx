import { Fragment, useState } from 'react';
import { RHFSelect, RHFTextField } from '@/components/hook-form';
import { useLocales } from '@/locales';
import { Feed } from '@mui/icons-material';
import {
  Box,
  Card,
  Drawer,
  Grid,
  IconButton,
  MenuItem,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';

type Props = {
  control: any;
};

const DepartmentFormInfo = ({ control }: Props) => {
  const { t } = useLocales();
  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false);

  return (
    <Box>
      <Card sx={{ px: 3, py: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <RHFTextField
              isRequired
              name="departmentId"
              label={t('departmentId')}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <RHFTextField
              name="departmentName"
              isRequired
              label={t('departmentName')}
            />
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default DepartmentFormInfo;
