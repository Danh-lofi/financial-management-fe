import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getNoticeHistories } from 'redux/slices/dashboard/notice';
import { dispatch, useSelector } from 'redux/store';
import {
  EmployeeBankingNoticeDetails,
  EmployeeBasicNoticeDetails,
  EmployeeContactNoticeDetails,
  EmployeeInsuranceNoticeDetails,
  EmployeeLaborContractNoticeDetails,
  EmployeeProfileNoticeDetails,
  EmployeeTaxIncomeNoticeDetails,
  NoticeListSection,
} from 'sections/@dashboard/hict/notice';
import CustomBreadcrumbs from '@/components/custom-breadcrumbs/CustomBreadcrumbs';
import PageWrapper from '@/components/page-wrapper';
import { useSettingsContext } from '@/components/settings';
import { DEFAULT_PAGINATION, TYPE_NOTICE } from '@/constants/app.constants';
import { useLocales } from '@/locales';
import { Card, Container, Typography } from '@mui/material';
import { PATH_DASHBOARD } from '../../../../../routes/paths';

// @mui


// routes








// ----------------------------------------------------------------------

export default function NoticeDetailsPage() {
  const { themeStretch } = useSettingsContext();
  const { noticeDetails, employeeId } = useSelector((state) => state.notice);
  const { t } = useLocales();
  const { type, id } = useParams();
console.log(noticeDetails)
  useEffect(() => {
    dispatch(
      getNoticeHistories({
        employeeId: id,
        pageSize: DEFAULT_PAGINATION.PAGE_ONE,
        pageIndex: DEFAULT_PAGINATION.PAGE_INDEX,
        infoType: type,
      })
    );
  },[type,id]);
  return (
    <PageWrapper title={t('noticeDetails')}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={t('noticeDetails')}
          links={[
            { name: t('dashboard'), href: PATH_DASHBOARD.root },
            { name: t('noticeDetails') },
          ]}
        />
        {/* <NoticeListSection /> */}

        {type === TYPE_NOTICE.basicType && employeeId !== '' ? <EmployeeBasicNoticeDetails /> : ''}
        {type === TYPE_NOTICE.contactType && employeeId !== '' ? (
          <EmployeeContactNoticeDetails />
        ) : (
          ''
        )}
        {type === TYPE_NOTICE.bankType && employeeId !== '' ? <EmployeeBankingNoticeDetails /> : ''}
        {type === TYPE_NOTICE.insuranceType && employeeId !== '' ? (
          <EmployeeInsuranceNoticeDetails />
        ) : (
          ''
        )}
        {type === TYPE_NOTICE.taxType && employeeId !== '' ? (
          <EmployeeTaxIncomeNoticeDetails />
        ) : (
          ''
        )}
        {type === TYPE_NOTICE.profileType && employeeId !== '' ? (
          <EmployeeProfileNoticeDetails />
        ) : (
          ''
        )}
        {type === TYPE_NOTICE.contractType && employeeId !== '' ? (
          <EmployeeLaborContractNoticeDetails />
        ) : (
          ''
        )}
 
      </Container>
    </PageWrapper>
  );
}
