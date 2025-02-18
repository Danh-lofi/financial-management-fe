import moment from 'moment';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { TablePaginationCustom } from '@/components/table';
import { DEFAULT_PAGINATION } from '@/constants/app.constants';
import { useLocales } from '@/locales';
import { getNoticeHistories } from '@/redux/slices/dashboard/notice';
import { dispatch, useSelector } from '@/redux/store';
import { Box, Card, Divider, Grid, Typography } from '@mui/material';

type Props = {};

const EmployeeBankingNoticeDetails = (props: Props) => {
  const { t } = useLocales();
  const { type, id } = useParams();
  const navigate = useNavigate();
  const { noticeDetails, employeeId, noticeDetailsCount } = useSelector((state) => state.notice);
  let notificationDetails;
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
        <Typography variant="overline">{`${t('bankingNoticeDetails')} - Ngày ${moment(
          noticeDetails?.createdAt
        ).format('DD-MM-YYYY')}`}</Typography>
        <Divider sx={{ mt: 1.5 }} />
      </Box>
      <Grid container sx={{ mb: 2 }} spacing={3}>
        <Grid item xs={12} sm={12} md={6}>
          <Box sx={{ mx: 3, display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2">{t('mainAccount')}</Typography>
            <Typography variant="overline">
              {notificationDetails?.[0]?.isMain ? t('isMain') : t('isNotMain')}
            </Typography>
          </Box>
        </Grid>
        {!notificationDetails?.[0].isMain ? (
          <>
            <Grid item xs={12} sm={12} md={6}>
              <Box sx={{ mx: 3, display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">{t('authority')}</Typography>
                <Typography variant="overline">
                  {notificationDetails?.[0]?.authorizedPerson}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Box sx={{ mx: 3, display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">{t('relationshipBank')}</Typography>
                <Typography variant="overline">{notificationDetails?.[0]?.relationship}</Typography>
              </Box>
            </Grid>
          </>
        ) : (
          ''
        )}
        <Grid item xs={12} sm={12} md={6}>
          <Box sx={{ mx: 3, display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2">{t('accountHolderName')}</Typography>
            <Typography variant="overline">{notificationDetails?.[0]?.accountHolder}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Box sx={{ mx: 3, display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2">{t('bankAccountNumber')}</Typography>
            <Typography variant="overline">{notificationDetails?.[0]?.accountNumber}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Box sx={{ mx: 3, display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2">{t('bankNameAbbreviation')}</Typography>
            <Typography variant="overline" sx={{ width: 300 }} align="right">
              {notificationDetails?.[0]?.name}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Box sx={{ mx: 3, display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2">{t('provinceCityBank')}</Typography>
            <Typography variant="overline">{notificationDetails?.[0]?.provinceName}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Box sx={{ mx: 3, display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2">{t('bankBranchName')}</Typography>
            <Typography variant="overline">{notificationDetails?.[0]?.branchName}</Typography>
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

export default EmployeeBankingNoticeDetails;
