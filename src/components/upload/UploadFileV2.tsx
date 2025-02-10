import { useState } from 'react';
import { fileFormat } from '@/components/file-thumbnail';
import Iconify from '@/components/iconify/Iconify';
import Image from '@/components/image/Image';
import { useLocales } from '@/locales';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { LoadingButton } from '@mui/lab';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';

type Props = {
  dirName?: string;
  setFileUrl: (value: any) => void;
  fileUrl: any;
  fileNameUpload?: string;
  typeFile?: any;
  setTypeFile?: any;
  imageWidth?:string | number
  imageHeight?:string | number

};

const UploadFileV2 = ({
  dirName = 'test',
  fileUrl,
  setFileUrl,
  fileNameUpload,
  typeFile = 'pdf',
  setTypeFile,
  imageWidth = '100%',
  imageHeight ='100%'
}: Props) => {
  const { t } = useLocales();
  const [loading, setLoading] = useState<boolean>(false);

  const handleUpload = async (e: React.FormEvent<HTMLInputElement>) => {
    const files: FileList | null = e.currentTarget.files;
    const file = files?.[0];
    if (!file) return;
    setLoading(true);

    try {
      if (setTypeFile) {
        setTypeFile(fileFormat(file.name));
      }
      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });
      setFileUrl(newFile);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenFile = () => {
    if (typeof fileUrl === 'string') {
      window.open(fileUrl);
      return;
    }
    window.open(fileUrl?.preview);
  };

  const handleDeleteFile = () => {
    setFileUrl('');
  };

  return (
    <Box style={{height: "100%", width: "100%"}}>
      {fileUrl && typeFile === 'image' ? (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Image sx={{ borderRadius: '10px',width:imageWidth,height:imageHeight }} src={fileUrl.preview || fileUrl} />

          <Tooltip onClick={handleDeleteFile} title={t('delete')}>
            <IconButton sx={{ width: '50px', height: '50px' }}>
              <HighlightOffIcon color="error" />
            </IconButton>
          </Tooltip>
        </Box>
      ) : (
        ''
      )}
      {fileUrl && typeFile !== 'image' ? (
        <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
          <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'flex-end' }}>
            <InsertDriveFileIcon />
            <Typography
              onClick={handleOpenFile}
              sx={{ textDecoration: 'underline', cursor: 'pointer' }}
              variant="body2"
            >
              {t(fileNameUpload)}
            </Typography>
          </Box>
          <Tooltip onClick={handleDeleteFile} title={t('delete')}>
            <IconButton>
              <HighlightOffIcon color="error" />
            </IconButton>
          </Tooltip>
        </Box>
      ) : (
        ''
      )}

      {!fileUrl ? (
        <LoadingButton
          loading={loading}
          sx={{ minWidth: 200, height: "100%" }}
          component="label"
          variant="outlined"
        >
          <input onChange={(e) => handleUpload(e)} multiple hidden type="file" />
          <Iconify sx={{ mr: 1 }} icon="eva:cloud-upload-fill" />
          {t('uploadedInformation')}
        </LoadingButton>
      ) : (
        ''
      )}
    </Box>
  );
};

export default UploadFileV2;
