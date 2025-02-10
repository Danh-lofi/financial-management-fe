import i18next from 'i18next';
import PositionApi from '@/apis/position.api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IPositionState } from '../../../@types/position';
import SnakeBar from '../../../utils/snackbar';

// ----------------------------------------------------------------------

export const createPosition = createAsyncThunk(
  'position/createPosition',
  async (data: any, { dispatch }) => {
    await PositionApi.create(data.data);
    SnakeBar.success(i18next.t('createSuccess'));
    data.navigate();
  }
);

export const updatePosition = createAsyncThunk(
  'position/updatePosition',
  async (data: any, { dispatch }) => {
    await PositionApi.update(data.data);
    SnakeBar.success(i18next.t('editSuccess'));
    data.navigate();
  }
);

export const getListPosition = createAsyncThunk(
  'position/getListPosition',
  async (params: any, { dispatch }) => {
    const { data } = await PositionApi.get(params);
    return data;
  }
);

export const getPositionDetail = createAsyncThunk(
  'position/getPositionDetail',
  async (id: any, { dispatch }) => {
    const { data } = await PositionApi.getDetail(id);
    return data;
  }
);
export const deletePosition = createAsyncThunk(
  'position/deletePosition',
  async (data: any, { dispatch }) => {
    await PositionApi.delete(data.id);
    await dispatch(getListPosition(data.params));
    SnakeBar.success(i18next.t('deleteSuccess'));
  }
);

const initialState: IPositionState = {
  positionList: [],
  positionCount: 0,
  positionDetail: {},
};

const slice = createSlice({
  name: 'position',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getListPosition.fulfilled, (state, action) => {
        state.positionList = action.payload.items;
        state.positionCount = action.payload.totalRow;
      })
      .addCase(getPositionDetail.fulfilled, (state, action) => {
        state.positionDetail = action.payload;
      });
  },
});
export default slice.reducer;
