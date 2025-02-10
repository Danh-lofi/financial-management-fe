import { PROFILE_UPLOAD_STATUS } from 'assets/data/employee-info-vi';
import moment from 'moment';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { getNoticeHistories } from 'redux/slices/dashboard/notice';
import { dispatch, useSelector } from 'redux/store';
import { fileFormat } from '@/components/file-thumbnail';
import Image from '@/components/image/Image';
import { TablePaginationCustom } from '@/components/table';
import { DEFAULT_PAGINATION } from '@/constants/app.constants';
import { useLocales } from '@/locales';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { Box, Card, Divider, Grid, Typography } from '@mui/material';

type Props = {};

const EmployeeProfileNoticeDetails = (props: Props) => {
  const { t } = useLocales();
  const { type, id } = useParams();
  const navigate = useNavigate();
  const handleOpenFile = (fileUrl: any) => {
    window.open(fileUrl);
  };
  const { noticeDetails, employeeId, noticeDetailsCount } = useSelector((state) => state.notice);
  let notificationDetails: any;
  if (noticeDetails?.changedData) {
    notificationDetails = JSON.parse(noticeDetails?.changedData);
  }
  console.log(noticeDetails);
  console.log(notificationDetails);
  const [params, setParams] = useState({
    infoType: type,
    pageIndex: DEFAULT_PAGINATION.PAGE_INDEX,
    pageSize: DEFAULT_PAGINATION.PAGE_ONE,
    employeeId: id,
  });
  const statusValue = (status: any) => {
    switch (status) {
      case PROFILE_UPLOAD_STATUS.submitted.toString():
        return t('submitted');
      case PROFILE_UPLOAD_STATUS.notSubmitted.toString():
        return t('notSubmitted');
      case PROFILE_UPLOAD_STATUS.submitIncorrect.toString():
        return t('submitIncorrect');
      case PROFILE_UPLOAD_STATUS.notRequired.toString():
        return t('notRequired');
      case 'collaborators':
        return 'CTV tuyển dụng';
      case 'socials':
        return 'Mạng xã hội';
      case 'hrWebsite':
        return 'Các website về nhân lực';
      case 'leaflets':
        return 'Phát tờ rơi';
      case 'customer':
        return 'Khách hàng gửi ứng viên';
      case 'employeeFriends':
        return 'Bạn bè nhân viên giới thiệu';
      case 'phone':
        return 'Điện thoại';
      case 'electric':
        return 'Điện máy';
      case 'realEstate':
        return 'Bất động sản';
      case 'accountant':
        return 'Kế toán';
      case 'recruiment':
        return 'Nhân sự';
      case 'manager':
        return 'Giám sát/Quản lý';
      case 'seriorManager':
        return 'Quản lý cấp cao';
      case 'warehouseStaff':
        return 'Nhân viên kho';
      case 'driver':
        return 'Tài xế';
      case 'other':
        return 'Khác';
      default:
        return '';
    }
  };
  const onChangePage = useCallback(
    async (event: unknown, newPage: number) => {
      setParams({
        ...params,
        pageIndex: newPage + 1,
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [params]
  );

  useEffect(() => {
    dispatch(getNoticeHistories(params));
  }, [params]);
  return (
    <Card sx={{ pt: 5, px: 5 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4">{noticeDetails?.fullName}</Typography>
        <Typography variant="overline">{`${t('profileNoticeDetails')} - Ngày ${moment(
          noticeDetails?.createdAt
        ).format('DD-MM-YYYY')}`}</Typography>
        <Divider sx={{ mt: 1.5 }} />
      </Box>
      <Grid container sx={{ mb: 2 }} spacing={3}>
        <Grid item xs={12} sm={12} md={6}>
          <Box sx={{ mx: 3, display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2"> {t('avatar')}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <br />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Image
            sx={{ width: '100%', height: 250, mx: 3, borderRadius: '10px' }}
            src={notificationDetails?.[0]?.avatar_url}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <br />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Box sx={{ mx: 3, display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2"> {t('frontOfIdentityCard')}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Box sx={{ mx: 3, display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2"> {t('backOfIdentityCard')}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          {fileFormat(notificationDetails?.[0]?.frontOfIdentityCard_url) === 'image' ? (
            <Image
              sx={{ width: '100%', height: 250, mx: 3, borderRadius: '10px' }}
              src={notificationDetails?.[0]?.frontOfIdentityCard_url}
            />
          ) : (
            <Box sx={{ mt: 1, display: 'flex', gap: 0.5, alignItems: 'center' }}>
              <InsertDriveFileIcon />
              <Typography
                onClick={() => {
                  handleOpenFile(notificationDetails?.[0]?.frontOfIdentityCard_url);
                }}
                sx={{ textDecoration: 'underline', cursor: 'pointer' }}
                variant="overline"
              >
                {t('frontOfIdentityCard')}
              </Typography>
            </Box>
          )}
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          {fileFormat(notificationDetails?.[0]?.backOfIdentityCard_url) === 'image' ? (
            <Image
              sx={{ width: '100%', height: 250, mx: 3, borderRadius: '10px' }}
              src={notificationDetails?.[0]?.backOfIdentityCard_url}
            />
          ) : (
            <Box sx={{ mt: 1, display: 'flex', gap: 0.5, alignItems: 'center' }}>
              <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'flex-end' }}>
                <InsertDriveFileIcon />
                <Typography
                  onClick={() => {
                    handleOpenFile(notificationDetails?.[0]?.backOfIdentityCard_url);
                  }}
                  sx={{ textDecoration: 'underline', cursor: 'pointer' }}
                  variant="overline"
                >
                  {t('backOfIdentityCard')}
                </Typography>
              </Box>
            </Box>
          )}
        </Grid>

        <Grid item xs={12} sm={12} md={6}>
          <Box
            sx={{ mx: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <Typography variant="body2">{t('applicationForm')}</Typography>
            {notificationDetails?.[0]?.jobApplication_url?.includes('http') ? (
              <Box sx={{ mt: 1, display: 'flex', gap: 0.5, alignItems: 'center' }}>
                <InsertDriveFileIcon />
                <Typography
                  onClick={() => {
                    handleOpenFile(notificationDetails?.[0]?.jobApplication_url);
                  }}
                  sx={{ textDecoration: 'underline', cursor: 'pointer' }}
                  variant="overline"
                >
                  {t('applicationForm')}
                </Typography>
              </Box>
            ) : (
              <Typography variant="overline">
                {statusValue(notificationDetails?.[0]?.jobApplication_url)}
              </Typography>
            )}
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Box
            sx={{ mx: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <Typography variant="body2"> {t('certifiedResume')}</Typography>
            {notificationDetails?.[0]?.background_url?.includes('http') ? (
              <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
                <InsertDriveFileIcon />
                <Typography
                  onClick={() => {
                    handleOpenFile(notificationDetails?.[0]?.background_url);
                  }}
                  sx={{ textDecoration: 'underline', cursor: 'pointer' }}
                  variant="overline"
                >
                  {t('certifiedResume')}
                </Typography>
              </Box>
            ) : (
              <Typography variant="overline" sx={{ mt: 1 }}>
                {statusValue(notificationDetails?.[0]?.background_url)}
              </Typography>
            )}
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Box sx={{ mx: 3, display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2"> {t('healthCertificate')}</Typography>
            {notificationDetails?.[0]?.healthy_url?.includes('http') ? (
              <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
                <InsertDriveFileIcon />
                <Typography
                  onClick={() => {
                    handleOpenFile(notificationDetails?.[0]?.healthy_url);
                  }}
                  sx={{ textDecoration: 'underline', cursor: 'pointer' }}
                  variant="overline"
                >
                  {t('healthCertificate')}
                </Typography>
              </Box>
            ) : (
              <Typography variant="overline" sx={{ mt: 1 }}>
                {statusValue(notificationDetails?.[0]?.healthy_url)}
              </Typography>
            )}
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Box sx={{ mx: 3, display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2"> {t('otherHealthy')}</Typography>
            {notificationDetails?.[0]?.otherHealthy_url?.includes('http') ? (
              <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
                <InsertDriveFileIcon />
                <Typography
                  onClick={() => {
                    handleOpenFile(notificationDetails?.[0]?.otherHealthy_url);
                  }}
                  sx={{ textDecoration: 'underline', cursor: 'pointer' }}
                  variant="overline"
                >
                  {t('otherHealthy')}
                </Typography>
              </Box>
            ) : (
              <Typography variant="overline" sx={{ mt: 1 }}>
                {statusValue(notificationDetails?.[0]?.otherHealthy_url)}
              </Typography>
            )}
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Box sx={{ mx: 3, display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2"> {t('degree')}</Typography>
            {notificationDetails?.[0]?.degree_url?.includes('http') ? (
              <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
                <InsertDriveFileIcon />
                <Typography
                  onClick={() => {
                    handleOpenFile(notificationDetails?.[0]?.degree_url);
                  }}
                  sx={{ textDecoration: 'underline', cursor: 'pointer' }}
                  variant="overline"
                >
                  {t('degree')}
                </Typography>
              </Box>
            ) : (
              <Typography variant="overline" sx={{ mt: 1 }}>
                {statusValue(notificationDetails?.[0]?.degree_url)}
              </Typography>
            )}
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Box sx={{ mx: 3, display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2"> {t('others')}</Typography>
            {notificationDetails?.[0]?.other_url?.includes('http') ? (
              <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
                <InsertDriveFileIcon />
                <Typography
                  onClick={() => {
                    handleOpenFile(notificationDetails?.[0]?.other_url);
                  }}
                  sx={{ textDecoration: 'underline', cursor: 'pointer' }}
                  variant="overline"
                >
                  {t('others')}
                </Typography>
              </Box>
            ) : (
              <Typography variant="overline" sx={{ mt: 1 }}>
                {statusValue(notificationDetails?.[0]?.other_url)}
              </Typography>
            )}
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Box sx={{ mx: 3, display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2"> {t('resignationLetter')}</Typography>
            {notificationDetails?.[0]?.resignation_url?.includes('http') ? (
              <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
                <InsertDriveFileIcon />
                <Typography
                  onClick={() => {
                    handleOpenFile(notificationDetails?.[0]?.resignation_url);
                  }}
                  sx={{ textDecoration: 'underline', cursor: 'pointer' }}
                  variant="overline"
                >
                  {t('resignationLetter')}
                </Typography>
              </Box>
            ) : (
              <Typography variant="overline" sx={{ mt: 1 }}>
                {statusValue(notificationDetails?.[0]?.resignation_url)}
              </Typography>
            )}
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Box sx={{ mx: 3, display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2"> {t('sourceEmployee')}</Typography>
            <Typography variant="overline">
              {statusValue(notificationDetails?.[0]?.source)}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Box sx={{ mx: 3, display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2"> {t('experienceEmployee')}</Typography>
            <Typography variant="overline">
              {statusValue(notificationDetails?.[0]?.experience)}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Box sx={{ mx: 3, display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2"> {t('yoe')}</Typography>
            <Typography variant="overline"> {t(notificationDetails?.[0]?.yoe)}</Typography>
          </Box>
        </Grid>
      </Grid>
      <TablePaginationCustom
        count={noticeDetailsCount}
        page={params.pageIndex - 1}
        rowsPerPage={params.pageSize}
        onPageChange={onChangePage}
        rowsPerPageOptions={[5]}
      />
    </Card>
  );
};

export default EmployeeProfileNoticeDetails;
