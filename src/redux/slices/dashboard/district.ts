import i18next from 'i18next';
import DistrictApi from '@/apis/district.api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IDistrictState } from '../../../@types/address';
import SnakeBar from '../../../utils/snackbar';

// ----------------------------------------------------------------------

export const createDistrictApi = createAsyncThunk(
  'district/createDistrict',
  async (data: any, { dispatch }) => {
    await DistrictApi.create(data.data)
    SnakeBar.success(i18next.t('createSuccess'));
    data.navigate();
  }
);

export const updateDistrictApi = createAsyncThunk(
  'district/updateDistrict',
  async (data: any, { dispatch }) => {
    await DistrictApi.update(data.data)
    SnakeBar.success(i18next.t('updateSuccess'));
    data.navigate();
  }
);

export const getListDistrictApi = createAsyncThunk(
  'district/getDistrictList',
  async (params: any, { dispatch }) => {
    const {data} = await DistrictApi.getList(params);

    return data
  }
);
export const getListDistrictTemporaryApi = createAsyncThunk(
  'district/getDistrictTemporaryList',
  async (params: any, { dispatch }) => {
    const {data} = await DistrictApi.getList(params);
     
    return data
  }
);

export const getDistrictDetailApi = createAsyncThunk(
  'district/getDistrictDetailApi',
  async (id: any, { dispatch }) => {
    const {data} = await DistrictApi.getDetail(id);
    return data
  }
);

export const deleteDistrict = createAsyncThunk(
  'distric/deleteDistrict',
  async(data:any,{dispatch}) => {
    await DistrictApi.delete(data.id)
    SnakeBar.success(i18next.t('deleteSuccess'));

    await dispatch(getListDistrictApi(data.params))
  }
)


const initialState: IDistrictState = {
  districtList: [],
  districtCount: 0,
  districtDetail: {},
  districtTemporaryList: []
};

const slice = createSlice({
  name: 'district',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(getListDistrictApi.fulfilled, (state, action) => {
        state.districtList = action.payload.items;
        state.districtCount =  action.payload.totalRow
      })
      .addCase(getListDistrictTemporaryApi.fulfilled, (state, action) => {
        state.districtTemporaryList = action.payload.items;
      })
      .addCase(getDistrictDetailApi.fulfilled, (state, action) => {
        state.districtDetail = action.payload;
      })
  },
});
export default slice.reducer;




