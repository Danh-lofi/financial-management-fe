import { getAsync } from './http-client';

const url = '/users';
const UserApi = {
  getInfo: () => {
    return getAsync(`${url}/get-info`);
  },
};

export default UserApi;
