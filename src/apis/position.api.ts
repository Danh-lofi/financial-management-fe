import { deleteAsync, getAsync, postAsync, putAsync } from './http-client';

const PositionApi = {
  create: (data: any) => {
    return postAsync(`/position`, data);
  },
  update: (data: any) => {
    return putAsync(`/position`, data);
  },
  get:(data:any) =>{
    return getAsync(`/position`, data);
  },
  getDetail:(id:any) =>{
    return getAsync(`/position/${id}`);
  },
  delete:(id:any) =>{
    return deleteAsync(`/position/${id}`);
  }
};

export default PositionApi;
