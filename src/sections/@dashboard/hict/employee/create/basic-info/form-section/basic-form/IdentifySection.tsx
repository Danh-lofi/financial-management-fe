import { UploadIllustration } from 'assets/illustrations';
import React, { useCallback, useEffect, useMemo } from 'react';
import { Controller } from 'react-hook-form';
import { RHFTextField, RHFUpload } from '@/components/hook-form';
import { useSettingsContext } from '@/components/settings';
import { useLocales } from '@/locales';
import { Box, Card, Grid, InputLabel, Radio, TextField, Typography, useTheme } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import {
  SIZE_FIELD,
  STYLE_CONSTANTS,
  TYPE_OF_INDENTITY_CARD,
  backgroundColor,
  textColor,
} from '../../../../../../../../constants/app.constants';

type Props = {
  setValue?: any;
  control?: any;
  clearErrors?: any;
  typeOfIdentityCard?: string;
};

const IdentifySection = ({ setValue, control, typeOfIdentityCard, clearErrors }: Props) => {
  const theme = useTheme();
  const { themeMode } = useSettingsContext();
  const isDark = themeMode === 'dark';
  const PRIMARY_MAIN = theme.palette.primary;
  const [selectedValue, setSelectedValue] = React.useState(typeOfIdentityCard);
  const isIdentityNumber = selectedValue === TYPE_OF_INDENTITY_CARD.IDENTITY_NUMBER;
  const isIdentityCard = selectedValue === TYPE_OF_INDENTITY_CARD.IDENTITY_CARD;
  const isCitizen = selectedValue === TYPE_OF_INDENTITY_CARD.CITIZEN_IDENTIFICATION;
  const isPassport = selectedValue === TYPE_OF_INDENTITY_CARD.PASSPORT;

  const { t } = useLocales();

  const handleChange = (value: string) => {
    setSelectedValue(value);
    setValue('typeOfIdentityCard', value, { shouldValidate: true });
    // setValue('identityCard', '');
    // setValue('oldIdentityCard', '');
    clearErrors('identityCard');
  };

  const handleUploadFrontIdentify = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });
      if (newFile) {
        setValue('identityFront_url', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );
  const handleUploadBackIdentify = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });
      if (newFile) {
        setValue('identityBack_url', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  useEffect(() => {
    setSelectedValue(typeOfIdentityCard);
  }, [typeOfIdentityCard]);

  const checkIdentify = () => {
    if (selectedValue === TYPE_OF_INDENTITY_CARD.IDENTITY_CARD) {
      return 'identityCard';
    }
    if (selectedValue === TYPE_OF_INDENTITY_CARD.CITIZEN_IDENTIFICATION) {
      return 'oldIdentityCard';
    }
    return '';
  };

  return (
    <Box>
      <Card sx={{ paddingInline: 3, paddingBlock: 5, mt: 4, backgroundColor: `${PRIMARY_MAIN}` }}>
        <Grid container spacing={4}>
          <Grid container alignItems="center" spacing={2} item xl={12}>
            <Grid container alignItems="center" item xs={12} md={12} xl={2}>
              <Radio
                size={SIZE_FIELD.SMALL}
                checked={isCitizen}
                onChange={(e) => handleChange(e.target.value)}
                value={TYPE_OF_INDENTITY_CARD.CITIZEN_IDENTIFICATION}
                name="typeOfIdentityCard"
                inputProps={{ 'aria-label': 'A' }}
              />
              <InputLabel
                sx={{
                  color: isDark ? textColor.white : textColor.black,
                  fontSize: '1rem',
                  cursor: 'pointer',
                }}
                onClick={() => handleChange(TYPE_OF_INDENTITY_CARD.CITIZEN_IDENTIFICATION)}
              >
                {t('CCCD')}
              </InputLabel>
            </Grid>
            <Grid item xs={12} md={12} xl={3}>
              {/* required max length 12 */}
              <RHFTextField
                placeholderColor={isCitizen ? '#333' : '#CED8DD'}
                backgroundColor="#fff"
                inputColor="#000"
                name={isCitizen ? 'identityCard' : ''}
                size={SIZE_FIELD.SMALL}
                label={t('code')}
                shrink={false}
                disabled={selectedValue !== TYPE_OF_INDENTITY_CARD.CITIZEN_IDENTIFICATION}
                // onChange={(e) => validateIdentityCitizenHandle(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={12} xl={3}>
              <Controller
                name={isCitizen ? 'dateOfIssue' : ''}
                control={control}
                rules={{ required: true }}
                render={({ field, fieldState: { error } }) => (
                  <DatePicker
                    label={t('dateOfIssue')}
                    value={field.value}
                    maxDate={new Date()}
                    onChange={(date) => {
                      field.onChange(date);
                    }}
                    disabled={selectedValue !== TYPE_OF_INDENTITY_CARD.CITIZEN_IDENTIFICATION}
                    renderInput={(rest) => (
                      <TextField
                        InputLabelProps={{
                          sx: {
                            color: isDark ? textColor.white : textColor.black,
                          },
                        }}
                        sx={{
                          borderRadius: '10px',
                          backgroundColor: () => {
                            return isDark ? theme.palette.mode : backgroundColor.white;
                          },
                        }}
                        fullWidth
                        {...rest}
                        error={!!error}
                        helperText={error?.message}
                        size={SIZE_FIELD.SMALL}
                        disabled={selectedValue !== TYPE_OF_INDENTITY_CARD.CITIZEN_IDENTIFICATION}
                      />
                    )}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={12} xl={4}>
              <RHFTextField
                placeholderColor={isCitizen ? '#333' : '#CED8DD'}
                backgroundColor="#fff"
                inputColor="#000"
                name={isCitizen ? 'placeOfIssue' : ''}
                size={SIZE_FIELD.SMALL}
                label={t('placeOfIssue')}
                disabled={selectedValue !== TYPE_OF_INDENTITY_CARD.CITIZEN_IDENTIFICATION}
                shrink={false}
              />
            </Grid>
          </Grid>
          <Grid container alignItems="center" spacing={2} item xl={12}>
            <Grid container alignItems="center" item xs={12} md={12} xl={2}>
              <Radio
                size={SIZE_FIELD.SMALL}
                checked={isIdentityCard}
                onChange={(e) => handleChange(e.target.value)}
                value={TYPE_OF_INDENTITY_CARD.IDENTITY_CARD}
                name="typeOfIdentityCard"
                inputProps={{ 'aria-label': 'A' }}
              />
              <InputLabel
                sx={{
                  color: isDark ? textColor.white : textColor.black,
                  fontSize: '1rem',
                  cursor: 'pointer',
                }}
                onClick={() => handleChange(TYPE_OF_INDENTITY_CARD.IDENTITY_CARD)}
              >
                {t('CMND')}
              </InputLabel>
            </Grid>
            <Grid item xs={12} md={12} xl={3}>
              {/*  required max length 9 */}
              <RHFTextField
                placeholderColor={isIdentityCard ? '#333' : '#CED8DD'}
                backgroundColor="#fff"
                inputColor="#000"
                name={checkIdentify()}
                size={SIZE_FIELD.SMALL}
                label={t('code')}
                disabled={
                  selectedValue !== TYPE_OF_INDENTITY_CARD.IDENTITY_CARD &&
                  selectedValue !== TYPE_OF_INDENTITY_CARD.CITIZEN_IDENTIFICATION
                }
                shrink={false}
                // onChange={(e) => validateIdentityCardHandle(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={12} xl={3}>
              <Controller
                name={isIdentityCard ? 'dateOfIssue' : ''}
                control={control}
                rules={{ required: true }}
                render={({ field, fieldState: { error } }) => (
                  <DatePicker
                    label={t('dateOfIssue')}
                    value={field.value}
                    maxDate={new Date()}
                    onChange={(date) => {
                      field.onChange(date);
                    }}
                    disabled={selectedValue !== TYPE_OF_INDENTITY_CARD.IDENTITY_CARD}
                    renderInput={(rest) => (
                      <TextField
                        InputLabelProps={{
                          sx: {
                            color: isDark ? textColor.white : textColor.black,
                          },
                        }}
                        sx={{
                          borderRadius: '10px',
                          backgroundColor: () => {
                            return isDark ? theme.palette.mode : backgroundColor.white;
                          },
                        }}
                        fullWidth
                        {...rest}
                        error={!!error}
                        helperText={error?.message}
                        size={SIZE_FIELD.SMALL}
                        disabled={selectedValue !== TYPE_OF_INDENTITY_CARD.IDENTITY_CARD}
                      />
                    )}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={12} xl={4}>
              <RHFTextField
                placeholderColor={isIdentityCard ? '#333' : '#CED8DD'}
                backgroundColor="#fff"
                inputColor="#000"
                name={isIdentityCard ? 'placeOfIssue' : ''}
                size={SIZE_FIELD.SMALL}
                label={t('placeOfIssue')}
                disabled={selectedValue !== TYPE_OF_INDENTITY_CARD.IDENTITY_CARD}
                shrink={false}
              />
            </Grid>
          </Grid>

          <Grid container alignItems="center" spacing={2} item xl={12}>
            <Grid container alignItems="center" item xs={12} md={12} xl={2}>
              <Radio
                size={SIZE_FIELD.SMALL}
                checked={isPassport}
                onChange={(e) => handleChange(e.target.value)}
                value={TYPE_OF_INDENTITY_CARD.PASSPORT}
                name="typeOfIdentityCard"
                inputProps={{ 'aria-label': 'A' }}
              />
              <InputLabel
                sx={{
                  color: isDark ? textColor.white : textColor.black,
                  fontSize: '1rem',
                  cursor: 'pointer',
                }}
                onClick={() => handleChange(TYPE_OF_INDENTITY_CARD.PASSPORT)}
              >
                {t('passport')}
              </InputLabel>
            </Grid>
            <Grid item xs={12} md={12} xl={3}>
              <RHFTextField
                placeholderColor={isPassport ? '#333' : '#CED8DD'}
                backgroundColor="#fff"
                inputColor="#000"
                name={isPassport ? 'identityCard' : ''}
                size={SIZE_FIELD.SMALL}
                label={t('code')}
                disabled={selectedValue !== TYPE_OF_INDENTITY_CARD.PASSPORT}
                shrink={false}
              />
            </Grid>

            <Grid item xs={12} md={12} xl={3}>
              <Controller
                name={isPassport ? 'dateOfIssue' : ''}
                control={control}
                rules={{ required: true }}
                render={({ field, fieldState: { error } }) => (
                  <DatePicker
                    label={t('dateOfIssue')}
                    value={field.value}
                    maxDate={new Date()}
                    onChange={(date) => {
                      field.onChange(date);
                    }}
                    disabled={selectedValue !== TYPE_OF_INDENTITY_CARD.PASSPORT}
                    renderInput={(rest) => (
                      <TextField
                        InputLabelProps={{
                          sx: {
                            color: isDark ? textColor.white : textColor.black,
                          },
                        }}
                        sx={{
                          borderRadius: '10px',
                          backgroundColor: () => {
                            return isDark ? theme.palette.mode : backgroundColor.white;
                          },
                        }}
                        fullWidth
                        {...rest}
                        error={!!error}
                        helperText={error?.message}
                        size={SIZE_FIELD.SMALL}
                        disabled={selectedValue !== TYPE_OF_INDENTITY_CARD.PASSPORT}
                      />
                    )}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={12} xl={4}>
              <RHFTextField
                placeholderColor={isPassport ? '#333' : '#CED8DD'}
                backgroundColor="#fff"
                inputColor="#000"
                name={isPassport ? 'placeOfIssue' : ''}
                size={SIZE_FIELD.SMALL}
                label={t('placeOfIssue')}
                disabled={selectedValue !== TYPE_OF_INDENTITY_CARD.PASSPORT}
                shrink={false}
              />
            </Grid>
          </Grid>
          <Grid container alignItems="center" spacing={2} item xl={12}>
            <Grid container alignItems="center" item xs={12} md={12} xl={2}>
              <Radio
                size={SIZE_FIELD.SMALL}
                checked={isIdentityNumber}
                onChange={(e) => handleChange(e.target.value)}
                value={TYPE_OF_INDENTITY_CARD.IDENTITY_NUMBER}
                name="typeOfIdentityCard"
                inputProps={{ 'aria-label': 'A' }}
              />
              <InputLabel
                sx={{
                  color: isDark ? textColor.white : textColor.black,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                }}
                onClick={() => handleChange(TYPE_OF_INDENTITY_CARD.IDENTITY_NUMBER)}
              >
                {t('identifyNumber')}
              </InputLabel>
            </Grid>

            <Grid item xs={12} md={12} xl={3}>
              {/* required max length 12 */}
              <RHFTextField
                placeholderColor={isIdentityNumber ? '#333' : '#CED8DD'}
                backgroundColor="#fff"
                inputColor={isIdentityNumber ? '#000' : '#ccc'}
                name={isIdentityNumber ? 'identityCard' : ''}
                size={SIZE_FIELD.SMALL}
                disabled={selectedValue !== TYPE_OF_INDENTITY_CARD.IDENTITY_NUMBER}
                label={t('code')}
                shrink={false}

                // onChange={(e) => validateIdentityNumberHandle(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={12} xl={3}>
              <Controller
                name={isIdentityNumber ? 'dateOfIssue' : ''}
                control={control}
                rules={{ required: true }}
                render={({ field, fieldState: { error } }) => (
                  <DatePicker
                    label={t('dateOfIssue')}
                    value={field.value}
                    maxDate={new Date()}
                    onChange={(date) => {
                      field.onChange(date);
                    }}
                    disabled
                    renderInput={(rest) => (
                      <TextField
                        InputLabelProps={{
                          sx: {
                            color: isDark ? textColor.white : textColor.black,
                          },
                        }}
                        sx={{
                          borderRadius: '10px',
                          backgroundColor: () => {
                            return isDark ? theme.palette.mode : backgroundColor.white;
                          },
                        }}
                        fullWidth
                        {...rest}
                        error={!!error}
                        helperText={error?.message}
                        size={SIZE_FIELD.SMALL}
                        disabled
                      />
                    )}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={12} xl={4}>
              <RHFTextField
                placeholderColor={isIdentityNumber ? '#333' : '#CED8DD'}
                backgroundColor="#fff"
                inputColor="#000"
                name={isIdentityNumber ? 'placeOfIssue' : ''}
                size={SIZE_FIELD.SMALL}
                label={t('placeOfIssue')}
                disabled
                shrink={false}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} item xl={12}>
            <Grid item xs={12} md={6} xl={6}>
              <RHFUpload
                titleUpload={
                  <Typography
                    component="div"
                    sx={{
                      height: '150px',
                      display: 'flex',
                      justifyContent: 'center',
                      textAlign: 'center',
                      alignItems: 'center',
                      flexDirection: 'column',
                    }}
                  >
                    <UploadIllustration width={120} />
                    <Typography sx={{ mt: 2 }} component="div">
                      {t('frontIdentify')}
                    </Typography>
                  </Typography>
                }
                name="identityFront_url"
                maxSize={3145728}
                onDrop={handleUploadFrontIdentify}
                onDelete={() => setValue('identityFront_url', null, { shouldValidate: true })}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={6}>
              <RHFUpload
                titleUpload={
                  <Typography
                    component="div"
                    sx={{
                      height: '150px',
                      display: 'flex',
                      justifyContent: 'center',
                      textAlign: 'center',
                      alignItems: 'center',
                      flexDirection: 'column',
                    }}
                  >
                    <UploadIllustration width={120} />
                    <Typography sx={{ mt: 2 }} component="div">
                      {t('backIdentify')}
                    </Typography>
                  </Typography>
                }
                name="identityBack_url"
                maxSize={3145728}
                onDrop={handleUploadBackIdentify}
                onDelete={() => setValue('identityBack_url', null, { shouldValidate: true })}
              />
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default IdentifySection;
