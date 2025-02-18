import moment from 'moment';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { PROFILE_UPLOAD_STATUS } from '@/assets/data/employee-info-vi';
import { TablePaginationCustom } from '@/components/table';
import { DEFAULT_PAGINATION } from '@/constants/app.constants';
import { useLocales } from '@/locales';
import { getNoticeHistories } from '@/redux/slices/dashboard/notice';
import { dispatch, useSelector } from '@/redux/store';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { Box, Card, Divider, Grid, Typography } from '@mui/material';

type Props = {};

const EmployeeLaborContractNoticeDetails = (props: Props) => {
  const { t } = useLocales();
  const { type, id } = useParams();
  const navigate = useNavigate();
  const { noticeDetails, employeeId, noticeDetailsCount } = useSelector((state) => state.notice);
  let notificationDetails: any;
  if (noticeDetails?.changedData) {
    notificationDetails = JSON.parse(noticeDetails?.changedData);
  }
 console.log(notificationDetails)
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
      default:
        return t('approachingDeadline');
    }
  };
  const handleOpenFile = (fileUrl: any) => {
    window.open(fileUrl);
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
        <Typography variant="overline">{`${t('laborContractNoticeDetails')} - Ngày ${moment(
          noticeDetails?.createdAt
        ).format('DD-MM-YYYY')}`}</Typography>
        <Divider sx={{ mt: 1.5 }} />
      </Box>
      <Card sx={{ pt: 5, px: 5, mb: 5 }}>
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={12} md={6}>
            <Box sx={{ mx: 3, display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2">{t('activityStatus')}</Typography>
              <Typography variant="overline">{t(notificationDetails?.[0]?.status)}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <br />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Box sx={{ mx: 3, display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2">{t('startDate')}</Typography>
              <Typography variant="overline">{notificationDetails?.[0]?.workingDate}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Box sx={{ mx: 3, display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2">{t('endDate')}</Typography>
              <Typography variant="overline">{notificationDetails?.[0]?.jobEndDate}</Typography>
            </Box>
          </Grid>
        </Grid>
      </Card>

      {notificationDetails?.[0]?.isProbationary && (
        <Card sx={{ pt: 5, px: 5, mb: 5 }}>
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={12} md={6}>
              <Typography variant="h5">{t('isProbationary')}</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <br />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Box sx={{ mx: 3, display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">{t('contractTerm')}</Typography>
                <Typography variant="overline">
                  {notificationDetails?.[0]?.probationaryTime}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Box sx={{ mx: 3, display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">{t('unitOfMeasurement')}</Typography>
                <Typography variant="overline">
                  {t(notificationDetails?.[0]?.probationaryUnit)}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Box sx={{ mx: 3, display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">{t('startDate')}</Typography>
                <Typography variant="overline">
                  {notificationDetails?.[0]?.probationaryWorkingDate}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Box sx={{ mx: 3, display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">{t('endDate')}</Typography>
                <Typography variant="overline">
                  {notificationDetails?.[0]?.probationaryEndDate}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Box sx={{ mx: 3, display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">{t('probationary_url')}</Typography>
                {notificationDetails?.[0]?.probationary_url?.includes('http') ? (
                  <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
                    <InsertDriveFileIcon />
                    <Typography
                      onClick={() => {
                        handleOpenFile(notificationDetails?.[0]?.probationary_url);
                      }}
                      sx={{ textDecoration: 'underline', cursor: 'pointer' }}
                      variant="overline"
                    >
                      {t('probationary_url')}
                    </Typography>
                  </Box>
                ) : (
                  <Typography variant="overline" sx={{ mt: 1 }}>
                    {statusValue(notificationDetails?.[0]?.probationary_url)}
                  </Typography>
                )}
              </Box>
            </Grid>
          </Grid>
        </Card>
      )}
      {notificationDetails?.[0]?.isFirstLaborContract && (
        <Card sx={{ pt: 5, px: 5, mb: 5 }}>
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={12} md={6}>
              <Typography variant="h5">{t('isFirstLaborContract')}</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <br />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Box sx={{ mx: 3, display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">{t('contractTerm')}</Typography>
                <Typography variant="overline">
                  {notificationDetails?.[0]?.firstLaborContractTime}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Box sx={{ mx: 3, display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">{t('unitOfMeasurement')}</Typography>
                <Typography variant="overline">
                  {t(notificationDetails?.[0]?.firstLaborContractUnit)}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Box sx={{ mx: 3, display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">{t('startDate')}</Typography>
                <Typography variant="overline">
                  {notificationDetails?.[0]?.firstLaborContractStartDate}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Box sx={{ mx: 3, display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">{t('endDate')}</Typography>
                <Typography variant="overline">
                  {notificationDetails?.[0]?.firstLaborContractEndDate}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Box sx={{ mx: 3, display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">{t('firstLaborContract_url')}</Typography>
                {notificationDetails?.[0]?.firstLaborContract_url?.includes('http') ? (
                  <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
                    <InsertDriveFileIcon />
                    <Typography
                      onClick={() => {
                        handleOpenFile(notificationDetails?.[0]?.firstLaborContract_url);
                      }}
                      sx={{ textDecoration: 'underline', cursor: 'pointer' }}
                      variant="overline"
                    >
                      {t('firstLaborContract_url')}
                    </Typography>
                  </Box>
                ) : (
                  <Typography variant="overline" sx={{ mt: 1 }}>
                    {statusValue(notificationDetails?.[0]?.firstLaborContract_url)}
                  </Typography>
                )}
              </Box>
            </Grid>
          </Grid>
        </Card>
      )}
      {notificationDetails?.[0]?.isSecondLaborContract && (
        <Card sx={{ pt: 5, px: 5, mb: 5 }}>
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={12} md={6}>
              <Typography variant="h5">{t('isSecondLaborContract')}</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <br />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Box sx={{ mx: 3, display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">{t('contractTerm')}</Typography>
                <Typography variant="overline">
                  {notificationDetails?.[0]?.secondLaborContractTime}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Box sx={{ mx: 3, display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">{t('unitOfMeasurement')}</Typography>
                <Typography variant="overline">
                  {t(notificationDetails?.[0]?.secondLaborContractUnit)}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Box sx={{ mx: 3, display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">{t('startDate')}</Typography>
                <Typography variant="overline">
                  {notificationDetails?.[0]?.secondLaborContractStartDate}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Box sx={{ mx: 3, display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">{t('endDate')}</Typography>
                <Typography variant="overline">
                  {notificationDetails?.[0]?.secondLaborContractEndDate}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Box sx={{ mx: 3, display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">{t('secondLaborContract_url')}</Typography>
                {notificationDetails?.[0]?.secondLaborContract_url?.includes('http') ? (
                  <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
                    <InsertDriveFileIcon />
                    <Typography
                      onClick={() => {
                        handleOpenFile(notificationDetails?.[0]?.secondLaborContract_url);
                      }}
                      sx={{ textDecoration: 'underline', cursor: 'pointer' }}
                      variant="overline"
                    >
                      {t('secondLaborContract_url')}
                    </Typography>
                  </Box>
                ) : (
                  <Typography variant="overline" sx={{ mt: 1 }}>
                    {statusValue(notificationDetails?.[0]?.secondLaborContract_url)}
                  </Typography>
                )}
              </Box>
            </Grid>
          </Grid>
        </Card>
      )}
      {notificationDetails?.[0]?.isInfinite && (
        <Card sx={{ pt: 5, px: 5, mb: 5 }}>
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={12} md={6}>
              <Typography variant="h5">{t('isInfinite')}</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <br />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Box sx={{ mx: 3, display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">{t('contractTerm')}</Typography>
                <Typography variant="overline">
                  {notificationDetails?.[0]?.infiniteContractTime}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Box sx={{ mx: 3, display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">{t('unitOfMeasurement')}</Typography>
                <Typography variant="overline">
                  {t(notificationDetails?.[0]?.infiniteContractUnit)}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Box sx={{ mx: 3, display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">{t('startDate')}</Typography>
                <Typography variant="overline">
                  {notificationDetails?.[0]?.infiniteContractStartDate}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Box sx={{ mx: 3, display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">{t('endDate')}</Typography>
                <Typography variant="overline">
                  {notificationDetails?.[0]?.infiniteContractEndDate}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Box sx={{ mx: 3, display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">{t('infiniteContract_url')}</Typography>
                {notificationDetails?.[0]?.infiniteContract_url?.includes('http') ? (
                  <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
                    <InsertDriveFileIcon />
                    <Typography
                      onClick={() => {
                        handleOpenFile(notificationDetails?.[0]?.infiniteContract_url);
                      }}
                      sx={{ textDecoration: 'underline', cursor: 'pointer' }}
                      variant="overline"
                    >
                      {t('infiniteContract_url')}
                    </Typography>
                  </Box>
                ) : (
                  <Typography variant="overline" sx={{ mt: 1 }}>
                    {statusValue(notificationDetails?.[0]?.infiniteContract_url)}
                  </Typography>
                )}
              </Box>
            </Grid>
          </Grid>
        </Card>
      )}
      {notificationDetails?.[0]?.isService && (
        <Card sx={{ pt: 5, px: 5, mb: 5 }}>
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={12} md={6}>
              <Typography variant="h5">{t('isService')}</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <br />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Box sx={{ mx: 3, display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">{t('contractTerm')}</Typography>
                <Typography variant="overline">
                  {notificationDetails?.[0]?.serviceContractTime}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Box sx={{ mx: 3, display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">{t('unitOfMeasurement')}</Typography>
                <Typography variant="overline">
                  {t(notificationDetails?.[0]?.serviceContractUnit)}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Box sx={{ mx: 3, display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">{t('startDate')}</Typography>
                <Typography variant="overline">
                  {notificationDetails?.[0]?.serviceContractStartDate}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Box sx={{ mx: 3, display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">{t('endDate')}</Typography>
                <Typography variant="overline">
                  {notificationDetails?.[0]?.serviceContractEndDate}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Box sx={{ mx: 3, display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">{t('serviceContract_url')}</Typography>
                {notificationDetails?.[0]?.serviceContract_url?.includes('http') ? (
                  <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
                    <InsertDriveFileIcon />
                    <Typography
                      onClick={() => {
                        handleOpenFile(notificationDetails?.[0]?.serviceContract_url);
                      }}
                      sx={{ textDecoration: 'underline', cursor: 'pointer' }}
                      variant="overline"
                    >
                      {t('serviceContract_url')}
                    </Typography>
                  </Box>
                ) : (
                  <Typography variant="overline" sx={{ mt: 1 }}>
                    {statusValue(notificationDetails?.[0]?.serviceContract_url)}
                  </Typography>
                )}
              </Box>
            </Grid>
          </Grid>
        </Card>
      )}
      {notificationDetails?.[0]?.isTraining && (
        <Card sx={{ pt: 5, px: 5, mb: 5 }}>
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={12} md={6}>
              <Typography variant="h5">{t('isTraining')}</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <br />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Box sx={{ mx: 3, display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">{t('contractTerm')}</Typography>
                <Typography variant="overline">
                  {notificationDetails?.[0]?.trainingContractTime}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Box sx={{ mx: 3, display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">{t('unitOfMeasurement')}</Typography>
                <Typography variant="overline">
                  {t(notificationDetails?.[0]?.trainingContractUnit)}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Box sx={{ mx: 3, display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">{t('startDate')}</Typography>
                <Typography variant="overline">
                  {notificationDetails?.[0]?.trainingContractStartDate}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Box sx={{ mx: 3, display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">{t('endDate')}</Typography>
                <Typography variant="overline">
                  {notificationDetails?.[0]?.trainingContractEndDate}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Box sx={{ mx: 3, display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">{t('trainingContract_url')}</Typography>
                {notificationDetails?.[0]?.trainingContract_url?.includes('http') ? (
                  <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
                    <InsertDriveFileIcon />
                    <Typography
                      onClick={() => {
                        handleOpenFile(notificationDetails?.[0]?.trainingContract_url);
                      }}
                      sx={{ textDecoration: 'underline', cursor: 'pointer' }}
                      variant="overline"
                    >
                      {t('trainingContract_url')}
                    </Typography>
                  </Box>
                ) : (
                  <Typography variant="overline" sx={{ mt: 1 }}>
                    {statusValue(notificationDetails?.[0]?.trainingContract_url)}
                  </Typography>
                )}
              </Box>
            </Grid>
          </Grid>
        </Card>
      )}
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

export default EmployeeLaborContractNoticeDetails;
