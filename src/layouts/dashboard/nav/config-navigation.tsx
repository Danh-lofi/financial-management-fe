import i18next from 'i18next';
import { PATH_DASHBOARD } from '@/routes/paths';
import SvgColor from '../../../components/svg-color';

// routes

// components


// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  blog: icon('ic_blog'),
  cart: icon('ic_cart'),
  chat: icon('ic_chat'),
  mail: icon('ic_mail'),
  user: icon('ic_user'),
  file: icon('ic_file'),
  lock: icon('ic_lock'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  kanban: icon('ic_kanban'),
  folder: icon('ic_folder'),
  banking: icon('ic_banking'),
  booking: icon('ic_booking'),
  invoice: icon('ic_invoice'),
  calendar: icon('ic_calendar'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
};

const navConfig = [
  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: i18next.t('systemManagement'),
    items: [
      {
        title: 'FM',
        path: PATH_DASHBOARD.fm.root,
        icon: ICONS.label,
        children: [
          {
            title: i18next.t('category'),
            path: PATH_DASHBOARD.fm.category.root,
            children: [
              {
                title: i18next.t('truck'),
                path: PATH_DASHBOARD.fm.category.truckList,
              },
              {
                title: i18next.t('remooc'),
                path: PATH_DASHBOARD.fm.category.remoocList,
              },
              {
                title: i18next.t('driver'),
                path: PATH_DASHBOARD.fm.category.driverList,
              },
            ],
          },
          {
            title: i18next.t('transportManagement'),
            path: PATH_DASHBOARD.fm.transportManagement.general,
            children: [
              {
                title: i18next.t('general'),
                path: PATH_DASHBOARD.fm.transportManagement.general,
              },
              {
                title: i18next.t('transportList'),
                path: PATH_DASHBOARD.fm.transportManagement.transportList,
              },
            ],
          },
          {
            title: i18next.t('setting'),
            path: PATH_DASHBOARD.fm.setting.root,
            children: [
              {
                title: i18next.t('user'),
                path: PATH_DASHBOARD.fm.setting.userList,
              },
              {
                title: i18next.t('permission'),
                path: PATH_DASHBOARD.user.permission,
              },
            ],
          },

          // {
          //   title: i18next.t('performances'),
          //   path: PATH_DASHBOARD.eCommerce.shop,
          //   children: [
          //     { title: i18next.t('okr'), path: PATH_DASHBOARD.eCommerce.shop },
          //     { title: i18next.t('taskKpi'), path: PATH_DASHBOARD.eCommerce.shop },
          //   ],
          // },
        ],
      },

      // {
      //   title: i18next.t('recruitmentAndTraining'),
      //   path: PATH_DASHBOARD.eCommerce.root,
      //   icon: ICONS.external,
      //   children: [
      //     {
      //       title: i18next.t('recruitment'),
      //       path: PATH_DASHBOARD.eCommerce.shop,
      //       children: [
      //         {
      //           title: i18next.t('jobPosting'),
      //           path: PATH_DASHBOARD.eCommerce.shop,
      //         },
      //         {
      //           title: i18next.t('jobSeeking'),
      //           path: PATH_DASHBOARD.eCommerce.shop,
      //         },
      //         {
      //           title: i18next.t('management'),
      //           path: PATH_DASHBOARD.eCommerce.shop,
      //         },
      //       ],
      //     },
      //     {
      //       title: i18next.t('attendance'),
      //       path: PATH_DASHBOARD.eCommerce.demoView,
      //       children: [
      //         {
      //           title: i18next.t('employees'),
      //           path: PATH_DASHBOARD.eCommerce.shop,
      //         },
      //         {
      //           title: i18next.t('trainerAdmin'),
      //           path: PATH_DASHBOARD.eCommerce.shop,
      //         },
      //       ],
      //     },
      //   ],
      // },
    ],
  },
];

export default navConfig;
