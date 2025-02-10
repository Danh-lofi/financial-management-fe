import ObjectType from '@/apis/objecType.api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IObjectState } from '../../../@types/objectType';

// ----------------------------------------------------------------------

export const getStatus = createAsyncThunk('status/getStatus', async (params: any, { dispatch }) => {
  const { data } = await ObjectType.get(params);
  return data;
});

export const getExperienceStatus = createAsyncThunk(
  'status/experienceStatus',
  async (params: any, { dispatch }) => {
    const { data } = await ObjectType.get(params);
    return data;
  }
);

export const getContractType = createAsyncThunk('status/ContractType', async () => {
  const { data } = await ObjectType.get({ objectType: 'contractType' });
  return data;
});

const initialState: IObjectState = {
  status: [],
  experienceStatus: [],
  contractType: [],
};

const slice = createSlice({
  name: 'status',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStatus.fulfilled, (state, action) => {
        state.status = action.payload;
      })
      .addCase(getExperienceStatus.fulfilled, (state, action) => {
        state.experienceStatus = action.payload;
      })
      .addCase(getContractType.fulfilled, (state, action) => {
        state.contractType = action.payload;
      });
  },
});
export default slice.reducer;
