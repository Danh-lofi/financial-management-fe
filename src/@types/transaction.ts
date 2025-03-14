type IParamsGetTransaction = {};

type ITransaction = {
  _id: string;
  id?: string;
  description: string;
  amount: number;
  category: string;
  transactionDate: Date;
  user: string;
  created_at: Date;
  updated_at: Date;
};
export type { IParamsGetTransaction, ITransaction };
