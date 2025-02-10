import { deleteAsync, getAsync, postAsync, putAsync } from './http-client';

const WardApi = {
  postWard: (data: any) => {
    return postAsync(`/ward`, data);
  },
  updateWard: (data: any) => {
    return putAsync(`/ward`, data);
  },
  getWard: (params: any) => {
    return getAsync(`/ward`, params);
  },
  getDetail: (id: any) => {
    return getAsync(`/ward/${id}`);
  },
  delete: (id: any) => {
    return deleteAsync(`/ward/${id}`);
  },
};

export default WardApi;
