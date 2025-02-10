import i18next from 'i18next';
import DayoffApi from '@/apis/dayoff.api';
import ProjectApi from '@/apis/project.api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IDayoff, IDayoffState } from '../../../@types/dayoff';
import SnakeBar from '../../../utils/snackbar';

// ----------------------------------------------------------------------
type ICreateDayoff = {
  data: IDayoff;
  navigate: () => void;
};

export const createDayoff = createAsyncThunk(
  'dayoff/createDayoff',
  async (data: any, { dispatch }) => {
    await DayoffApi.create(data.data);
    SnakeBar.success(i18next.t('createSuccess'));
    data.navigate();
  }
);

export const updateDayoff = createAsyncThunk(
  'dayoff/updateDayoff',
  async (data: ICreateDayoff, { dispatch }) => {
    await DayoffApi.update(data.data);
    SnakeBar.success(i18next.t('editSuccess'));
    data.navigate();
  }
);

export const getListDayoff = createAsyncThunk(
  'dayoff/getListDayoff',
  async (params: any, { dispatch }) => {
    const { data } = await DayoffApi.get(params);
    return data;
  }
);

export const getDayoffDetail = createAsyncThunk(
  'dayoff/getDayoffDetail',
  async (id: any, { dispatch }) => {
    const { data } = await DayoffApi.getDetail(id);
    return data;
  }
);
export const deleteDayoff = createAsyncThunk(
  'dayoff/deleteDayoff',
  async (data: any, { dispatch }) => {
    await DayoffApi.delete(data.id);
    await dispatch(getListDayoff(data.params));
    SnakeBar.success(i18next.t('deleteSuccess'));
  }
);

const initialState: IDayoffState = {
  dayoffList: [],
  dayoffCount: 0,
  dayoffDetail: {},
};

const slice = createSlice({
  name: 'dayoff',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getListDayoff.fulfilled, (state, action) => {
        state.dayoffList = action.payload.items;
        state.dayoffCount = action.payload.totalRow;
      })

      .addCase(getDayoffDetail.fulfilled, (state, action) => {
        state.dayoffDetail = action.payload;
      });
  },
});
export default slice.reducer;
