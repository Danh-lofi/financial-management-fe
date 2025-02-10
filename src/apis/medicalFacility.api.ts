import { IMedicalFacility } from '../@types/medicalFacility';
import { deleteAsync, getAsync, postAsync, putAsync } from './http-client';

const MedicalFacilityApi = {
  create: (data: any) => {
    return postAsync(`/medicalfacility`, data);
  },
  update: (data: IMedicalFacility) => {
    return putAsync(`/medicalfacility`, data);
  },
  get:(data:any) =>{
    return getAsync(`/medicalfacility`, data);
  },
  getDetail:(id:any) =>{
    return getAsync(`/medicalfacility/${id}`);
  },
  delete:(id:any) =>{
    return deleteAsync(`/medicalfacility/${id}`);
  }
};

export default MedicalFacilityApi;
