import { PermissionItem } from '../@types/userSetting';
import { deleteAsync, getAsync, postAsync, putAsync } from './http-client';

const UserApi = {
  get: (params: any) => {
    return getAsync(`/account`, params);
  },
  getRole: () => {
    return getAsync(`/role/getrolelist`);
  },
  postAssignRole: (employeeId: string | number, data: any) => {
    return postAsync(`/account/assign-roles?employeeId=${employeeId}`, data);
  },
  getPermission: () => {
    return getAsync(`/permission`);
  },
  putPermission: (data:PermissionItem) => {
    return putAsync(`/permission`,data)
  }
};

export default UserApi;
