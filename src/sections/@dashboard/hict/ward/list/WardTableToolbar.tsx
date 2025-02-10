import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { getListProvinceApi } from 'redux/slices/dashboard/province';
import { dispatch, useSelector } from 'redux/store';
import { RHFSelect } from '@/components/hook-form';
import FormProvider from '@/components/hook-form/FormProvider';
import { GETALL_PROVINCE } from '@/constants/app.constants';
import { useLocales } from '@/locales';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { Button, Grid, InputAdornment, MenuItem, Stack, TextField } from '@mui/material';
import Iconify from '../../../../../components/iconify';

// ----------------------------------------------------------------------

type Props = {
  handleClick?: VoidFunction;
  filterName: string;
  onChangeProvince?: any;
  onChangeDistrict?:  any;
  onFilterName: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function WardTableToolbar({
  handleClick,
  filterName,
  onFilterName,
  onChangeProvince,
  onChangeDistrict,
}: Props) {
  const { provinceList } = useSelector((state) => state.province);
  const { districtList } = useSelector((state) => state.district);

  const { t } = useLocales();
  const methods = useForm<any>({
    defaultValues: {},
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = (data: any) => {
    console.log(data);
  };
 useEffect(()=>{
  dispatch(
    getListProvinceApi({
      pageIndex: GETALL_PROVINCE.PAGE_INDEX,
      pageSize: GETALL_PROVINCE.PAGE_SIZE,
    })
  );
 },[])
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2} sx={{ px: 2.5, py: 3 }}>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
          <RHFSelect
            handleChange={onChangeProvince}
            name="provinceId"
            label={t('province')}
            placeholder={t('provinceId')}
          >
            <MenuItem value=''>{t('none')}</MenuItem>
            {provinceList?.map((item, index) => (
              <MenuItem key={index} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </RHFSelect>
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
          <RHFSelect
            handleChange={onChangeDistrict}
            name="districtId"
            label={t('district')}
            placeholder={t('districtId')}
          >
            {districtList?.map((item, index) => (
              <MenuItem key={index} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </RHFSelect>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
          <TextField
            fullWidth
            value={filterName}
            onChange={onFilterName}
            placeholder={t('search') || 'Search...'}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
          <Button
            sx={{ flexShrink: 0,verticalAlign:'middle',p:2 }}
            type="button"
            onClick={handleClick}
            startIcon={<FilterAltOutlinedIcon />}
          >
            {t('apply')}
          </Button>
        </Grid>
      </Grid>
    </FormProvider>
    
  );
}


