import i18next from 'i18next';
import UserApi from '@/apis/userList.api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IRefreshToken } from '../../../@types/user';
import { IUserState, PermissionItem } from '../../../@types/userSetting';
import AccountApi from '../../../apis/account.api';
import { LOCAL_STORAGE_KEYS } from '../../../constants/app.constants';
import { LocalUtils } from '../../../utils/local';
import SnakeBar from '../../../utils/snackbar';
import { Utils } from '../../../utils/utils';
import { resetNav } from '../nav/navSlice';

// ----------------------------------------------------------------------

export const getListUser = createAsyncThunk(
  'user/getListUser',
  async (params: IParamsAccount, { dispatch }) => {
    const { data } = await AccountApi.getListAccount(params);
    return data;
  }
);

export const deleteListUser = createAsyncThunk(
  'user/deletListUser',
  async (ids: number[], { dispatch }) => {
    const { data } = await AccountApi.deleteAccount(ids);
    SnakeBar.success(i18next.t('deleteSuccess'));
    return data;
  }
);

export const assignProject = createAsyncThunk(
  'user/assignProject',
  async (data: IAssignProject, { dispatch }) => {
    await AccountApi.assignProject(data);
    SnakeBar.success(i18next.t('updateSuccess'));
  }
);

export const getRoleList = createAsyncThunk('user/getRoleList', async () => {
  const { data } = await UserApi.getRole();
  return data;
});

export const assignRole = createAsyncThunk('user/assignRole', async (data: any, { dispatch }) => {
  await UserApi.postAssignRole(data.employeeId, {
    roles: data.roles,
  });
  SnakeBar.success(i18next.t('updateSuccess'));
});

export const getPermissionList = createAsyncThunk('user/getPermissionList', async () => {
  const { data } = await UserApi.getPermission();
  return data;
});

export const putPermission = createAsyncThunk(
  'user/putPermission',
  async (data: PermissionItem, { dispatch }) => {
    const res = await UserApi.putPermission(data);
    SnakeBar.success(i18next.t('updateSuccess'));
    const accessToken = LocalUtils.get(LOCAL_STORAGE_KEYS.ACCESS_TOKEN) ?? '';
    const refreshToken = LocalUtils.get(LOCAL_STORAGE_KEYS.REFRESH_TOKEN) ?? '';
    await dispatch(refreshTokenAuth({ accessToken, refreshToken }));
    await dispatch(resetNav(null));
    return res.data;
  }
);

export const refreshTokenAuth = createAsyncThunk(
  '/auth/refreshToken',
  async (submitData: IRefreshToken, { dispatch }) => {
    const { data } = await AccountApi.refreshToken(submitData);
    return data;
  }
);

const initialState: IUserState = {
  userList: [],
  userCount: 0,
  roleList: [],
  permissionList: [],
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getListUser.fulfilled, (state, action) => {
        state.userList = action.payload.items;
        state.userCount = action.payload.totalRow;
      })
      .addCase(getRoleList.fulfilled, (state, action) => {
        state.roleList = action.payload;
      })
      .addCase(getPermissionList.fulfilled, (state, action) => {
        // const result = Utils.convertPermissionList(action.payload);
        // console.log("🚀 ~ file: user.ts:85 ~ .addCase ~ result:", result)
        // LocalUtils.set('permissionList', JSON.stringify(result));
        // state.permissionList = result;

        state.permissionList = action.payload;
      })
      .addCase(putPermission.fulfilled, (state, action) => {})
      .addCase(refreshTokenAuth.fulfilled, (state, action) => {
        const { token, RefreshToken, PermissionList } = action.payload;
        LocalUtils.set(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, token);
        // LocalUtils.set(LOCAL_STORAGE_KEYS.REFRESH_TOKEN, RefreshToken);
        const result = Utils.convertPermissionList(PermissionList);
        LocalUtils.set(LOCAL_STORAGE_KEYS.PERMISSION_LIST, JSON.stringify(result));
      });
  },
});
export default slice.reducer;
