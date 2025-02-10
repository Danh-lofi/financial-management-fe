import { StringDecoder } from 'string_decoder';
import { string } from 'yup';

export type EmployeeBasicForm = {
  g_id?: string;
  fullName?: string;
  dateOfBirth?: any;
  gender?: boolean | string;
  nationality?: string | any;
  maritalStatus?: string;
  ethnic?: string;
  religion?: string;
  academicLevel?: string;
  major?: string;
  avatar_url?: any;
  province_id?: any;
  district_id?: any;
  ward_id?: any;
  address?: string;
  permanentAddress?:string;
  temporaryProvince_id?: any;
  temporaryDistrict_id?: any;
  temporaryWard_id?: any;
  temporaryAddress?: string;
  temporaryResidenceAddress?: string;
  phoneNumber?: string;
  email?: string;
  isSameAddress?: boolean;
  urgentPhone?: string;
  urgentRelationship?: string;
  identityFront_url?: string | null;
  identityBack_url?: string | null;
  typeOfIdentityCard?: string;
  identityCard?: string;
  dateOfIssue?: Date;
  placeOfIssue?: string;
  project_id?: any;
  employeeProjectCode?: string | number;
  oldIdentityCard?: string;
};

export type EmployeeForm = EmployeeBasicForm & {
  id?: any;
  avatar_url?:any;
  employeeCustomerCode?: string;
  hometown?: string;
  typeOfIdentityCard?: any;
  identityCard?: string;
  dateOfIssue?: string | Date;
  placeOfIssue?: string;
  passportId?: string | number;
  dateOfIssuePassport?: string | Date;
  placeOfIssuePassport?: string;
  identifyId?: string;
  dateOfIssueIdentifyNumber?: string | Date;
  placeOfIssueIdentifyNumber?: string | number;
  oldIdentityCard?: string | number;
  ref_gid?: string;
  firstName?: string;
  lastName?: string;
  domicile?: string;
  department_id?: string;
  position_id?: string;
  area?: string;
  permanentAddress?: string;
  workingDate?: any;
  jobEndDate?: any;
  jobStartDate?:any;
  startDate?: any;
  endDate?: any;
};

export type IEmployeeList = {
  items: EmployeeForm[];
  pageIndex: number;
  pageSize: number;
  totalRow: number;
};

export type IDependentPerson = {
  fullName: string;
  identityCard: string;
  relationship: string;
  taxCode: string;
  typeOfDocument: string;
  startDate?: string;
  endDate?: string;
};
// Banking
export type IEmployeeBanking = {
  id?: number | string;
  accountHolder?: string;
  accountNumber?: string;
  bankName?: string;
  branchName?: string;
  employee_id?: number | string;
  province_id?: number | string;
  isMain?: boolean;
  relationship?: any;
  authorizedDocsType?: string;
  authorizationLetterUrl?: string;
  bank_id?: number | string;
};
// Insurance
export type IEmployeeInsurance = {
  id?: number | string;
  householdCode?: string | number;
  insuranceNumber?: string | number;
  healthInsuranceCode?: string | number;
  facility_id?: any;
  salaryRange?: string | number;
  currentSalary?: string | number;
  isAttend?: boolean;
  employee_id?: number | string;
  sourceOptions?: string;
  facility_code?: string | number;
};
export type IInsuranceHistory = {
  id?: string | number;
  employee_id?: string | number;
  year?: string;
  description?: string;
  type?: string;
  typeDetail?: string;
  amount?: string;
  account?: string;
  fromDate?: Date | string;
  toDate?: Date | string;
  total?: string;
  accum?: string;
};

export type IInsuranceProgress = {
  id?: number | string;
  fromDate?: Date | string;
  toDate?: Date | string;
  position?: string;
  paymentRate?: number | string;
  plan?: string;
  profileNumber?: string;
  note?: string;
  employee_id?: number | string;
};

// End Insurance

export type EmployeeContactForm = {
  id: any;
  fullName: string;
  phoneNumber: string;
  relationship: string;
  employee_id: number | string;
};

export type EmployeeProfileForm = {
  id?: number | string;
  employee_id?: number | string;
  jobApplication_url?: string;
  background_url?: string;
  identityCard_url?: string;
  healthy_url?: string;
  degree_url?: string;
  resignation_url?: string;
  other_url?: string;
  jobApplication_date?: Date | string;
  background_date?: Date | string;
  dateIdentityCard?: Date | string;
  healthy_date?: Date | string;
  relationship_date?: Date | string;
  degree_date?: Date | string;
  other_date?: Date | string;
  resignation_date?: Date | string;
  relationship_url?: string;
  yoe?: string;
  sourceOptions?: string;
  source?: string;
  experienceOptions?:string;
  experience?: string

};

export type totalGeneralType = {
  totalExpired?: number;
  totalPrepareExpired?: number;
  totalUncompletedProfile?: number;
};

export type IEmployeeSignUp = {
  fullName?: string;
  email?: string;
  userName?: string;
  password?: string;
  confirmPassword?: string;
};
export type IReportProject = {
  project_id: number | string;
  project_name: string;
  totalEmployee: number;
};

export type IListSalary = {
  id: number;
  employee_id: number;
  fromDate: Date;
  toDate: Date;
  salaryBasic: number;
  allowance: string;
  createdAt: Date;
  updatedAt: null;
  createdBy: number;
  updatedBy: null;
};

export type IEmployeeState = {
  listSalary: IListSalary[];
  reportProject: IReportProject[];
  employeeList: EmployeeForm[];
  employeeCount: number;
  employeeDetails: EmployeeForm;
  employeeBankingDetail: IEmployeeBanking;
  employeeInsuranceDetail: IEmployeeInsurance;
  employeeContact: EmployeeContactForm[];
  employeeProfile: EmployeeProfileForm;
  employeeContract: any;
  generalReport: EmployeeForm[];
  generalReportCount: number;
  totalGeneral: totalGeneralType;
  employeeTax?: ITax | null;
};
