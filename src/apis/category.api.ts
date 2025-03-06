import { ICategory, IParamsGetCategory } from '@/@types/category';
import { deleteAsync, getAsync, postAsync } from './http-client';

const url = '/categories';
const CategoryApi = {
  getAll: (params: IParamsGetCategory) => {
    return getAsync(`${url}`, params);
  },
  getOne: (id: string) => {
    return getAsync(`${url}/${id}`);
  },
  upsert: (data: ICategory) => {
    return postAsync(`${url}`, data);
  },
  delete: (id: string) => {
    return deleteAsync(`${url}/${id}`);
  },
};

export default CategoryApi;
