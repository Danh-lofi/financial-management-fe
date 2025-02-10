import { deleteAsync, getAsync, postAsync,putAsync } from './http-client';


const NoticeApi = {
 getList: (params:any) => {
    return getAsync('/notifications',params)
 },
 put: (id:any) => {
   return putAsync(`/notifications/mark-viewed?id=${id}`)
  },
  getHistories: (params:any) => {
   return getAsync('/notifications/histories',params)

  }
}

export default NoticeApi;