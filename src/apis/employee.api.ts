import { IInsuranceHistory } from '../@types/employee';
import { getAsync, postAsync, deleteAsync, putAsync } from './http-client';

const EmployeeApi = {
  create: (data: any) => {
    return postAsync(`/employee`, data);
  },
  update: (data: any) => {
    return putAsync(`/employee`, data);
  },
  getList: (params: any) => {
    return getAsync(`employee`, params);
  },
  deleteEmployee: (id: string | number) => {
    return deleteAsync(`employee/${id}`);
  },
  getOne: (id: any) => {
    return getAsync(`employee/${id}`);
  },
  checkIdCard: (params: any) => {
    return getAsync(`employee/check-identity-card-exists`, params, true, false);
  },
  getExport: () => {
    return getAsync(`employee/export-employee`);
  },
  postImport: (file: any) => {
    return postAsync(`employee/import-create`, file);
  },
  // Banking
  createBanking: (data: any) => {
    return postAsync(`/employee/bank`, data);
  },
  updateBanking: (data: any) => {
    return putAsync(`/employee/bank`, data);
  },
  getBanking: (params: any) => {
    return getAsync(`/employee/bank`, params);
  },
  // Insurance
  createInsurance: (data: any) => {
    return postAsync(`/employee/insurance`, data);
  },

  updateInsurance: (data: any) => {
    return putAsync(`/employee/insurance`, data);
  },

  getInsurance: (params: any) => {
    return getAsync(`/employee/insurance`, params);
  },
  createInsuranceProgress: (data: any) => {
    return postAsync(`/employee/insurance-progress`, data);
  },

  updateInsuranceProgress: (data: any) => {
    return putAsync(`/employee/insurance-progress`, data);
  },

  deleteInsuranceProgess: (id: any) => {
    return deleteAsync(`/employee/insurance-progress?id=${id}`);
  },
  deleteInsuranceHistory: (id: any) => {
    return deleteAsync(`/employee/insurance-history?id=${id}`);
  },

  // Contact
  getContact: (data: any) => {
    return getAsync('employee/contact', data);
  },

  createContact: (data: any) => {
    return postAsync(`/employee/contact`, data);
  },

  updateContact: (data: any) => {
    return putAsync(`/employee/contact`, data);
  },
  deleteRelationship: (id: number | string) => {
    return deleteAsync(`/employee/relationship?id=${id}`);
  },
  // Lịch sử nhận chế độ
  addInsuranceHistory: (data: IInsuranceHistory) => {
    return postAsync(`/employee/insurance-history`, data);
  },

  // Profile
  createProfile: (data: any) => {
    return postAsync(`/employee/profile`, data);
  },

  updateProfile: (data: any) => {
    return putAsync(`/employee/profile`, data);
  },

  getProfile: (data: any) => {
    return getAsync(`/employee/profile`, data);
  },

  // Contract
  createContract: (data: any) => {
    return postAsync(`/employee/contract`, data);
  },

  getContract: (data: any) => {
    return getAsync(`/employee/contract`, data);
  },

  // Tax
  createTax: (data: ITax) => {
    return postAsync(`/employee/tax`, data);
  },

  updateTax: (data: ITax) => {
    return putAsync(`/employee/tax`, data);
  },

  getTax: (data: { employeeId: string | number }) => {
    return getAsync(`/employee/tax`, data);
  },

  // Relationship
  createRelationship: (data: IRelationshipTax) => {
    return postAsync(`/employee/relationship`, data);
  },

  updateRelationship: (data: IRelationshipTax) => {
    return putAsync(`/employee/relationship`, data);
  },

  // Register
  register: (data: IAccount) => {
    return postAsync(`/account/register`, data);
  },
  // Upload Avatar
  uploadAvatar: (params: any, data: any) => {
    return postAsync(`/account/update-avatar?UserName=${params}`, data);
  },
  refreshToken: (data: any) => {
    return postAsync(`/account/refresh-token`, data);
  },
  changePassword: (params: any) => {
    return postAsync(`/account/changepassword`, {}, params);
  },
  // General
  getExpiredContract: (data: any) => {
    return getAsync(`/employee/expired-contract`, data);
  },

  getPrepareExpiredContract: (data: any) => {
    return getAsync(`/employee/prepare-expired-contract`, data);
  },

  getIncompleteInfo: (data: any) => {
    return getAsync(`/employee/incomplete-info`, data);
  },
  getTotalGeneral: () => {
    return getAsync(`/employee/general-report`);
  },
  // report project
  getProjectByReport: () => {
    return getAsync(`/employee/report-by-project`);
  },
  // Salary Basic
  getListSalary: (id: string | number) => {
    return getAsync(`/employee/employee-salary?employeeId=${id}`);
  },
  createSalary: (data: any) => {
    return postAsync(`/employee/employee-salary`, data);
  },
  deleteSalary: (id: string | number) => {
    return deleteAsync(`/employee/employee-salary/${id}`);
  },
};

export default EmployeeApi;
