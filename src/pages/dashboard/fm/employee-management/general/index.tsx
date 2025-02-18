import PageWrapper from '@/components/page-wrapper';
import { useSettingsContext } from '@/components/settings';
import { useLocales } from '@/locales';
import { PATH_DASHBOARD } from '@/routes/paths';
import { EmployeeAnalytics } from '@/sections/@dashboard/fm/employee/list';
import { Container } from '@mui/material';
import CustomBreadcrumbs from '../../../../../components/custom-breadcrumbs';

export default function EmployeeGeneralPage() {
  const { t } = useLocales();
  const { themeStretch } = useSettingsContext();

  return <PageWrapper title={t('general')}>
  <Container maxWidth={themeStretch ? false : 'lg'}>
    <CustomBreadcrumbs
      heading={t('general')}
      links={[
        { name: t('dashboard'), href: PATH_DASHBOARD.root },
        { name: t('employee'), href: PATH_DASHBOARD.fm.employeeManagement.employeeStatus },
        { name: t('general') },
      ]}
    />
    <EmployeeAnalytics />
  </Container>
</PageWrapper>
}
