import i18next from 'i18next';
import ProvinceApi from '@/apis/province.api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IProvinceState } from '../../../@types/address';
import SnakeBar from '../../../utils/snackbar';

// ----------------------------------------------------------------------

export const createProvinceApi = createAsyncThunk(
  'province/createProvince',
  async (data: any, { dispatch }) => {
    await ProvinceApi.postProvince(data.data);
    SnakeBar.success(i18next.t('createSuccess'));
    data.navigate();
  }
);

export const updateProvinceApi = createAsyncThunk(
  'province/updateProvince',
  async (data: any, { dispatch }) => {
    await ProvinceApi.updateProvince(data.data);
    SnakeBar.success(i18next.t('editSuccess'));
    data.navigate();
  }
);

export const getListProvinceApi = createAsyncThunk(
  'province/getProvinceList',
  async (params: any, { dispatch }) => {
    const { data } = await ProvinceApi.getProvince(params);
    return data;
  }
);

export const getProvinceDetailApi = createAsyncThunk(
  'province/getProvinceDetailApi',
  async (id: any, { dispatch }) => {
    const { data } = await ProvinceApi.getDetail(id);
    return data;
  }
);
export const DeleteProvinceApi = createAsyncThunk(
  'province/DeleteProvinceApi',
  async (data: any, { dispatch }) => {
    await ProvinceApi.deleteProvince(data.id);
    await dispatch(getListProvinceApi(data.params));
    SnakeBar.success(i18next.t('deleteSuccess'));
  }
);

const initialState: IProvinceState = {
  provinceList: [],
  provinceCount: 0,
  provinceDetail: {},
};

const slice = createSlice({
  name: 'province',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getListProvinceApi.fulfilled, (state, action) => {
        state.provinceList = action.payload.items;
        state.provinceCount = action.payload.totalRow;
      })
      .addCase(getProvinceDetailApi.fulfilled, (state, action) => {
        state.provinceDetail = action.payload;
      });
  },
});
export default slice.reducer;
