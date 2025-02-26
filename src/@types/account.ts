type IRegisterAccount = {
  username: string;
  password: string;
  confirmPassword: string;
  name?: string;
  phone?: string;
  email?: string;
};

type IAccount = {
  employeeId: number;
  fullName: string;
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type IAccountUpdateProfile = {
  Email: string;
  Telphone: string;
  UserName: string;
  Address: string;
  BirthDay: Date;
};
type IAccountLogin = {
  username: string;
  password: string;
};

type IAccountChangePassword = {
  password: string;
  newpassword: string;
  renewpassword: string;
};

type IParamsAccount = {
  keyword?: string;
  pageIndex?: number;
  pageSize?: number;
  project_id?: string;
  role_id?: string;
};

type IAssignProject = {
  employeeId: string | number;
  projectId: string | number;
};

export type {
  IRegisterAccount,
  IAccount,
  IAccountUpdateProfile,
  IAccountLogin,
  IAccountChangePassword,
  IParamsAccount,
  IAssignProject,
}
