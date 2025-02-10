import useResponsive from 'hooks/useResponsive';
import { useState } from 'react';
import { createEmployeeContract } from 'redux/slices/dashboard/employee';
import { dispatch, useSelector } from 'redux/store';
import { Utils } from 'utils/utils';
import { useLocales } from '@/locales';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Checkbox,
  Divider,
  Drawer,
  DrawerProps,
  IconButton,
  Stack,
  StackProps,
  Typography,
} from '@mui/material';
import { IFile } from '../../../../@types/file';
import FileThumbnail, { fileFormat, fileTypeByUrl } from '../../../../components/file-thumbnail';
import Iconify from '../../../../components/iconify';
import Scrollbar from '../../../../components/scrollbar';
import { fData } from '../../../../utils/formatNumber';
import { fDateTime } from '../../../../utils/formatTime';
import FileNewFolderDialog from './FileNewFolderDialog';

// @mui





// utils




// @types

// components




//



// ----------------------------------------------------------------------

interface Props extends DrawerProps {
  item: IFile;
  favorited?: boolean;
  //
  onFavorite?: VoidFunction;
  onCopyLink: VoidFunction;
  //
  onClose: VoidFunction;
  onDelete: VoidFunction;
  employeeId?: any;
}

export default function FileDetailsDrawer({
  open,
  favorited,
  //
  onFavorite,
  onCopyLink,
  onClose,
  onDelete,
  employeeId,
  ...other
}: Props) {
  const { t } = useLocales();
  const [loading, setLoading] = useState<boolean>(false);

  const { employeeProfile, employeeContract } = useSelector((state) => state.employee);

  const isMobile = useResponsive('down', 'sm');
  const [openUploadFile, setOpenUploadFile] = useState(false);
  const [probationary_url, setProbationary_url] = useState('');
  const [firstLaborContract_url, setFirstLaborContract_url] = useState('');
  const [secondLaborContract_url, setSecondLaborContract_url] = useState('');
  const [serviceContract_url, setServiceContract_url] = useState('');
  const [infiniteContract_url, setInfiniteContract_url] = useState('');
  const [trainingContract_url, setTrainingContract_url] = useState('');
  const handleUpload = async (e: any, item: any) => {
    setLoading(true);
    try {
      const file = e.target.files?.[0];
      const url = await Utils.uploadFile(file, 'contract');
      item.setUrl(url);
      const submitData = {
        ...employeeContract,
        [item.name]: url,
      };
      await dispatch(createEmployeeContract(submitData));
    } finally {
      setLoading(false);
    }
  };
  const dummyData = [
    {
      name: 'probationary_url',
      type: fileTypeByUrl(employeeContract?.probationary_url),
      isFavorited: false,
      url: employeeContract?.probationary_url || probationary_url,
      setUrl: (url: any) => setProbationary_url(url),
    },
    {
      name: 'firstLaborContract_url',
      type: fileTypeByUrl(employeeContract?.firstLaborContract_url),
      isFavorited: true,
      url: employeeContract?.firstLaborContract_url || firstLaborContract_url,
      setUrl: (url: any) => setFirstLaborContract_url(url),
    },
    {
      name: 'secondLaborContract_url',
      type: fileTypeByUrl(employeeContract?.secondLaborContract_url),
      isFavorited: true,
      url: employeeContract?.secondLaborContract_url || secondLaborContract_url,
      setUrl: (url: any) => setSecondLaborContract_url(url),
    },
    {
      name: 'trainingContract_url',
      type: fileTypeByUrl(employeeContract?.trainingContract_url),
      isFavorited: true,
      url: employeeContract?.trainingContract_url || trainingContract_url,
      setUrl: (url: any) => setTrainingContract_url(url),
    },

    {
      name: 'infiniteContract_url',
      type: fileTypeByUrl(employeeContract?.infiniteContract_url),
      isFavorited: true,
      url: employeeContract?.infiniteContract_url || infiniteContract_url,
      setUrl: (url: any) => setInfiniteContract_url(url),
    },

    {
      name: 'serviceContract_url',
      type: fileTypeByUrl(employeeContract?.serviceContract_url),
      isFavorited: true,
      url: employeeContract?.serviceContract_url || serviceContract_url,
      setUrl: (url: any) => setServiceContract_url(url),
    },

    // {
    //   id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b12_files',
    //   name: 'Bản cam kết',
    //   size: 4000000,
    //   type: 'docx',
    //   isFavorited: true,
    //   shared: [],
    //   url: employeeProfile?.agreement_url,
    //   tags: ['Docs', 'Projects', 'Work', 'Training', 'Sport', 'Foods'],
    //   dateCreated: '2023-04-10T01:36:22.468Z',
    //   dateModified: '2023-04-10T01:36:22.468Z',
    // },

    // {
    //   id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b12_files',
    //   name: 'Đơn thôi việc',
    //   size: 4000000,
    //   type: 'docx',
    //   isFavorited: true,
    //   shared: [],
    //   url: employeeProfile?.resignation_url,
    //   tags: ['Docs', 'Projects', 'Work', 'Training', 'Sport', 'Foods'],
    //   dateCreated: '2023-04-10T01:36:22.468Z',
    //   dateModified: '2023-04-10T01:36:22.468Z',
    // },

    // {
    //   id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b12_files',
    //   name: 'Bảng ký HĐTV',
    //   size: 4000000,
    //   type: 'docx',
    //   isFavorited: true,
    //   shared: [],
    //   url: employeeContract?.probationary_url,
    //   tags: ['Docs', 'Projects', 'Work', 'Training', 'Sport', 'Foods'],
    //   dateCreated: '2023-04-10T01:36:22.468Z',
    //   dateModified: '2023-04-10T01:36:22.468Z',
    // },

    // {
    //   id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b12_files',
    //   name: 'Bảng ký HĐLĐ lần 1',
    //   size: 4000000,
    //   type: 'docx',
    //   isFavorited: true,
    //   shared: [],
    //   url: employeeContract?.firstLaborContract_url,
    //   tags: ['Docs', 'Projects', 'Work', 'Training', 'Sport', 'Foods'],
    //   dateCreated: '2023-04-10T01:36:22.468Z',
    //   dateModified: '2023-04-10T01:36:22.468Z',
    // },

    // {
    //   id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b12_files',
    //   name: 'Bảng ký HĐLĐ lần 2',
    //   size: 4000000,
    //   type: 'docx',
    //   isFavorited: true,
    //   shared: [],
    //   url: employeeContract?.secondLaborContract_url,
    //   tags: ['Docs', 'Projects', 'Work', 'Training', 'Sport', 'Foods'],
    //   dateCreated: '2023-04-10T01:36:22.468Z',
    //   dateModified: '2023-04-10T01:36:22.468Z',
    // },

    // {
    //   id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b12_files',
    //   name: 'Bảng ký HĐLĐ lần 3',
    //   size: 4000000,
    //   type: 'docx',
    //   isFavorited: true,
    //   shared: [],
    //   url: employeeContract?.thirdLaborContract_url,
    //   tags: ['Docs', 'Projects', 'Work', 'Training', 'Sport', 'Foods'],
    //   dateCreated: '2023-04-10T01:36:22.468Z',
    //   dateModified: '2023-04-10T01:36:22.468Z',
    // },
  ];

  return (
    <Drawer
      open={open}
      onClose={onClose}
      anchor="right"
      BackdropProps={{
        invisible: true,
      }}
      PaperProps={{
        sx: { width: isMobile ? 320 : 400 },
      }}
      {...other}
    >
      <Scrollbar sx={{ height: 1 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 2.5 }}>
          <Typography variant="h6"> {t('profile')} </Typography>
          <Checkbox
            color="warning"
            icon={<Iconify icon="eva:star-outline" />}
            checkedIcon={<Iconify icon="eva:star-fill" />}
            checked={favorited}
            onChange={onFavorite}
            sx={{ p: 0.75 }}
          />
        </Stack>

        {dummyData?.map((item) => {
          if (item?.url?.includes('https')) {
            return (
              <Stack
                spacing={2.5}
                justifyContent="center"
                sx={{ p: 2.5, bgcolor: 'background.neutral', mb: 1 }}
              >
                <FileThumbnail
                  onDownload={() => window.open(item.url)}
                  imageView
                  file={item.type === 'folder' ? item.type : item.url}
                  sx={{ width: 64, height: 64 }}
                  imgSx={{ borderRadius: 1 }}
                />
                <Typography variant="h6" sx={{ wordBreak: 'break-all' }}>
                  {t(item.name)}
                </Typography>
                <Divider sx={{ borderStyle: 'dashed' }} />
                <Stack spacing={1.5}>
                  {/* <Row label="Size" value={fData(item.size)} />

                  <Row label="Modified" value={fDateTime(item.dateModified)} /> */}

                  <Row label="Type" value={fileFormat(item.type)} />
                </Stack>
              </Stack>
            );
          }
          return (
            <Stack
              spacing={2.5}
              justifyContent="center"
              sx={{ p: 2.5, bgcolor: 'background.neutral', mb: 1 }}
            >
              <Typography variant="h6" sx={{ wordBreak: 'break-all' }}>
                {t(item.name)}
              </Typography>
              <Divider sx={{ borderStyle: 'dashed' }} />
              <LoadingButton
                loading={loading}
                sx={{ maxWidth: 200, mt: 2 }}
                component="label"
                variant="outlined"
              >
                <input onChange={(e) => handleUpload(e, item)} multiple hidden type="file" />
                <Iconify sx={{ mr: 1 }} icon="eva:cloud-upload-fill" />
                {t('uploadedInformation')}
              </LoadingButton>
            </Stack>
          );
        })}
      </Scrollbar>
      {/* 
      <Box sx={{ p: 2.5 }}>
        <Button
          fullWidth
          variant="soft"
          color="primary"
          size="large"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={() => setOpenUploadFile(true)}
        >
          {t('addNew')}
        </Button>
      </Box> */}

      <FileNewFolderDialog open={openUploadFile} onClose={() => setOpenUploadFile(false)} />
    </Drawer>
  );
}

// ----------------------------------------------------------------------

interface PanelProps extends StackProps {
  label: string;
  toggle: boolean;
  onToggle: VoidFunction;
}

function Panel({ label, toggle, onToggle, ...other }: PanelProps) {
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between" {...other}>
      <Typography variant="subtitle2"> {label} </Typography>

      <IconButton size="small" onClick={onToggle}>
        <Iconify icon={toggle ? 'eva:chevron-up-fill' : 'eva:chevron-down-fill'} />
      </IconButton>
    </Stack>
  );
}

// ----------------------------------------------------------------------

type RowProps = {
  label: string;
  value: string;
};

function Row({ label, value = '' }: RowProps) {
  return (
    <Stack
      direction="row"
      sx={{
        typography: 'caption',
        textTransform: 'capitalize',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Box component="span" sx={{ width: 80, color: 'text.secondary', mr: 2 }}>
        {label}
      </Box>

      {value}
    </Stack>
  );
}
