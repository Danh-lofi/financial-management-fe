import { postAsync } from './http-client';

const url = '/transportcenterdriverhost';
const DriverHostApi = {
  getListOrder: (params: IParamsGetDriverHostBookingList) => {
    return postAsync(`${url}/getDriverHostBookingList`, params);
  },
};

export default DriverHostApi;
