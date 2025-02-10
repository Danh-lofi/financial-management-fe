import { IBanking } from '../@types/banking';
import { deleteAsync, getAsync, postAsync, putAsync } from './http-client';

const BankingApi = {
  create: (data: any) => {
    return postAsync(`/bank`, data);
  },
  update: (data: IBanking) => {
    return putAsync(`/bank`, data);
  },
  get:(data:any) =>{
    return getAsync(`/bank`, data);
  },
  getDetail:(id:any) =>{
    return getAsync(`/bank/${id}`);
  },
  delete:(id:any) =>{
    return deleteAsync(`/bank/${id}`);
  }
};

export default BankingApi;
