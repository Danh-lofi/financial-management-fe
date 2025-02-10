import { deleteAsync, getAsync, postAsync, putAsync } from './http-client';

const url = 'employee/new-contract';
const ContractApi = {
  get: (query: IContractFilter) => {
    return getAsync(`${url}`, query, true, false);
  },
  add: (data: IContractCreated) => {
    return postAsync(`${url}`, data);
  },
  delete: (id: string | number) => {
    return deleteAsync(`${url}/${id}`);
  },
  update: (data: IContractCreated) => {
    return putAsync(`${url}`, data);
  },
  updateCurrentContract: (data: IUpdateCurrentContract) => {
    return putAsync(`employee/current-contract`, data);
  },
  createDetals: (details: IDetailContract[]) => {
    return postAsync(`${url}/details`, details);
  },
  updateDetals: (details: IDetailContract[]) => {
    return putAsync(`${url}/details`, details);
  },
  getAllowance: (contractId: string | number) => {
    return getAsync('employee/contract/allowances', { contractId });
  },
  assignAllowance: (data: assignAllowance) => {
    return postAsync(`employee/contract/assign-allowance`, data);
  },
  updateAllowance: (allowance: IAllowance) => {
    return putAsync('employee/contract/allowances', allowance);
  },
  deleteAllowance: (id: string | number) => {
    return deleteAsync(`employee/contract/allowances/${id}`);
  },
  deleteDetail: (id: string | number) => {
    return deleteAsync(`${url}/details/${id}`);
  },
  download: (params: { employeeId: string | number; projectId: string | number }) => {
    return getAsync(`employee/download-contract-files`, params);
  },

  selectCurrentContract: (params: any) => {
    return putAsync('employee/current-contract', params);
  },
};

export default ContractApi;
