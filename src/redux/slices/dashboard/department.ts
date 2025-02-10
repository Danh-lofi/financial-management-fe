import i18next from 'i18next';
import DepartmentApi from '@/apis/department.api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IDepartment, IDepartmentState } from '../../../@types/department';
import SnakeBar from '../../../utils/snackbar';

// ----------------------------------------------------------------------
type ICreateDepartment = {
  data: IDepartment;
  navigate: () => void;
};

export const createDepartment = createAsyncThunk(
  'department/createDepartment',
  async (data: any, { dispatch }) => {
    await DepartmentApi.create(data.data);
    SnakeBar.success(i18next.t('createSuccess'));
    data.navigate();
  }
);

export const updateDepartment = createAsyncThunk(
  'department/updateDepartment',
  async (data: ICreateDepartment, { dispatch }) => {
    await DepartmentApi.update(data.data);
    SnakeBar.success(i18next.t('editSuccess'));
    data.navigate();
  }
);

export const getListDepartment = createAsyncThunk(
  'department/getListDepartment',
  async (params: any, { dispatch }) => {
    const { data } = await DepartmentApi.get(params);
    return data;
  }
);

export const getDepartmentDetail = createAsyncThunk(
  'department/getDepartmentDetail',
  async (id: any, { dispatch }) => {
    const { data } = await DepartmentApi.getDetail(id);
    return data;
  }
);
export const deleteDepartment = createAsyncThunk(
  'department/deleteDepartment',
  async (data: any, { dispatch }) => {
    await DepartmentApi.delete(data.id);
    await dispatch(getListDepartment(data.params));
    SnakeBar.success(i18next.t('deleteSuccess'));
  }
);

const initialState: IDepartmentState = {
  departmentList: [],
  departmentCount: 0,
  departmentDetail: {},
};

const slice = createSlice({
  name: 'department',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getListDepartment.fulfilled, (state, action) => {
        state.departmentList = action.payload.items;
        state.departmentCount = action.payload.totalRow;
      })
      .addCase(getDepartmentDetail.fulfilled, (state, action) => {
        state.departmentDetail = action.payload;
      });
  },
});
export default slice.reducer;
