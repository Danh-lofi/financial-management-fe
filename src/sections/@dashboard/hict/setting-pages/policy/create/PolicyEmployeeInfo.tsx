import { Controller } from 'react-hook-form';
import { RHFSelect, RHFTextField, RHFUpload, RHFUploadBox } from '@/components/hook-form';
import Iconify from '@/components/iconify/Iconify';
import { useLocales } from '@/locales';
import { Box, Button, Card, Grid, IconButton, MenuItem, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { genderList, maritalStatus } from '../../../../../../assets/data';
import {
  districtVN,
  educationVN,
  ethnicGroup,
  identifyList,
  placeOfIssueList,
  provinceVN,
  religionVN,
  wardVN,
} from '../../../../../../assets/data/employee-info-vi';

type Props = {
  control: any;
};

const PolicyEmployeeInfo = ({ control }: Props) => {
  const { t } = useLocales();

  return (
    <Box>
      <Card sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <RHFTextField name="codeOfPolicyList" label={t('codeOfPolicyList')} />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <RHFTextField name="nameOfBudgetExpenseList" label={t('nameOfBudgetExpenseList')} />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <RHFTextField name="quantity" label={t('quantity')} />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <RHFTextField name="fromLevel" label={t('fromLevel')} />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <RHFTextField name="toLevel" label={t('toLevel')} />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Controller
              name="effectiveDate"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <DatePicker
                  label={t('effectiveDate')}
                  value={field.value}
                  onChange={(date) => field.onChange(date)}
                  renderInput={(params) => <TextField fullWidth {...params} />}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <RHFTextField name="applicableTo" label={t('applicableTo')} />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <RHFTextField name="legalAcceptable" label={t('legalAcceptable')} />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <RHFTextField name="industry" label={t('industry')} />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <RHFTextField name="region" label={t('region')} />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <RHFTextField name="department" label={t('department')} />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <RHFTextField name="level" label={t('level')} />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <RHFTextField name="positionPolicy" label={t('positionPolicy')} />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <RHFTextField name="employeeId" label={t('employeeId')} />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <RHFTextField name="employeeName" label={t('employeeName')} />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <RHFTextField name="phoneNumber" label={t('phoneNumber')} />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <RHFTextField name="purpose" label={t('purpose')} />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <RHFTextField name="idCard" label={t('idCard')} />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <RHFTextField name="numberOfDaysOccurrences" label={t('numberOfDaysOccurrences')} />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <RHFTextField name="" disabled sx={{ opacity: 0, cursor: 'context-menu' }} />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Controller
              name="scheduleFromDate"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <DatePicker
                  label={t('scheduleFromDate')}
                  value={field.value}
                  onChange={(date) => field.onChange(date)}
                  renderInput={(params) => <TextField fullWidth {...params} />}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Controller
              name="scheduleToDate"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <DatePicker
                  label={t('scheduleToDate')}
                  value={field.value}
                  onChange={(date) => field.onChange(date)}
                  renderInput={(params) => <TextField fullWidth {...params} />}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Controller
              name="advancePaymentDate"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <DatePicker
                  label={t('advancePaymentDate')}
                  value={field.value}
                  onChange={(date) => field.onChange(date)}
                  renderInput={(params) => <TextField fullWidth {...params} />}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Controller
              name="refundDate"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <DatePicker
                  label={t('refundDate')}
                  value={field.value}
                  onChange={(date) => field.onChange(date)}
                  renderInput={(params) => <TextField fullWidth {...params} />}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <RHFTextField name="additionalExplanation" label={t('additionalExplanation')} />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Button sx={{ maxWidth: 200 }} component="label" variant="outlined">
              <input hidden accept="image/*" type="file" />
              <Iconify sx={{ mr: 1 }} icon="eva:cloud-upload-fill" />
              {t('uploadedDocuments')}
            </Button>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default PolicyEmployeeInfo;
