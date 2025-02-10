import i18next from 'i18next';
import MedicalFacilityApi from '@/apis/medicalFacility.api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IMedicalFacility, IMedicalFacilityState } from '../../../@types/medicalFacility';
import SnakeBar from '../../../utils/snackbar';

type ICreateMedicalFacility = {
  data: IMedicalFacility;
  navigate: () => void;
};
// ----------------------------------------------------------------------

export const createMedicalFacility = createAsyncThunk(
  'medicalFacility/createMedicalFacility',
  async (data: any, { dispatch }) => {
    await MedicalFacilityApi.create(data.data);
    SnakeBar.success(i18next.t('editSuccess'));
    data.navigate();
  }
);

export const updateMedicalFacility = createAsyncThunk(
  'medicalFacility/updateMedicalFacility',
  async (data: ICreateMedicalFacility, { dispatch }) => {
    await MedicalFacilityApi.update(data.data);
    SnakeBar.success(i18next.t('editSuccess'));
    data.navigate();
  }
);

export const getListMedicalFacility = createAsyncThunk(
  'medicalFacility/getListMedicalFacility',
  async (params: any, { dispatch }) => {
    const { data } = await MedicalFacilityApi.get(params);
    return data;
  }
);

export const getMedicalFacilityDetail = createAsyncThunk(
  'medicalFacility/getMedicalFacilityDetail',
  async (id: any, { dispatch }) => {
    const { data } = await MedicalFacilityApi.getDetail(id);
    return data;
  }
);
export const deleteMedicalFacility = createAsyncThunk(
  'medicalFacility/deleteMedicalFacility',
  async (data: any, { dispatch }) => {
    await MedicalFacilityApi.delete(data.id);
    await dispatch(getListMedicalFacility(data.params));
    SnakeBar.success(i18next.t('deleteSuccess'));
  }
);

const initialState: IMedicalFacilityState = {
  medicalFacilityList: [],
  medicalFacilityCount: 0,
  medicalFacilityDetail: {},
};

const slice = createSlice({
  name: 'medicalFacility',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getListMedicalFacility.fulfilled, (state, action) => {
        state.medicalFacilityList = action.payload.items;
        state.medicalFacilityCount = action.payload.totalRow;
      })
      .addCase(getMedicalFacilityDetail.fulfilled, (state, action) => {
        state.medicalFacilityDetail = action.payload;
      });
  },
});
export default slice.reducer;
