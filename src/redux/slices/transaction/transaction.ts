import { IParamsGetTransaction, ITransaction } from '@/@types/transaction';
import CategoryApi from '@/apis/category.api';
import TransactionApi from '@/apis/transaction.api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// eslint-disable-next-line import/no-named-as-default
// ----------------------------------------------------------------------

export const getTransactions = createAsyncThunk(
  'transaction/getTransactions',
  async (params: IParamsGetTransaction, { dispatch }) => {
    const { data } = await TransactionApi.getAll(params);
    return data;
  }
);
type ITransactionState = {
  transactions: ITransaction[];
};
const initialState: ITransactionState = {
  transactions: [],
};

const slice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTransactions.fulfilled, (state, action) => {
      state.transactions = action.payload?.data || [];
    });
  },
});

export default slice.reducer;
