import i18next from 'i18next';
import ProjectApi from '@/apis/project.api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IProjectState } from '../../../@types/project';
import SnakeBar from '../../../utils/snackbar';

// ----------------------------------------------------------------------

export const createProject = createAsyncThunk(
  'project/createProject',
  async (data: any, { dispatch }) => {
    await ProjectApi.postProject(data.data);
    SnakeBar.success(i18next.t('createSuccess'));
    data.navigate();
  }
);

export const updateProject = createAsyncThunk(
  'project/updateProject',
  async (data: any, { dispatch }) => {
    await ProjectApi.updateProject(data.data);
    SnakeBar.success(i18next.t('editSuccess'));
    data.navigate();
  }
);

export const getListProject = createAsyncThunk(
  'project/getListProject',
  async (params: any, { dispatch }) => {
    const { data } = await ProjectApi.getProject(params);
    return data;
  }
);

export const getProjectDetail = createAsyncThunk(
  'project/getProjectDetail',
  async (id: any, { dispatch }) => {
    const { data } = await ProjectApi.getDetail(id);
    return data;
  }
);
export const deleteProject = createAsyncThunk(
  'project/deleteProject',
  async (data: any, { dispatch }) => {
    await ProjectApi.deleteProject(data.id);
    await dispatch(getListProject(data.params));
    SnakeBar.success(i18next.t('deleteSuccess'));
  }
);

const initialState: IProjectState = {
  projectList: [],
  projectCount: 0,
  projectDetail: {},
};

const slice = createSlice({
  name: 'project',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getListProject.fulfilled, (state, action) => {
        state.projectList = action.payload.items;
        state.projectCount = action.payload.totalRow;
      })
      .addCase(getProjectDetail.fulfilled, (state, action) => {
        state.projectDetail = action.payload;
      });
  },
});
export default slice.reducer;
