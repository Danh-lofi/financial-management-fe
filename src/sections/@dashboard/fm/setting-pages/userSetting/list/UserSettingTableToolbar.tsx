import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLocales } from '@/locales';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { Box, Button, Grid, InputAdornment, TextField } from '@mui/material';
import { getListProject } from '../../../../../../@/redux/slices/dashboard/project';
import { getListUser } from '../../../../../../@/redux/slices/dashboard/user';
import { dispatch, useSelector } from '../../../../../../@/redux/store';
import { RHFMultiSelect, RHFTextField } from '../../../../../../components/hook-form';
import FormProvider from '../../../../../../components/hook-form/FormProvider';
import Iconify from '../../../../../../components/iconify';
import { DEFAULT_PAGINATION } from '../../../../../../constants/app.constants';

// @mui


// components









// ----------------------------------------------------------------------

type Props = {};

type IParams = {
  role_id: string[];
  project_id: string[];
  keyword: string;
};

export default function UserSettingTableToolbar() {
  const { t } = useLocales();
  const { roleList } = useSelector((state) => state.user);
  const { projectList } = useSelector((state) => state.project);
  const methods = useForm<IParams>({
    defaultValues: {
      role_id: [],
      project_id: [],
      keyword: '',
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

  const onSubmit = (data: IParams) => {
    const { role_id, project_id } = data;
    // covert array to string
    const listRoleId = role_id.join(',');
    const listProjectId = project_id.join(',');
    dispatch(
      getListUser({
        ...data,
        role_id: listRoleId,
        project_id: listProjectId,
        pageIndex: DEFAULT_PAGINATION.PAGE_INDEX,
        pageSize: DEFAULT_PAGINATION.PAGE_SIZE,
      })
    );
  };

  useEffect(() => {
    // if (!projectList.length) {
      dispatch(
        getListProject({
          pageIndex: DEFAULT_PAGINATION.PAGE_INDEX,
          pageSize: 1000,
        })
      );
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ width: '100%', m: 2, textAlign: 'center' }}>
        <Grid container spacing={3} sx={{ width: '100%', alignItems: 'center' }}>
          <Grid item xs={12} sm={12} md={2}>
            {roleList && roleList.length > 0 && (
              <RHFMultiSelect
                chip
                checkbox
                label=""
                sx={{ width: '100%' }}
                name="role_id"
                placeholder={t('role')}
                options={roleList?.map((item: any) => {
                  return {
                    label: item?.Name,
                    value: item?.Id.toString(),
                  };
                })}
              />
            )}
          </Grid>
          <Grid item xs={12} sm={12} md={2}>
            {projectList && projectList.length > 0 && (
              <RHFMultiSelect
                chip
                checkbox
                label=""
                sx={{ width: '100%' }}
                name="project_id"
                placeholder={t('project')}
                options={projectList?.map((item: any) => {
                  return {
                    label: item.name,
                    value: item.id,
                  };
                })}
              />
            )}
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <RHFTextField
              fullWidth
              
              name="keyword"
              label={t('search')}
              shrink={false}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={2}>
            <Button
              sx={{ flexShrink: 0 }}
              type="submit"
              variant="contained"
              // onClick={handleClick}
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
