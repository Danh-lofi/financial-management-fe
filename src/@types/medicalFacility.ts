export type IMedicalFacilityForm = {
  provinceId?: string | number;
  medicalFacilityId?: string | number;
  medicalFacilityName?: string;
  priority?: string | number;

};

export type IMedicalFacility = {
  id?: number | string;
  province_id?: string | number;
  name?: string;
  code?: string | number;
  priority?: string | number;
};

export type IMedicalFacilityState = {
  medicalFacilityList: IMedicalFacility[];
  medicalFacilityCount: number;
  medicalFacilityDetail: IMedicalFacility;
};
