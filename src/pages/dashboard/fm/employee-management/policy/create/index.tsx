import CustomBreadcrumbs from '@/components/custom-breadcrumbs';
import PageWrapper from '@/components/page-wrapper';
import { useSettingsContext } from '@/components/settings';
import { useLocales } from '@/locales';
import { PATH_DASHBOARD } from '@/routes/paths';
import { CreatePolicyEmployeeForm } from '@/sections/@dashboard/fm/setting-pages/policy/create';
import { Container } from '@mui/material';

// ----------------------------------------------------------------------

export default function CreatePolicyEmployeePage() {
  const { themeStretch } = useSettingsContext();
  const { t } = useLocales();

  return (
      <PageWrapper title={t('createPolicyEmployee')}>
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <CustomBreadcrumbs
            heading={t('createPolicyEmployee')}
            links={[
              { name: t('dashboard'), href: PATH_DASHBOARD.root },
              { name: t('policyEmployee'), href: PATH_DASHBOARD.fm.setting.policyEmployee },
              { name: t('create') },
            ]}
          />
          <CreatePolicyEmployeeForm/>
        </Container>
      </PageWrapper>
  );
}
