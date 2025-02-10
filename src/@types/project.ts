export type IProject = {
    projectId?: number | string;
    projectName?: string;
    id?: number | string | any;
    code?: string | number;
    name?: string;
    createdAt?: Date;
    updatedAt?: Date;
  };
  export type IProjectState = {
    projectList: IProject[];
    projectCount: number;
    projectDetail: IProject;
  };
