import { Suspense, lazy, ElementType } from 'react';
// components
import LoadingScreen from '../components/loading-screen';

// ----------------------------------------------------------------------

const Loadable = (Component: ElementType) => (props: any) =>
  (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );

// ----------------------------------------------------------------------

// AUTH
export const LoginPage = Loadable(lazy(() => import('../pages/auth/LoginPage')));
export const RegisterPage = Loadable(lazy(() => import('../pages/auth/RegisterPage')));
export const VerifyCodePage = Loadable(lazy(() => import('../pages/auth/VerifyCodePage')));
export const NewPasswordPage = Loadable(lazy(() => import('../pages/auth/NewPasswordPage')));
export const ResetPasswordPage = Loadable(lazy(() => import('../pages/auth/ResetPasswordPage')));

// DASHBOARD: hict
export const EmployeeGeneralPage = Loadable(
  lazy(() => import('../pages/dashboard/hict/employee-management/general'))
);

export const EmployeeListPage = Loadable(
  lazy(() => import('../pages/dashboard/hict/employee-management/employee-list/index'))
);

export const TransportListPage = Loadable(
  lazy(() => import('../pages/dashboard/hict/transport-management/order-list/index'))
);

// Category
export const TruckPage = Loadable(
  lazy(() => import('../pages/dashboard/hict/transport-host/truck/index'))
);

export const RemoocPage = Loadable(
  lazy(() => import('../pages/dashboard/hict/transport-host/remooc/index'))
);
export const DriverPage = Loadable(
  lazy(() => import('../pages/dashboard/hict/transport-host/driver/index'))
);

// Notices
export const NoticeDetailsPage = Loadable(
  lazy(() => import('../pages/dashboard/hict/notice/details'))
);
export const NoticeListPage = Loadable(
  lazy(() => import('../sections/@dashboard/hict/notice/NoticeListSection'))
);

export const UserListSettingPage = Loadable(
  lazy(() => import('../pages/dashboard/hict/setting-pages/user'))
);

// DASHBOARD: USER
export const UserProfilePage = Loadable(lazy(() => import('../pages/dashboard/UserProfilePage')));
export const UserCardsPage = Loadable(lazy(() => import('../pages/dashboard/UserCardsPage')));
export const UserListPage = Loadable(lazy(() => import('../pages/dashboard/UserListPage')));
export const UserAccountPage = Loadable(lazy(() => import('../pages/dashboard/UserAccountPage')));
export const UserCreatePage = Loadable(lazy(() => import('../pages/dashboard/UserCreatePage')));
export const UserEditPage = Loadable(lazy(() => import('../pages/dashboard/UserEditPage')));
export const UserPermissionPage = Loadable(
  lazy(() => import('../pages/dashboard/hict/account-popover/PermissionPage'))
);

// DASHBOARD: FILE MANAGER
export const FileManagerPage = Loadable(lazy(() => import('../pages/dashboard/FileManagerPage')));

// TEST RENDER PAGE BY ROLE
export const PermissionDeniedPage = Loadable(
  lazy(() => import('../pages/dashboard/PermissionDeniedPage'))
);

// BLANK PAGE
export const BlankPage = Loadable(lazy(() => import('../pages/dashboard/BlankPage')));

// MAIN
export const Page500 = Loadable(lazy(() => import('../pages/Page500')));
export const Page403 = Loadable(lazy(() => import('../pages/Page403')));
export const Page404 = Loadable(lazy(() => import('../pages/Page404')));
export const FaqsPage = Loadable(lazy(() => import('../pages/FaqsPage')));
export const AboutPage = Loadable(lazy(() => import('../pages/AboutPage')));
export const Contact = Loadable(lazy(() => import('../pages/ContactPage')));
export const ComingSoonPage = Loadable(lazy(() => import('../pages/ComingSoonPage')));
export const MaintenancePage = Loadable(lazy(() => import('../pages/MaintenancePage')));
