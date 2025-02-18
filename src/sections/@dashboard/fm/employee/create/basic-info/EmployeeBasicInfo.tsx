import { paramCase } from 'change-case';
import moment from 'moment';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import { UploadIllustration } from '@/assets/illustrations';
import {
  RHFAutocomplete,
  RHFCheckbox,
  RHFDatePicker,
  RHFRadioGroup,
  RHFSelect,
  RHFTextField,
  RHFUpload,
} from '@/components/hook-form';
import FormProvider from '@/components/hook-form/FormProvider';
import { useSettingsContext } from '@/components/settings';
import {
  DEFAULT_PAGINATION,
  GENDER_OPTION,
  MARRIAGE_OPTION,
  SIZE_FIELD,
  STYLE_CONSTANTS,
  TYPE_OF_INDENTITY_CARD,
  textColor,
} from '@/constants/app.constants';
import { useLocales } from '@/locales';
import CreateComponent from '@/pages/components/CreateComponent';
import { getListDistrictApi, getListDistrictTemporaryApi } from '@/redux/slices/dashboard/district';
import { createEmployee, getOneEmployee, updateEmployee } from '@/redux/slices/dashboard/employee';
import { getListNationality } from '@/redux/slices/dashboard/nationality';
import { getListPosition } from '@/redux/slices/dashboard/position';
import { getListProject } from '@/redux/slices/dashboard/project';
import { getListProvinceApi } from '@/redux/slices/dashboard/province';
import { getListWardApi, getListWardTemporaryApi } from '@/redux/slices/dashboard/ward';
import { dispatch, useSelector } from '@/redux/store';
import { PATH_DASHBOARD } from '@/routes/paths';
import { EmployeeBasicFormSchema } from '@/utils/schemas';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Alert,
  Box,
  Card,
  Grid,
  InputLabel,
  MenuItem,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { EmployeeBasicForm } from '../../../../../../@types/employee';
import {
  RELATIONSHIP_STATUS,
  educationVN,
  ethnicGroup,
  religionVN,
} from '../../../../../../assets/data/employee-info-vi';
import { Utils } from '../../../../../../utils/utils';
import { IdentifySection } from './form-section/basic-form';

type Props = {
  editUser?: boolean;
  employeeId?: string | number;
};

const EmployeeBasicInfo = ({ editUser = false, employeeId }: Props) => {
  const { t } = useLocales();
  const navigate = useNavigate();
  const debounceSearchProject = useRef<any>(null);

  // Theme
  const { themeMode } = useSettingsContext();
  const isDark = themeMode === 'dark';
  const theme = useTheme();
  const PRIMARY_MAIN = theme.palette.primary;

  // useSelector
  const { employeeDetails } = useSelector((state) => state.employee);
  const { provinceList } = useSelector((state) => state.province);
  const { nationalityList } = useSelector((state) => state.nationality);
  const { districtList, districtTemporaryList } = useSelector((state) => state.district);
  const { wardList, wardTemporaryList } = useSelector((state) => state.ward);
  const { projectList } = useSelector((state) => state.project);
  const { positionList } = useSelector((state) => state.position);

  // useState
  const [flag, setFlag] = useState<boolean>(false);
  const [alert, setAlert] = useState<boolean>(false);
  const [errorBirth, setErrorBirth] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [typeOfIdentityCard, setTypeOfIdentityCard] = useState<string>('');
  const [nationalOptions, setNationalOptions] = useState({
    pageIndex: DEFAULT_PAGINATION.PAGE_INDEX,
    pageSize: 1000,
  });
  const [projectOptions, setProjectOptions] = useState({
    pageIndex: DEFAULT_PAGINATION.PAGE_INDEX,
    pageSize: 1000,
    keyword: '',
  });
  const [positionOptions, setPositionOptions] = useState({
    pageIndex: DEFAULT_PAGINATION.PAGE_INDEX,
    pageSize: DEFAULT_PAGINATION.PAGE_SIZE,
    keyword: '',
  });

  // Params
  const params = useParams();
  const isEdit = params.id || editUser;

  // Default Value
  const defaultValues = useMemo(
    () => ({
      g_id: '',
      fullName: '',
      dateOfBirth: null,
      gender: 'male',
      nationality: '',
      maritalStatus: RELATIONSHIP_STATUS.single,
      ethnic: '',
      religion: '',
      academicLevel: '',
      major: '',
      avatar_url: '',
      province_id: null,
      district_id: null,
      ward_id: null,
      address: '',
      temporaryProvince_id: null,
      temporaryDistrict_id: null,
      temporaryWard_id: null,
      temporaryAddress: '',
      phoneNumber: '',
      email: '',
      typeOfIdentityCard: '',
      identityCard: '',
      dateOfIssue: new Date(),
      placeOfIssue: '',
      identityFront_url: '',
      identityBack_url: '',
      isSameAddress: false,
      urgentPhone: '',
      urgentRelationship: '',
      project_id: '',
      oldIdentityCard: '',
      position_id: '',
    }),
    []
  );
  // Validation
  const methods = useForm<EmployeeBasicForm>({
    resolver: yupResolver(EmployeeBasicFormSchema),
    defaultValues,
  });
  const {
    reset,
    watch,
    control,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { isSubmitting, errors },
  } = methods;

  const watchValue = watch([
    'province_id',
    'district_id',
    'ward_id',
    'temporaryProvince_id',
    'temporaryDistrict_id',
    'temporaryWard_id',
    'address',
    'temporaryAddress',
    'isSameAddress',
  ]);
  const [
    province_id,
    district_id,
    ward_id,
    temporaryProvince_id,
    temporaryDistrict_id,
    temporaryWard_id,
    address,
    temporaryAddress,
    isSameAddress,
  ] = watchValue;

  const getAddress = (addr: any, ward: any, district: any, province: any) => {
    if (addr && ward && district && province) {
      return `${addr}, ${ward}, ${district}, ${province}`;
    }
    return '';
  };
  const handlePosition = async (options: any) => {
    await dispatch(getListPosition(options));
  };

  const province = provinceList.find((x) => x.id === province_id?.value)?.name;
  const district = districtList?.find((x) => x.id === district_id?.value)?.name;
  const ward = wardList?.find((x) => x.id === ward_id?.value)?.name?.trim();
  const provincePermanent = provinceList.find((x) => x.id === temporaryProvince_id?.value)?.name;
  const districtPermanent = districtTemporaryList?.find(
    (x) => x.id === temporaryDistrict_id?.value
  )?.name;
  const wardPermanent = wardTemporaryList
    ?.find((x) => x.id === temporaryWard_id?.value)
    ?.name?.trim();
  const userAddress = getAddress(address, ward, district, province);
  let temporaryUserAddress = getAddress(
    temporaryAddress,
    wardPermanent,
    districtPermanent,
    provincePermanent
  );

  // Validate age
  const handleChangeBirthDate = (date: Date) => {
    const age = moment().diff(date, 'years');
    if (age < 18 && age >= 16) {
      setErrorBirth(false);
      setIsDisabled(false);
      setAlert(true);
    } else if (age < 16) {
      setErrorBirth(true);
      setIsDisabled(true);
      setAlert(false);
    } else {
      setErrorBirth(false);
      setIsDisabled(false);
      setAlert(false);
    }
  };
  // Start Handle Change Address
  const handleChangeProvince = async (id: any) => {
    setValue('district_id', null);
    setValue('ward_id', null);
    if (id) {
      await dispatch(
        getListDistrictApi({
          provinceId: id,
          pageIndex: 1,
          pageSize: 1000,
        })
      );
    }
  };
  const handleChangeDistrict = async (id: any) => {
    setValue('ward_id', null);
    if (id) {
      await dispatch(
        getListWardApi({
          districtId: id,
          pageIndex: 1,
          pageSize: 10000,
        })
      );
    }
  };

  const handleChangeDistrictTemporary = async (id: any) => {
    setValue('temporaryWard_id', null);
    if (id) {
      await dispatch(
        getListWardTemporaryApi({
          districtId: id,
          pageIndex: 1,
          pageSize: 10000,
        })
      );
    }
  };
  const handleChangeProvinceTemporary = async (id: any) => {
    setValue('temporaryDistrict_id', null);
    setValue('temporaryWard_id', null);
    if (id) {
      await dispatch(
        getListDistrictTemporaryApi({
          provinceId: id,
          pageIndex: 1,
          pageSize: 1000,
        })
      );
    }
  };

  // Handle Upload
  const handleUploadAvatar = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });
      if (newFile) {
        setValue('avatar_url', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  const onSubmit = async (data: EmployeeBasicForm) => {
    if (typeof data.avatar_url !== 'string' && data.avatar_url)
      data.avatar_url = await Utils.uploadFile(data.avatar_url, 'profile');
    if (typeof data.identityFront_url !== 'string' && data.identityFront_url)
      data.identityFront_url = await Utils.uploadFile(data.identityFront_url, 'profile');
    if (typeof data.identityBack_url !== 'string' && data.identityBack_url)
      data.identityBack_url = await Utils.uploadFile(data.identityBack_url, 'profile');
    const submitValues = {
      ...data,
      id: isEdit ? params.id || employeeId : 0,
      nationality: data.nationality.value,
      dateOfBirth: moment(data.dateOfBirth).format('YYYY-MM-DD'),
      dateOfIssue: moment(data.dateOfIssue).format('YYYY-MM-DD'),
      gender: data.gender === 'male' ?? false,
      province_id: data.province_id?.value,
      project_id: data.project_id?.value,
      district_id: data.district_id?.value,
      ward_id: data.ward_id?.value,
      temporaryProvince_id: data.temporaryProvince_id?.value,
      temporaryDistrict_id: data.temporaryDistrict_id?.value,
      temporaryWard_id: data.temporaryWard_id?.value,
      identityCard: data.identityCard ? data.identityCard : null,
      oldIdentityCard:
        data.typeOfIdentityCard === TYPE_OF_INDENTITY_CARD.CITIZEN_IDENTIFICATION
          ? data.oldIdentityCard
          : null,
    };

    if (isEdit) {
      await dispatch(
        updateEmployee({
          data: submitValues,
          navigate: (id: string) =>
            navigate(PATH_DASHBOARD.fm.employeeManagement.editEmployee(paramCase(id.toString()))),
        })
      );
    } else {
      await dispatch(
        createEmployee({
          data: submitValues,
          navigate: (id: string) => navigate(PATH_DASHBOARD.fm.employeeManagement.employeeStatus),
        })
      );
    }
  };

  const getUserDetails = async () => {
    // setNameIdentify(employeeDetails?.typeOfIdentityCard);
    const currentProvince = provinceList?.find((x) => x.id === employeeDetails.province_id);
    const currentDistrict = districtList?.find((x) => x.id === employeeDetails.district_id);
    const currentWard = wardList?.find((x) => x.id === employeeDetails.ward_id);
    // Temp
    const currentTempProvince = provinceList?.find(
      (x) => x.id === employeeDetails.temporaryProvince_id
    );
    const currentTempDistrict = districtTemporaryList?.find(
      (x) => x.id === employeeDetails.temporaryDistrict_id
    );
    const currentTempWard = wardTemporaryList?.find(
      (x) => x.id === employeeDetails.temporaryWard_id
    );
    const currentNationality = nationalityList?.find(
      (x) => x.id.toString() === employeeDetails.nationality
    );
    const currentProject = projectList?.find((x) => x.id.toString() === employeeDetails.project_id);
    const currentValue = (current: any) => {
      return {
        label: `${current?.code} - ${current?.name}`,
        value: current?.id,
        code: current?.code,
      };
    };
    await reset({
      ...employeeDetails,
      gender: employeeDetails.gender ? 'male' : 'female',
      // project_id: employeeDetails.project_id.split(','),
      nationality: employeeDetails.nationality
        ? {
            label: `${currentNationality?.name}`,
            value: currentNationality?.id,
            code: currentNationality?.code,
          }
        : null,
      province_id: employeeDetails.province_id ? currentValue(currentProvince) : null,
      district_id: employeeDetails.district_id ? currentValue(currentDistrict) : null,
      ward_id: employeeDetails.ward_id ? currentValue(currentWard) : null,
      temporaryProvince_id: employeeDetails.temporaryProvince_id
        ? currentValue(currentTempProvince)
        : null,
      temporaryDistrict_id: employeeDetails.temporaryDistrict_id
        ? currentValue(currentTempDistrict)
        : null,
      temporaryWard_id: employeeDetails.temporaryWard_id ? currentValue(currentTempWard) : null,
      project_id: employeeDetails.project_id
        ? {
            label: `${currentProject?.name}`,
            value: currentProject?.id,
          }
        : null,
    });
  };

  const getUserOne = async (id: any) => {
    const { payload } = await dispatch(getOneEmployee(id));
    if (payload.typeOfIdentityCard) {
      setTypeOfIdentityCard(payload.typeOfIdentityCard);
      setValue('typeOfIdentityCard', payload.typeOfIdentityCard);
    }
    await dispatch(
      getListNationality({
        pageIndex: 1,
        pageSize: 1000,
      })
    );
    await dispatch(
      getListDistrictApi({
        provinceId: payload.province_id,
        pageIndex: 1,
        pageSize: 1000,
      })
    );
    if (payload.temporaryProvince_id) {
      await dispatch(
        getListDistrictTemporaryApi({
          provinceId: payload.temporaryProvince_id,
          pageIndex: 1,
          pageSize: 1000,
        })
      );
      await dispatch(
        getListWardTemporaryApi({
          districtId: payload.temporaryDistrict_id,
          pageIndex: 1,
          pageSize: 1000,
        })
      );
    }
    await dispatch(
      getListWardApi({
        districtId: payload.district_id,
        pageIndex: 1,
        pageSize: 1000,
      })
    );
  };

  useEffect(() => {
    if (params.id || employeeId) {
      const result = async () => {
        await getUserOne(params.id || employeeId);
      };
      result().then((res) => {
        setFlag(true);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id, employeeId]);

  useEffect(() => {
    if (flag) {
      getUserDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flag]);

  // handleScroll
  const handleGetNational = async (options: any) => {
    await dispatch(getListNationality(options));
  };
  const handleGetProject = async (options: any) => {
    await dispatch(getListProject(options));
  };

  useEffect(() => {
    handlePosition(positionOptions);
    dispatch(
      getListProvinceApi({
        pageIndex: 1,
        pageSize: 100,
      })
    );
    if (!params.id && !employeeId) {
      handleGetNational(nationalOptions);
    } else {
      dispatch(
        getListNationality({
          pageIndex: 1,
          pageSize: 1000,
        })
      );
    }
    if (!params.id && !employeeId) {
      handleGetProject(projectOptions);
    } else {
      dispatch(
        getListProject({
          pageIndex: DEFAULT_PAGINATION.PAGE_INDEX,
          pageSize: 1000,
        })
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isSameAddress) {
    temporaryUserAddress = userAddress;
  }
  useEffect(() => {
    if (isSameAddress) {
      setValue('temporaryProvince_id', province_id, { shouldValidate: true });
      setValue('temporaryDistrict_id', district_id, { shouldValidate: true });
      setValue('temporaryWard_id', ward_id, { shouldValidate: true });
      setValue('temporaryAddress', address, { shouldValidate: true });
    } else {
      setValue('temporaryProvince_id', null, { shouldValidate: true });
      setValue('temporaryDistrict_id', null, { shouldValidate: true });
      setValue('temporaryWard_id', null, { shouldValidate: true });
      setValue('temporaryAddress', '', { shouldValidate: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSameAddress, province_id, district_id, ward_id, address]);
  // submit

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Box>
        <Card sx={{ p: 3, backgroundColor: `${PRIMARY_MAIN}`, height: '100%' }}>
          <Grid container alignItems="center" spacing={2}>
            <Typography sx={{ ml: 3, marginBlock: 3 }} variant="h4">
              {t('basic')}
            </Typography>
            <Grid container alignItems="center" spacing={1} item xs={12} sm={12} md={12}>
              <Grid container spacing={5} item xl={12} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={12} md={12} xl={3}>
                  <RHFUpload
                    titleUpload={
                      <Typography
                        component="div"
                        sx={{
                          height: 'auto',
                          display: 'flex',
                          justifyContent: 'center',
                          textAlign: 'center',
                          alignItems: 'center',
                          flexDirection: 'column',
                        }}
                      >
                        <UploadIllustration width={100} />
                        <Typography sx={{ mt: 2, fontSize: '0.9rem' }} component="div">
                          {t('avatar')}
                        </Typography>
                      </Typography>
                    }
                    name="avatar_url"
                    maxSize={3145728}
                    onDrop={handleUploadAvatar}
                    onDelete={() => setValue('avatar_url', null, { shouldValidate: true })}
                  />
                </Grid>
                <Grid container item xs={12} sm={12} md={12} xl={9}>
                  <Grid sx={{ mb: 3 }} container alignItems="center" item xs={12} sm={12} md={12}>
                    <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
                      <InputLabel
                        sx={{
                          color: isDark ? textColor.white : textColor.black,
                          fontSize: '1rem',
                        }}
                      >
                        {t('ID fm')}
                        <span className="required">*</span>
                      </InputLabel>
                    </Grid>
                    <Grid item xs={12} sm={12} md={10} lg={10} xl={10}>
                      <RHFTextField
                        placeholderColor="#000"
                        backgroundColor="#fff"
                        inputColor="#000"
                        name="g_id"
                        size={SIZE_FIELD.SMALL}
                        shrink={false}
                      />
                    </Grid>
                  </Grid>

                  <Grid sx={{ mb: 3 }} container alignItems="center" item xs={12} sm={12} md={12}>
                    <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
                      <InputLabel
                        sx={{
                          color: isDark ? textColor.white : textColor.black,

                          fontSize: '1rem',
                        }}
                      >
                        {t('name')}
                        <span className="required">*</span>
                      </InputLabel>
                    </Grid>
                    <Grid item xs={12} sm={12} md={10} lg={10} xl={10}>
                      <RHFTextField
                        placeholderColor="#000"
                        backgroundColor="#fff"
                        inputColor="#000"
                        name="fullName"
                        size={SIZE_FIELD.SMALL}
                        shrink={false}
                      />
                    </Grid>
                  </Grid>

                  <Grid
                    sx={{ mb: 3 }}
                    container
                    alignItems="center"
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    spacing={3}
                  >
                    <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
                      <InputLabel
                        sx={{
                          color: isDark ? textColor.white : textColor.black,

                          fontSize: '1rem',
                        }}
                      >
                        {t('projectId')}
                        <span className="required">*</span>
                      </InputLabel>
                    </Grid>
                    <Grid item xs={12} sm={12} md={10} lg={10} xl={4}>
                      <RHFAutocomplete
                        onInputChange={(event, newInputValue) => {
                          if (debounceSearchProject.current) {
                            clearTimeout(debounceSearchProject.current);
                          }
                          debounceSearchProject.current = setTimeout(() => {
                            handleGetProject({
                              ...projectOptions,
                              keyword: newInputValue,
                            });
                          }, 1000);
                        }}
                        label={t('project')}
                        name="project_id"
                        handleScroll={() => {
                          handleGetProject({
                            ...projectOptions,
                            pageSize: (projectOptions.pageSize += 10),
                          });
                        }}
                        options={projectList?.map((item) => {
                          return {
                            label: `${item.name}`,
                            value: item.id,
                          };
                        })}
                        isOptionEqualToValue={(option, value) => option?.value === value?.value}
                        size={SIZE_FIELD.SMALL}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
                      <InputLabel
                        sx={{
                          color: isDark ? textColor.white : textColor.black,

                          fontSize: '1rem',
                        }}
                      >
                        {t('position')}
                        <span className="required">*</span>
                      </InputLabel>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                      <RHFSelect
                        size={SIZE_FIELD.SMALL}
                        name="position_id"
                        shrink={false}
                        placeholder={t('position')}
                        onScrollEvent={() => {
                          handlePosition({
                            ...positionOptions,
                            pageSize: (positionOptions.pageSize += 10),
                          });
                        }}
                      >
                        {positionList?.map((item: any, index: number) => (
                          <MenuItem key={index} value={item.id}>
                            {item.name}
                          </MenuItem>
                        ))}
                      </RHFSelect>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              <Grid
                sx={{ mb: 3 }}
                spacing={5}
                container
                alignItems="center"
                item
                xs={12}
                sm={12}
                md={12}
              >
                <Grid spacing={2} container alignItems="center" item xs={12} sm={12} md={12} xl={6}>
                  <Grid item xs={12} sm={12} md={2} xl={4}>
                    <Typography>
                      {t('dateOfBirth')} <span className="required">*</span>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={8}>
                    <RHFDatePicker
                      handleChange={handleChangeBirthDate}
                      shrink={false}
                      size={SIZE_FIELD.SMALL}
                      name="dateOfBirth"
                    />

                    {errorBirth && (
                      <Alert sx={{ mt: 2 }} variant="outlined" severity="error">
                        {t('notEnough16')}
                      </Alert>
                    )}
                    {alert && (
                      <Alert sx={{ mt: 2 }} variant="outlined" severity="warning">
                        {t('alertYearsOld')}
                      </Alert>
                    )}
                  </Grid>
                </Grid>
                <Grid spacing={2} container alignItems="center" item xs={12} sm={12} md={12} xl={6}>
                  <Grid item xs={12} sm={12} md={2} xl={4}>
                    <Typography>
                      {t('gender')} <span className="required">*</span>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={10} xl={8}>
                    <RHFRadioGroup row spacing={4} name="gender" options={GENDER_OPTION} />
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                spacing={5}
                sx={{ mb: 3 }}
                container
                alignItems="center"
                item
                xs={12}
                sm={12}
                md={12}
              >
                <Grid spacing={2} container alignItems="center" item xs={12} sm={12} md={12} xl={6}>
                  <Grid item md={2} xl={4}>
                    <Typography>
                      {t('nationality')} <span className="required">*</span>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={10} xl={8}>
                    <RHFAutocomplete
                      placeholderColor="#000"
                      backgroundColor="#fff"
                      inputColor="#000"
                      name="nationality"
                      shrink={false}
                      options={nationalityList?.map((item) => {
                        return {
                          label: `${item.name}`,
                          value: item.id,
                          code: item.code,
                        };
                      })}
                      isOptionEqualToValue={(option, value) => option?.value === value?.value}
                      size={SIZE_FIELD.SMALL}
                    />
                  </Grid>
                </Grid>
                <Grid spacing={2} container alignItems="center" item xs={12} sm={12} md={12} xl={6}>
                  <Grid item xs={12} sm={12} md={2} xl={4}>
                    <Typography>
                      {t('marriage')} <span className="required">*</span>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={10} xl={8}>
                    <RHFRadioGroup row spacing={4} name="maritalStatus" options={MARRIAGE_OPTION} />
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                sx={{ mb: 3 }}
                spacing={5}
                container
                alignItems="center"
                item
                xs={12}
                sm={12}
                md={12}
              >
                <Grid spacing={2} container alignItems="center" item xs={12} sm={12} md={6}>
                  <Grid item xs={12} sm={12} md={4}>
                    <Typography>
                      {t('ethnicGroup')}
                      <span className="required">*</span>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={8}>
                    <RHFSelect
                      placeholderColor="#000"
                      backgroundColor="#fff"
                      inputColor="#000"
                      name="ethnic"
                      // label=""
                      placeholder={t('ethnicGroup')}
                      size={SIZE_FIELD.SMALL}
                      shrink={false}
                    >
                      {ethnicGroup?.map((item, index) => (
                        <MenuItem key={index} value={item.value}>
                          {item.label}
                        </MenuItem>
                      ))}
                    </RHFSelect>
                  </Grid>
                </Grid>
                <Grid spacing={2} container alignItems="center" item xs={12} sm={12} md={6}>
                  <Grid item xs={12} sm={12} md={4}>
                    <Typography>
                      {t('religion')}
                      <span className="required">*</span>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={8}>
                    <RHFSelect
                      placeholderColor="#000"
                      backgroundColor="#fff"
                      inputColor="#000"
                      name="religion"
                      // label=""
                      placeholder={t('religion')}
                      shrink={false}
                      size={SIZE_FIELD.SMALL}
                    >
                      {religionVN?.map((item, index) => (
                        <MenuItem key={index} value={item.value}>
                          {item.label}
                        </MenuItem>
                      ))}
                    </RHFSelect>
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                sx={{ mb: 3 }}
                spacing={5}
                container
                alignItems="center"
                item
                xs={12}
                sm={12}
                md={12}
              >
                <Grid spacing={2} container alignItems="center" item xs={12} sm={12} md={6}>
                  <Grid item xs={12} sm={12} md={4}>
                    <Typography>
                      {t('education')}
                      <span className="required">*</span>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={8}>
                    <RHFSelect
                      placeholderColor="#000"
                      backgroundColor="#fff"
                      inputColor="#000"
                      name="academicLevel"
                      // label=""
                      placeholder={t('education')}
                      shrink={false}
                      size={SIZE_FIELD.SMALL}
                    >
                      {educationVN?.map((item, index) => (
                        <MenuItem key={index} value={item.value}>
                          {item.label}
                        </MenuItem>
                      ))}
                    </RHFSelect>
                  </Grid>
                </Grid>
                <Grid spacing={2} container alignItems="center" item xs={12} sm={12} md={6}>
                  <Grid item xs={12} sm={12} md={4}>
                    <Typography>{t('major')}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={8}>
                    <RHFTextField
                      placeholderColor="#000"
                      backgroundColor="#fff"
                      inputColor="#000"
                      name="major"
                      // label=""
                      shrink={false}
                      size={SIZE_FIELD.SMALL}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </Box>
      <IdentifySection
        control={control}
        setValue={setValue}
        typeOfIdentityCard={typeOfIdentityCard}
        clearErrors={clearErrors}
      />
      <Box>
        <Card sx={{ paddingInline: 3, paddingBlock: 5, mt: 4, backgroundColor: `${PRIMARY_MAIN}` }}>
          <Grid container spacing={3}>
            <Grid item alignItems="start" xs={12} sm={12} md={12} xl={3}>
              <Typography>
                {t('permanentAddress')} <span className="required">*</span>
              </Typography>
            </Grid>
            <Grid container alignItems="center" spacing={3} item xs={12} sm={12} md={12} xl={9}>
              <Grid item xs={12} sm={12} md={12} xl={6}>
                <RHFAutocomplete
                  onSelect={() => handleChangeProvince(province_id?.value)}
                  placeholderColor="#000"
                  backgroundColor="#fff"
                  inputColor="#000"
                  name="province_id"
                  label={t('province')}
                  options={provinceList.map((item) => {
                    return {
                      label: `${item.code} - ${item.name}`,
                      value: item.id,
                      code: item.code,
                    };
                  })}
                  isOptionEqualToValue={(option, value) => option?.value === value?.value}
                  size={SIZE_FIELD.SMALL}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} xl={6}>
                <RHFAutocomplete
                  onSelect={() => handleChangeDistrict(district_id?.value)}
                  placeholderColor="#000"
                  backgroundColor="#fff"
                  inputColor="#000"
                  name="district_id"
                  label={t('district')}
                  options={
                    province_id
                      ? districtList.map((item) => {
                          return {
                            label: `${item.code} - ${item.name}`,
                            value: item.id,
                            code: item.code,
                          };
                        })
                      : []
                  }
                  isOptionEqualToValue={(option, value) => option?.value === value?.value}
                  size={SIZE_FIELD.SMALL}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={12} xl={6}>
                <RHFAutocomplete
                  placeholderColor="#000"
                  backgroundColor="#fff"
                  inputColor="#000"
                  name="ward_id"
                  label={t('ward')}
                  options={
                    district_id
                      ? wardList.map((item) => {
                          return {
                            label: `${item.code} - ${item.name}`,
                            value: item.id,
                            code: item.code,
                          };
                        })
                      : []
                  }
                  isOptionEqualToValue={(option, value) => option?.value === value?.value}
                  size={SIZE_FIELD.SMALL}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={12} xl={6}>
                <RHFTextField
                  placeholderColor="#000"
                  backgroundColor="#fff"
                  inputColor="#000"
                  name="address"
                  label={t('permanentAddressLevel4')}
                  shrink={false}
                  size={SIZE_FIELD.SMALL}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={12} xl={12}>
                <RHFTextField
                  placeholderColor="#000"
                  backgroundColor="#fff"
                  inputColor="#000"
                  readOnly
                  value={userAddress}
                  shrink
                  defaultValue=""
                  disabled
                  name="permanentAddress"
                  label={t('permanentAddress')}
                  size={SIZE_FIELD.SMALL}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid sx={{ mt: 2 }} container spacing={3}>
            <Grid item xs={12} sm={12} md={12} xl={3}>
              <Typography>
                {t('temporaryResidenceAddress')} <span className="required">*</span>
              </Typography>
            </Grid>
            <Grid container alignItems="center" spacing={3} item xs={12} sm={12} md={12} xl={9}>
              <Grid item xs={12} sm={12} md={12} xl={6}>
                <RHFAutocomplete
                  onSelect={() => handleChangeProvinceTemporary(temporaryProvince_id?.value)}
                  placeholderColor="#000"
                  backgroundColor="#fff"
                  inputColor="#000"
                  disabled={isSameAddress}
                  name="temporaryProvince_id"
                  label={t('province')}
                  options={provinceList.map((item) => {
                    return {
                      label: `${item.code} - ${item.name}`,
                      value: item.id,
                      code: item.code,
                    };
                  })}
                  isOptionEqualToValue={(option, value) => option?.value === value?.value}
                  size={SIZE_FIELD.SMALL}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} xl={6}>
                <RHFAutocomplete
                  onSelect={() => handleChangeDistrictTemporary(temporaryDistrict_id?.value)}
                  placeholderColor="#000"
                  backgroundColor="#fff"
                  inputColor="#000"
                  disabled={isSameAddress}
                  name="temporaryDistrict_id"
                  label={t('district')}
                  options={
                    temporaryProvince_id
                      ? districtTemporaryList.map((item) => {
                          return {
                            label: `${item.code} - ${item.name}`,
                            value: item.id,
                            code: item.code,
                          };
                        })
                      : []
                  }
                  isOptionEqualToValue={(option, value) => option?.value === value?.value}
                  size={SIZE_FIELD.SMALL}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} xl={6}>
                <RHFAutocomplete
                  placeholderColor="#000"
                  backgroundColor="#fff"
                  inputColor="#000"
                  disabled={isSameAddress}
                  name="temporaryWard_id"
                  label={t('ward')}
                  options={
                    temporaryDistrict_id
                      ? wardTemporaryList.map((item) => {
                          return {
                            label: `${item.code} - ${item.name}`,
                            value: item.id,
                            code: item.code,
                          };
                        })
                      : []
                  }
                  isOptionEqualToValue={(option, value) => option?.value === value?.value}
                  size={SIZE_FIELD.SMALL}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={12} xl={6}>
                <RHFTextField
                  placeholderColor="#000"
                  backgroundColor="#fff"
                  inputColor="#000"
                  disabled={isSameAddress}
                  name="temporaryAddress"
                  label={t('temporaryResidenceAddressLevel4')}
                  size={SIZE_FIELD.SMALL}
                  shrink={false}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <RHFTextField
                  readOnly
                  placeholderColor="#000"
                  backgroundColor="#fff"
                  inputColor="#000"
                  defaultValue=""
                  name="temporaryResidenceAddress"
                  label={t('temporaryResidenceAddress')}
                  value={temporaryUserAddress}
                  shrink={temporaryUserAddress ? Boolean(true) : Boolean(false)}
                  size={SIZE_FIELD.SMALL}
                  disabled
                />
              </Grid>
            </Grid>

            <Grid xs={0} xl={3}>
              <br />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={9}>
              <RHFCheckbox label={t('isCoincide')} name="isSameAddress" />
            </Grid>
          </Grid>

          <Grid
            sx={{ mt: 4 }}
            spacing={4}
            container
            alignItems="center"
            item
            xs={12}
            sm={12}
            md={12}
          >
            <Grid container alignItems="center" item xs={12} md={12} sm={12} xl={6}>
              <RHFTextField
                label={t('phoneNumber')}
                isLabel
                isRequired
                placeholderColor="#000"
                backgroundColor="#fff"
                inputColor="#000"
                name="phoneNumber"
                size={SIZE_FIELD.SMALL}
              />
            </Grid>
            <Grid container alignItems="center" item xs={12} sm={12} md={12} xl={6}>
              <RHFTextField
                label={t('email')}
                isLabel
                isRequired
                placeholderColor="#000"
                backgroundColor="#fff"
                inputColor="#000"
                name="email"
                size={SIZE_FIELD.SMALL}
              />
            </Grid>
            <Grid container alignItems="center" item xs={12} sm={12} md={12} xl={6}>
              <RHFTextField
                label={t('emergencyContact')}
                isLabel
                placeholderColor="#000"
                backgroundColor="#fff"
                inputColor="#000"
                name="urgentPhone"
                size={SIZE_FIELD.SMALL}
              />
            </Grid>
            <Grid container alignItems="center" item xs={12} sm={12} md={12} xl={6}>
              <RHFTextField
                label={t('relationship')}
                isLabel
                placeholderColor="#000"
                backgroundColor="#fff"
                inputColor="#000"
                name="urgentRelationship"
                size={SIZE_FIELD.SMALL}
              />
            </Grid>
          </Grid>
        </Card>
      </Box>

      <CreateComponent disabled={isDisabled} isEdit={isEdit} isSubmitting={isSubmitting} />
    </FormProvider>
  );
};

export default EmployeeBasicInfo;
