type IRegisterAccount = {
  userGroupCode: string;
  userId: string;
  passWord: string;
  confirmPassword: string;
  userName: string;
  address: string;
  userNumber: string;
  telphone: string;
  email: string;
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
