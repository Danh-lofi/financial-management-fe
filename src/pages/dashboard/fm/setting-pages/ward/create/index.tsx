import CustomBreadcrumbs from '@/components/custom-breadcrumbs';
import PageWrapper from '@/components/page-wrapper';
import { useSettingsContext } from '@/components/settings';
import { useLocales } from '@/locales';
import { PATH_DASHBOARD } from '@/routes/paths';
import { CreateDistrictForm } from '@/sections/@dashboard/fm/district/create';
import { CreateWardForm } from '@/sections/@dashboard/fm/ward/create';
import { Container } from '@mui/material';

// ----------------------------------------------------------------------

export default function CreateWardPage() {
  const { themeStretch } = useSettingsContext();
  const { t } = useLocales();

  return (
      <PageWrapper title={t('createWard')}>
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <CustomBreadcrumbs
            heading={t('createWard')}
            links={[
              { name: t('dashboard'), href: PATH_DASHBOARD.root },
              { name: t('ward'), href: PATH_DASHBOARD.fm.setting.ward},
              { name: t('create') },
            ]}
          />
          <CreateWardForm/>
        </Container>
      </PageWrapper>
  );
}
