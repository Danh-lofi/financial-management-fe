import i18next from 'i18next';
import EmployeeApi from '@/apis/employee.api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ContractApi from '../../../apis/contract.api';
import SnakeBar from '../../../utils/snackbar';
import { getListDistrictApi } from './district';
import { getListWardApi } from './ward';

// eslint-disable-next-line import/no-named-as-default







// ----------------------------------------------------------------------
export const addEmployeeContract = createAsyncThunk(
  'employee/addEmployeeContract',
  async (data: IContractCreated, { dispatch }) => {
    await ContractApi.add(data);
    SnakeBar.success(i18next.t('createSuccess'));
  }
);

export const updateContract = createAsyncThunk(
  'employee/updateContract',
  async (data: IContractCreated, { dispatch }) => {
    await ContractApi.update(data);
    SnakeBar.success(i18next.t('updateSuccess'));
  }
);

export const deleteContract = createAsyncThunk(
  'employee/deleteContract',
  async (contractId: number | string, { dispatch }) => {
    await ContractApi.delete(contractId);
    SnakeBar.success(i18next.t('deleteSuccess'));
  }
);

export const getEmployeeContract = createAsyncThunk(
  'employee/getEmployeeContract',
  async (query: IContractFilter, { dispatch }) => {
    const { data } = await ContractApi.get(query);
    return data;
  }
);

export const createEmployeeContract = createAsyncThunk(
  'employee/createEmployeeContract',
  async (data: any, { dispatch }) => {
    await EmployeeApi.createContract(data);
    SnakeBar.success(i18next.t('updateSuccess'));
  }
);

export const createDetailsContract = createAsyncThunk(
  'employee/createDetailsContract',
  async (data: IDetailContract[], { dispatch }) => {
    await ContractApi.createDetals(data);
    SnakeBar.success(i18next.t('createSuccess'));
  }
);

export const updateDetailsContract = createAsyncThunk(
  'employee/updateDetailsContract',
  async (data: IDetailContract[], { dispatch }) => {
    await ContractApi.updateDetals(data);
    SnakeBar.success(i18next.t('updateSuccess'));
  }
);

// Allowance

export const getAllowanceList = createAsyncThunk(
  'employee/getAllowance',
  async (contractId: number | string, { dispatch }) => {
    const { data } = await ContractApi.getAllowance(contractId);
    return data;
  }
);

export const assignAllowance = createAsyncThunk(
  'employee/assignAllowance',
  async (allowance: assignAllowance, { dispatch }) => {
    await ContractApi.assignAllowance(allowance);
    SnakeBar.success(i18next.t('insertSuccess'));
  }
);
export const updateAllowance = createAsyncThunk(
  'employee/updateAllowance',
  async (allowance: IAllowance, { dispatch }) => {
    await ContractApi.updateAllowance(allowance);
    SnakeBar.success(i18next.t('updateSuccess'));
  }
);
export const deleteAllowance = createAsyncThunk(
  'employee/deleteAllowance',
  async (id: string | number, { dispatch }) => {
    await ContractApi.deleteAllowance(id);
    SnakeBar.success(i18next.t('deleteSuccess'));
  }
);
export const deleteDetail = createAsyncThunk(
  'employee/deleteDetail',
  async (id: string | number, { dispatch }) => {
    await ContractApi.deleteDetail(id);
    SnakeBar.success(i18next.t('deleteSuccess'));
  }
);

export const updateAllowanceList = createAsyncThunk(
  'employee/updateAllowance',
  async (allowance: IAllowance, { dispatch }) => {
    const { data } = await ContractApi.updateAllowance(allowance);
    return data;
  }
);

export const updateCurrentContract = createAsyncThunk(
  'employee/updateCurrentContract',
  async (data: IUpdateCurrentContract, { dispatch }) => {
    await ContractApi.updateCurrentContract(data);
  }
);

export const selectCurrentContract = createAsyncThunk(
  'employee/selectCurrentContract',
  async (params: any, { dispatch }) => {
    await ContractApi.selectCurrentContract(params);
  }
);

type IInitialState = {
  contracts: IContract[];
  haveContract: boolean;
  allowanceList: IAllowance[];
};
const initialState: IInitialState = {
  allowanceList: [{ id: 0, contract_id: 0, name: '', value: 0 }],
  haveContract: false,
  contracts: [
    {
      id: 0,
      contractType: '',
      contract_url: '',
      contractNo: '',
      contractType_id: '',
      employee_id: 0,
      project_id: 0,
      employeeCode: '',
      customerCode: '',
      isCurrent: false,
      details: [
        {
          id: 0,
          contract_id: 0,
          employee_id: 0,
          name: '',
          duration: 0,
          startDate: new Date(),
          endDate: new Date(),
          position: '',
          insuranceRate: 0,
          basicSalary: 0,
          allowance1: 0,
          allowance2: 0,
          allowance3: 0,
          allowance4: 0,
          allowance5: 0,
          note: '',
        },
      ],
      startDate: new Date(),
      endDate: new Date(),
      jobStartDate: new Date(),
      jobEndDate: new Date(),
      name: '',
      reason: '',
      note: '',
    },
  ],
};

const slice = createSlice({
  name: 'contract',
  initialState,
  reducers: {
    // setContractSelected: (state, action) => {
    //   const contractId = action.payload;
    //   if (contractId === -1) {
    //     state.contractSelected = initialState.contractSelected;
    //     return;
    //   }
    //   const index = state.contracts.findIndex((contract) => contract.id === contractId);
    //   state.contractSelected = state.contracts[index];
    // },
    // addItemDetail: (state, action) => {
    //   const index = action.payload;
    //   // find index of contract
    //   const indexContract = state.contracts.findIndex((contract) => contract.id === index);
    //   const contract_id = state.contracts[indexContract].id;
    //   const employee_id = state.contracts[indexContract].employee_id;
    //   state.contracts[indexContract].details.push({
    //     id: 0,
    //     contract_id,
    //     employee_id,
    //     name: 'phụ lục',
    //     duration: 0,
    //     startDate: new Date(),
    //     endDate: new Date(),
    //     contractNo: '1',
    //     position: 'nhân viên',
    //     insuranceRate: 1,
    //     basicSalary: 1,
    //     allowance1: 0,
    //     allowance2: 0,
    //     allowance3: 0,
    //     allowance4: 0,
    //     allowance5: 0,
    //     note: '',
    //   });
    // },
    // updateItemDetail: (state, action) => {
    //   const { updatedRow, indexOfContract, rowIndex } = action.payload;
    //   // find index of contract
    //   const index = state.contracts.findIndex((contract) => contract.id === indexOfContract);
    //   state.contracts[index].details[rowIndex] = updatedRow;
    // },
    // deleteItemDetail: (state, action) => {
    //   const contract_id = action.payload;
    //   const indexContractDeleted = state.contracts.findIndex(
    //     (contract) => contract.id === contract_id
    //   );
    //   state.contracts[indexContractDeleted].details.pop();
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(getEmployeeContract.fulfilled, (state, action) => {
      state.contracts = action.payload;
      state.haveContract = true;
    });
    builder.addCase(getEmployeeContract.rejected, (state, action) => {
      state.haveContract = false;
      state.contracts = [];
    });
    builder.addCase(getAllowanceList.fulfilled, (state, action) => {
      state.allowanceList = action.payload;
    });
  },
});
// export const {
//    addItemDetail, updateItemDetail, deleteItemDetail
// } = slice.actions;
export default slice.reducer;
