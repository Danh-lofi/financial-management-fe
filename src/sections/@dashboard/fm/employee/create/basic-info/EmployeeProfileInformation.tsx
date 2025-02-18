import axios from 'axios';
import moment from 'moment';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import EmployeeApi from '@/apis/employee.api';
import { PROFILE_UPLOAD_STATUS, profileStatusList } from '@/assets/data/employee-info-vi';
import { RHFDatePicker, RHFRadioGroup, RHFSelect, RHFTextField } from '@/components/hook-form';
import FormProvider from '@/components/hook-form/FormProvider';
import Iconify from '@/components/iconify/Iconify';
import { canPerformAction } from '@/components/permission/PermissionWrapper';
import { useSettingsContext } from '@/components/settings';
import {
  EXPERIENCE_OPTIONS,
  LOCAL_STORAGE_KEYS,
  OBJECT_TYPE,
  PermissionList,
  SIZE_FIELD,
  SOURCE_OPTIONS,
  TYPE_NOTICE,
  UploadProfileEmployee,
} from '@/constants/app.constants';
import { useLocales } from '@/locales';
import CreateComponent from '@/pages/components/CreateComponent';
import {
  createEmployeeProfile,
  getEmployeeProfile,
  updateEmployeeProfile,
} from '@/redux/slices/dashboard/employee';
import { getExperienceStatus, getStatus } from '@/redux/slices/dashboard/objectType';
import { dispatch, useSelector } from '@/redux/store';
import { LocalUtils } from '@/utils/local';
import { EmployeeProfileSchema } from '@/utils/schemas';
import { Utils } from '@/utils/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Card, Grid, MenuItem, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { EmployeeProfileForm } from '../../../../../../@types/employee';
import ObjectType from '../../../../../../apis/objecType.api';
import UploadFileV2 from '../../../../../../components/upload/UploadFileV2';

type Props = {
  editUser?: boolean;
  employeeId?: string | number;
};

type values =
  | 'jobApplication_url'
  | 'background_url'
  | 'identityCard_url'
  | 'healthy_url'
  | 'degree_url'
  | 'resignation_url'
  | 'relationship_url'
  | 'other_url';

const EmployeeProfileInformation = ({ editUser, employeeId }: Props) => {
  const { t } = useLocales();
  // Params
  const params = useParams();
  const isEdit = params.id || employeeId;
  // Theme
  const { themeMode } = useSettingsContext();
  const isDark = themeMode === 'dark';
  const theme = useTheme();
  const PRIMARY_MAIN = theme.palette.primary;

  // useSelector
  const { status, experienceStatus } = useSelector((state) => state.objectType);
  const { employeeProfile } = useSelector((state) => state.employee);
  // useState
  const [loading, setLoading] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [isImage, setIsImage] = useState('');
  const [profileId, setProfileId] = useState('');
  const [jobApplication_url, setJobApplication_url] = useState('');
  const [background_url, setBackground_url] = useState('');
  const [relationship_url, setRelationship_url] = useState('');
  const [healthy_url, setHealthy_url] = useState('');
  const [resignation_url, setResignation_url] = useState('');
  const [degree_url, setDegree_url] = useState('');
  const [other_url, setOther_url] = useState('');

  const methods = useForm<EmployeeProfileForm>({
    resolver: yupResolver(EmployeeProfileSchema),

    defaultValues: {
      jobApplication_url: '',
      background_url: '',
      identityCard_url: '',
      healthy_url: '',
      degree_url: '',
      resignation_url: '',
      relationship_url: '',
      other_url: '',
      // dateIdentityCard: new Date(),
      jobApplication_date: new Date(),
      relationship_date: new Date(),
      background_date: new Date(),
      healthy_date: new Date(),
      degree_date: new Date(),
      other_date: new Date(),
      resignation_date: new Date(),
      sourceOptions: 'internalSource',
      experienceOptions: 'saleExperience',
      experience: '',
      source: '',
      yoe: '',
    },
  });
  const {
    setValue,
    control,
    reset,
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const handleChangeSourceOptions = (e: any) => {
    const value = e.target.value;
    setValue('sourceOptions', value);
    dispatch(
      getStatus({
        objectType: value,
      })
    );
    setValue('source', '');
  };
  const handleChangeExperienceOptions = (e: any) => {
    const value = e.target.value;
    setValue('experienceOptions', value);
    dispatch(
      getExperienceStatus({
        objectType: value,
      })
    );
    setValue('experience', '');
  };

  const onSubmit = async (data: EmployeeProfileForm) => {
    const submitData = {
      ...data,
      id: profileId ?? 0,
      employee_id: params.id || employeeId,
      jobApplication_date:
        data.jobApplication_url === PROFILE_UPLOAD_STATUS.waiting ?  new Date(data.jobApplication_date || '') : null,
      background_date:
        data.background_url === PROFILE_UPLOAD_STATUS.waiting ?  new Date(data.background_date || '') : null,
      healthy_date: data.healthy_url === PROFILE_UPLOAD_STATUS.waiting ?  new Date(data.healthy_date || '') : null,
      degree_date: data.degree_url === PROFILE_UPLOAD_STATUS.waiting ?  new Date(data.degree_date || '') : null,
      other_date: data.other_url === PROFILE_UPLOAD_STATUS.waiting ?  new Date(data.other_date || '') : null,
      resignation_date:
        data.resignation_url === PROFILE_UPLOAD_STATUS.waiting ?  new Date(data.resignation_date || '') : null,
      relationship_date:
        data.relationship_url === PROFILE_UPLOAD_STATUS.waiting ?  new Date(data.relationship_date || '') : null,
      jobApplication_url:
        data.jobApplication_url === PROFILE_UPLOAD_STATUS.submitted
          ? await Utils.checkUrl(
              jobApplication_url,
              'profile',
              UploadProfileEmployee.APPLICATION_FORM
            )
          : data.jobApplication_url,
      background_url:
        data.background_url === PROFILE_UPLOAD_STATUS.submitted
          ? await Utils.checkUrl(background_url, 'profile', UploadProfileEmployee.CERTIFIED_RESUME)
          : data.background_url,
      // identityCard_url:
      //   data.identityCard_url === PROFILE_UPLOAD_STATUS.submitted
      //     ? await checkUrl(identityCard_url, UploadProfileEmployee.IDCARD_VERIFY)
      //     : data.identityCard_url,
      healthy_url:
        data.healthy_url === PROFILE_UPLOAD_STATUS.submitted
          ? await Utils.checkUrl(healthy_url, 'profile', UploadProfileEmployee.HEALTH_CERTIFICATE)
          : data.healthy_url,
      degree_url:
        data.degree_url === PROFILE_UPLOAD_STATUS.submitted
          ? await Utils.checkUrl(degree_url, 'profile', UploadProfileEmployee.DEGREE)
          : data.degree_url,
      resignation_url:
        data.resignation_url === PROFILE_UPLOAD_STATUS.submitted
          ? await Utils.checkUrl(
              resignation_url,
              'profile',
              UploadProfileEmployee.REGISNATION_LETTER
            )
          : data.resignation_url,
      relationship_url:
        data.relationship_url === PROFILE_UPLOAD_STATUS.submitted
          ? await Utils.checkUrl(
              relationship_url,
              'profile',
              UploadProfileEmployee.DEPENDENT_PERSON
            )
          : data.relationship_url,
      other_url:
        data.other_url === PROFILE_UPLOAD_STATUS.submitted
          ? await Utils.checkUrl(other_url, 'profile', UploadProfileEmployee.OTHERS)
          : data.other_url,
    };

    if (profileId) {
      await dispatch(updateEmployeeProfile(submitData));
    } else {
      await dispatch(createEmployeeProfile(submitData));
    }
  };

  const handleDownloadProfiles = async () => {
    setLoading(true);
    try {
      const res = await axios({
        url: `${process.env.REACT_APP_API_ENPOINT}/${process.env.REACT_APP_API_PREFIX}/employee/download-profile-files`,
        method: 'GET',
        params: {
          employeeId: params.id || employeeId,
        },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${LocalUtils.get(LOCAL_STORAGE_KEYS.ACCESS_TOKEN)}`,
        },
        responseType: 'blob',
      }).then((response) => {
        const url = window.URL.createObjectURL(response.data);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'Profiles.rar';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (params.id || employeeId) {
      dispatch(
        getEmployeeProfile({
          employeeId: params.id || employeeId,
        })
      );
      EmployeeApi.getProfile({
        employeeId: params.id || employeeId,
      }).then((res) => {
        const { data } = res;
        reset(data);
        if (!data.id) {
          setDisabled(true);
        }
        setProfileId(data.id);

        if (!data.source) {
          dispatch(
            getStatus({
              objectType: OBJECT_TYPE.source.internalSource,
            })
          );
        }

        if (!data.experience) {
          dispatch(
            getExperienceStatus({
              objectType: OBJECT_TYPE.experience.saleExperience,
            })
          );
        }

        if (data.experience) {
          ObjectType.get({
            objectType: OBJECT_TYPE.experience.saleExperience,
          }).then((response) => {
            const checkSale = response.data.find((item: any) => {
              return item.objectCode === data.experience;
            });
            if (checkSale) {
              dispatch(
                getExperienceStatus({
                  objectType: OBJECT_TYPE.experience.saleExperience,
                })
              );
              setValue('experience', data.experience);
              setValue('experienceOptions', OBJECT_TYPE.experience.saleExperience);
            }
          });
          ObjectType.get({
            objectType: OBJECT_TYPE.experience.office,
          }).then((response) => {
            const checkSale = response.data.find((item: any) => {
              return item.objectCode === data.experience;
            });
            if (checkSale) {
              dispatch(
                getExperienceStatus({
                  objectType: OBJECT_TYPE.experience.office,
                })
              );
              setValue('experience', data.experience);
              setValue('experienceOptions', OBJECT_TYPE.experience.office);
            }
          });
          ObjectType.get({
            objectType: OBJECT_TYPE.experience.market,
          }).then((response) => {
            const checkSale = response.data.find((item: any) => {
              return item.objectCode === data.experience;
            });
            if (checkSale) {
              dispatch(
                getExperienceStatus({
                  objectType: OBJECT_TYPE.experience.market,
                })
              );
              setValue('experience', data.experience);
              setValue('experienceOptions', OBJECT_TYPE.experience.market);
            }
          });
          ObjectType.get({
            objectType: OBJECT_TYPE.experience.warehouseAndDelivery,
          }).then((response) => {
            const checkSale = response.data.find((item: any) => {
              return item.objectCode === data.experience;
            });
            if (checkSale) {
              dispatch(
                getExperienceStatus({
                  objectType: OBJECT_TYPE.experience.warehouseAndDelivery,
                })
              );
              setValue('experience', data.experience);
              setValue('experienceOptions', OBJECT_TYPE.experience.warehouseAndDelivery);
            }
          });
        }
        if (data.source) {
          ObjectType.get({
            objectType: OBJECT_TYPE.source.internalSource,
          }).then((response) => {
            const check = response.data.find((item: any) => {
              return item.objectCode === data.source;
            });
            if (check) {
              dispatch(
                getStatus({
                  objectType: OBJECT_TYPE.source.internalSource,
                })
              );
              setValue('source', data.source);
              setValue('sourceOptions', OBJECT_TYPE.source.internalSource);
            }
          });
          ObjectType.get({
            objectType: OBJECT_TYPE.source.externalSource,
          }).then((response) => {
            const check = response.data.find((item: any) => {
              return item.objectCode === data.source;
            });
            if (check) {
              dispatch(
                getStatus({
                  objectType: OBJECT_TYPE.source.externalSource,
                })
              );
              setValue('source', data.source);
              setValue('sourceOptions', OBJECT_TYPE.source.externalSource);
            }
          });
        }

        if (data.jobApplication_url.includes('http')) {
          setValue('jobApplication_url', PROFILE_UPLOAD_STATUS.submitted);
          setJobApplication_url(data.jobApplication_url);
        } else {
          setValue('jobApplication_url', data.jobApplication_url);
          setJobApplication_url('');
        }
        if (data.background_url.includes('http')) {
          setValue('background_url', PROFILE_UPLOAD_STATUS.submitted);
          setBackground_url(data.background_url);
        } else {
          setValue('background_url', data.background_url);
          setBackground_url('');
        }
        // if (data.identityCard_url.includes('http')) {
        //   setValue('identityCard_url', PROFILE_UPLOAD_STATUS.submitted);
        //   setIdentityCard_url(data.identityCard_url);
        // } else {
        //   setValue('identityCard_url', data.identityCard_url);
        //   setIdentityCard_url('');
        // }

        if (data.healthy_url.includes('http')) {
          setValue('healthy_url', PROFILE_UPLOAD_STATUS.submitted);
          setHealthy_url(data.healthy_url);
        } else {
          setValue('healthy_url', data.healthy_url);
          setHealthy_url('');
        }
        if (data.degree_url.includes('http')) {
          setValue('degree_url', PROFILE_UPLOAD_STATUS.submitted);
          setDegree_url(data.degree_url);
        } else {
          setValue('degree_url', data.degree_url);
          setDegree_url('');
        }
        if (data.resignation_url.includes('http')) {
          setValue('resignation_url', PROFILE_UPLOAD_STATUS.submitted);
          setResignation_url(data.resignation_url);
        } else {
          setValue('resignation_url', data.resignation_url);
          setResignation_url('');
        }
        if (data.other_url.includes('http')) {
          setValue('other_url', PROFILE_UPLOAD_STATUS.submitted);
          setOther_url(data.other_url);
        } else {
          setValue('other_url', data.other_url);
          setOther_url('');
        }
        if (data.relationship_url.includes('http')) {
          setValue('relationship_url', PROFILE_UPLOAD_STATUS.submitted);
          setRelationship_url(data.relationship_url);
        } else {
          setValue('relationship_url', data.relationship_url);
          setRelationship_url('');
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id, setValue, employeeId]);
  const checkValue = (name: values) => {
    if (values[name] !== PROFILE_UPLOAD_STATUS.waiting) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    Utils.checkViewPermission(PermissionList.EMPLOYEE_PROFILE);
  }, []);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Card sx={{ p: 3, mt: 3, backgroundColor: `${PRIMARY_MAIN}` }}>
        <Grid container spacing={3}>
          <Grid
            container
            justifyContent="space-between"
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
          >
            <Grid item xl={3}>
              <Typography variant="h4">{t('requiredProfile')}</Typography>
            </Grid>
          </Grid>
          <Grid container alignItems="center" item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Grid container item xl={12} alignItems="center" spacing={3}>
              <Grid item xs={12} sm={12} md={8}>
                <RHFSelect
                  isLabel
                  label={t('applicationForm')}
                  inputColor="#000"
                  placeholderColor="#000"
                  backgroundColor="#fff"
                  name="jobApplication_url"
                  placeholder={t('applicationForm')}
                  shrink={false}
                  size={SIZE_FIELD.SMALL}
                >
                  {profileStatusList?.map((item, index) => (
                    <MenuItem key={index} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </RHFSelect>
              </Grid>
              <Grid sx={{mb:1}} item xs={12} sm={12} md={4}>
                {values.jobApplication_url === PROFILE_UPLOAD_STATUS.submitted && (
                  <UploadFileV2
                    dirName="profile"
                    fileNameUpload="applicationForm"
                    fileUrl={jobApplication_url}
                    setFileUrl={setJobApplication_url}
                  />
                )}
              </Grid>
            </Grid>
            {checkValue('jobApplication_url') && (
              <Grid container item xs={12} sm={12} md={6} lg={6} xl={12}>
                <Grid item xs={12} sm={12} md={2}>
                  <br />
                </Grid>
                <Grid item xs={12} sm={12} md={10}>
                  {values.jobApplication_url === PROFILE_UPLOAD_STATUS.waiting && (
                    <Grid alignItems="center" container item xl={12}>
                      <Grid item xl={4}>
                        <Typography component="span">{t('addLatest')}</Typography>
                      </Grid>
                      <Grid item xl={3}>
                        <RHFDatePicker
                          shrink={false}
                          size={SIZE_FIELD.SMALL}
                          name="jobApplication_date"
                        />
                      </Grid>
                    </Grid>
                  )}
                </Grid>
              </Grid>
            )}
          </Grid>

          <Grid container item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Grid container item xl={12} alignItems="center" spacing={3}>
              <Grid item xs={12} sm={12} md={8}>
                <RHFSelect
                  label={t('certifiedResume')}
                  isLabel
                  isRequired
                  inputColor="#000"
                  placeholderColor="#000"
                  backgroundColor="#fff"
                  name="background_url"
                  placeholder={t('certifiedResume')}
                  shrink={false}
                  size={SIZE_FIELD.SMALL}
                >
                  {profileStatusList?.map((item, index) => (
                    <MenuItem key={index} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </RHFSelect>
              </Grid>
              <Grid sx={{mb:1}} item xs={12} md={4}>
                {values.background_url === PROFILE_UPLOAD_STATUS.submitted && (
                  <UploadFileV2
                    dirName="profile"
                    fileNameUpload="certifiedResume"
                    fileUrl={background_url}
                    setFileUrl={setBackground_url}
                  />
                )}
              </Grid>
            </Grid>
            {checkValue('background_url') && (
              <Grid container item xs={12} sm={12} md={6} lg={6} xl={12}>
                <Grid item xs={12} sm={12} md={2}>
                  <br />
                </Grid>
                <Grid item xs={12} sm={12} md={10}>
                  {values.background_url === PROFILE_UPLOAD_STATUS.waiting && (
                    <Grid alignItems="center" container item xl={12}>
                      <Grid item xl={4}>
                        <Typography component="span">{t('addLatest')}</Typography>
                      </Grid>
                      <Grid item xl={3}>
                        <RHFDatePicker
                          shrink={false}
                          size={SIZE_FIELD.SMALL}
                          name="background_date"
                        />
                      </Grid>
                    </Grid>
                  )}
                </Grid>
              </Grid>
            )}
          </Grid>

          <Grid container item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Grid container item xl={12} alignItems="center" spacing={3}>
              <Grid item xs={12} sm={12} md={8}>
                <RHFSelect
                  isLabel
                  label={t('healthCertificate')}
                  isRequired
                  inputColor="#000"
                  placeholderColor="#000"
                  backgroundColor="#fff"
                  name="healthy_url"
                  placeholder={t('healthCertificate')}
                  shrink={false}
                  size={SIZE_FIELD.SMALL}
                >
                  {profileStatusList?.map((item, index) => (
                    <MenuItem key={index} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </RHFSelect>
              </Grid>
              <Grid sx={{mb:1}} item xs={12} sm={12} md={4}>
                {values.healthy_url === PROFILE_UPLOAD_STATUS.submitted && (
                  <UploadFileV2
                    dirName="profile"
                    fileNameUpload="healthCertificate"
                    fileUrl={healthy_url}
                    setFileUrl={setHealthy_url}
                  />
                )}
              </Grid>
            </Grid>
            {checkValue('healthy_url') && (
              <Grid container item xs={12} sm={12} md={6} lg={6} xl={12}>
                <Grid item xs={12} sm={12} md={2}>
                  <br />
                </Grid>
                <Grid item xs={12} sm={12} md={10}>
                  {values.healthy_url === PROFILE_UPLOAD_STATUS.waiting && (
                    <Grid alignItems="center" container item xl={12}>
                      <Grid item xl={4}>
                        <Typography component="span">{t('addLatest')}</Typography>
                      </Grid>
                      <Grid item xl={3}>
                        <RHFDatePicker shrink={false} size={SIZE_FIELD.SMALL} name="healthy_date" />
                      </Grid>
                    </Grid>
                  )}
                </Grid>
              </Grid>
            )}
          </Grid>

          <Grid container item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Grid container item xl={12} alignItems="center" spacing={3}>
              <Grid item xs={12} sm={12} md={8}>
                <RHFSelect
                  isLabel
                  isRequired
                  inputColor="#000"
                  label={t('degree')}
                  placeholderColor="#000"
                  backgroundColor="#fff"
                  name="degree_url"
                  placeholder={t('degree')}
                  shrink={false}
                  size={SIZE_FIELD.SMALL}
                >
                  {profileStatusList?.map((item, index) => (
                    <MenuItem key={index} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </RHFSelect>
              </Grid>
              <Grid sx={{mb:1}} item xs={12} sm={12} md={4}>
                {values.degree_url === PROFILE_UPLOAD_STATUS.submitted && (
                  <UploadFileV2
                    dirName="profile"
                    fileNameUpload="degree"
                    fileUrl={degree_url}
                    setFileUrl={setDegree_url}
                  />
                )}
              </Grid>
            </Grid>
            {checkValue('degree_url') && (
              <Grid container item xs={12} sm={12} md={6} lg={6} xl={12}>
                <Grid item xs={12} sm={12} md={2}>
                  <br />
                </Grid>
                <Grid item xs={12} sm={12} md={10}>
                  {values.degree_url === PROFILE_UPLOAD_STATUS.waiting && (
                    <Grid alignItems="center" container item xl={12}>
                      <Grid item xl={4}>
                        <Typography component="span">{t('addLatest')}</Typography>
                      </Grid>
                      <Grid item xl={3}>
                        <RHFDatePicker shrink={false} size={SIZE_FIELD.SMALL} name="degree_date" />
                      </Grid>
                    </Grid>
                  )}
                </Grid>
              </Grid>
            )}
          </Grid>

          <Grid container item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Grid container item xl={12} alignItems="center" spacing={3}>
              <Grid item xs={12} sm={12} md={8}>
                <RHFSelect
                  isLabel
                  label={t('others')}
                  inputColor="#000"
                  placeholderColor="#000"
                  backgroundColor="#fff"
                  name="other_url"
                  placeholder={t('others')}
                  shrink={false}
                  size={SIZE_FIELD.SMALL}
                >
                  {profileStatusList?.map((item, index) => (
                    <MenuItem key={index} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </RHFSelect>
              </Grid>
              <Grid sx={{mb:1}} item xs={12} sm={12} md={4}>
                {values.other_url === PROFILE_UPLOAD_STATUS.submitted && (
                  <UploadFileV2
                    dirName="profile"
                    fileNameUpload="others"
                    fileUrl={other_url}
                    setFileUrl={setOther_url}
                  />
                )}
              </Grid>
            </Grid>
            {checkValue('other_url') && (
              <Grid container item xs={12} sm={12} md={6} lg={6} xl={12}>
                <Grid item xs={12} sm={12} md={2}>
                  <br />
                </Grid>
                <Grid item xs={12} sm={12} md={10}>
                  {values.other_url === PROFILE_UPLOAD_STATUS.waiting && (
                    <Grid alignItems="center" container item xl={12}>
                      <Grid item xl={4}>
                        <Typography component="span">{t('addLatest')}</Typography>
                      </Grid>
                      <Grid item xl={3}>
                        <RHFDatePicker shrink={false} size={SIZE_FIELD.SMALL} name="other_date" />
                      </Grid>
                    </Grid>
                  )}
                </Grid>
              </Grid>
            )}
          </Grid>

          <Grid container item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Grid container item xl={12} alignItems="center" spacing={3}>
              <Grid item xs={12} sm={12} md={8}>
                <RHFSelect
                  isLabel
                  label={t('resignationLetter')}
                  inputColor="#000"
                  placeholderColor="#000"
                  backgroundColor="#fff"
                  name="resignation_url"
                  placeholder={t('resignationLetter')}
                  shrink={false}
                  size={SIZE_FIELD.SMALL}
                >
                  {profileStatusList?.map((item, index) => (
                    <MenuItem key={index} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </RHFSelect>
              </Grid>
              <Grid sx={{mb:1}} item xs={12} sm={12} md={4}>
                {values.resignation_url === PROFILE_UPLOAD_STATUS.submitted && (
                  <UploadFileV2
                    dirName="profile"
                    fileNameUpload="resignationLetter"
                    fileUrl={resignation_url}
                    setFileUrl={setResignation_url}
                  />
                )}
              </Grid>
            </Grid>
            {checkValue('resignation_url') && (
              <Grid container item xs={12} sm={12} md={6} lg={6} xl={12}>
                <Grid item xs={12} sm={12} md={2}>
                  <br />
                </Grid>
                <Grid item xs={12} sm={12} md={10}>
                  {values.resignation_url === PROFILE_UPLOAD_STATUS.waiting && (
                    <Grid alignItems="center" container item xl={12}>
                      <Grid item xl={4}>
                        <Typography component="span">{t('addLatest')}</Typography>
                      </Grid>
                      <Grid item xl={3}>
                        <RHFDatePicker
                          shrink={false}
                          size={SIZE_FIELD.SMALL}
                          name="resignation_date"
                        />
                      </Grid>
                    </Grid>
                  )}
                </Grid>
              </Grid>
            )}
          </Grid>

          <Grid container item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Grid container item xl={12} alignItems="center" spacing={3}>
              <Grid item xs={12} sm={12} md={8}>
                <RHFSelect
                  isLabel
                  label={t('documentTaxRelationship')}
                  inputColor="#000"
                  placeholderColor="#000"
                  backgroundColor="#fff"
                  name="relationship_url"
                  placeholder={t('documentTaxRelationship')}
                  shrink={false}
                  size={SIZE_FIELD.SMALL}
                >
                  {profileStatusList?.map((item, index) => (
                    <MenuItem key={index} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </RHFSelect>
              </Grid>
              <Grid sx={{mb:1}} item xs={12} sm={12} md={4}>
                {values.relationship_url === PROFILE_UPLOAD_STATUS.submitted && (
                  <UploadFileV2
                    dirName="profile"
                    fileNameUpload="documentTaxRelationship"
                    fileUrl={relationship_url}
                    setFileUrl={setRelationship_url}
                  />
                )}
              </Grid>
            </Grid>
            {checkValue('relationship_url') && (
              <Grid container item xs={12} sm={12} md={6} lg={6} xl={12}>
                <Grid item xs={12} sm={12} md={2}>
                  <br />
                </Grid>
                <Grid item xs={12} sm={12} md={10}>
                  {values.relationship_url === PROFILE_UPLOAD_STATUS.waiting && (
                    <Grid alignItems="center" container item xl={12}>
                      <Grid item xl={4}>
                        <Typography component="span">{t('addLatest')}</Typography>
                      </Grid>
                      <Grid item xl={3}>
                        <RHFDatePicker
                          shrink={false}
                          size={SIZE_FIELD.SMALL}
                          name="relationship_date"
                        />
                      </Grid>
                    </Grid>
                  )}
                </Grid>
              </Grid>
            )}
          </Grid>

          {/* <Grid sx={{ mt: 2 }} item xs={12} sm={12} md={6} lg={6} xl={6}>
            <RHFRadioGroup
              onChange={handleChangeSourceOptions}
              row
              spacing={4}
              name="sourceOptions"
              options={SOURCE_OPTIONS}
            />
            <RHFSelect
              size="small"
              sx={{ mt: 1 }}
              inputColor="#000"
              placeholderColor="#000"
              backgroundColor="#fff"
              name="source"
              label={t('sourceEmployee')}
              placeholder={t('sourceEmployee')}
            >
              {status?.map((item, index) => (
                <MenuItem key={index} value={item.objectCode}>
                  {item.objectName}
                </MenuItem>
              ))}
            </RHFSelect>
          </Grid>
          <Grid sx={{ mt: 2 }} item xs={12} sm={12} md={12} lg={12} xl={12}>
            <RHFRadioGroup
              onChange={handleChangeExperienceOptions}
              row
              spacing={4}
              name="experienceOptions"
              options={EXPERIENCE_OPTIONS}
            />
            <RHFSelect
              size="small"
              sx={{ mt: 1 }}
              inputColor="#000"
              placeholderColor="#000"
              backgroundColor="#fff"
              name="experience"
              label={t('experienceEmployee')}
              placeholder={t('experienceEmployee')}
            >
              {experienceStatus?.map((item, index) => (
                <MenuItem key={index} value={item.objectCode}>
                  {item.objectName}
                </MenuItem>
              ))}
            </RHFSelect>
            <RHFTextField
              sx={{ mt: 2 }}
              size="small"
              inputColor="#000"
              placeholderColor="#000"
              backgroundColor="#fff"
              name="yoe"
              label={t('yoe')}
            />
          </Grid> */}
        </Grid>

        <Grid
          sx={{ mt: 2, ml: 1, textAlign: 'right' }}
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
        >
          <LoadingButton
            disabled={disabled}
            loading={loading}
            onClick={handleDownloadProfiles}
            type="button"
            variant="contained"
          >
            <Iconify icon="eva:download-outline" sx={{ mr: 1 }} />
            {t('downloadAllProfiles')}
          </LoadingButton>
        </Grid>
      </Card>
      {canPerformAction(employeeProfile, PermissionList.EMPLOYEE_PROFILE) && (
        <CreateComponent isEdit isSubmitting={isSubmitting} />
      )}
    </FormProvider>
  );
};

export default EmployeeProfileInformation;
