import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { genderList } from '@/assets/data';
import { RHFAutocomplete, RHFDatePicker, RHFSelect, RHFTextField } from '@/components/hook-form';
import FormProvider from '@/components/hook-form/FormProvider';
import { DEFAULT_PAGINATION, SIZE_FIELD } from '@/constants/app.constants';
import { useLocales } from '@/locales';
import { getListPosition } from '@/redux/slices/dashboard/position';
import { getListProject } from '@/redux/slices/dashboard/project';
import { dispatch, useSelector } from '@/redux/store';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { Box, Button, Grid, MenuItem } from '@mui/material';

// @mui


// components







// ----------------------------------------------------------------------

type Props = {
  setParams?: any;
  params?: any;
};

export default function EmployeeTableToolbar({ setParams, params }: Props) {
  const { projectList } = useSelector((state) => state.project);
  const { positionList } = useSelector((state) => state.position);
  const { t } = useLocales();
  const debounceSearchProject = useRef<any>(null);

  const methods = useForm<any>({
    defaultValues: {},
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

  const handleGetProject = async (options: any) => {
    await dispatch(getListProject(options));
  };

  const handlePosition = async (options: any) => {
    await dispatch(getListPosition(options));
  };

  const handleFilter = async (data: any) => {
    console.log(data);
    const checkGender = (gender: string) => {
      if (gender === 'Nam') {
        return true;
      }
      if (gender === 'Nữ') {
        return false;
      }
      return null;
    };
  
    setParams({
      ...params,
      ...data,
      gender: checkGender(data.gender),
      project_id: data.project_id?.value ?? '',
      pageIndex: DEFAULT_PAGINATION.PAGE_INDEX,
      pageSize: DEFAULT_PAGINATION.PAGE_SIZE,
    });
  };
  useEffect(() => {
    handleGetProject(projectOptions);
  }, [projectOptions]);
  useEffect(() => {
    handlePosition(positionOptions);
  }, [positionOptions]);
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(handleFilter)}>
      <Box sx={{ width: '100%', m: 2, textAlign: 'center' }}>
        <Grid container spacing={3} sx={{ width: '100%', alignItems: 'center' }}>
          <Grid item xs={12} sm={12} md={3}>
            {/* <RHFSelect
              size={SIZE_FIELD.SMALL}
              name="project_id"
              label={t('project')}
              placeholder={t('project')}
              onScrollEvent={() => {
                handleGetProject({
                  ...projectOptions,
                  pageSize: (projectOptions.pageSize += 10),
                });
              }}
            >
              <MenuItem value="">{t('none')}</MenuItem>
              {projectList?.map((item, index) => (
                <MenuItem key={index} value={item.id}>
                  {item.name}
                </MenuItem>
              ))}
            </RHFSelect> */}

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
                setProjectOptions({
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
          {/* <Grid item xs={12} sm={12} md={3}>
            <RHFTextField
              size={SIZE_FIELD.SMALL}
              name="keyword"
              placeholder={t('search') || 'Search...'}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                  </InputAdornment>
                ),
              }}
            />
          </Grid> */}
          <Grid item xs={12} sm={12} md={3}>
            <RHFSelect
              size={SIZE_FIELD.SMALL}
              name="position_id"
              label={t('position')}
              placeholder={t('position')}
              onScrollEvent={() => {
                setPositionOptions({
                  ...positionOptions,
                  pageSize: (positionOptions.pageSize += 10),
                });
              }}
            >
              <MenuItem value="">{t('none')}</MenuItem>
              {positionList?.map((item, index) => (
                <MenuItem key={index} value={item.id}>
                  {item.name}
                </MenuItem>
              ))}
            </RHFSelect>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <RHFTextField
              size={SIZE_FIELD.SMALL}
              name="keyword"
              label={t('keyword')}
              placeholder={t('keywordFilter')}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={3}>
            <RHFSelect
              size={SIZE_FIELD.SMALL}
              name="gender"
              label={t('gender')}
              placeholder={t('gender')}
            >
              <MenuItem value="">{t('none')}</MenuItem>

              {genderList?.map((item, index) => (
                <MenuItem key={index} value={item.value}>
                  {item?.label}
                </MenuItem>
              ))}
            </RHFSelect>
          </Grid>

          <Grid item xs={12} sm={12} md={3}>
            <RHFDatePicker size={SIZE_FIELD.SMALL} label={t('workingDate')} name="jobStartDate" />
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <RHFDatePicker size={SIZE_FIELD.SMALL} label={t('jobEndDate')} name="jobEndDate" />
          </Grid>
          <Grid item xs={12} sm={12} md={2}>
            <Button
              sx={{ flexShrink: 0, minWidth: { xs: '100%', md: 0 } }}
              type="submit"
              variant="contained"
              startIcon={<FilterAltOutlinedIcon />}
            >
              {t('apply')}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </FormProvider>
  );
}
