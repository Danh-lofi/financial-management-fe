import i18next from 'i18next';
import NationalityApi from '@/apis/nationality.api';
import NoticeApi from '@/apis/notice.api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { INoticeState } from '../../../@types/notice';
import SnakeBar from '../../../utils/snackbar';

export const getListNotice = createAsyncThunk(
  'notifications/getListNotifications',
  async (params: any, { dispatch }) => {
    const { data } = await NoticeApi.getList(params);
    return data
  }
);

export const getListNoticeFull = createAsyncThunk(
  'notifications/getListNoticeFull',
  async (params: any, { dispatch }) => {
    const { data } = await NoticeApi.getList(params);
    return data
  }
);

export const getNoticeHistories = createAsyncThunk(
  'notifications/getNoticeHistories',
  async (params: any, { dispatch }) => {
    const { data } = await NoticeApi.getHistories(params);
    return data
  }
);
export const markViewNotice = createAsyncThunk(
  'notifications/markViewNotice',
  async (item: any, { dispatch }) => {
    await NoticeApi.put(item.id);

  }
);


const initialState: INoticeState = {
  noticeList: [],
  totalNotSeen: 0,
  noticeListFull: [],
  noticeListCount: 0,
  employeeId: '',
  noticeDetails: {},
  noticeDetailsCount: 0,
};

const slice = createSlice({
  name: 'notice',
  initialState,
  reducers: {
    getEmployeeId: (state, action) => {
      state.employeeId = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(getListNotice.fulfilled, (state, action) => {
      state.noticeList = action.payload.items;
      state.totalNotSeen = action.payload.totalNotseen;

    })
    .addCase(getNoticeHistories.fulfilled, (state, action) => {
      state.noticeDetails = action.payload.items[0];
      state.noticeDetailsCount = action.payload.totalRow;
      state.employeeId = action.payload.employeeId;
    })
    .addCase(getListNoticeFull.fulfilled, (state, action) => {
      state.noticeListFull = action.payload.items;
      state.noticeListCount = action.payload.totalRow;
    })
    ;
  },
});
export  const {getEmployeeId} = slice.actions
export default slice.reducer;
