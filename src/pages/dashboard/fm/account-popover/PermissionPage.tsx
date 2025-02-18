import CustomBreadcrumbs from "components/custom-breadcrumbs/CustomBreadcrumbs";
import PageWrapper from "components/page-wrapper";
import { useSettingsContext } from "components/settings";
import { useLocales } from "locales";
import { PATH_DASHBOARD } from "@/routes/paths";
import PermissionUser from "@/sections/@dashboard/fm/employee/account-popover/PermissionUser";
import { Container } from "@mui/material";

export default function PermissionPage() {
    const { themeStretch } = useSettingsContext();
    const { t } = useLocales();
  
    return (
        <PageWrapper title={t('permission')}>
          <Container maxWidth={themeStretch ? false : 'lg'}>
            <CustomBreadcrumbs
              heading={t('permission')}
              links={[
                { name: t('dashboard'), href: PATH_DASHBOARD.root },
                { name: t('permission')},
              ]}
            />
            <PermissionUser/>
          </Container>
        </PageWrapper>
    );
  }