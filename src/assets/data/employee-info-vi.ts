import i18next from 'i18next';

export const PROFILE_UPLOAD_STATUS = {
  submitted: 'Đã nộp',
  notSubmitted: 'Chưa nộp',
  submitIncorrect: 'Nộp sai',
  notRequired: 'Không yêu cầu',
  approachingDeadline: 'Sắp hết hạn',
  waiting:'Chờ bổ sung'
};
export const RELATIONSHIP_STATUS = {
  single: 'Độc thân',
  married: 'Đã kết hôn',
  divorced: 'Đã ly hôn',
};

export const placeOfIssueList = [
  {
    label: 'Hà Nội',
    value: 'Hà Nội',
  },
  {
    label: 'Tp Hồ Chí Minh',
    value: 'Tp Hồ Chí Minh',
  },
];
export const identifyList = [
  {
    label: 'CCCD',
    value: 'CCCD',
  },
  {
    label: 'CMND',
    value: 'CMND',
  },
  {
    label: i18next.t('passport'),
    value: 'PASSPORT',
  },
];

// Employee Banking Information
export const bankBranchNameList = [
  {
    label: 'MB Bank',
    value: 'MB Bank',
  },
  {
    label: 'VP Bank',
    value: 'VP Bank',
  },
];

export const placeOfBankList = [
  {
    label: 'Hà Nội',
    value: 'Hà Nội',
  },
  {
    label: 'Tp Hồ Chí Minh',
    value: 'Tp Hồ Chí Minh',
  },
];

export const probationContractList = [
  {
    label: i18next.t('submitted'),
    value: PROFILE_UPLOAD_STATUS.submitted,
  },
  {
    label: i18next.t('notSubmitted'),
    value: PROFILE_UPLOAD_STATUS.notSubmitted,
  },
  {
    label: i18next.t('notRequired'),
    value: PROFILE_UPLOAD_STATUS.notRequired,
  },
];

export const laborContractList = [
  {
    label: i18next.t('submitted'),
    value: PROFILE_UPLOAD_STATUS.submitted,
  },
  {
    label: i18next.t('notSubmitted'),
    value: PROFILE_UPLOAD_STATUS.notSubmitted,
  },
  {
    label: i18next.t('approachingDeadline'),
    value: PROFILE_UPLOAD_STATUS.approachingDeadline,
  },
  {
    label: i18next.t('notRequired'),
    value: PROFILE_UPLOAD_STATUS.notRequired,
  },

];

export const profileStatusList = [
  {
    label: i18next.t('submitted'),
    value: PROFILE_UPLOAD_STATUS.submitted,
  },
  // {
  //   label: i18next.t('notSubmitted'),
  //   value: PROFILE_UPLOAD_STATUS.notSubmitted,
  // },
  // {
  //   label: i18next.t('submittedIncorrectly'),
  //   value: PROFILE_UPLOAD_STATUS.submitIncorrect,
  // },
  {
    label: i18next.t('notRequired'),
    value: PROFILE_UPLOAD_STATUS.notRequired,
  },
  {
    label: i18next.t('waitingProfile'),
    value: PROFILE_UPLOAD_STATUS.waiting,
  },
];


export const bankingStatusList = [
  {
    label: i18next.t('submitted'),
    value: PROFILE_UPLOAD_STATUS.submitted,
  },
  {
    label: i18next.t('notSubmitted'),
    value: PROFILE_UPLOAD_STATUS.notSubmitted,
  },
  {
    label: i18next.t('submittedIncorrectly'),
    value: PROFILE_UPLOAD_STATUS.submitIncorrect,
  },
];

export const activityStatusList = [
  {
    label: i18next.t('working'),
    value: 'Working',
  },
  {
    label: i18next.t('waitingForEmployment'),
    value: 'Waiting for employment',
  },
  {
    label: i18next.t('planingToResign'),
    value: 'Planning to resign',
  },
  {
    label: i18next.t('alreadyResigned'),
    value: 'Already resigned',
  },
  {
    label: i18next.t('onTemporaryLeave'),
    value: 'On temporary leave',
  },
  {
    label: i18next.t('maternityLeave'),
    value: 'Maternity leave',
  },
];
export const provinceVN = [
  {
    label: 'Hà Nội',
    value: 'Hà Nội',
  },
  {
    label: 'Hà Giang',
    value: 'Hà Giang',
  },
];

export const provinceId = [
  {
    label: '01',
    value: '01',
  },
  {
    label: '02',
    value: '02',
  },
];
export const districtVN = [
  {
    label: 'Quận Ba Đình',
    value: 'Quận Ba Đình',
  },
  {
    label: 'Thành phố Hà Giang',
    value: 'Thành phố Hà Giang',
  },
];

export const districtId = [
  {
    label: '01',
    // eslint-disable-next-line no-octal
    value: 1,
  },
  {
    label: '02',
    // eslint-disable-next-line no-octal
    value: 2,
  },
];
export const wardVN = [
  {
    label: 'Phường Phúc Xá',
    value: 'Phường Phúc Xá',
  },
  {
    label: 'Phường Quang Trung',
    value: 'Phường Quang Trung',
  },
];
export const wardId = [
  {
    label: '01',
    value: '01',
  },
  {
    label: '02',
    value: '02',
  },
];

export const religionVN = [
  {
    label: 'Không có',
    value: 'Không có',
  },
  {
    label: 'Phật giáo',
    value: 'Phật giáo',
  },
  {
    label: 'Đạo chúa',
    value: 'Đạo chúa',
  },
];

export const ethnicGroup = [
  {
    label: 'Kinh',
    value: 'Kinh',
  },
  {
    label: 'Hoa',
    value: 'Hoa',
  },
];
export const educationVN = [
  {
    label: 'Đại học',
    value: 'Đại học',
  },
  {
    label: 'Cao đẳng',
    value: 'Cao đẳng',
  },
  {
    label: 'Trung cấp',
    value: 'Trung cấp',
  },
  {
    label: '12/12',
    value: '12/12',
  },
  {
    label: '9/12',
    value: '9/12',
  },
  {
    label: 'Chưa rõ',
    value: 'Chưa rõ',
  },
];
export const medicalFacilityCodeList = [
  {
    label: '01-001',
    value: 'Phòng khám A thuộc BVĐK Xanh Pôn',
  },
  {
    label: '01-002',
    value: 'Bệnh viện đa khoa Xanh Pôn',
  },
];

export const socialInsuranceBookStatus = [
  {
    label: i18next.t('addNewInsurance'),
    value: 'Cấp mới',
  },
  {
    label: i18next.t('oldInsurance'),
    value: 'Sổ cũ',
  },
];

export const demoPosition = [
  {
    label: 'Trưởng phòng',
    value: 1,
  },
  { label: 'Phó phòng', value: 2 },
];
export const demoProject = [
  {
    label: 'Dự án 1',
    value: 1,
  },
  { label: 'Dự án 2', value: 2 },
];
export const demoDeparment = [
  {
    label: 'Ké toán',
    value: 1,
  },
  { label: 'Nhân sự', value: 2 },
];


export const relationshipStatus = [
  {
    label: i18next.t('single'),
    value: RELATIONSHIP_STATUS.single,
  },
  {
    label: i18next.t('married'),
    value: RELATIONSHIP_STATUS.married,
  },
  {
    label: i18next.t('divorced'),
    value: RELATIONSHIP_STATUS.divorced,
  },
  
];