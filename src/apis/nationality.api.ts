import { INationality } from '../@types/nationality';
import { deleteAsync, getAsync, postAsync, putAsync } from './http-client';

const NationalityApi = {
  postNationality: (data: any) => {
    return postAsync(`/nationality`, data);
  },
  update: (data: INationality) => {
    return putAsync(`/nationality`, data);
  },
  getNationality: (data: any) => {
    return getAsync(`/nationality`, data);
  },
  getDetail: (id: any) => {
    return getAsync(`/nationality/${id}`);
  },
  deleteNationality: (id: any) => {
    return deleteAsync(`/nationality/${id}`);
  },
};

export default NationalityApi;
