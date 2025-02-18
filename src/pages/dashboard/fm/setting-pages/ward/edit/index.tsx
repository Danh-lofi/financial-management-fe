import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CustomBreadcrumbs from '@/components/custom-breadcrumbs';
import PageWrapper from '@/components/page-wrapper';
import { useSettingsContext } from '@/components/settings';
import { GETALL_PROVINCE } from '@/constants/app.constants';
import { useLocales } from '@/locales';
import { getDistrictDetailApi } from '@/redux/slices/dashboard/district';
import { getListProvinceApi } from '@/redux/slices/dashboard/province';
import { getWardDetailApi } from '@/redux/slices/dashboard/ward';
import { dispatch } from '@/redux/store';
import { PATH_DASHBOARD } from '@/routes/paths';
import { CreateDistrictForm } from '@/sections/@dashboard/fm/district/create';
import { CreateWardForm } from '@/sections/@dashboard/fm/ward/create';
import { Container } from '@mui/material';

// ----------------------------------------------------------------------

export default function EditWardPage() {
  const { themeStretch } = useSettingsContext();
  const { t } = useLocales();

  const params = useParams();

  useEffect(() => {
    if (params.id) {
      dispatch(getWardDetailApi(params.id));
    }
  }, [params.id]);

  return (
    <PageWrapper title={t('editWard')}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={t('editWard')}
          links={[
            { name: t('dashboard'), href: PATH_DASHBOARD.root },
            { name: t('ward'), href: PATH_DASHBOARD.fm.setting.ward },
            { name: t('edit') },
          ]}
        />
        <CreateWardForm isEdit />
      </Container>
    </PageWrapper>
  );
}
