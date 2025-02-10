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

const EmployeeTaxIncomeNoticeDetails = (props: Props) => {
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
        <Typography variant="overline">{`${t('taxNoticeDetails')} - Ngày ${moment(
          noticeDetails?.createdAt
        ).format('DD-MM-YYYY')}`}</Typography>
        <Divider sx={{ mt: 1.5 }} />
      </Box>

      <Grid container sx={{ mb: 2 }} spacing={3}>
        <Grid item xs={12} sm={12} md={6}>
          <Box sx={{ mx: 3, display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2">{t('taxCode')}</Typography>
            <Typography variant="overline">
              {notificationDetails?.[0]?.info?.[0].taxCode}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Box sx={{ mx: 3, display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2">{t('typeOfDocumentTax')}</Typography>
            <Typography variant="overline">
              {notificationDetails?.[0]?.info?.[0].typeOfTaxDocument}
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Divider />
      <TableContainer sx={{ overflow: 'unset' }}>
        <Table sx={{ minWidth: 960 }}>
          <TableHead>
            <TableRow>
              <TableCell align="left">{t('name')}</TableCell>
              <TableCell align="left">{t('idCard')}</TableCell>
              <TableCell align="left">{t('taxId')}</TableCell>
              <TableCell align="left">{t('relationshipWithEmployee')}</TableCell>
              <TableCell align="left">{t('documentRelationship')}</TableCell>
              <TableCell align="left">{t('startDateRelationship')}</TableCell>
              <TableCell align="left">{t('endDateRelationship')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notificationDetails?.[0]?.relationships?.map((item: any) => {
              return (
                <TableRow key={item?.id}>
                  <TableCell align="left">{item?.fullName}</TableCell>
                  <TableCell align="left">{item?.identityCard}</TableCell>
                  <TableCell align="left">{item?.taxCode}</TableCell>
                  <TableCell align="left">{item?.relationship}</TableCell>
                  <TableCell align="left">{item?.typeOfDocument}</TableCell>
                  <TableCell align="left">{item?.startDate}</TableCell>
                  <TableCell align="left">{item?.endDate}</TableCell>
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

export default EmployeeTaxIncomeNoticeDetails;
