import { useForm } from 'react-hook-form';
import { RHFDatePicker, RHFMultiSelect, RHFSelect, RHFTextField } from '@/components/hook-form';
import FormProvider from '@/components/hook-form/FormProvider';
import {
  DEFAULT_PAGINATION,
  JOBMODE_OPTION,
  SIZE_FIELD,
  STATUS_ORDER_OPTION,
} from '@/constants/app.constants';
import { useLocales } from '@/locales';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Grid,
  MenuItem,
  Typography,
} from '@mui/material';
import Iconify from '../../../../../components/iconify';

// @mui


// components




// ----------------------------------------------------------------------

type Props = {
  setParams?: any;
  params?: any;
};

export default function OrderTableToolbar({ setParams, params }: Props) {
  const { t } = useLocales();

  const methods = useForm<any>({
    defaultValues: {
      JobModeCode: [],
      StartDate: new Date().toISOString(),
      EndDate: new Date().toISOString(),
    },
  });
  const {
    reset,
    watch,
    control,
    setError,
    handleSubmit,
    clearErrors,
    register,
    setValue,
    formState: { isSubmitting, errors },
  } = methods;

  const handleFilter = async (data: any) => {
    const paramsFilter = {
      ...params,
      ...data,
      pageIndex: DEFAULT_PAGINATION.PAGE_INDEX,
      pageSize: DEFAULT_PAGINATION.PAGE_SIZE,
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    (!paramsFilter.JobModeCode || paramsFilter.JobModeCode.length === 0) &&
      delete paramsFilter.JobModeCode;
    setParams(paramsFilter);
  };

  return (
    <Accordion defaultExpanded>
      <AccordionSummary expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}>
        <Typography variant="subtitle1">Lọc</Typography>
      </AccordionSummary>

      <AccordionDetails>
        <FormProvider methods={methods} onSubmit={handleSubmit(handleFilter)}>
          <Box sx={{ width: '100%', m: 2, textAlign: 'center' }}>
            <Grid container spacing={3} sx={{ width: '100%', alignItems: 'center' }}>
              <Grid item xs={12} sm={12} md={3}>
                <RHFDatePicker size={SIZE_FIELD.SMALL} label="Từ ngày" name="StartDate" />
              </Grid>
              <Grid item xs={12} sm={12} md={3}>
                <RHFDatePicker size={SIZE_FIELD.SMALL} label="Đến ngày" name="EndDate" />
              </Grid>

              <Grid item xs={12} sm={12} md={3}>
                <RHFTextField
                  size={SIZE_FIELD.SMALL}
                  name="keyword"
                  placeholder="PinCode"
                  // placeholder={t('keywordFilter')}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={3}>
                <RHFTextField
                  size={SIZE_FIELD.SMALL}
                  name="PinCode"
                  // label="Pincode"
                  placeholder="Số container"
                />
              </Grid>
              <Grid item xs={12} sm={12} md={3}>
                <RHFTextField
                  size={SIZE_FIELD.SMALL}
                  name="DriverNo"
                  // label="Pincode"
                  placeholder="Số xe"
                />
              </Grid>
              <Grid item xs={12} sm={12} md={3}>
                <RHFTextField
                  size={SIZE_FIELD.SMALL}
                  name="RemoocNo"
                  // label="Pincode"
                  placeholder="Số remooc"
                />
              </Grid>
              <Grid item xs={12} sm={12} md={3}>
                <RHFMultiSelect
                  chip
                  size="small"
                  checkbox
                  label=""
                  sx={{ width: '100%' }}
                  name="JobModeCode"
                  placeholder="Tác nghiệp"
                  options={JOBMODE_OPTION?.map((item) => {
                    return {
                      label: item?.label,
                      value: item?.value.toString(),
                    };
                  })}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={3}>
                <RHFSelect
                  size={SIZE_FIELD.SMALL}
                  name="OrderStatus"
                  label="Trạng thái"
                  placeholder={t('position')}
                >
                  <MenuItem value="">{t('none')}</MenuItem>
                  {STATUS_ORDER_OPTION?.map((item, index) => (
                    <MenuItem key={index} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </RHFSelect>
              </Grid>

              <Grid item xs={12} sm={12} md={12} textAlign="start">
                <Button
                  sx={{ flexShrink: 0, minWidth: { xs: '100%', md: 150 } }}
                  type="submit"
                  variant="contained"
                  startIcon={<FilterAltOutlinedIcon />}
                >
                  Áp dụng
                </Button>
              </Grid>
            </Grid>
          </Box>
        </FormProvider>
      </AccordionDetails>
    </Accordion>
  );
}
