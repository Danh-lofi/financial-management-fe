import { deleteAsync, getAsync, postAsync, putAsync } from './http-client';

const ProjectApi = {
  postProject: (data: any) => {
    return postAsync(`/project`, data);
  },
  updateProject: (data: any) => {
    return putAsync(`/project`, data);
  },
  getProject: (data: any) => {
    return getAsync(`/project`, data);
  },
  getDetail: (id: any) => {
    return getAsync(`/project/${id}`);
  },
  deleteProject: (id: any) => {
    return deleteAsync(`/project/${id}`);
  },
};

export default ProjectApi;
