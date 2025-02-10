// import ReactS3Client from 'react-aws-s3-typescript';

import { PermissionAction } from '@/constants/app.constants';
import { PermissionItem } from '../@types/userSetting';
import { LocalUtils } from './local';

export const navigateTo = (route: string) => {
  window.location.href = route;
};

export const Utils = {
  formatVN(str: string) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
    str = str.replace(/Đ/g, 'D');
    str = str.replace(/\s/g, '');
    return str;
  },

  downloadFile(url: string, fileName: string): void {
    const downloadUrl = window.URL.createObjectURL(new Blob([url]));
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
  },

  async uploadFile(file: any, dirName: string, fileNameUpload?: any) {
    const fileName = `${Date.now()}-${Utils.formatVN(file?.name)}-${fileNameUpload}`;

    const config = {
      bucketName: 'techsource-hict',
      dirName: `hict/${dirName}`,
      region: 'ap-southeast-1',
      accessKeyId: 'AKIATHIGM7KOLR3C4BML',
      secretAccessKey: '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',
    };

    // const s3 = new ReactS3Client(config);

    // try {
    //   const res = await s3.uploadFile(file, fileName);
    //   return res.location;
    // } catch (err) {
    //   return null;
    // }
  },
  async deleteFile(url: string, dirName: string, folder: string) {
    const startIndex = url.indexOf(folder);
    const filepath = url.substring(startIndex);
    const config = {
      bucketName: 'techsource-hict',
      dirName: `hict/${dirName}`,
      region: 'ap-southeast-1',
      accessKeyId: 'AKIATHIGM7KOLR3C4BML',
      secretAccessKey: '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',
    };
    const s3 = new ReactS3Client(config);
    try {
      await s3.deleteFile(filepath);
    } catch (exception) {
      console.log(exception);
      /* handle the exception */
    }
  },
  async checkUrl(url: any, dirName: string, name: string) {
    if (typeof url === 'string') {
      return url;
    }
    const file = await Utils.uploadFile(url, dirName, name);
    return file;
  },
  checkPermission(functionId: string, actionCheck: string) {
    const permissionList = LocalUtils.get('permissionList');

    if (permissionList) {
      const listPermission = JSON.parse(permissionList);
    if (!listPermission) return null;
      const findPermission = listPermission.find((item: any) => item.FunctionId === functionId);
      if (findPermission) {
        const findAction = findPermission.Actions.find(
          (action: any) => action.ActionId === actionCheck
        );
        return findAction ? findAction.isPermission : false;
      }
    }

    return null;
  },

  checkViewPermission(functionId: string) {
    const hasPermission = Utils.checkPermission(functionId, PermissionAction.VIEW);
    if (!hasPermission) {
      navigateTo('/dashboard/permission-denied');
    }
  },
  convertPermissionList(permissionList: any) {
    return permissionList.reduce((acc: any, item: any) => {
      const { FunctionId, ActionName, FeatureName, ActionId, isPermission } = item;
      const existingIndex = acc.findIndex((obj: any) => obj.FunctionId === FunctionId);
      if (existingIndex !== -1) {
        // Đã tồn tại FunctionId trong mảng acc, thêm Action vào FunctionId tương ứng
        acc[existingIndex].Actions.push({
          ActionName,
          ActionId,
          isPermission,
        });
      } else {
        // Chưa tồn tại FunctionId trong mảng acc, tạo mới object
        const newObject = {
          FunctionId,
          FeatureName,
          Actions: [
            {
              ActionName,
              ActionId,
              isPermission,
            },
          ],
        };
        acc.push(newObject);
      }
      return acc;
    }, []);
    
  },
};
