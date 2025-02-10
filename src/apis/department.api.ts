import { IDepartment } from '../@types/department';
import { deleteAsync, getAsync, postAsync, putAsync } from './http-client';

const DepartmentApi = {
  create: (data: any) => {
    return postAsync(`/department`, data);
  },
  update: (data: IDepartment) => {
    return putAsync(`/department`, data);
  },
  get: (data: any) => {
    return getAsync(`/department`, data);
  },
  getDetail: (id: any) => {
    return getAsync(`/department/${id}`);
  },
  delete: (id: any) => {
    return deleteAsync(`/department/${id}`);
  },
};

export default DepartmentApi;
