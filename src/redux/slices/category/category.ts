import i18next from 'i18next';
import { ICategory, IParamsGetCategory } from '@/@types/category';
import CategoryApi from '@/apis/category.api';
import EmployeeApi from '@/apis/employee.api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  IEmployeeInsurance,
  IEmployeeState,
  IInsuranceHistory,
  IInsuranceProgress,
} from '../../../@types/employee';
import AccountApi from '../../../apis/account.api';
import DriverHostApi from '../../../apis/driver-host.api';
import SnakeBar from '../../../utils/snackbar';

// eslint-disable-next-line import/no-named-as-default
// ----------------------------------------------------------------------

export const getCategories = createAsyncThunk(
  'category/getCategories',
  async (params: IParamsGetCategory, { dispatch }) => {
    const { data } = await CategoryApi.getAll(params);
    return data;
  }
);
type ICategoryState = {
  categories: ICategory[];
}
const initialState: ICategoryState = {
  categories: [],
};

const slice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.categories = action.payload?.data || [];
    });
  },
});

export default slice.reducer;
