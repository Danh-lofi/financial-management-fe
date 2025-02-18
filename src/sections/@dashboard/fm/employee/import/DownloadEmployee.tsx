import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { genderList } from '@/assets/data';
import { RHFDatePicker, RHFSelect } from '@/components/hook-form';
import FormProvider from '@/components/hook-form/FormProvider';
import { DEFAULT_PAGINATION, LOCAL_STORAGE_KEYS, SIZE_FIELD } from '@/constants/app.constants';
import { useLocales } from '@/locales';
import { getListPosition } from '@/redux/slices/dashboard/position';
import { getListProject } from '@/redux/slices/dashboard/project';
import { dispatch, useSelector } from '@/redux/store';
import { LocalUtils } from '@/utils/local';
import { LoadingButton } from '@mui/lab';
import { Button, CircularProgress, Grid, MenuItem } from '@mui/material';

type Props = {};

const DownloadEmployee = (props: Props) => {
  const {t} = useLocales()
  // useSelector
  const { projectList } = useSelector((state) => state.project);
  const { positionList } = useSelector((state) => state.position);

  // useState
  const [loadingDownload, setLoadingDownload] = useState<boolean>(false);
  const [projectOptions, setProjectOptions] = useState({
    pageIndex: DEFAULT_PAGINATION.PAGE_INDEX,
    pageSize: 1000,
  });
  const [positionOptions, setPositionOptions] = useState({
    pageIndex: DEFAULT_PAGINATION.PAGE_INDEX,
    pageSize: DEFAULT_PAGINATION.PAGE_SIZE,
  });
  const methods = useForm<any>({
    defaultValues: {},
  });
  const {
    reset,
    watch,
    control,
    setError,
    clearErrors,
    register,
    setValue,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  // Download
  const handleDownEmployee = async (paramsData:any) => {
    setLoadingDownload(true);
    const res = await axios({
      url: `${process.env.REACT_APP_API_ENPOINT}/${process.env.REACT_APP_API_PREFIX}/employee/export-employee`,
      method: 'GET',
      params: paramsData,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${LocalUtils.get(LOCAL_STORAGE_KEYS.ACCESS_TOKEN)}`,
      },
      responseType: 'blob',
    }).then((response) => {
      const url = window.URL.createObjectURL(response.data);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'employee-list.xlsx';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      setLoadingDownload(false);
    });
  };

  const onSubmit = (data:any) => {
    const checkGender = (gender: string) => {
      if (gender === 'Nam') {
        return true;
      }
      if (gender === 'Nữ') {
        return false;
      }
      return null;
    };
   const submitData = {
    ...data,
    gender: checkGender(data.gender),
   }
   handleDownEmployee(submitData)
  }

  const handleGetProject = async (options: any) => {
    await dispatch(getListProject(options));
  };
  const handlePosition = async (options: any) => {
    await dispatch(getListPosition(options));
  };

  // useEffect
  useEffect(() => {
    handleGetProject(projectOptions);
    handlePosition(positionOptions);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectOptions]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12} xl={4}>
          <RHFSelect
           size={SIZE_FIELD.SMALL}
            name="project_id"
            label={t('project')}
            placeholder={t('project')}
            onScrollEvent={() => {
              setProjectOptions({
                ...projectOptions,
                pageSize: (projectOptions.pageSize += 10),
              });
            }}
          >
            <MenuItem value="">{t('none')}</MenuItem>
            {projectList?.map((item: any, index: number) => (
              <MenuItem key={index} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </RHFSelect>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
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
          <Grid item xs={12} sm={12} md={4}>
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

          <Grid item xs={12} sm={12} md={4}>
            <RHFDatePicker size={SIZE_FIELD.SMALL} label={t('workingDate')} name="jobStartDate" />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <RHFDatePicker size={SIZE_FIELD.SMALL} label={t('jobEndDate')} name="jobEndDate" />
          </Grid>
          
      </Grid>

      {loadingDownload ? (
        <CircularProgress sx={{ mt: 3, ml: 3 }} thickness={4} size={20} />
      ) : (
        <LoadingButton sx={{ mt: 1 }} loading={loadingDownload} component="label" variant="text">
          <Button
            // onClick={(e: any) => {
            //   handleDownEmployee();
            // }}
            type='submit'
            variant="contained"
          >
            {t('downloadEmployee')}
          </Button>
        </LoadingButton>
      )}
    </FormProvider>
  );
};

export default DownloadEmployee;
