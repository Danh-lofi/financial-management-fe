import i18next from 'i18next';
import BankingApi from '@/apis/banking.api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IBanking, IBankingState } from '../../../@types/banking';
import SnakeBar from '../../../utils/snackbar';

type IUpdateBanking = {
  data: IBanking;
  navigate: () => void;
};
// ----------------------------------------------------------------------
export const createBanking = createAsyncThunk(
  'banking/createBanking',
  async (data: any, { dispatch }) => {
    await BankingApi.create(data.data);
    if (data.data.id === 0) {
      SnakeBar.success(i18next.t('createSuccess'));
    } else {
      SnakeBar.success(i18next.t('editSuccess'));
    }
    data.navigate();
  }
);

export const updateBanking = createAsyncThunk(
  'banking/updateBanking',
  async (data: IUpdateBanking, { dispatch }) => {
    await BankingApi.update(data.data);
    if (data.data.id === 0) {
      SnakeBar.success(i18next.t('createSuccess'));
    } else {
      SnakeBar.success(i18next.t('editSuccess'));
    }
    data.navigate();
  }
);

export const getListBanking = createAsyncThunk(
  'banking/getListBanking',
  async (params: any, { dispatch }) => {
    const { data } = await BankingApi.get(params);
    return data;
  }
);

export const getBankingDetail = createAsyncThunk(
  'banking/getBankingDetail',
  async (id: any, { dispatch }) => {
    const { data } = await BankingApi.getDetail(id);
    return data;
  }
);
export const deleteBanking = createAsyncThunk(
  'banking/deleteBanking',
  async (data: any, { dispatch }) => {
    await BankingApi.delete(data.id);
    await dispatch(getListBanking(data.params));
    SnakeBar.success(i18next.t('deleteSuccess'));
  }
);

const initialState: IBankingState = {
    bankingList: [],
    bankingCount: 0,
    bankingDetail: {},
};

const slice = createSlice({
  name: 'Banking',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getListBanking.fulfilled, (state, action) => {
        state.bankingList = action.payload.items;
        state.bankingCount = action.payload.totalRow;
      })
      .addCase(getBankingDetail.fulfilled, (state, action) => {
        state.bankingDetail = action.payload;
      });
  },
});
export default slice.reducer;
