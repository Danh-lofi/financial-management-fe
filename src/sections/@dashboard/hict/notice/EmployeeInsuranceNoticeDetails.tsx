import moment from 'moment';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { getNoticeHistories } from 'redux/slices/dashboard/notice';
import { dispatch, useSelector } from 'redux/store';
import { TablePaginationCustom } from '@/components/table';
import { DEFAULT_PAGINATION } from '@/constants/app.constants';
import { useLocales } from '@/locales';
import {
  Box,
  Card,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

type Props = {};

const EmployeeInsuranceNoticeDetails = (props: Props) => {
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
        <Typography sx={{ mb: 4 }} variant="overline">{`${t(
          'insuranceNoticeDetails'
        )} - Ngày ${moment(noticeDetails?.createdAt).format('DD-MM-YYYY')}`}</Typography>
          <Divider sx={{mt:1.5}}/>
      
      </Box>

      <Grid container sx={{ mb: 2 }} spacing={3}>
        <Grid item xs={12} sm={12} md={6}>
          <Box sx={{ mx: 3, display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2">{t('socialInsuranceNumber')}</Typography>
            <Typography variant="overline">
              {notificationDetails?.[0]?.info?.[0].insuranceNumber}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Box sx={{ mx: 3, display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2">{t('healthInsuranceId')}</Typography>
            <Typography variant="overline">
              {notificationDetails?.[0]?.info?.[0].healthInsuranceCode}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Box sx={{ mx: 3, display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2">{t('householdCode')}</Typography>
            <Typography variant="overline">
              {notificationDetails?.[0]?.info?.[0].householdCode}
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} sm={12} md={6}>
          <Box sx={{ mx: 3, display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2">{t('sheetStatus')}</Typography>
            <Typography variant="overline">{t(notificationDetails?.[0]?.info?.[0]?.status)}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Box sx={{ mx: 3, display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2">{t('transSheet')}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Box sx={{ mx: 3, display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2">{t('newPostDate')}</Typography>
            <Typography variant="overline">
              {notificationDetails?.[0]?.info?.[0].sentDate}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Box sx={{ mx: 3, display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2">{t('note')}</Typography>
            <Typography variant="overline">{notificationDetails?.[0]?.info?.[0].note}</Typography>
          </Box>
        </Grid>
      </Grid>
      <TableContainer sx={{ overflow: 'unset', mt: 4 }}>
        <Table sx={{ minWidth: 960 }}>
          <TableHead>
            <TableRow>
              <TableCell align="left">{t('startDate')}</TableCell>
              <TableCell align="left">{t('endDate')}</TableCell>
              <TableCell align="right">{t('position')}</TableCell>
              <TableCell align="right">{t('insurancePremium')}</TableCell>
              <TableCell align="right">{t('ratioInsurance')}</TableCell>
              <TableCell align="right">{t('status')}</TableCell>
              <TableCell align="right">{t('documentNumber')}</TableCell>
              <TableCell align="right">{t('note')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notificationDetails?.[0]?.insuranceProgress?.map((item: any) => {
              return (
                <TableRow key={item?.id}>
                  <TableCell align="left">{item?.fromDate}</TableCell>
                  <TableCell align="left">{item?.toDate}</TableCell>
                  <TableCell align="right">{item?.position}</TableCell>
                  <TableCell align="right">{item?.paymentRate}</TableCell>
                  <TableCell align="right">{item?.ratio}</TableCell>
                  <TableCell align="right">{t(item?.status)}</TableCell>
                  <TableCell align="right">{item?.profileNumber}</TableCell>
                  <TableCell align="right">{item?.note}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
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

export default EmployeeInsuranceNoticeDetails;
