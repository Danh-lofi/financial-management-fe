import { districtId, provinceId } from 'assets/data/employee-info-vi';
import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getListDistrictApi } from 'redux/slices/dashboard/district';
import { getListProvinceApi } from 'redux/slices/dashboard/province';
import { dispatch, useSelector } from 'redux/store';
import WardApi from '@/apis/ward.api';
import { RHFSelect, RHFTextField } from '@/components/hook-form';
import { GETALL_DISTRICT, GETALL_PROVINCE } from '@/constants/app.constants';
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

const WardFormInfo = ({ control }: Props) => {
  const { t } = useLocales();
  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false);
  const { districtList } = useSelector((state) => state.district);
  const { provinceList } = useSelector((state) => state.province);
  const params = useParams();



  return (
    <Box>
      <Card sx={{ px: 3, py: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <RHFTextField isRequired name="wardId" label={t('wardId')} />
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <RHFTextField isRequired name="wardName" label={t('wardName')} />
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default WardFormInfo;
