import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useSelector } from 'redux/store';
import { ColorSinglePicker } from '@/components/color-utils';
import { RHFSelect, RHFTextField } from '@/components/hook-form';
import { PRIORITY } from '@/constants/app.constants';
import { useLocales } from '@/locales';
import { Box, Card, Grid, MenuItem, Typography } from '@mui/material';

type Props = {
  control: any;
};

const MedicalFacilityFormInfo = ({ control }: Props) => {
  const { t } = useLocales();
  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false);
  const { provinceList } = useSelector((state) => state.province);

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
                  {`${item.code} - ${item.name}`}
                </MenuItem>
              ))}
            </RHFSelect>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <RHFTextField isRequired name="medicalFacilityId" label={t('medicalFacilityId')} />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <RHFTextField
              isRequired
              name="medicalFacilityName"
              label={t('medicalFacilityNameList')}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <RHFSelect isRequired name="priority" label={t('priority')} placeholder={t('priority')}>
              {PRIORITY?.map((item: any, index: any) => {
                return (
                  <MenuItem className="priority" value={item.value} key={index}>
                    {/* <Typography
                      sx={{
                        width: '15px',
                        height: '15px',
                        borderRadius: '50%',
                        backgroundColor: 'rgb(255, 72, 66);',
                        mr: 1,
                      }}
                      component="span"
                    /> */}
                    {item.label}
                  </MenuItem>
                );
              })}
            </RHFSelect>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default MedicalFacilityFormInfo;
