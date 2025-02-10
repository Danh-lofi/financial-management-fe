import { createSlice } from '@reduxjs/toolkit';
import i18next from 'i18next';

import { Utils } from '../../../utils/utils';
import { PermissionAction, PermissionList } from '../../../constants/app.constants';
import { PATH_DASHBOARD } from '../../../routes/paths';
import SvgColor from '../../../components/svg-color';

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

const resetNavHandle = () => {
  const isShowAssignRole = checkIsShowHandle(PermissionList.PERMISSION);
  const isShowBank = checkIsShowHandle(PermissionList.BANK);
  const isShowDepartment = checkIsShowHandle(PermissionList.DEPARTMENT);
  const isShowDistrict = checkIsShowHandle(PermissionList.DISTRICT);
  const isShowEmployee = checkIsShowHandle(PermissionList.EMPLOYEE);
  const isShowEmployeebank = checkIsShowHandle(PermissionList.EMPLOYEE_BANK);
  const isShowEmployeeContact = checkIsShowHandle(PermissionList.EMPLOYEE_CONTACT);
  const isShowEmployeeInsurance = checkIsShowHandle(PermissionList.EMPLOYEE_INSURANCE);
  const isShowEmployeeInsuranceHistory = checkIsShowHandle(
    PermissionList.EMPLOYEE_INSURANCE_HISTORY
  );
  const isShowEmployeeInsuranceProgress = checkIsShowHandle(
    PermissionList.EMPLOYEE_INSURANCE_PROGRESS
  );
  const isShowEmployeeProfile = checkIsShowHandle(PermissionList.EMPLOYEE_PROFILE);
  const isShowEmployeeSalary = checkIsShowHandle(PermissionList.EMPLOYEE_SALARY);
  const isShowEmployeeTax = checkIsShowHandle(PermissionList.EMPLOYEE_TAX);
  const isShowEmployeeExport = checkIsShowHandle(PermissionList.EXPORT_EMPLOYEE);
  const isShowEmployeeImport = checkIsShowHandle(PermissionList.IMPORT_EMPLOYEE);
  const isShowLaborContract = checkIsShowHandle(PermissionList.LABOR_CONTRACT_INFORMATION);
  const isShowMedicalFacility = checkIsShowHandle(PermissionList.MEDICAL_FACILITY);
  const isShowNationality = checkIsShowHandle(PermissionList.NATIONALITY);
  const isShowPosition = checkIsShowHandle(PermissionList.POSITION);
  const isShowProject = checkIsShowHandle(PermissionList.PROJECT);
  const isShowProvince = checkIsShowHandle(PermissionList.PROVINCE);
  const isShowWard = checkIsShowHandle(PermissionList.WARD);

  const navConfig: any = [
    // MANAGEMENT
    // ----------------------------------------------------------------------
    {
      subheader: i18next.t('systemManagement'),
      items: [
        {
          title: i18next.t('hict'),
          path: PATH_DASHBOARD.hict.root,
          icon: ICONS.label,
          children: [
            {
              title: i18next.t('employeeManagement'),
              path: PATH_DASHBOARD.hict.employeeManagement.general,
              isShow: true,

              children: [
                {
                  title: i18next.t('general'),
                  path: PATH_DASHBOARD.hict.employeeManagement.general,
                  isShow: true,
                },
                {
                  title: i18next.t('employeeStatus'),
                  path: PATH_DASHBOARD.hict.employeeManagement.employeeStatus,
                  isShow: isShowEmployee,
                },
                // {
                //   title: i18next.t('recruitment'),
                //   path: PATH_DASHBOARD.hict.employeeManagement.recruitment,
                // },
                // {
                //   title: i18next.t('attendance'),
                //   path: PATH_DASHBOARD.hict.employeeManagement.attendance,
                // },
              ],
            },
            {
              title: i18next.t('setting'),
              path: PATH_DASHBOARD.hict.setting.root,
              isShow: true,
              children: [
                {
                  title: i18next.t('project'),
                  path: PATH_DASHBOARD.hict.setting.project,
                  isShow: isShowProject,
                },
                {
                  title: i18next.t('department'),
                  path: PATH_DASHBOARD.hict.setting.department,
                  isShow: isShowDepartment,
                },

                {
                  title: i18next.t('position'),
                  path: PATH_DASHBOARD.hict.setting.position,
                  isShow: isShowPosition,
                },

                {
                  title: i18next.t('province'),
                  path: PATH_DASHBOARD.hict.setting.province,
                  isShow: isShowProvince,
                },
                {
                  title: i18next.t('district'),
                  path: PATH_DASHBOARD.hict.setting.district,
                  isShow: isShowDistrict,
                },
                {
                  title: i18next.t('ward'),
                  path: PATH_DASHBOARD.hict.setting.ward,
                  isShow: isShowWard,
                },
                {
                  title: i18next.t('medicalFacility'),
                  path: PATH_DASHBOARD.hict.setting.medicalFacility,
                  isShow: isShowMedicalFacility,
                },
                {
                  title: i18next.t('banking'),
                  path: PATH_DASHBOARD.hict.setting.banking,
                  isShow: isShowBank,
                },
                {
                  title: i18next.t('nationality'),
                  path: PATH_DASHBOARD.hict.setting.nationality,
                  isShow: isShowNationality,
                },
                {
                  title: i18next.t('user'),
                  path: PATH_DASHBOARD.hict.setting.userList,
                  isShow: true,
                  // isShow: isShowEmployeeProfile,
                },
                {
                  title: i18next.t('permission'),
                  path: PATH_DASHBOARD.user.permission,
                  isShow: isShowAssignRole,
                },
              ],
            },
          ],
        },
      ],
    },
  ];

  return navConfig.map((section: any) => ({
    ...section,
    items: section.items
      .map((item: any) => {
        return {
          ...item,
          children: item.children.map((child: any) => {
            return {
              ...child,
              children: child.children ? child.children.filter((i: any) => i.isShow) : null,
            };
          }),
        };
      })
      .filter((item: any) => item.children?.length > 0 || item.isShow),
  }));
};

const checkIsShowHandle = (permission: string) => {
  return Utils.checkPermission(permission, PermissionAction.VIEW);
};

const initialState = {
  navConfig: resetNavHandle(),
};

export const navSlice = createSlice({
  name: 'nav',
  initialState,
  reducers: {
    resetNav: (state, action) => {
      state.navConfig = resetNavHandle();
    },
  },
  extraReducers: {},
});

export default navSlice.reducer;

export const { resetNav } = navSlice.actions;
