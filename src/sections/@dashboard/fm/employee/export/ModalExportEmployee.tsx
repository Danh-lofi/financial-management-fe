import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { RHFAutocomplete, RHFSelect } from '@/components/hook-form';
import FormProvider from '@/components/hook-form/FormProvider';
import Iconify from '@/components/iconify/Iconify';
import { PermissionWrapper } from '@/components/permission/PermissionWrapper';
import {
  DEFAULT_PAGINATION,
  LOCAL_STORAGE_KEYS,
  PermissionAction,
  PermissionList,
  SIZE_FIELD,
} from '@/constants/app.constants';
import { useLocales } from '@/locales';
import { getListProject } from '@/redux/slices/dashboard/project';
import { dispatch, useSelector } from '@/redux/store';
import { LocalUtils } from '@/utils/local';
import SnakeBar from '@/utils/snackbar';
import { Utils } from '@/utils/utils';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { LoadingButton, TabContext, TabList, TabPanel } from '@mui/lab';
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Tab,
  Tooltip,
  Typography,
} from '@mui/material';

type Props = {
  openExport?: boolean;
  handleClose?: any;
};

const ModalExportEmployee = ({ openExport = false, handleClose }: Props) => {
  // Language
  const { t } = useLocales();
  const debounceSearchProject = useRef<any>(null);

  // useSelector
  const { projectList } = useSelector((state) => state.project);
  // useState
  const [loadingDownload, setLoadingDownload] = useState<boolean>(false);
  const [projectSelected, setProjectSelected] = useState('');
  const [params, setParams] = useState({
    pageIndex: DEFAULT_PAGINATION.PAGE_INDEX,
    pageSize: DEFAULT_PAGINATION.PAGE_SIZE,
  });
  const [projectOptions, setProjectOptions] = useState({
    pageIndex: DEFAULT_PAGINATION.PAGE_INDEX,
    pageSize: 1000,
    keyword: '',
  });

  const handleSelectedProject = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProjectSelected(event.target.value);
  };

  const handleGetProject = async (options: any) => {
    await dispatch(getListProject(options));
  };

  useEffect(() => {
    handleGetProject(projectOptions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const methods = useForm<any>({
    defaultValues: {},
  });
  const {
    handleSubmit,

    formState: { isSubmitting, errors },
  } = methods;

  const handleDownEmployee = async (data: any) => {
    setLoadingDownload(true);
    const res = await axios({
      url: `${process.env.REACT_APP_API_ENPOINT}/${process.env.REACT_APP_API_PREFIX}/employee/employee-report`,
      method: 'GET',
      params: {
        projectId: data,
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
      link.download = 'employee-list.xlsx';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      setLoadingDownload(false);
    });
  };

  const onSubmit = async (data: any) => {
    const projectArray = data.project_id.map((project: any) => project.value);
    await handleDownEmployee(projectArray?.join(','));
    await handleClose();
  };

  return (
    <Dialog fullWidth maxWidth="sm" open={openExport} onClose={handleClose}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>{t('employeeExport')}</DialogTitle>
        <DialogContent>
          <RHFAutocomplete
            sx={{ mt: 2 }}
            multiple
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
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined" color="inherit">
            {t('close')}
          </Button>
          {loadingDownload ? (
            <CircularProgress sx={{ml:2}} thickness={4} size={20} />
          ) : (
            <LoadingButton loading={loadingDownload} component="label" variant="text">
              <Button type="submit" variant="contained">
                {t('downloadEmployee')}
              </Button>
            </LoadingButton>
          )}
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
};

export default ModalExportEmployee;
