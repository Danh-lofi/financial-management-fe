import { deleteAsync, getAsync, postAsync, putAsync } from './http-client';

const ProvinceApi = {
  postProvince: (data: any) => {
    return postAsync(`/province`, data);
  },
  updateProvince: (data: any) => {
    return putAsync(`/province`, data);
  },
  getProvince:(data:any) =>{
    return getAsync(`/province`, data);
  },
  getDetail:(id:any) =>{
    return getAsync(`/province/${id}`);
  },
  deleteProvince:(id:any) =>{
    return deleteAsync(`/province/${id}`);
  }
};

export default ProvinceApi;
