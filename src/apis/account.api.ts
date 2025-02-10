import { IRefreshToken } from '../@types/user';
import { deleteAsync, getAsync, postAsync } from './http-client';

const url = '/users';
const AccountApi = {
  login: (data: IAccountLogin) => {
    return postAsync(`${url}/getToken`, data);
  },
  register: (data: IRegisterAccount) => {
    return postAsync(`${url}/register`, data);
  },
  getUserInfo: (UserID: string) => {
    return postAsync(`${url}/getInfo`, { UserID });
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
