import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import EmployeeApi from '@/apis/employee.api';
import {
  PROFILE_UPLOAD_STATUS,
  bankingStatusList,
  relationshipStatus,
} from '@/assets/data/employee-info-vi';
import { fileFormat } from '@/components/file-thumbnail';
import { RHFAutocomplete, RHFCheckbox, RHFSelect, RHFTextField } from '@/components/hook-form';
import FormProvider from '@/components/hook-form/FormProvider';
import { canPerformAction } from '@/components/permission/PermissionWrapper';
import { useSettingsContext } from '@/components/settings';
import { useLocales } from '@/locales';
import CreateComponent from '@/pages/components/CreateComponent';
import { getListBanking } from '@/redux/slices/dashboard/banking';
import {
  createEmployeeBanking,
  getEmployeeBanking,
  updateEmployeeBanking,
} from '@/redux/slices/dashboard/employee';
import { getListProvinceApi } from '@/redux/slices/dashboard/province';
import { dispatch, useSelector } from '@/redux/store';
import { EmployeeBankingInformationSchema } from '@/utils/schemas';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Card, Grid, MenuItem, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { IEmployeeBanking } from '../../../../../../@types/employee';
import UploadFileV2 from '../../../../../../components/upload/UploadFileV2';
import { PermissionList, SIZE_FIELD, textColor } from '../../../../../../constants/app.constants';
import { Utils } from '../../../../../../utils/utils';

const numberReg = /^[0-9]+$/;
type Props = {
  editUser?: boolean;
  employeeId?: string | number;
};

const EmployeeBankInformation = ({ editUser, employeeId }: Props) => {
  const { t } = useLocales();
  const theme = useTheme();
  const { themeMode, onToggleMode } = useSettingsContext();
  const isDark = themeMode === 'dark';
  const { employeeBankingDetail } = useSelector((state) => state.employee);
  const { provinceList } = useSelector((state) => state.province);
  const { bankingList } = useSelector((state) => state.banking);
  const params = useParams();
  const isEdit = params.id || editUser;
  const [typeAuthorizationLetter, setTypeAuthorizationLetter] = useState('');
  const [authorizationLetterUrl, setAuthorizationLetterUrl] = useState('');
  const methods = useForm<IEmployeeBanking>({
    resolver: yupResolver(EmployeeBankingInformationSchema),
    defaultValues: {
      accountHolder: '',
      accountNumber: '',
      bank_id: '',
      province_id: '',
      branchName: '',
      isMain: false,
      authorizedDocsType: '',
      authorizationLetterUrl: '',
      relationship: '',
    },
  });
  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;
  const checked = watch('isMain');
  const values = watch();

  const getEmployeeBankInformation = async () => {
    const paramsApi = {
      employeeId: params.id || employeeId,
    };
    await dispatch(
      getListProvinceApi({
        pageIndex: 1,
        pageSize: 100,
      })
    );
    const payloadBankList = await dispatch(
      getListBanking({
        pageIndex: 1,
        pageSize: 1000,
      })
    );

    await dispatch(getEmployeeBanking(paramsApi));
    const { data } = await EmployeeApi.getBanking(paramsApi);
    const currentProvince = provinceList?.find((x) => x.id === data.province_id);
    const currentBank = payloadBankList.payload.items?.find((x: any) => x.id === data.bank_id);

    await reset({
      ...data,
      province_id: data.province_id
        ? {
            label: `${currentProvince?.code} - ${currentProvince?.name}`,
            value: currentProvince?.id,
            code: currentProvince?.code,
          }
        : null,
      bank_id: data.bank_id
        ? {
            label: `${currentBank?.name}`,
            value: currentBank?.id,
          }
        : null,
    });
    if (data.authorizedDocs_url && data.authorizedDocsType === PROFILE_UPLOAD_STATUS.submitted) {
      setAuthorizationLetterUrl(data.authorizedDocs_url);
      setTypeAuthorizationLetter(fileFormat(data.authorizedDocs_url));
    }
  };

  const onSubmit = async (data: any) => {
    // handle upload file
    const dataApi = {
      ...data,
      id: employeeBankingDetail?.id ?? 0,
      bank_id: data.bank_id.value,
      province_id: data.province_id ? data.province_id.value : '',
      employee_id: params.id || employeeId,
      authorizedDocsType: !checked ? data.authorizedDocsType : null,
      authorizedDocs_url:
        !checked && data.authorizedDocsType === PROFILE_UPLOAD_STATUS.submitted
          ? await Utils.checkUrl(authorizationLetterUrl, 'profile', 'authorizationLetter')
          : null,
      relationship: !checked ? data.relationship : null,
    };
    if (!employeeBankingDetail?.id) {
      await dispatch(createEmployeeBanking(dataApi));
    } else {
      await dispatch(updateEmployeeBanking(dataApi));
    }
  };

  useEffect(() => {
    if (params.id || employeeId) {
      getEmployeeBankInformation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id, employeeId]);

  useEffect(() => {
    dispatch(
      getListProvinceApi({
        pageIndex: 1,
        pageSize: 100,
      })
    );
    dispatch(
      getListBanking({
        pageIndex: 1,
        pageSize: 1000,
      })
    );
  }, []);

  useEffect(() => {
    Utils.checkViewPermission(PermissionList.EMPLOYEE_BANK);
  }, []);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Box>
        <Card sx={{ px: 3, py: 3, mb: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={12}>
              <RHFCheckbox isRequired name="isMain" label={t('mainAccount')} />
            </Grid>
            {!checked && (
              <>
                <Grid item xs={12} sm={12} md={11}>
                  <Typography
                    sx={{
                      mb: 2,
                      color: isDark ? textColor.white : textColor.black,
                    }}
                  >
                    {t('authority')}
                  </Typography>
                  <Grid container alignItems="center" item xl={12} spacing={1}>
                    <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                      <Typography
                        sx={{
                          color: isDark ? textColor.white : textColor.black,
                        }}
                      >
                        {t('authorizationLetter')}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={9} lg={9} xl={9}>
                      <RHFSelect
                        size={SIZE_FIELD.SMALL}
                        shrink={false}
                        placeholderColor="#000"
                        backgroundColor="#fff"
                        inputColor="#000"
                        name="authorizedDocsType"
                        placeholder={t('authorizationLetter')}
                      >
                        {bankingStatusList?.map((item, index) => (
                          <MenuItem key={index} value={item.value}>
                            {item.label}
                          </MenuItem>
                        ))}
                      </RHFSelect>
                    </Grid>
                  </Grid>

                  {values.authorizedDocsType === PROFILE_UPLOAD_STATUS.submitted && (
                    <Grid container sx={{ mt: 2 }} alignItems="center" item xl={12}>
                      <Grid item xs={0} xl={3}>
                        <br />
                      </Grid>
                      <Grid item xl={9}>
                        <UploadFileV2
                          imageHeight="200px"
                          imageWidth="100%"
                          dirName="profile"
                          typeFile={typeAuthorizationLetter}
                          setTypeFile={setTypeAuthorizationLetter}
                          fileNameUpload="authorizationLetter"
                          fileUrl={authorizationLetterUrl}
                          setFileUrl={setAuthorizationLetterUrl}
                        />
                      </Grid>
                    </Grid>
                  )}
                </Grid>
                <Grid item xs={12} sm={12} md={1}>
                  {/* <br /> */}
                </Grid>
                <Grid alignItems="center" container item xs={12} sm={12} md={11} spacing={1}>
                  <Grid item md={3} lg={3} xl={3}>
                    <Typography
                      sx={{
                        color: isDark ? textColor.white : textColor.black,
                      }}
                    >
                      {t('relationshipBank')}
                    </Typography>
                  </Grid>
                  <Grid item md={9} lg={9} xl={9}>
                    <RHFTextField
                      size={SIZE_FIELD.SMALL}
                      shrink={false}
                      placeholderColor="#000"
                      backgroundColor="#fff"
                      inputColor="#000"
                      name="relationship"
                      // placeholder={t('relationshipBank')}
                    />
                  </Grid>
                </Grid>
              </>
            )}
          </Grid>
        </Card>
      </Box>
      <Box>
        <Card sx={{ px: 3, py: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={12}>
              <RHFTextField
                size={SIZE_FIELD.SMALL}
                placeholderColor="#000"
                backgroundColor="#fff"
                inputColor="#000"
                isRequired
                name="accountHolder"
                isLabel
                label={t('accountHolderName')}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <RHFTextField
                size={SIZE_FIELD.SMALL}
                placeholderColor="#000"
                backgroundColor="#fff"
                inputColor="#000"
                isRequired
                isLabel
                name="accountNumber"
                label={t('bankAccountNumber')}
              />
            </Grid>
            <Grid container item xs={12} sm={12} md={12} spacing={1}>
              <Grid item xs={12} sm={4} md={4}>
                <Typography
                  sx={{
                    color: isDark ? textColor.white : textColor.black,
                    fontSize: '1rem',
                  }}
                  component="p"
                >
                  {t('bankNameAbbreviation')} <span className="required">*</span>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={8} md={8}>
                <RHFAutocomplete
                  size={SIZE_FIELD.SMALL}
                  shrink={false}
                  placeholderColor="#000"
                  backgroundColor="#fff"
                  inputColor="#000"
                  name="bank_id"
                  // isLabel
                  // size={SIZE_FIELD.SMALL}

                  options={bankingList.map((item) => {
                    return {
                      label: `${item.name}`,
                      value: item.id,
                    };
                  })}
                  isOptionEqualToValue={(option, value) => option?.value === value?.value}
                />
              </Grid>
            </Grid>
            <Grid container item xs={12} spacing={1}>
              <Grid item xs={12} sm={4} md={4}>
                <Typography
                  sx={{
                    color: isDark ? textColor.white : textColor.black,
                    fontSize: '1rem',
                  }}
                  component="p"
                >
                  {t('titleProvinceCityBank')}
                </Typography>
              </Grid>
              <Grid container item spacing={3} xs={12} sm={8} md={8}>
                <Grid item xs={12} sm={12} md={12}>
                  <RHFAutocomplete
                    size={SIZE_FIELD.SMALL}
                    placeholderColor="#000"
                    backgroundColor="#fff"
                    inputColor="#000"
                    name="province_id"
                    label={t('provinceCityBank')}
                    options={provinceList.map((item) => {
                      return {
                        label: `${item.code} - ${item.name}`,
                        value: item.id,
                        code: item.code,
                      };
                    })}
                    isOptionEqualToValue={(option, value) => option?.value === value?.value}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <RHFTextField
                    size={SIZE_FIELD.SMALL}
                    placeholderColor="#000"
                    backgroundColor="#fff"
                    inputColor="#000"
                    name="branchName"
                    label={t('bankBranchName')}
                    shrink={false}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </Box>
      {canPerformAction(employeeBankingDetail, PermissionList.EMPLOYEE_BANK) && (
        <CreateComponent isEdit={isEdit} isSubmitting={isSubmitting} />
      )}
    </FormProvider>
  );
};

export default EmployeeBankInformation;
