import { IParamsGetTransaction, ITransaction } from '@/@types/transaction';
import { deleteAsync, getAsync, postAsync } from './http-client';

const url = '/transactions';
const TransactionApi = {
  getAll: (params: IParamsGetTransaction) => {
    return getAsync(`${url}`, params);
  },
  getOne: (id: string) => {
    return getAsync(`${url}/${id}`);
  },
  upsert: (data: ITransaction) => {
    return postAsync(`${url}`, data);
  },
  delete: (id: string) => {
    return deleteAsync(`${url}/${id}`);
  },
};

export default TransactionApi;
