function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  verify: path(ROOTS_AUTH, '/verify'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  newPassword: path(ROOTS_AUTH, '/new-password'),
};

export const PATH_PAGE = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page403: '/403',
  page404: '/404',
  page500: '/500',
  components: '/components',
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  kanban: path(ROOTS_DASHBOARD, '/kanban'),
  calendar: path(ROOTS_DASHBOARD, '/calendar'),
  fileManager: path(ROOTS_DASHBOARD, '/files-manager'),
  permissionDenied: path(ROOTS_DASHBOARD, '/permission-denied'),
  blank: path(ROOTS_DASHBOARD, '/blank'),
  general: {
    app: path(ROOTS_DASHBOARD, '/app'),
    ecommerce: path(ROOTS_DASHBOARD, '/ecommerce'),
    analytics: path(ROOTS_DASHBOARD, '/analytics'),
    banking: path(ROOTS_DASHBOARD, '/banking'),
    booking: path(ROOTS_DASHBOARD, '/booking'),
    file: path(ROOTS_DASHBOARD, '/file'),
  },
  mail: {
    root: path(ROOTS_DASHBOARD, '/mail'),
    all: path(ROOTS_DASHBOARD, '/mail/all'),
  },
  chat: {
    root: path(ROOTS_DASHBOARD, '/chat'),
    new: path(ROOTS_DASHBOARD, '/chat/new'),
    view: (name: string) => path(ROOTS_DASHBOARD, `/chat/${name}`),
  },

  hict: {
    root: path(ROOTS_DASHBOARD, '/hict'),
    employeeManagement: {
      root: path(ROOTS_DASHBOARD, '/employee-management'),
      general: path(ROOTS_DASHBOARD, '/hict/employee-management/general'),
      employeeStatus: path(ROOTS_DASHBOARD, '/hict/employee-management/employee-list'),
      createEmployee: path(ROOTS_DASHBOARD, '/hict/employee-management/employee-list/create'),
      editEmployee: (id: string) =>
        path(ROOTS_DASHBOARD, `/hict/employee-management/employee-list/edit/${id}`),
      recruitment: path(ROOTS_DASHBOARD, '/hict/employee-management/recruitment'),
      attendance: path(ROOTS_DASHBOARD, '/hict/employee-management/attendance'),
      createAttendance: path(ROOTS_DASHBOARD, '/hict/employee-management/attendance/create'),
    },
    category: {
      root: path(ROOTS_DASHBOARD, '/hict/transport-host'),
      truckList: path(ROOTS_DASHBOARD, '/hict/transport-host/truck'),
      remoocList: path(ROOTS_DASHBOARD, '/hict/transport-host/remooc'),
      driverList: path(ROOTS_DASHBOARD, '/hict/transport-host/driver'),
    },
    transportManagement: {
      root: path(ROOTS_DASHBOARD, '/transport-management'),
      general: path(ROOTS_DASHBOARD, '/hict/transport-management/general'),
      transportList: path(ROOTS_DASHBOARD, '/hict/transport-management/transport-list'),
    },
    notice: {
      root: path(ROOTS_DASHBOARD, '/notice'),
      noticeList: path(ROOTS_DASHBOARD, '/notice/list'),
      noticeDetails: (type: string) => path(ROOTS_DASHBOARD, `/hict/notice/notice-details/${type}`),
    },

    setting: {
      root: path(ROOTS_DASHBOARD, '/hict/setting/project'),
      policyEmployee: path(ROOTS_DASHBOARD, '/hict/setting/policy-employee'),
      createPolicyEmployee: path(ROOTS_DASHBOARD, '/hict/setting/policy-employee/create'),
      project: path(ROOTS_DASHBOARD, '/hict/setting/project'),
      createProject: path(ROOTS_DASHBOARD, '/hict/setting/project/create'),
      editProject: (id: string) => path(ROOTS_DASHBOARD, `/hict/setting/project/edit/${id}`),
      banking: path(ROOTS_DASHBOARD, '/hict/setting/banking'),
      createBanking: path(ROOTS_DASHBOARD, '/hict/setting/banking/create'),
      editBanking: (id: string) => path(ROOTS_DASHBOARD, `/hict/setting/banking/edit/${id}`),
      nationality: path(ROOTS_DASHBOARD, '/hict/setting/nationality'),
      createNationality: path(ROOTS_DASHBOARD, '/hict/setting/nationality/create'),
      editNationality: (id: string) =>
        path(ROOTS_DASHBOARD, `/hict/setting/nationality/edit/${id}`),
      department: path(ROOTS_DASHBOARD, '/hict/setting/department'),
      createDepartment: path(ROOTS_DASHBOARD, '/hict/setting/department/create'),
      editDepartment: (id: string) => path(ROOTS_DASHBOARD, `/hict/setting/department/edit/${id}`),
      position: path(ROOTS_DASHBOARD, '/hict/setting/position'),
      createPosition: path(ROOTS_DASHBOARD, '/hict/setting/position/create'),
      editPosition: (id: string) => path(ROOTS_DASHBOARD, `/hict/setting/position/edit/${id}`),
      dayoff: path(ROOTS_DASHBOARD, '/hict/setting/dayoff'),
      createDayoff: path(ROOTS_DASHBOARD, '/hict/setting/dayoff/create'),
      editDayoff: (id: string) => path(ROOTS_DASHBOARD, `/hict/setting/dayoff/edit/${id}`),
      document: path(ROOTS_DASHBOARD, '/hict/setting/document'),
      createDocument: path(ROOTS_DASHBOARD, '/hict/setting/document/create'),
      province: path(ROOTS_DASHBOARD, '/hict/setting/province'),
      createProvince: path(ROOTS_DASHBOARD, '/hict/setting/province/create'),
      editProvince: (id: string) => path(ROOTS_DASHBOARD, `/hict/setting/province/edit/${id}`),
      district: path(ROOTS_DASHBOARD, '/hict/setting/district'),
      createDistrict: path(ROOTS_DASHBOARD, '/hict/setting/district/create'),
      editDistrict: (id: string) => path(ROOTS_DASHBOARD, `/hict/setting/district/edit/${id}`),
      ward: path(ROOTS_DASHBOARD, '/hict/setting/ward'),
      createWard: path(ROOTS_DASHBOARD, '/hict/setting/ward/create'),
      editWard: (id: string) => path(ROOTS_DASHBOARD, `/hict/setting/ward/edit/${id}`),
      medicalFacility: path(ROOTS_DASHBOARD, '/hict/setting/medical-facility'),
      createMedicalFacility: path(ROOTS_DASHBOARD, '/hict/setting/medical-facility/create'),
      editMedicalFacility: (id: string) =>
        path(ROOTS_DASHBOARD, `/hict/setting/medical-facility/edit/${id}`),
      userList: path(ROOTS_DASHBOARD, '/hict/setting/user-list'),
    },
  },

  user: {
    root: path(ROOTS_DASHBOARD, '/user'),
    new: path(ROOTS_DASHBOARD, '/user/new'),
    list: path(ROOTS_DASHBOARD, '/user/list'),
    cards: path(ROOTS_DASHBOARD, '/user/cards'),
    profile: path(ROOTS_DASHBOARD, '/user/profile'),
    account: path(ROOTS_DASHBOARD, '/user/account'),
    permission: path(ROOTS_DASHBOARD, '/user/permission'),

    edit: (name: string) => path(ROOTS_DASHBOARD, `/user/${name}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, `/user/reece-chung/edit`),
  },
  eCommerce: {
    root: path(ROOTS_DASHBOARD, '/e-commerce'),
    shop: path(ROOTS_DASHBOARD, '/e-commerce/shop'),
    list: path(ROOTS_DASHBOARD, '/e-commerce/list'),
    checkout: path(ROOTS_DASHBOARD, '/e-commerce/checkout'),
    new: path(ROOTS_DASHBOARD, '/e-commerce/product/new'),
    view: (name: string) => path(ROOTS_DASHBOARD, `/e-commerce/product/${name}`),
    edit: (name: string) => path(ROOTS_DASHBOARD, `/e-commerce/product/${name}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-blazer-low-77-vintage/edit'),
    demoView: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-air-force-1-ndestrukt'),
  },
  invoice: {
    root: path(ROOTS_DASHBOARD, '/invoice'),
    list: path(ROOTS_DASHBOARD, '/invoice/list'),
    new: path(ROOTS_DASHBOARD, '/invoice/new'),
    view: (id: string) => path(ROOTS_DASHBOARD, `/invoice/${id}`),
    edit: (id: string) => path(ROOTS_DASHBOARD, `/invoice/${id}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, '/invoice/e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1/edit'),
    demoView: path(ROOTS_DASHBOARD, '/invoice/e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5'),
  },
  blog: {
    root: path(ROOTS_DASHBOARD, '/blog'),
    posts: path(ROOTS_DASHBOARD, '/blog/posts'),
    new: path(ROOTS_DASHBOARD, '/blog/new'),
    view: (title: string) => path(ROOTS_DASHBOARD, `/blog/post/${title}`),
    demoView: path(ROOTS_DASHBOARD, '/blog/post/apply-these-7-secret-techniques-to-improve-event'),
  },
};

export const PATH_DOCS = {
  root: 'https://docs.minimals.cc',
  changelog: 'https://docs.minimals.cc/changelog',
};

export const PATH_ZONE_ON_STORE = 'https://mui.com/store/items/zone-landing-page/';

export const PATH_MINIMAL_ON_STORE = 'https://mui.com/store/items/minimal-dashboard/';

export const PATH_FREE_VERSION = 'https://mui.com/store/items/minimal-dashboard-free/';

export const PATH_FIGMA_PREVIEW =
  'https://www.figma.com/file/rWMDOkMZYw2VpTdNuBBCvN/%5BPreview%5D-Minimal-Web.26.11.22?node-id=0%3A1&t=ya2mDFiuhTXXLLF1-1';
