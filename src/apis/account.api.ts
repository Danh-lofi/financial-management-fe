import { IAccountChangePassword, IAccountLogin, IAccountUpdateProfile, IAssignProject, IParamsAccount, IRegisterAccount } from '@/@types/account';
import { IRefreshToken } from '../@types/user';
import { deleteAsync, getAsync, postAsync } from './http-client';

const url = '/auth';
const AccountApi = {
  login: (data: IAccountLogin) => {
    return postAsync(`${url}/login-with-password`, data);
  },
  register: (data: IRegisterAccount) => {
    return postAsync(`${url}/signup`, data);
  },
  updateUserInfo: (data: IAccountUpdateProfile) => {
    return postAsync(`${url}/user_update`, data);
  },
  changePassword: (data: IAccountChangePassword) => {
    return postAsync(`/personal_info/change_password`, data);
  },
  refreshToken: (data: IRefreshToken) => {
    return postAsync(`${url}/refresh-token`, data);
  },
  getListAccount: (params: IParamsAccount) => {
    return getAsync(`${url}`, params);
  },
  deleteAccount: (ids: number[]) => {
    return deleteAsync(`${url}`, ids);
  },
  assignProject: (data: IAssignProject) => {
    const { employeeId, projectId } = data;
    return postAsync(`${url}/assign-project?employeeId=${employeeId}`, { project_id: projectId });
  },
};

export default AccountApi;
