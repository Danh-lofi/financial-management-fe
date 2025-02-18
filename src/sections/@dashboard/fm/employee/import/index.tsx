import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { RHFSelect } from '@/components/hook-form';
import FormProvider from '@/components/hook-form/FormProvider';
import Iconify from '@/components/iconify/Iconify';
import { PermissionWrapper } from '@/components/permission/PermissionWrapper';
import {
  DEFAULT_PAGINATION,
  LOCAL_STORAGE_KEYS,
  PermissionAction,
  PermissionList,
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
  Grid,
  IconButton,
  MenuItem,
  Tab,
  Tooltip,
  Typography,
} from '@mui/material';
import DownloadEmployee from './DownloadEmployee';

type Props = {
  openImport?: boolean;
  handleClose?: any;
  getList?: any;
};

const ModalImport = ({ openImport = false, handleClose, getList }: Props) => {
  const [tab, setTab] = useState('import');
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingDownload, setLoadingDownload] = useState<boolean>(false);
 

  const [params, setParams] = useState({
    pageIndex: DEFAULT_PAGINATION.PAGE_INDEX,
    pageSize: DEFAULT_PAGINATION.PAGE_SIZE,
  });

  const [fileUrl, setFileUrl] = useState<any>();
  const { t } = useLocales();


  const handleChangeTabs = (event: React.SyntheticEvent, newValue: any) => {
    setFileUrl('');
    setTab(newValue);
  };

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
    formState: { isSubmitting, errors },
  } = methods;
  const value = watch();
  const handleDownloadTemplate = async () => {
    setLoadingDownload(true);
    const res = await axios({
      url: `${process.env.REACT_APP_API_ENPOINT}/${process.env.REACT_APP_API_PREFIX}/employee/download-template-import`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${LocalUtils.get(LOCAL_STORAGE_KEYS.ACCESS_TOKEN)}`,
      },
      responseType: 'blob',
    }).then((response) => {
      const url = window.URL.createObjectURL(response.data);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'template-create-employee.xlsx';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      setLoadingDownload(false);
    });
  };

  const handleSubmit = async (data: any) => {
    console.log(data);
    if (fileUrl && tab === 'import') {
      const formData = new FormData();
      formData.append('file', fileUrl, fileUrl.name);
      const res = await axios({
        url: `${process.env.REACT_APP_API_ENPOINT}/${process.env.REACT_APP_API_PREFIX}/employee/import-create`,
        method: 'POST',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${LocalUtils.get(LOCAL_STORAGE_KEYS.ACCESS_TOKEN)}`,
        },
        responseType: 'blob',
      })
        .then((response) => {
          SnakeBar.success(t('createSuccess'));
          setFileUrl('');
          handleClose(true);
          getList(params);
          console.log(response.data);
        })
        .catch((error) => {
          setFileUrl('');
          SnakeBar.error(t('fileInvalid'));
        });
    }
    if (fileUrl && tab === 'export') {
      const formData = new FormData();
      formData.append('file', fileUrl, fileUrl.name);
      const res = await axios({
        url: `${process.env.REACT_APP_API_ENPOINT}/${process.env.REACT_APP_API_PREFIX}/employee/import-update`,
        method: 'PUT',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${LocalUtils.get(LOCAL_STORAGE_KEYS.ACCESS_TOKEN)}`,
        },
        responseType: 'blob',
      })
        .then((response) => {
          SnakeBar.success(t('updateSuccess'));
          setFileUrl('');
          handleClose(true);
          getList(params);
          console.log(response.data);
        })
        .catch((error) => {
          setFileUrl('');
          SnakeBar.error(t('fileInvalid'));
          console.error(error);
        });
    } else if (!fileUrl) {
      SnakeBar.error(t('chooseFile'));
    }
  };
  const handleUpload = async (file: any) => {
    try {
      setLoading(true);
      setFileUrl(file);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteFile = () => {
    setFileUrl('');
  };

  return (
    <FormProvider methods={methods}>
      <Dialog fullWidth maxWidth="md" open={openImport} onClose={handleClose}>
        <DialogTitle>{t('employee')}</DialogTitle>
        <DialogContent>
          <TabContext value={tab}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChangeTabs} aria-label="lab API tabs example">
                {Utils.checkPermission(PermissionList.IMPORT_EMPLOYEE, PermissionAction.IMPORT) && (
                  <Tab label={t('importCreate')} value="import" />
                )}
                {Utils.checkPermission(
                  PermissionList.IMPORT_UPDATE_EMPLOYEE,
                  PermissionAction.IMPORT
                ) && <Tab label={t('importUpdate')} value="export" />}
              </TabList>
            </Box>
            <TabPanel sx={{ px: 0 }} value="import">
              {loadingDownload ? (
                <CircularProgress sx={{ mt: 3, ml: 3 }} thickness={4} size={20} />
              ) : (
                <LoadingButton loading={loadingDownload} component="label" variant="text">
                  <Button
                    onClick={(e: any) => {
                      handleDownloadTemplate();
                    }}
                    variant="contained"
                  >
                    {t('downloadTemplate')}
                  </Button>
                </LoadingButton>
              )}

              <Box>
                {fileUrl ? (
                  <Box sx={{ mt: 1, display: 'flex', gap: 0.5, alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'flex-end' }}>
                      <InsertDriveFileIcon />
                      <Typography variant="body2">{fileUrl.name}</Typography>
                    </Box>
                    <Tooltip onClick={handleDeleteFile} title={t('delete')}>
                      <IconButton>
                        <HighlightOffIcon color="error" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                ) : (
                  <LoadingButton
                    loading={loading}
                    sx={{ maxWidth: 200, mt: 1, ml: 1 }}
                    component="label"
                    variant="text"
                  >
                    <input
                      onChange={(e) => handleUpload(e.target.files?.[0])}
                      multiple
                      hidden
                      accept=".xlsx,.xls"
                      type="file"
                    />
                    <Iconify icon="eva:cloud-upload-fill" />
                    {t('uploadedFile')}
                  </LoadingButton>
                )}
              </Box>
            </TabPanel>
            <TabPanel sx={{ px: 0 }} value="export">
              <DownloadEmployee/>

              <Box>
                {fileUrl ? (
                  <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'flex-end' }}>
                      <InsertDriveFileIcon />
                      <Typography variant="body2">{fileUrl.name}</Typography>
                    </Box>
                    <Tooltip onClick={handleDeleteFile} title={t('delete')}>
                      <IconButton>
                        <HighlightOffIcon color="error" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                ) : (
                  <LoadingButton
                    loading={loading}
                    sx={{ maxWidth: 200, mt: 1, ml: 1 }}
                    component="label"
                    variant="text"
                  >
                    <input
                      onChange={(e) => handleUpload(e.target.files?.[0])}
                      multiple
                      hidden
                      accept=".xlsx,.xls"
                      type="file"
                    />
                    <Iconify sx={{ mr: 1 }} icon="eva:cloud-upload-fill" />
                    {t('uploadedFile')}
                  </LoadingButton>
                )}
              </Box>
            </TabPanel>
          </TabContext>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined" color="inherit">
            {t('close')}
          </Button>
          <Button type="button" variant="contained" onClick={handleSubmit}>
            {tab === 'export' ? t('update') : t('create')}
          </Button>
        </DialogActions>
      </Dialog>
    </FormProvider>
  );
};

export default ModalImport;
