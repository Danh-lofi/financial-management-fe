import { IDayoff } from '../@types/dayoff';
import { deleteAsync, getAsync, postAsync, putAsync } from './http-client';

const DayoffApi = {
  create: (data: any) => {
    return postAsync(`/dayoff`, data);
  },
  update: (data: IDayoff) => {
    return putAsync(`/dayoff`, data);
  },
  get:(data:any) =>{
    return getAsync(`/dayoff`, data);
  },
  getDetail:(id:any) =>{
    return getAsync(`/dayoff/${id}`);
  },
  delete:(id:any) =>{
    return deleteAsync(`/dayoff/${id}`);
  }
};

export default DayoffApi;
