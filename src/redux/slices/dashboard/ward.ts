import i18next from 'i18next';
import ProvinceApi from '@/apis/province.api';
import WardApi from '@/apis/ward.api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IProvinceState, IWardState } from '../../../@types/address';
import SnakeBar from '../../../utils/snackbar';

// ----------------------------------------------------------------------

export const createWardApi = createAsyncThunk(
  'ward/createward',
  async (data: any, { dispatch }) => {
    await WardApi.postWard(data.data);
    SnakeBar.success(i18next.t('createSuccess'));
    data.navigate();
  }
);

export const updateWardApi = createAsyncThunk(
  'ward/updateward',
  async (data: any, { dispatch }) => {
    await WardApi.updateWard(data.data);
    SnakeBar.success(i18next.t('editSuccess'));
    data.navigate();
  }
);

export const getListWardApi = createAsyncThunk(
  'ward/getWardList',
  async (params: any, { dispatch }) => {
    const { data } = await WardApi.getWard(params);

    return data;
  }
);

export const getListWardTemporaryApi = createAsyncThunk(
  'ward/getWardTemporaryList',
  async (params: any, { dispatch }) => {
    const { data } = await WardApi.getWard(params);

    return data;
  }
);

export const getWardDetailApi = createAsyncThunk(
  'ward/getWardDetailApi',
  async (id: any, { dispatch }) => {
    const { data } = await WardApi.getDetail(id);
    return data;
  }
);
export const deleteWardApi = createAsyncThunk(
  'ward/deleteWardApi',
  async (data: any, { dispatch }) => {
    await WardApi.delete(data.id);
    await dispatch(getListWardApi(data.params));
    SnakeBar.success(i18next.t('deleteSuccess'));
  }
);

const initialState: IWardState = {
  wardList: [],
  wardCount: 0,
  wardDetail: {},
  wardTemporaryList: [],
};

const slice = createSlice({
  name: 'ward',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getListWardApi.fulfilled, (state, action) => {
        state.wardList = action.payload.items;
        state.wardCount = action.payload.totalRow;
      })
      .addCase(getListWardTemporaryApi.fulfilled, (state, action) => {
        state.wardTemporaryList = action.payload.items;
      })
      .addCase(getWardDetailApi.fulfilled, (state, action) => {
        state.wardDetail = action.payload;
      });
  },
});
export default slice.reducer;
