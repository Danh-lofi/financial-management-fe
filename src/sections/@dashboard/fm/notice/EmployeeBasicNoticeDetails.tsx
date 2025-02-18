import moment from 'moment';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { TablePaginationCustom, useTable } from '@/components/table';
import { DEFAULT_PAGINATION } from '@/constants/app.constants';
import { useLocales } from '@/locales';
import { getNoticeHistories } from '@/redux/slices/dashboard/notice';
import { dispatch, useSelector } from '@/redux/store';
import { Box, Card, Divider, Grid, Typography } from '@mui/material';
import Image from '../../../../components/image/Image';
import { fDate } from '../../../../utils/formatTime';
import { Utils } from '../../../../utils/utils';

type Props = {};

const EmployeeBasicNoticeDetails = (props: Props) => {
  const { t } = useLocales();
  const { type, id } = useParams();
  const navigate = useNavigate();
  const { noticeDetails, employeeId, noticeDetailsCount } = useSelector((state) => state.notice);
  let notificationDetails;
  if (noticeDetails?.changedData) {
    notificationDetails = JSON.parse(noticeDetails?.changedData)[0];
  }
  console.log(
    '🚀 ~ file: EmployeeBasicNoticeDetails.tsx:21 ~ EmployeeBasicNoticeDetails ~ notificationDetails:',
    notificationDetails
  );
  const {
    urgentPhone,
    urgentRelationship,
    project_id,
    avatar_url,
    identityBack_url,
    identityFront_url,
    major,
    academicLevel,
    temporaryAddress,
    temWardName,
    temDistrictName,
    temProvinceName,
    address,
    wardName,
    districtName,
    provinceName,
    email,
    phoneNumber,
    placeOfIssue,
    dateOfIssue,
    identityCard,
    typeOfIdentityCard,
    maritalStatus,
    religion,
    ethnic,
    hometown,
    fullName,
    dateOfBirth,
    nationalityName,
    g_id,
    gender,
  } = notificationDetails;
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
        <Typography variant="overline">{`${t('basicNoticeDetails')} - Ngày ${moment(
          noticeDetails?.createdAt
        ).format('DD-MM-YYYY')}`}</Typography>
        <Divider sx={{ mt: 1.5 }} />
      </Box>

      <Grid container sx={{ mb: 2 }} spacing={3}>
        <Grid container item xs={12} sm={12} md={12} alignItems="center" flexDirection="column">
          <Image src={avatar_url} alt="avatar" sx={{ maxWidth: '150px' }} />
          <Typography variant="body2" fontStyle="italic" sx={{ mb: 1 }}>
            {t('avatar')}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={6} px={6}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2">{t('name')}: </Typography>
            <Typography variant="overline">{fullName}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6} px={6}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2">{t('gender')}: </Typography>
            <Typography variant="overline">{gender ? t('male') : t('female')}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6} px={6}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2">{t('dateOfBirth')}: </Typography>
            <Typography variant="overline">{fDate(dateOfBirth, 'dd/MM/yyyy')}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6} px={6}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2">{t('nationality')}: </Typography>
            <Typography variant="overline">{nationalityName}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6} px={6}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2">{t('hometown')}: </Typography>
            <Typography variant="overline">{hometown}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6} px={6}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2">{t('ethnicGroup')}: </Typography>
            <Typography variant="overline">{ethnic}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6} px={6}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2">{t('religion')}: </Typography>
            <Typography variant="overline">{religion}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6} px={6}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2">{t('maritalStatus')}: </Typography>
            <Typography variant="overline">{t(maritalStatus)}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6} px={6}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2">{t('documentTypeIdCardIsUsing')}: </Typography>
            <Typography variant="overline">{typeOfIdentityCard}</Typography>
          </Box>
        </Grid>

        <Grid item xs={12} sm={12} md={6} px={6}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2">
              {notificationDetails?.[0]?.typeOfIdentityCard !== 'PASSPORT'
                ? t('idCard')
                : t('passport')}
              :{' '}
            </Typography>
            <Typography variant="overline">{identityCard}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6} px={6}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2">{t('dateOfIssue')}: </Typography>
            <Typography variant="overline">{fDate(dateOfIssue, 'dd/MM/yyyy')}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6} px={6}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2">{t('placeOfIssue')}: </Typography>
            <Typography variant="overline">{placeOfIssue}</Typography>
          </Box>
        </Grid>

        <Grid item xs={12} sm={12} md={6} px={6}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2">{t('phoneNumber')}: </Typography>
            <Typography variant="overline">{phoneNumber}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6} px={6}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2">{t('emergencyContact')}: </Typography>
            <Typography variant="overline">{urgentPhone ?? t('notType')}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6} px={6}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2">{t('email')}: </Typography>
            <Typography variant="overline">{email}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6} px={6}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2">{t('relationshipWithEmployee')}: </Typography>
            <Typography variant="overline">{urgentRelationship ?? t('notType')}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6} px={6}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2">{t('province')}: </Typography>
            <Typography variant="overline">{provinceName}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6} px={6}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2">{t('district')}: </Typography>
            <Typography variant="overline">{districtName}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6} px={6}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2">{t('ward')}: </Typography>
            <Typography variant="overline">{wardName}</Typography>
          </Box>
        </Grid>
        {/* <Grid item xs={12} sm={12} md={6} px = {6}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2">{t('address')}: </Typography>
          </Box>
        </Grid> */}

        <Grid container item xs={12} sm={12} md={6} pl={3}>
          <Grid item xs={12} sm={12} md={4}>
            <Typography variant="body2">{t('address')}: </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={8}>
            <Typography variant="overline">{address}</Typography>
          </Grid>
        </Grid>

        <Grid container item xs={12} sm={12} md={6} px={3}>
          <Grid item xs={12} sm={12} md={4}>
            <Typography variant="body2">{t('permanentAddress')}:</Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={8}>
            <Typography variant="overline">
              {address && wardName && districtName && provinceName
                ? `
              ${address}, ${wardName}, ${districtName}, ${provinceName}
               `
                : ''}
            </Typography>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={12} md={6} px={6}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2">{t('province')}: </Typography>
            <Typography variant="overline">{temProvinceName}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6} px={6}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2">{t('district')}: </Typography>
            <Typography variant="overline">{temDistrictName}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6} px={6}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2">{t('ward')}: </Typography>
            <Typography variant="overline">{temWardName}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6} px={6}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2">{t('temporaryResidenceAddressLevel4')}: </Typography>
            <Typography variant="overline">{temporaryAddress}</Typography>
          </Box>
        </Grid>
        <Grid container item xs={12} sm={12} md={6} px={6}>
          <Grid item xs={12} sm={12} md={4}>
            <Typography variant="body2">{t('temporaryResidenceAddress')}: </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={8}>
            <Typography variant="overline">
              {temporaryAddress && temWardName && temDistrictName && temProvinceName
                ? `
              ${temporaryAddress}, ${temWardName}, ${temDistrictName}, ${temProvinceName}
              `
                : ''}
            </Typography>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={12} md={6} px={6}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2">{t('education')}: </Typography>
            <Typography variant="overline">{academicLevel}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6} px={6}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2">{t('major')}: </Typography>
            <Typography variant="overline">{major}</Typography>
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={3} mt={3} xs={12} sm={12}>
        <Grid item xs={12} sm={12} md={6} px={6}>
          <Image src={identityFront_url} alt="identityFront" />
        </Grid>
        <Grid item xs={12} sm={12} md={6} px={6}>
          <Image src={identityBack_url} alt="identityBack" />
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

export default EmployeeBasicNoticeDetails;
