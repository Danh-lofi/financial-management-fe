import i18n from 'locales/i18n';
import * as Yup from 'yup';
import { differenceInDays, differenceInYears } from 'date-fns';
import { TYPE_OF_INDENTITY_CARD } from '../constants/app.constants';
import { PROFILE_UPLOAD_STATUS } from '../assets/data/employee-info-vi';

// const phoneRegExp =
// /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const passwordReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&])(?=.{8,})/;
const numberReg = /^[0-9]+$/;
const wordReg = /^([a-zA-ZÀ-ỹ]+\s)*[a-zA-ZÀ-ỹ]+$/;
const phoneRegExp = /(84|0[3|5|7|8|9])+([0-9]{8,9})\b/;
// Basic Form Validate

const EmployeeBasicFormSchema = Yup.object().shape({
  g_id: Yup.string().required(i18n.t<string>('validate.employee.hictEmployeeId')),
  fullName: Yup.string()
    .required(i18n.t<string>('validate.employee.name'))
    .matches(wordReg, i18n.t<string>('validate.employee.nameInvalid')),
  dateOfBirth: Yup.string().required(i18n.t<string>('validate.employee.dateOfBirthRequired')),
  gender: Yup.string()
    .oneOf(['male', 'female'])
    .required(i18n.t<string>('validate.employee.gender')),
  maritalStatus: Yup.string()
    // .oneOf(['single', 'married'])
    .required(i18n.t<string>('validate.employee.maritalStatusRequired')),
  ethnic: Yup.string().required(i18n.t<string>('validate.employee.ethnicRequired')),
  religion: Yup.string().required(i18n.t<string>('validate.employee.religionRequired')),
  academicLevel: Yup.string().required(i18n.t<string>('validate.employee.academicLevelRequired')),
  phoneNumber: Yup.string()
    .required(i18n.t<string>('validate.employee.phone'))
    .matches(phoneRegExp, i18n.t<string>('validate.employee.phoneNumberMax')),
  email: Yup.string()
    .required(i18n.t<string>('validate.employee.email'))
    .test('no-spaces', i18n.t<string>('emailNotSpace'), (value) => {
      return !/\s/.test(value);
    })
    .email(i18n.t<string>('validate.employee.invalidEmail')),
  nationality: Yup.mixed()
    .test({
      message: i18n.t<string>('validate.employee.nationalityRequired'),
      test: (value, context) => {
        if (value !== '') {
          return true;
        }
        return false;
      },
    })
    .nullable()
    .required(i18n.t<string>('validate.employee.nationalityRequired')),

  province_id: Yup.mixed()
    .nullable(i18n.t<string>('validate.employee.provinceRequired'))
    .required(i18n.t<string>('validate.employee.provinceRequired'))
    .test({
      message: i18n.t<string>('validate.employee.provinceRequired'),
      test: (value: any) => {
        if (typeof value === 'string') {
          return false;
        }
        return true;
      },
    }),
  district_id: Yup.mixed()
    .nullable(i18n.t<string>('validate.employee.districtRequired'))
    .required(i18n.t<string>('validate.employee.districtRequired'))
    .test({
      message: i18n.t<string>('validate.employee.districtRequired'),
      test: (value: any) => {
        if (typeof value === 'string') {
          return false;
        }
        return true;
      },
    }),
  ward_id: Yup.mixed()
    .nullable(i18n.t<string>('validate.employee.wardRequired'))
    .required(i18n.t<string>('validate.employee.wardRequired'))
    .test({
      message: i18n.t<string>('validate.employee.wardRequired'),
      test: (value: any) => {
        if (typeof value === 'string') {
          return false;
        }
        return true;
      },
    }),
  address: Yup.string().required(i18n.t<string>('validate.employee.addressRequired')),
  temporaryProvince_id: Yup.mixed()
    .nullable(i18n.t<string>('validate.employee.provinceRequired'))
    .test({
      message: i18n.t<string>('validate.employee.provinceRequired'),
      test: (value, context) => {
        if (context) {
          const { isSameAddress } = context.parent;
          if (isSameAddress) {
            return true;
          }
          if (typeof value === 'string') return false;
          if (value) return true;
        }
        return false;
      },
    }),
  temporaryDistrict_id: Yup.mixed()
    .nullable(i18n.t<string>('validate.employee.districtRequired'))
    .test({
      message: i18n.t<string>('validate.employee.districtRequired'),
      test: (value, context) => {
        if (context) {
          const { isSameAddress } = context.parent;
          if (isSameAddress) {
            return true;
          }
          if (typeof value === 'string') return false;
          if (value) return true;
        }
        return false;
      },
    }),
  temporaryWard_id: Yup.mixed()
    .nullable(i18n.t<string>('validate.employee.wardRequired'))
    .test({
      message: i18n.t<string>('validate.employee.wardRequired'),
      test: (value, context) => {
        if (context) {
          const { isSameAddress } = context.parent;
          if (isSameAddress) {
            return true;
          }
          if (typeof value === 'string') return false;
          if (value) return true;
        }
        return false;
      },
    }),
  temporaryAddress: Yup.string()
    .nullable(i18n.t<string>('validate.employee.addressRequired'))
    .test({
      message: i18n.t<string>('validate.employee.addressRequired'),
      test: (value, context) => {
        if (context) {
          const { isSameAddress } = context.parent;
          if (value) return true;
          if (isSameAddress) {
            return true;
          }
        }

        return false;
      },
    }),

  identityCard: Yup.string()
    .nullable(i18n.t<string>('identityCardLengthError'))
    .test({
      message: i18n.t<string>('identityCardLengthError'),
      test: (value, context) => {
        if (context) {
          const { typeOfIdentityCard } = context.parent;
          
          if (typeOfIdentityCard === TYPE_OF_INDENTITY_CARD.IDENTITY_CARD) {
            console.log("typeOfIdentityCard",typeOfIdentityCard);
            const valueTrim = value?.trim();
            const isReg = numberReg.test(valueTrim ?? '');
            const isLength = valueTrim?.length === 9;
            return isReg && isLength;
          }
        }
        return true;
      },
    })
    .test({
      message: i18n.t<string>('identityCitizenLengthError'),
      test: (value, context) => {
        if (context) {
          const { typeOfIdentityCard } = context.parent;
          if (typeOfIdentityCard === TYPE_OF_INDENTITY_CARD.CITIZEN_IDENTIFICATION) {
            console.log("typeOfIdentityCard", typeOfIdentityCard);

            const valueTrim = value?.trim();
            const isReg = numberReg.test(valueTrim ?? '');
            const isLength = valueTrim?.length === 12;
            return isReg && isLength;
          }
        }
        return true;
      },
    })
    .test({
      message: i18n.t<string>('identityNumberLengthError'),
      test: (value, context) => {
        if (context) {
          const { typeOfIdentityCard } = context.parent;
          if (typeOfIdentityCard === TYPE_OF_INDENTITY_CARD.IDENTITY_NUMBER) {
            return value?.trim().length === 12;
          }
        }
        return true;
      },
    }),
  oldIdentityCard: Yup.mixed().test({
    message: i18n.t<string>('identityCardLengthError'),
    test: (value, context) => {
      if (typeof value === 'string' && value) {
        const { typeOfIdentityCard } = context.parent;
        if (typeOfIdentityCard === TYPE_OF_INDENTITY_CARD.CITIZEN_IDENTIFICATION) {
          const isReg = numberReg.test(value ?? '');
          const isLength = value?.length === 9;
          return isReg && isLength;
        }
      }
      return true;
    },
  }),
  project_id: Yup.mixed()
    .nullable(i18n.t<string>('validate.employee.projectRequired'))
    .required(i18n.t<string>('validate.employee.projectRequired'))
    .test({
      message: i18n.t<string>('validate.employee.projectRequired'),
      test: (value: any) => {
        if (typeof value === 'string') {
          return false;
        }
        return true;
      },
    }),
  position_id: Yup.string().required(i18n.t<string>('validate.positionIdRequired')),
});

const EmployeeProfileSchema = Yup.object().shape({
  background_url: Yup.string().required(i18n.t<string>('validate.employee.backgroundRequired')),
  // identityCard_url: Yup.string().required(i18n.t<string>('validate.employee.identityCardRequired')),
  healthy_url: Yup.string().required(i18n.t<string>('validate.employee.healthyRequired')),

  degree_url: Yup.string().required(i18n.t<string>('validate.employee.degreeRequired')),
  jobApplication_date: Yup.string()
    .nullable()
    .test({
      message: i18n.t<string>('validate.employee.notToday'),
      test: (value, context) => {
        const { jobApplication_url } = context.parent;
        if (jobApplication_url !== PROFILE_UPLOAD_STATUS.waiting) return true;
        const nowDate = new Date();
        const age = differenceInDays(nowDate, new Date(value ?? ''));
        return age <= 0;
      },
    }),
  relationship_date: Yup.string()
    .nullable()
    .test({
      message: i18n.t<string>('validate.employee.notToday'),
      test: (value, context) => {
        const { relationship_url } = context.parent;
        if (relationship_url !== PROFILE_UPLOAD_STATUS.waiting) return true;
        const nowDate = new Date();
        const age = differenceInDays(nowDate, new Date(value ?? ''));
        return age <= 0;
      },
    }),

  background_date: Yup.string()
    .nullable()
    .test({
      message: i18n.t<string>('validate.employee.notToday'),
      test: (value, context) => {
        const { background_url } = context.parent;
        if (background_url !== PROFILE_UPLOAD_STATUS.waiting) return true;
        const nowDate = new Date();
        const age = differenceInDays(nowDate, new Date(value ?? ''));
        return age <= 0;
      },
    }),

  healthy_date: Yup.string()
    .nullable()
    .test({
      message: i18n.t<string>('validate.employee.notToday'),
      test: (value, context) => {
        const { healthy_url } = context.parent;
        if (healthy_url !== PROFILE_UPLOAD_STATUS.waiting) return true;
        const nowDate = new Date();
        const age = differenceInDays(nowDate, new Date(value ?? ''));
        return age <= 0;
      },
    }),

  degree_date: Yup.string()
    .nullable()
    .test({
      message: i18n.t<string>('validate.employee.notToday'),
      test: (value, context) => {
        const { degree_url } = context.parent;
        if (degree_url !== PROFILE_UPLOAD_STATUS.waiting) return true;
        const nowDate = new Date();
        const age = differenceInDays(nowDate, new Date(value ?? ''));
        return age <= 0;
      },
    }),

  other_date: Yup.string()
    .nullable()
    .test({
      message: i18n.t<string>('validate.employee.notToday'),
      test: (value, context) => {
        const { other_url } = context.parent;
        if (other_url !== PROFILE_UPLOAD_STATUS.waiting) return true;
        const nowDate = new Date();
        const age = differenceInDays(nowDate, new Date(value ?? ''));
        return age <= 0;
      },
    }),
  resignation_date: Yup.string()
    .nullable()
    .test({
      message: i18n.t<string>('validate.employee.notToday'),
      test: (value, context) => {
        const { resignation_url } = context.parent;
        if (resignation_url !== PROFILE_UPLOAD_STATUS.waiting) return true;
        const nowDate = new Date();
        const age = differenceInDays(nowDate, new Date(value ?? ''));
        return age <= 0;
      },
    }),
});
const EmployeeContactInfoSchema = Yup.object().shape({
  people: Yup.array().of(
    Yup.object().shape({
      fullName: Yup.string().required(i18n.t<string>('validate.employee.contact.fullNameRequired')),
      phoneNumber: Yup.string()
        .required(i18n.t<string>('validate.employee.contact.phoneRequired'))
        .matches(/^\d{10}$/, i18n.t<string>('validate.employee.phoneNumberMax')),
      relationship: Yup.string().required(
        i18n.t<string>('validate.employee.contact.relationshipRequired')
      ),
    })
  ),
});
const EmployeeBankingInformationSchema = Yup.object().shape({
  accountHolder: Yup.string()
    .required(i18n.t<string>('validate.employee.accountHolderName'))
    .matches(wordReg, i18n.t<string>('validate.employee.accountHolderNameInvalid')),
  accountNumber: Yup.string()
    .required(i18n.t<string>('validate.employee.bankAccountNumber'))
    .matches(numberReg, i18n.t<string>('validate.employee.bankAccountNumberInvalid')),
  // bank_id: Yup.object().required(t('validate.employee.bankNameAbbreviation')),

  bank_id: Yup.mixed()
    .nullable(i18n.t<string>('validate.employee.bankNameAbbreviation'))
    .required(i18n.t<string>('validate.employee.bankNameAbbreviation'))
    .test({
      message: i18n.t<string>('validate.employee.bankNameAbbreviation'),
      test: (value: any) => {
        if (typeof value === 'string') {
          return false;
        }
        return true;
      },
    }),
  // province_id: Yup.mixed()
  //   .nullable(i18n.t<string>('validate.employee.provinceRequired'))
  //   .required(i18n.t<string>('validate.employee.provinceRequired'))
  //   .test({
  //     message: i18n.t<string>('validate.employee.provinceRequired'),
  //     test: (value: any) => {
  //       if (typeof value === 'string') {
  //         return false;
  //       }
  //       return true;
  //     },
  //   }),
});

const EmployeeLaborContractSchema = Yup.object().shape({
  projectId: Yup.string().required(i18n.t<string>('validate.contract.projectIdRequired')),
  customerCode: Yup.string().required(i18n.t<string>('validate.contract.customerCodeRequired')),
});

// Insurance

const EmployeeInsuranceInfoSchema = Yup.object().shape({
  insuranceNumber: Yup.string()
    .required(i18n.t<string>('validate.employee.socialInsuranceNumber'))
    .matches(numberReg, i18n.t<string>('validate.employee.socialInsuranceNumberInvalid')),
  healthInsuranceCode: Yup.string()
    .required(i18n.t<string>('validate.employee.healthInsuranceCodeRequired'))
    .matches(numberReg, i18n.t<string>('validate.employee.healthInsuranceCodeInvalid')),
  facility_id: Yup.mixed()
    .nullable(i18n.t<string>('validate.employee.facilityNameRequired'))
    .required(i18n.t<string>('validate.employee.facilityNameRequired'))
    .test({
      message: i18n.t<string>('validate.employee.facilityNameRequired'),
      test: (value: any) => {
        if (typeof value === 'string') {
          return false;
        }
        return true;
      },
    }),
  salaryRange: Yup.string().required(i18n.t<string>('validate.employee.salaryRangeRequired')),
  currentSalary: Yup.string()
    .nullable()
    .matches(numberReg, i18n.t<string>('validate.employee.salaryRangeInvalid'))
    .test({
      message: i18n.t<string>('validate.employee.salaryRangeInvalid'),
      test: (value: any, context: any) => {
        const { isAttend } = context.parent;
        if (!isAttend && Number(value) <= 4500000) {
          return false;
        }
        return true;
      },
    }),
});

const EmployeeContractForm = Yup.object().shape({
  contractTypeId: Yup.string().required(i18n.t<string>('validate.contract.typeRequired')),
  contractNo: Yup.string().required(i18n.t<string>('validate.contract.contractCodeRequired')),
  startDate: Yup.string()
    .required(i18n.t<string>('validate.employee.startDateRelationshipRequired'))
    .test({
      message: i18n.t<string>('validate.employee.startDateLessThanEndDate'),
      test: (value, context) => {
        const { endDate } = context.parent;
        if (endDate && value) {
          return new Date(value) <= new Date(endDate);
        }
        return true;
      },
    }),
  jobStartDate: Yup.string()
    .required(i18n.t<string>('validate.employee.startDateRelationshipRequired'))
    .test({
      message: i18n.t<string>('validate.employee.startDateLessThanEndDate'),
      test: (value, context) => {
        const { jobEndDate } = context.parent;
        if (jobEndDate && value) {
          return new Date(value) <= new Date(jobEndDate);
        }
        return true;
      },
    }),
});

const EmployeeInsuranceProgress = Yup.object().shape({
  fromDate: Yup.mixed()
    .nullable(i18n.t<string>('validate.employee.startDateRequired'))
    .required(i18n.t<string>('validate.employee.startDateRequired')),
  toDate: Yup.mixed()
    .nullable(i18n.t<string>('validate.employee.endDateRequired'))
    .required(i18n.t<string>('validate.employee.endDateRequired')),
  position: Yup.string().required(i18n.t<string>('validate.employee.positionRequired')),
  paymentRate: Yup.string()
    .required(i18n.t<string>('validate.employee.paymentRateRequired'))
    .matches(numberReg, i18n.t<string>('validate.employee.paymentRateInvalid')),
  plan: Yup.string().required(i18n.t<string>('validate.employee.planIsRequired')),
  profileNumber: Yup.string().required(i18n.t<string>('validate.employee.profileNumberRequired')),
});

const EmployeeInsuranceHistory = Yup.object().shape({
  year: Yup.string().required(i18n.t<string>('validate.employee.yearRequired')),
  description: Yup.string().required(i18n.t<string>('validate.employee.descriptionRequired')),
  type: Yup.string().required(i18n.t<string>('validate.employee.typeRequired')),
  typeDetail: Yup.string().required(i18n.t<string>('validate.employee.typeDetailRequired')),
  amount: Yup.string().required(i18n.t<string>('validate.employee.amountRequired')),
  account: Yup.string().required(i18n.t<string>('validate.employee.accountRequired')),
  total: Yup.string()
    .required(i18n.t<string>('validate.employee.totalRequired'))
    .matches(numberReg, i18n.t<string>('validate.employee.totalInvalid')),
  accum: Yup.string().required(i18n.t<string>('validate.employee.accumRequired')),
  fromDate: Yup.string()
    .required(i18n.t<string>('validate.employee.startDateRelationshipRequired'))
    .test({
      message: i18n.t<string>('validate.employee.startDateLessThanEndDate'),
      test: (value, context) => {
        const { toDate } = context.parent;
        if (toDate && value) {
          return new Date(value) < new Date(toDate);
        }
        return true;
      },
    }),
  toDate: Yup.mixed()
    .nullable(i18n.t<string>('validate.employee.endDateRequired'))
    .required(i18n.t<string>('validate.employee.endDateRequired')),
});

// End Insurance
const EmployeeIncomeTaxInformationSchema = Yup.object().shape({
  taxCode: Yup.string()
    .required(i18n.t<string>('validate.employee.taxCode'))
    .matches(numberReg, i18n.t<string>('validate.employee.taxCodeInvalid')),
  typeOfTaxDocument: Yup.string().required(i18n.t<string>('validate.employee.typeOfDocumentTax')),
  appliedTax: Yup.string().required(i18n.t<string>('validate.employee.appliedTax')),
});

const EmployeeSignUpSchema = Yup.object().shape({
  password: Yup.string()
    .required(i18n.t<string>('validate.employee.password'))
    .matches(passwordReg, i18n.t<string>('validate.employee.passwordInvalid')),
  confirmPassword: Yup.string()
    .required(i18n.t<string>('validate.employee.verifyPassword'))
    .oneOf([Yup.ref('password')], i18n.t<string>('validate.employee.verifyPasswordInvalid')),
});

const ProjectFormInfoSchema = Yup.object().shape({
  projectId: Yup.string()
    .required(i18n.t<string>('validate.setting.projectIdRequired'))
    .matches(numberReg, i18n.t<string>('validate.setting.projectIdInvalid')),
  projectName: Yup.string().required(i18n.t<string>('validate.setting.projectNameRequired')),
});
const DepartmentFormInfoSchema = Yup.object().shape({
  departmentId: Yup.string()
    .required(i18n.t<string>('validate.setting.departmentIdRequired'))
    .matches(numberReg, i18n.t<string>('validate.setting.departmentIdInvalid')),
  departmentName: Yup.string().required(i18n.t<string>('validate.setting.departmentNameRequired')),
});

const DayoffFormInfoSchema = Yup.object().shape({
  dayoffId: Yup.string()
    .matches(numberReg, i18n.t<string>('validate.setting.dayoffIdInvalid'))
    .required(i18n.t<string>('validate.setting.dayoffIdRequired')),
  dayoffName: Yup.string().required(i18n.t<string>('validate.setting.dayoffNameRequired')),
});
const DocumentFormInfoSchema = Yup.object().shape({
  documentId: Yup.string().required(i18n.t<string>('validate.setting.documentIdRequired')),
  documentName: Yup.string()
    .required(i18n.t<string>('validate.setting.documentNameRequired'))
    .matches(numberReg, i18n.t<string>('validate.setting.documentIdInvalid')),
});

const PositionFormInfoSchema = Yup.object().shape({
  positionId: Yup.string()
    .required(i18n.t<string>('validate.setting.positionIdRequired'))
    .matches(numberReg, i18n.t<string>('validate.setting.positionIdInvalid')),
  positionName: Yup.string().required(i18n.t<string>('validate.setting.positionNameRequired')),
});
const DependentPersonFormSchema = Yup.object().shape({
  fullName: Yup.string().required(i18n.t<string>('validate.employee.nameRelationshipRequired')),
  identityCard: Yup.string()
    .required(i18n.t<string>('validate.employee.idCardRelationShipMemberRequired'))
    .matches(numberReg, i18n.t<string>('validate.employee.idCardRelationShipInvalid')),
  taxCode: Yup.string()
    .required(i18n.t<string>('validate.employee.taxCodeRelationshipRequired'))
    .matches(numberReg, i18n.t<string>('validate.employee.taxCodeRelationshipInvalid')),
  documentCode: Yup.string()
    .required(i18n.t<string>('validate.employee.taxCodeRelationshipRequired'))
    .matches(numberReg, i18n.t<string>('validate.employee.taxCodeRelationshipInvalid')),
  relationship: Yup.string().required(
    i18n.t<string>('validate.employee.relationshipWithEmployeeRequired')
  ),
  startDate: Yup.string()
    .required(i18n.t<string>('validate.employee.startDateRelationshipRequired'))
    .test({
      message: i18n.t<string>('validate.employee.startDateLessThanEndDate'),
      test: (value, context) => {
        const { endDate } = context.parent;
        if (endDate && value) {
          return new Date(value) < new Date(endDate);
        }
        return true;
      },
    }),
  endDate: Yup.string().required(i18n.t<string>('validate.employee.startDateRelationshipRequired')),
  dateOfBirth: Yup.string()
    .required(i18n.t<string>('validate.employee.startDateRelationshipRequired'))
    .test({
      message: i18n.t<string>('validate.employee.ageInvalid'),
      test: (value, context) => {
        const nowDate = new Date();
        const age = differenceInDays(nowDate, new Date(value));
        return age >= 0;
      },
    }),
});

const DistrictFormSchema = Yup.object().shape({
  provinceId: Yup.string().required(i18n.t<string>('validate.setting.provinceIdRequired')),
  districtId: Yup.string().required(i18n.t<string>('validate.setting.districtIdRequired')),
  districtName: Yup.string().required(i18n.t<string>('validate.setting.districtNameRequired')),
});
const ProvinceFormSchema = Yup.object().shape({
  provinceId: Yup.string().required(i18n.t<string>('validate.setting.provinceIdRequired')),
  provinceName: Yup.string().required(i18n.t<string>('validate.setting.provinceNameRequired')),
});
const NationalityFormSchema = Yup.object().shape({
  nationalityId: Yup.string().required(i18n.t<string>('validate.setting.nationalityIdRequired')),
  nationalityName: Yup.string().required(
    i18n.t<string>('validate.setting.nationalityNameRequired')
  ),
});
const BankingFormSchema = Yup.object().shape({
  transferType: Yup.string().required(i18n.t<string>('validate.setting.transferTypeRequired')),
  bankingName: Yup.string().required(i18n.t<string>('validate.setting.bankingNameRequired')),
});

const WardFormSchema = Yup.object().shape({
  districtId: Yup.string().required(i18n.t<string>('validate.setting.districtIdRequired')),
  wardId: Yup.string().required(i18n.t<string>('validate.setting.wardIdRequired')),
  wardName: Yup.string().required(i18n.t<string>('validate.setting.wardNameRequired')),
});
const MedicalFacilityFormSchema = Yup.object().shape({
  provinceId: Yup.string().required(i18n.t<string>('validate.setting.provinceIdRequired')),
  medicalFacilityId: Yup.string().required(
    i18n.t<string>('validate.setting.medicalFacilityIdRequired')
  ),
  medicalFacilityName: Yup.string().required(
    i18n.t<string>('validate.setting.medicalFacilityNameRequired')
  ),
});

// const SalaryBasicFormSchema = Yup.object().shape({
//   fullName: Yup.string().required(i18n.t<string>('validate.employee.nameRelationshipRequired')),
//   identityCard: Yup.string()
//     .required(i18n.t<string>('validate.employee.idCardRelationShipMemberRequired'))
//     .matches(numberReg, i18n.t<string>('validate.employee.idCardRelationShipInvalid')),
//   taxCode: Yup.string()
//     .required(i18n.t<string>('validate.employee.taxCodeRelationshipRequired'))
//     .matches(numberReg, i18n.t<string>('validate.employee.taxCodeRelationshipInvalid')),

//   relationship: Yup.string().required(
//     i18n.t<string>('validate.employee.relationshipWithEmployeeRequired')
//   ),
//   typeOfDocument: Yup.string().required(
//     i18n.t<string>('validate.employee.documentRelationshipRequired')
//   ),
//   startDate: Yup.string().required(
//     i18n.t<string>('validate.employee.startDateRelationshipRequired')
//   ),
// });

export {
  BankingFormSchema,
  EmployeeBasicFormSchema,
  // SalaryBasicFormSchema,
  EmployeeBankingInformationSchema,
  EmployeeInsuranceProgress,
  NationalityFormSchema,
  WardFormSchema,
  MedicalFacilityFormSchema,
  ProvinceFormSchema,
  DistrictFormSchema,
  EmployeeContactInfoSchema,
  EmployeeIncomeTaxInformationSchema,
  EmployeeInsuranceInfoSchema,
  EmployeeSignUpSchema,
  EmployeeInsuranceHistory,
  ProjectFormInfoSchema,
  DepartmentFormInfoSchema,
  EmployeeProfileSchema,
  EmployeeLaborContractSchema,
  DayoffFormInfoSchema,
  DocumentFormInfoSchema,
  PositionFormInfoSchema,
  DependentPersonFormSchema,
  EmployeeContractForm,
};
