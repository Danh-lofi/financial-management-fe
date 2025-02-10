export type IBanking = {
  id?: string | number;
  code?: string | number;
  name?: string;
  transferType?: string;
  transferTypeName?:String;
};

export type IBankingForm = {
  bankingId?: string | number;
  bankingName?: string;
  transferType?: string;
};

export type IBankingState = {
  bankingList: IBanking[];
  bankingCount: number;
  bankingDetail: IBanking;
};
