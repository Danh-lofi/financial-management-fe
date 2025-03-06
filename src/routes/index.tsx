import { Navigate, useRoutes } from 'react-router-dom';
import AuthGuard from '@/auth/AuthGuard';
import GuestGuard from '@/auth/GuestGuard';
import { PATH_AFTER_LOGIN } from '@/config-global';
import CompactLayout from '@/layouts/compact';
import DashboardLayout from '@/layouts/dashboard';
import {
  BlankPage,
  CategoryPage,
  ComingSoonPage,
  EmployeeGeneralPage,
  EmployeeListPage,
  FileManagerPage,
  LoginPage,
  MaintenancePage,
  NewPasswordPage,
  NoticeDetailsPage,
  Page403,
  Page404,
  Page500,
  PermissionDeniedPage,
  RegisterPage,
  ResetPasswordPage,
  TransactionListPage,
  UserAccountPage,
  UserCardsPage,
  UserCreatePage,
  UserEditPage,
  UserListPage,
  UserListSettingPage,
  UserPermissionPage,
  UserProfilePage,
  VerifyCodePage,
} from './elements';

// auth


// layouts



// config

//


// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    // Auth
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <LoginPage />
            </GuestGuard>
          ),
        },
        {
          path: 'register',
          element: (
            <GuestGuard>
              <RegisterPage />
            </GuestGuard>
          ),
        },
        { path: 'login-unprotected', element: <LoginPage /> },
        { path: 'register-unprotected', element: <RegisterPage /> },
        {
          element: <CompactLayout />,
          children: [
            { path: 'reset-password', element: <ResetPasswordPage /> },
            { path: 'new-password', element: <NewPasswordPage /> },
            { path: 'verify', element: <VerifyCodePage /> },
          ],
        },
      ],
    },

    // Dashboard
    {
      path: 'dashboard',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },

        // System management
        {
          path: 'fm',
          children: [
            { element: <Navigate to="/" replace />, index: true },
            {
              path: 'categories',
              children: [
                {
                  element: <Navigate to="/dashboard/fm/transport-host/truck" replace />,
                  index: true,
                },
                {
                  path: 'category',
                  element: <CategoryPage />,
                },
              ],
            },
            {
              path: 'finance-management',
              children: [
                {
                  path: 'general',
                  element: <EmployeeGeneralPage />,
                },
                {
                  path: 'transaction-list',
                  element: <TransactionListPage />,
                },
              ],
            },
            {
              path: 'setting',
              children: [
                {
                  path: 'user-list',
                  element: <UserListSettingPage />,
                },
              ],
            },
            {
              path: 'notice',
              children: [
                // { element: <Navigate to="/dashboard/fm/notice/list" replace />, index: true },
                // { path: 'list', element: <NoticeListPage /> },
                { path: 'notice-details/:type/:id', element: <NoticeDetailsPage /> },
              ],
            },

            { path: 'cards', element: <UserCardsPage /> },
          ],
        },

        {
          path: 'user',
          children: [
            { element: <Navigate to="/dashboard/user/profile" replace />, index: true },
            { path: 'profile', element: <UserProfilePage /> },
            { path: 'cards', element: <UserCardsPage /> },
            { path: 'list', element: <UserListPage /> },
            { path: 'new', element: <UserCreatePage /> },
            { path: ':name/edit', element: <UserEditPage /> },
            { path: 'account', element: <UserAccountPage /> },
            { path: 'permission', element: <UserPermissionPage /> },
          ],
        },

        { path: 'files-manager', element: <FileManagerPage /> },

        { path: 'permission-denied', element: <PermissionDeniedPage /> },
        { path: 'blank', element: <BlankPage /> },
      ],
    },

    // Main Routes
    {
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [{ element: <EmployeeGeneralPage />, index: true }],
    },
    {
      element: <CompactLayout />,
      children: [
        { path: 'coming-soon', element: <ComingSoonPage /> },
        { path: 'maintenance', element: <MaintenancePage /> },
        { path: '500', element: <Page500 /> },
        { path: '404', element: <Page404 /> },
        { path: '403', element: <Page403 /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
