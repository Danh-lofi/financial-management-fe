export type INationality = {
  id?: number | string | any;
  code?: string | number;
  name?: string;
};

export type INationalityForm = {
  nationalityId?: number | string;
  nationalityName?: string;
};
export type INationalityState = {
  nationalityList: INationality[];
  nationalityCount: number;
  nationalityDetail: INationality;
};
