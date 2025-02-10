import i18next from 'i18next';
import EmployeeApi from '@/apis/employee.api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  IEmployeeInsurance,
  IEmployeeState,
  IInsuranceHistory,
  IInsuranceProgress,
} from '../../../@types/employee';
import AccountApi from '../../../apis/account.api';
import SnakeBar from '../../../utils/snackbar';
import { getListDistrictApi } from './district';
import { getListWardApi } from './ward';

// eslint-disable-next-line import/no-named-as-default








// ----------------------------------------------------------------------
// Basic Info
export const createEmployee = createAsyncThunk(
  'employee/createEmployee',
  async (submitData: any, { dispatch }) => {
    const { data } = await EmployeeApi.create(submitData.data);
    if (submitData.data.id > 0) {
      SnakeBar.success(i18next.t('updateSuccess'));
      submitData?.navigate(submitData.data.id.toString());
    } else {
      SnakeBar.success(i18next.t('createSuccess'));
      submitData?.navigate(data?.toString());
    }
  }
);

export const updateEmployee = createAsyncThunk(
  'employee/updateEmployee',
  async (submitData: any, { dispatch }) => {
    const { data } = await EmployeeApi.update(submitData.data);
    SnakeBar.success(i18next.t('updateSuccess'));
    submitData?.navigate(submitData.data.id.toString());
  }
);

export const getEmployeeList = createAsyncThunk(
  'employee/getEmployeeList',
  async (params: any, { dispatch }) => {
    const { data } = await EmployeeApi.getList(params);
    return data;
  }
);

export const deleteEmployeeRow = createAsyncThunk(
  'employee/deleteEmployeeRow',
  async (data: any, { dispatch }) => {
    await EmployeeApi.deleteEmployee(data.id);
    await dispatch(getEmployeeList(data.params));
    SnakeBar.success(i18next.t('deleteSuccess'));
  }
);

export const getOneEmployee = createAsyncThunk(
  'employee/getOneEmployee',
  async (id: any, { dispatch }) => {
    const { data } = await EmployeeApi.getOne(id);
    return data;
  }
);
// Banking Infomation
export const getEmployeeBanking = createAsyncThunk(
  'employee/getEmployeeBanking',
  async (params: any, { dispatch }) => {
    const { data } = await EmployeeApi.getBanking(params);
    return data;
  }
);
export const createEmployeeBanking = createAsyncThunk(
  'employee/createEmployeeBanking',
  async (data: any, { dispatch }) => {
    await EmployeeApi.createBanking(data);
    SnakeBar.success(i18next.t('createSuccess'));
  }
);

export const updateEmployeeBanking = createAsyncThunk(
  'employee/updateEmployeeBanking',
  async (data: any, { dispatch }) => {
    await EmployeeApi.updateBanking(data);
    SnakeBar.success(i18next.t('updateSuccess'));
  }
);

// Insurance Infomation
export const getEmployeeInsurance = createAsyncThunk(
  'employee/getEmployeeInsurance',
  async (params: any, { dispatch }) => {
    const { data } = await EmployeeApi.getInsurance(params);
    return data;
  }
);
export const createEmployeeInsurance = createAsyncThunk(
  'employee/createEmployeeInsurance',
  async (data: IEmployeeInsurance, { dispatch }) => {
    await EmployeeApi.createInsurance(data);
    SnakeBar.success(i18next.t('createSuccess'));
  }
);

export const updateEmployeeInsurance = createAsyncThunk(
  'employee/updateEmployeeInsurance',
  async (data: IEmployeeInsurance, { dispatch }) => {
    await EmployeeApi.updateInsurance(data);
    SnakeBar.success(i18next.t('updateSuccess'));
  }
);

export const deleteInsuranceProgress = createAsyncThunk(
  'employee/deleteEmployeeRow',
  async (data: any, { dispatch }) => {
    await EmployeeApi.deleteInsuranceProgess(data);
    SnakeBar.success(i18next.t('deleteSuccess'));
  }
);
export const createInsuranceHistory = createAsyncThunk(
  'employee/createInsuranceHistory',
  async (data: IInsuranceHistory, { dispatch }) => {
    await EmployeeApi.addInsuranceHistory(data);
    SnakeBar.success(i18next.t('createSuccess'));
  }
);
export const deleteInsuranceHistory = createAsyncThunk(
  'employee/deleteInsuranceHistory',
  async (data: any, { dispatch }) => {
    await EmployeeApi.deleteInsuranceHistory(data);
    SnakeBar.success(i18next.t('deleteSuccess'));
  }
);
// End Insurance

export const getEmployeeContact = createAsyncThunk(
  'employee/getEmployeeContact',
  async (employeeId: any, { dispatch }) => {
    const { data } = await EmployeeApi.getContact(employeeId);
    return data;
  }
);

export const createEmployeeProfile = createAsyncThunk(
  'employee/createEmployeeProfile',
  async (data: any, { dispatch }) => {
    await EmployeeApi.createProfile(data);
    SnakeBar.success(i18next.t('createSuccess'));
  }
);

export const updateEmployeeProfile = createAsyncThunk(
  'employee/updateEmployeeProfile',
  async (data: any, { dispatch }) => {
    await EmployeeApi.updateProfile(data);
    SnakeBar.success(i18next.t('updateSuccess'));
  }
);

export const getEmployeeProfile = createAsyncThunk(
  'employee/getEmployeeProfile',
  async (employeeId: any, { dispatch }) => {
    const { data } = await EmployeeApi.getProfile(employeeId);
    return data;
  }
);

export const getEmployeeContract = createAsyncThunk(
  'employee/getEmployeeContract',
  async (employeeId: any, { dispatch }) => {
    const { data } = await EmployeeApi.getContract(employeeId);
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

// Tax
export const getEmployeeTax = createAsyncThunk(
  'employee/getEmployeeTax',
  async (employeeId: number | string, { dispatch }) => {
    const { data } = await EmployeeApi.getTax({ employeeId });
    return data;
  }
);

export const createEmployeeTax = createAsyncThunk(
  'employee/createEmployeeTax',
  async (data: ITax, { dispatch }) => {
    await EmployeeApi.createTax(data);
    SnakeBar.success(i18next.t('createSuccess'));
  }
);

export const updateEmployeeTax = createAsyncThunk(
  'employee/updateEmployeeTax',
  async (data: ITax, { dispatch }) => {
    await EmployeeApi.updateTax(data);
    SnakeBar.success(i18next.t('updateSuccess'));
  }
);

export const deleteRelationship = createAsyncThunk(
  'employee/deleteEmployeeRow',
  async (taxId: number | string, { dispatch }) => {
    await EmployeeApi.deleteRelationship(taxId);
    SnakeBar.success(i18next.t('deleteSuccess'));
  }
);

export const createEmployeeRelationship = createAsyncThunk(
  'employee/createEmployeeRelationship',
  async (data: IRelationshipTax, { dispatch }) => {
    await EmployeeApi.createRelationship(data);
    SnakeBar.success(i18next.t('insertSuccess'));
  }
);

export const updateEmployeeRelationship = createAsyncThunk(
  'employee/updateEmployeeRelationship',
  async (data: IRelationshipTax, { dispatch }) => {
    await EmployeeApi.updateRelationship(data);
    SnakeBar.success(i18next.t('updateSuccess'));
  }
);

export const createInsuranceProgress = createAsyncThunk(
  'employee/createInsuranceProgress',
  async (data: IInsuranceProgress, { dispatch }) => {
    await EmployeeApi.createInsuranceProgress(data);
    SnakeBar.success(i18next.t('insertSuccess'));
  }
);

export const updateInsuranceProgress = createAsyncThunk(
  'employee/updateInsuranceProgress',
  async (data: IInsuranceProgress, { dispatch }) => {
    await EmployeeApi.updateInsuranceProgress(data);
    // await data.getInsurance();
    // await data.handleClose();
    // await data.reset();
    SnakeBar.success(i18next.t('updateSuccess'));
  }
);

export const getExpiredContract = createAsyncThunk(
  'employee/getExpiredContract',
  async (options: any, { dispatch }) => {
    const { data } = await EmployeeApi.getExpiredContract(options);
    return data;
  }
);

export const getPrepareExpiredContract = createAsyncThunk(
  'employee/getPrepareExpiredContract',
  async (options: any, { dispatch }) => {
    const { data } = await EmployeeApi.getPrepareExpiredContract(options);
    return data;
  }
);

export const getIncompleteInfo = createAsyncThunk(
  'employee/getIncompleteContract',
  async (options: any, { dispatch }) => {
    const { data } = await EmployeeApi.getIncompleteInfo(options);
    return data;
  }
);

export const getTotalGeneral = createAsyncThunk('employee/getTotalGeneral', async () => {
  const { data } = await EmployeeApi.getTotalGeneral();
  return data;
});
// register
export const registerAccount = createAsyncThunk(
  'employee/registerAccount',
  async (data: any, { dispatch }) => {
    await AccountApi.register(data);
    SnakeBar.success(i18next.t('createSuccess'));
  }
);
// get report project
export const getReportProject = createAsyncThunk('employee/reportByProject', async () => {
  const { data } = await EmployeeApi.getProjectByReport();
  return data;
});
// Salary Basic
export const getListSalaryBasic = createAsyncThunk(
  'employee/getSalary',
  async (id: number | string, { dispatch }) => {
    const { data } = await EmployeeApi.getListSalary(id);
    return data;
  }
);
export const createSalaryBasic = createAsyncThunk(
  'employee/createSalary',
  async (data: any, { dispatch }) => {
    await EmployeeApi.createSalary(data);
    SnakeBar.success(i18next.t('insertSuccess'));
  }
);
export const deleteSalaryBasic = createAsyncThunk(
  'employee/deleteSalary',
  async (id: string | number, { dispatch }) => {
    await EmployeeApi.deleteSalary(id);
    SnakeBar.success(i18next.t('deleteSuccess'));
  }
);

const initialState: IEmployeeState = {
  listSalary: [],
  reportProject: [],
  employeeList: [],
  employeeCount: 0,
  employeeDetails: {},
  employeeBankingDetail: {},
  employeeInsuranceDetail: {},
  employeeContact: [],
  employeeProfile: {},
  employeeContract: {},
  generalReport: [],
  generalReportCount: 0,
  totalGeneral: {},
  employeeTax: null,
};

const slice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    // getUserName: (state, action) => {
    //   console.log(action.payload)
    //   state.userName = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEmployeeList.fulfilled, (state, action) => {
        state.employeeList = action.payload.items;
        state.employeeCount = action.payload.totalRow;
      })
      .addCase(getOneEmployee.fulfilled, (state, action) => {
        state.employeeDetails = action.payload;
      })
      .addCase(getEmployeeBanking.fulfilled, (state, action) => {
        state.employeeBankingDetail = action.payload;
      })
      .addCase(getEmployeeInsurance.fulfilled, (state, action) => {
        state.employeeInsuranceDetail = action.payload;
      })
      .addCase(getEmployeeProfile.fulfilled, (state, action) => {
        state.employeeProfile = action.payload;
      })
      .addCase(getEmployeeContract.fulfilled, (state, action) => {
        state.employeeContract = action.payload;
      })

      .addCase(getExpiredContract.fulfilled, (state, action) => {
        state.generalReport = action.payload.items;
        state.generalReportCount = action.payload.totalRow;
      })

      .addCase(getPrepareExpiredContract.fulfilled, (state, action) => {
        state.generalReport = action.payload.items;
        state.generalReportCount = action.payload.totalRow;
      })
      .addCase(getIncompleteInfo.fulfilled, (state, action) => {
        state.generalReport = action.payload.items;
        state.generalReportCount = action.payload.totalRow;
      })
      .addCase(getTotalGeneral.fulfilled, (state, action) => {
        state.totalGeneral = action.payload;
      })
      .addCase(getReportProject.fulfilled, (state, action) => {
        state.reportProject = action.payload;
      })
      .addCase(getListSalaryBasic.fulfilled, (state, action) => {
        state.listSalary = action.payload;
      })
      .addCase(getEmployeeTax.fulfilled, (state, action) => {
        state.employeeTax = action.payload;
      });
  },
});
// export const { getUserName } = slice.actions;
export default slice.reducer;
