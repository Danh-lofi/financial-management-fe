import i18next from 'i18next';

export const LOCAL_STORAGE_KEYS = {
  ACCESS_TOKEN: 'accessToken',
  LOCALE: 'i18nextLng',
  ADMIN_TOKEN: 'admin-token',
  PERMISSION_LIST: 'permissionList',
  REFRESH_TOKEN: 'refreshToken',
};

export const TYPE_NOTICE = {
  basicType: 'basic',
  contactType: 'contact',
  profileType: 'profile',
  insuranceType: 'insurance',
  bankType: 'bank',
  taxType: 'tax',
  contractType: 'contract',
};

export const DEFAULT_PAGINATION = {
  PAGE_INDEX: 1,
  PAGE_SIZE: 10,
  PAGE_ONE: 1,
};

export const GETALL_PROVINCE = {
  PAGE_INDEX: 1,
  PAGE_SIZE: 100,
};

export const GETALL_DISTRICT = {
  PAGE_INDEX: 1,
  PAGE_SIZE: 1000,
};

export const EMPLOYEE_GENERAL_STATUS = {
  CONTRACT: {
    probationary: {
      label: i18next.t('probationaryPeriod'),
      value: 'probationary',
    },
    firstLaborContract: {
      label: i18next.t('isFirstLaborContract'),
      value: 'firstLaborContract',
    },
    secondLaborContract: {
      label: i18next.t('isSecondLaborContract'),
      value: 'secondLaborContract',
    },
    infinite: {
      label: i18next.t('isInfinite'),
      value: 'infinite',
    },
    service: {
      label: i18next.t('isService'),
      value: 'service',
    },
    training: {
      label: i18next.t('isTraining'),
      value: 'training',
    },
  },
  INCOMPLETE: {
    contact: {
      label: i18next.t('contactInfo'),
      value: 'contact',
    },
    bank: {
      label: i18next.t('bankingInfo'),
      value: 'bank',
    },
    insurance: {
      label: i18next.t('insuranceInformation'),
      value: 'insurance',
    },
    tax: {
      label: i18next.t('incomeTaxInformation'),
      value: 'tax',
    },
    profile: {
      label: i18next.t('profileInformation'),
      value: 'profile',
    },
  },
};
export const OBJECT_TYPE = {
  source: {
    internalSource: 'internalSource',
    externalSource: 'externalSource',
  },
  experience: {
    saleExperience: 'saleExperience',
    office: 'office',
    market: 'market',
    warehouseAndDelivery: 'warehouseAndDelivery',
  },
  tax: {
    contractStatus: 'contractStatus',
  },
  insurance: {
    insuranceStatus: 'insuranceStatus',
  },
  bank: {
    bankStatus: 'bankStatus',
  },
};

export const SOURCE_OPTIONS = [
  {
    label: i18next.t('internalSource'),
    value: 'internalSource',
  },
  {
    label: i18next.t('externalSource'),
    value: 'externalSource',
  },
];

export const TAX_OPTIONS = [
  {
    label: i18next.t('progressiveTariff'),
    value: i18next.t('progressiveTariff'),
  },
  {
    label: i18next.t('fullTariff10'),
    value: i18next.t('fullTariff10'),
  },
  {
    label: i18next.t('fullTariff20'),
    value: i18next.t('fullTariff20'),
  },
];
export const LABOR_OPTIONS = [
  {
    label: i18next.t('internalLabor'),
    value: i18next.t('internalLabor'),
  },
  {
    label: i18next.t('externalLabor'),
    value: i18next.t('externalLabor'),
  },
];

export const PAYCHECKS = [
  {
    label: `${i18next.t('paycheck')} 1`,
    value: 0,
  },
  {
    label: `${i18next.t('paycheck')} 2`,
    value: 1,
  },
  {
    label: `${i18next.t('paycheck')} 3`,
    value: 2,
  },
];

export const EXPERIENCE_OPTIONS = [
  {
    label: i18next.t('saleExperience'),
    value: 'saleExperience',
  },
  {
    label: i18next.t('office'),
    value: 'office',
  },
  {
    label: i18next.t('market'),
    value: 'market',
  },
  {
    label: i18next.t('warehouseAndDelivery'),
    value: 'warehouseAndDelivery',
  },
];

export const GENDER_OPTION = [
  {
    label: i18next.t('male'),
    value: 'male',
  },
  {
    label: i18next.t('female'),
    value: 'female',
  },
];

export const MARRIAGE_OPTION = [
  {
    label: i18next.t('single'),
    value: i18next.t('single'),
  },
  {
    label: i18next.t('married'),
    value: i18next.t('married'),
  },
];

export const CONTRACT_STATUS = [
  {
    label: EMPLOYEE_GENERAL_STATUS.CONTRACT.probationary.label,
    value: EMPLOYEE_GENERAL_STATUS.CONTRACT.probationary.value,
  },
  {
    label: EMPLOYEE_GENERAL_STATUS.CONTRACT.firstLaborContract.label,
    value: EMPLOYEE_GENERAL_STATUS.CONTRACT.firstLaborContract.value,
  },
  {
    label: EMPLOYEE_GENERAL_STATUS.CONTRACT.secondLaborContract.label,
    value: EMPLOYEE_GENERAL_STATUS.CONTRACT.secondLaborContract.value,
  },
  {
    label: EMPLOYEE_GENERAL_STATUS.CONTRACT.infinite.label,
    value: EMPLOYEE_GENERAL_STATUS.CONTRACT.infinite.value,
  },
  {
    label: EMPLOYEE_GENERAL_STATUS.CONTRACT.service.label,
    value: EMPLOYEE_GENERAL_STATUS.CONTRACT.service.value,
  },
  {
    label: EMPLOYEE_GENERAL_STATUS.CONTRACT.training.label,
    value: EMPLOYEE_GENERAL_STATUS.CONTRACT.training.value,
  },
];

export const INCOMPLETE_STATUS = [
  {
    label: EMPLOYEE_GENERAL_STATUS.INCOMPLETE.contact.label,
    value: EMPLOYEE_GENERAL_STATUS.INCOMPLETE.contact.value,
  },
  {
    label: EMPLOYEE_GENERAL_STATUS.INCOMPLETE.bank.label,
    value: EMPLOYEE_GENERAL_STATUS.INCOMPLETE.bank.value,
  },
  {
    label: EMPLOYEE_GENERAL_STATUS.INCOMPLETE.insurance.label,
    value: EMPLOYEE_GENERAL_STATUS.INCOMPLETE.insurance.value,
  },
  {
    label: EMPLOYEE_GENERAL_STATUS.INCOMPLETE.tax.label,
    value: EMPLOYEE_GENERAL_STATUS.INCOMPLETE.tax.value,
  },
  {
    label: EMPLOYEE_GENERAL_STATUS.INCOMPLETE.profile.label,
    value: EMPLOYEE_GENERAL_STATUS.INCOMPLETE.profile.value,
  },
];

export const PRIORITY = [
  {
    label: i18next.t('noPriority'),
    value: 0,
  },
  {
    label: i18next.t('highPriority'),
    value: 1,
  },
  {
    label: i18next.t('averagePriority'),
    value: 2,
  },
  {
    label: i18next.t('lowPriority'),
    value: 3,
  },
];

export const STYLE_CONSTANTS = {
  // Colors
  COLOR_PRIMARY: '#1890ff',
  COLOR_SECONDARY: '#f0f2f5',
  COLOR_WHITE: '#ffffff',
  COLOR_LABEL: '#000000',
};

// size
export enum SIZE_FIELD {
  SMALL = 'small',
  MEDIUM = 'medium',
  // LARGE = 'large',
}

// Type Of Indentity Card
export enum TYPE_OF_INDENTITY_CARD {
  IDENTITY_CARD = 'Chứng minh nhân dân',
  CITIZEN_IDENTIFICATION = 'Căn cước công dân',
  IDENTITY_NUMBER = 'Số định danh',
  PASSPORT = 'Hộ chiếu',
}

export enum UploadProfileEmployee {
  APPLICATION_FORM = 'don-xin-viec',
  CERTIFIED_RESUME = 'so-yeu-ly-lich',
  IDCARD_VERIFY = 'idCardVerify',
  HEALTH_CERTIFICATE = 'giay-kham-suc-khoe',
  DEGREE = 'bang-cap',
  OTHERS = 'khac',
  REGISNATION_LETTER = 'don-thoi-viec',
  DEPENDENT_PERSON = 'dang-ky-nguoi-phu-thuoc',
}

export enum PermissionAction {
  CREATE = 'CREATE',
  DELETE = 'DELETE',
  VIEW = 'VIEW',
  UPDATE = 'UPDATE',
  IMPORT = 'IMPORT',
  EXPORT = 'EXPORT',
}

export enum PermissionList {
  BANK = 'bank',
  DEPARTMENT = 'department',
  DISTRICT = 'district',
  MEDICAL_FACILITY = 'medicalFacility',
  NATIONALITY = 'nationality',
  POSITION = 'position',
  PROJECT = 'project',
  PROVINCE = 'province',
  WARD = 'ward',
  EMPLOYEE = 'employee',
  EMPLOYEE_CONTACT = 'employeeContact',
  EMPLOYEE_BANK = 'employeeBank',
  EMPLOYEE_INSURANCE = 'employeeInsurance',
  EMPLOYEE_INSURANCE_PROGRESS = 'employeeInsuranceProgress',
  EMPLOYEE_INSURANCE_HISTORY = 'employeeInsuranceHistory',
  LABOR_CONTRACT_INFORMATION = 'employeeContract',
  EMPLOYEE_SALARY = 'employeeSalary',
  EXPORT_EMPLOYEE = 'exportEmployee',
  IMPORT_EMPLOYEE = 'importEmployee',
  IMPORT_UPDATE_EMPLOYEE = 'importUpdateEmployee',
  EMPLOYEE_TAX = 'employeeTax',
  EMPLOYEE_PROFILE = 'employeeProfile',
  ASSIGN_ROLE = 'assignRoles',
  PERMISSION = 'permission',
}

// background color
export const backgroundColor = {
  main: '#D8F3DC',
  white: '#fff',
};
// color
export const textColor = {
  white: '#fff',
  black: '#000',
};

export const DURATION_UNLIMITED = 46;

export const FORMAT_DATE_TIME = 'YYYY-MM-DD HH:mm:ss';

export const FORMAT_DATE = 'YYYY-MM-DD';

export const FORMAT_DATE_2 = 'DD/MM/YYYY';

export const statusPayment = {
  0: { text: 'Gián đoạn', color: 'orange' },
  1: { text: 'Hoàn thành', color: 'green' },
  '-1': { text: 'Thất bại', color: 'red' },
};

export const JOBMODE_OPTION = [
  {
    value: 'LAYN',
    label: 'Lấy nguyên',
  },
  {
    value: 'HBAI',
    label: 'Hạ bãi',
  },
  {
    value: 'TRAR',
    label: 'Trả rỗng',
  },
  {
    value: 'CAPR',
    label: 'Cấp rỗng',
  },
];

export const STATUS_ORDER_OPTION = [
  {
    value: 0,
    label: 'Chờ nhận',
  },
  {
    value: 1,
    label: 'Sẵn sàng',
  },
  {
    value: 2,
    label: 'Vào cổng',
  },
  {
    value: 3,
    label: 'Ra cổng',
  },
  {
    value: 4,
    label: 'Trả hàng',
  },
  {
    value: 6,
    label: 'Hoàn tất',
  },
];

// eslint-disable-next-line prefer-regex-literals
export const regExpCheckSpecialChar = new RegExp('[~|`|!|@|#|$|%|^|&|*|(|)|/]', 'g');

export const TIMEZONE_DEFAULT = 'Asia/Ho_Chi_Minh';
