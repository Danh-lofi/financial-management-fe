export type INotice = {
  id?: number;
  type?: string;
  message?: any;
  fullName?: any;
  avatar_url?: string;
  employee_id?: number;
  isViewed?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

export type INoticeDetails = {
  id?: number | string;
  employeeId?: number | string;
  changedData?: any;
  type?: string;
  fullName?: string;
  avatar_url?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type INoticeState = {
  totalNotSeen: number;
  noticeList?: INotice[];
  noticeListFull?: INotice[];
  noticeDetails?: INoticeDetails;
  noticeListCount: number;
  employeeId?: string | number;
  noticeDetailsCount: number;
};
