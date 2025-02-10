
export type IMedicalFacility = {
  provinceId: string | number;
  medicalFacilityId: string | number;
  medicalFacilityIdProvince: string | number;
  medicalFacilityName: string;
};

export type IProvince = {
  provinceId?: number | string;
  provinceName?: string;
  id?: number | string | any;
  code?: string | number;
  name?: string;
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};




export type IProvinceState = {
  provinceList: IProvince[];
  provinceCount: number;
  provinceDetail: IProvince;
};


export type IDistrict = {
  provinceId?: string | number;
  districtId?: string | number;
  districtName?: string;
  id?: number | string | any;
  code?: string | number;
  name?: string;
  province_id?: number | string | any;
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

export type IDistrictState = {
  districtList: IDistrict[];
  districtCount: number;
  districtDetail: IDistrict;
  districtTemporaryList: IDistrict[];
};

export type IWard = {
  id?: number | string | any;
  code?: string | number;
  name?: string;
  district_Id?: string | number;
  wardId?: string | number;
  wardName?: string;
  provinceId?: string | number;
  districtId?: string | number;
};
export type IWardState = {
  wardList: IWard[];
  wardCount: number;
  wardDetail: IWard;
  wardTemporaryList: IWard[]
};
