import i18next from 'i18next';
import NationalityApi from '@/apis/nationality.api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { INationality, INationalityState } from '../../../@types/nationality';
import SnakeBar from '../../../utils/snackbar';

type ICreateNationality = {
  data: INationality;
  navigate: () => void;
};
// ----------------------------------------------------------------------

export const createNationality = createAsyncThunk(
  'nationality/createNationality',
  async (data: any, { dispatch }) => {
    await NationalityApi.postNationality(data.data);
    SnakeBar.success(i18next.t('createSuccess'));
    data.navigate();
  }
);

export const updateNationality = createAsyncThunk(
  'nationality/updateNationality',
  async (data: ICreateNationality, { dispatch }) => {
    await NationalityApi.update(data.data);
    SnakeBar.success(i18next.t('editSuccess'));
    data.navigate();
  }
);

export const getListNationality = createAsyncThunk(
  'nationality/getListNationality',
  async (params: any, { dispatch }) => {
    const { data } = await NationalityApi.getNationality(params);
    return data;
  }
);

export const getNationalityDetail = createAsyncThunk(
  'nationality/getNationalityDetail',
  async (id: any, { dispatch }) => {
    const { data } = await NationalityApi.getDetail(id);
    return data;
  }
);
export const deleteNationality = createAsyncThunk(
  'nationality/deleteNationality',
  async (data: any, { dispatch }) => {
    await NationalityApi.deleteNationality(data.id);
    await dispatch(getListNationality(data.params));
    SnakeBar.success(i18next.t('deleteSuccess'));
  }
);

const initialState: INationalityState = {
  nationalityList: [],
  nationalityCount: 0,
  nationalityDetail: {},
};

const slice = createSlice({
  name: 'nationality',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getListNationality.fulfilled, (state, action) => {
        state.nationalityList = action.payload.items;
        state.nationalityCount = action.payload.totalRow;
      })
      .addCase(getNationalityDetail.fulfilled, (state, action) => {
        state.nationalityDetail = action.payload;
      });
  },
});
export default slice.reducer;
