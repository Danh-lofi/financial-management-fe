import React from 'react';
import { PermissionAction } from '@/constants/app.constants';
import { Utils } from '@/utils/utils';

type Props = {
  children: React.ReactNode;
  functionId: string;
  actionId: string;
  tabDetail?: any;
};

export const PermissionWrapper = ({ children, functionId, actionId, tabDetail }: Props) => {
  const checkValue = Utils.checkPermission(functionId, actionId);
  
  return <>{checkValue && children}</>;
};


// ----------------------------------------------------------------
export const canPerformAction = (detail: any, functionId: string) => {
  return detail
    ? Utils.checkPermission(functionId, PermissionAction.UPDATE)
    : Utils.checkPermission(functionId, PermissionAction.CREATE);
}
