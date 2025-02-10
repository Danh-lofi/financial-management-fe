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
import DriverHostApi from '../../../apis/driver-host.api';
import SnakeBar from '../../../utils/snackbar';

// eslint-disable-next-line import/no-named-as-default







// ----------------------------------------------------------------------

export const getListOrder = createAsyncThunk(
  'driverhost/getListOrder',
  async (params: IParamsGetDriverHostBookingList, { dispatch }) => {
    const { data } = await DriverHostApi.getListOrder(params);
    return data;
  }
);

const initialState: IDriverHostState = {
  listOrder: [],
};

const slice = createSlice({
  name: 'driverhost',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getListOrder.fulfilled, (state, action) => {
      state.listOrder = action.payload.items;
    });
  },
});

export default slice.reducer;
