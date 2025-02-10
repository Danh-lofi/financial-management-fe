import { districtId, provinceId } from 'assets/data/employee-info-vi';
import { Fragment, useEffect, useState } from 'react';
import { getListProvinceApi } from 'redux/slices/dashboard/province';
import { dispatch, useSelector } from 'redux/store';
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

const DistrictFormInfo = ({ control }: Props) => {
  const { provinceList } = useSelector((state) => state.province);
  const { t } = useLocales();
  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false);
  return (
    <Box>
      <Card sx={{ px: 3, py: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={6}>
            <RHFSelect
              isRequired
              name="provinceId"
              label={t('provinceId')}
              placeholder={t('provinceId')}
            >
              {provinceList?.map((item, index) => (
                <MenuItem key={index} value={item.id}>
                  {item.name}
                </MenuItem>
              ))}
            </RHFSelect>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <RHFTextField isRequired name="districtId" label={t('districtId')} />
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <RHFTextField isRequired name="districtName" label={t('districtName')} />
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default DistrictFormInfo;
