import { deleteAsync, getAsync, postAsync, putAsync } from './http-client';

const DistrictApi = {
  create: (data: any) => {
    return postAsync(`/district`, data);
  },
  update: (data: any) => {
    return putAsync(`/district`, data);
  },
  getList:(params:any) =>{
    return getAsync(`/district`, params);
  },
  getDetail:(id:any) =>{
    return getAsync(`/district/${id}`);
  },
  delete:(id:any) =>{
    return deleteAsync(`/district/${id}`);
  },

};

export default DistrictApi;
