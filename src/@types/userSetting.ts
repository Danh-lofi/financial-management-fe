export type IUser = {
  Id?: number | string;
  EmployeeId?: number;
  UserName?: any;
  Email?: string;
  EmailConfirmed?: boolean;
  PasswordHash?: any;
  PhoneNumber?: any;
  ProjectId?: number;
  Project?: string;
  PhoneNumberConfirmed?: boolean;
  TwoFactorEnabled?: boolean;
  LockoutEndDateUtc?: any;
  LockoutEnabled?: boolean;
  AccessFailedCount?: number;
  Active?: any;
  NormalizedUserName?: any;
  FullName?: any;
  Address?: any;
  NormalizedEmail?: any;
  Avatar?: any;
  Roles?: any;
  projectList: IProjectUser[];
};
export type IRole = {
  Name?: string;
  Id?: string | number;
};

export type PermissionItem = {
  ActionName?: string;
  FeatureName?: string;
  FunctionId?: string;
  ActionId?: string;
  RoleId?: any;
  functionId?: string;
  actionId?: string;
  roleId?: any;
};

export type IUserState = {
  userList: IUser[];
  userCount: number;
  roleList: IRole[];
  permissionList: PermissionItem[];
};

export type IProjectUser = {
  Id: number;
  project_id: number;
  projectName: string;
};
