import { useState } from 'react';
import { useParams } from 'react-router';
import { useLocales } from '@/locales';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Grid, Tab } from '@mui/material';
import { PermissionAction, PermissionList } from '../../../../../constants/app.constants';
import { Utils } from '../../../../../utils/utils';
import {
  EmployeeBankInformation,
  EmployeeBasicInfo,
  EmployeeContactInformation,
  EmployeeIncomeTaxInformation,
  EmployeeLaborContract,
  EmployeeProfileInformation,
  EmployeeSignUp,
} from '../create';

// form
// @mui



// utils


// assets






// ----------------------------------------------------------------------

const TAB_VALUES = {
  basic: 'Basic',
  // contact: 'contact',
  banking: 'banking',
  insurance: 'insurance',
  incomeTax: 'incomeTax',
  profile: 'profile',
  activityStatus: 'activityStatus',
  laborContract: 'laborContract',
  employeeSignUp: 'employeeSignUp',
};

const checkIsShowHandle = (permission: string) => {
  return Utils.checkPermission(permission, PermissionAction.VIEW);
};

export default function CreateEmployeeForm() {
  const [tab, setTab] = useState(TAB_VALUES.basic);
  const params = useParams();
  const isEdit = !!params.id;

  const isShowEmployeebank = checkIsShowHandle(PermissionList.EMPLOYEE_BANK);
  const isShowEmployeeInsurance = checkIsShowHandle(PermissionList.EMPLOYEE_INSURANCE);
  const isShowEmployeeProfile = checkIsShowHandle(PermissionList.EMPLOYEE_PROFILE);
  const isShowEmployeeTax = checkIsShowHandle(PermissionList.EMPLOYEE_TAX);
  const isShowLaborContract = checkIsShowHandle(PermissionList.LABOR_CONTRACT_INFORMATION);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  const { t } = useLocales();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TabContext value={tab}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label={t('basic')} value={TAB_VALUES.basic} />
              {/* {isEdit && <Tab label={t('contactInfo')} value={TAB_VALUES.contact} />} */}
              {isShowEmployeebank && isEdit && (
                <Tab label={t('bankingInfo')} value={TAB_VALUES.banking} />
              )}
              {isShowEmployeeInsurance && isEdit && (
                <Tab label={t('insuranceInformation')} value={TAB_VALUES.insurance} />
              )}
              {isShowEmployeeTax && isEdit && (
                <Tab label={t('incomeTaxInformation')} value={TAB_VALUES.incomeTax} />
              )}
              {isShowEmployeeProfile && isEdit && (
                <Tab label={t('profileInformation')} value={TAB_VALUES.profile} />
              )}
              {isShowLaborContract && isEdit && (
                <Tab label={t('laborContractInformation')} value={TAB_VALUES.laborContract} />
              )}
              {isEdit && <Tab label={t('employeeSignUp')} value={TAB_VALUES.employeeSignUp} />}
            </TabList>
          </Box>
          <TabPanel sx={{ px: 0 }} value={TAB_VALUES.basic}>
            <EmployeeBasicInfo />
          </TabPanel>
          {/* <TabPanel sx={{ px: 0 }} value={TAB_VALUES.contact}>
            <EmployeeContactInformation />
          </TabPanel> */}
          <TabPanel sx={{ px: 0 }} value={TAB_VALUES.banking}>
            <EmployeeBankInformation />
          </TabPanel>
          {/* <TabPanel sx={{ px: 0 }} value={TAB_VALUES.insurance}>
            // <EmployeeInsuranceInfo />
          </TabPanel> */}
          <TabPanel sx={{ px: 0 }} value={TAB_VALUES.incomeTax}>
            <EmployeeIncomeTaxInformation />
          </TabPanel>
          <TabPanel sx={{ px: 0 }} value={TAB_VALUES.profile}>
            <EmployeeProfileInformation />
          </TabPanel>
          <TabPanel sx={{ px: 0 }} value={TAB_VALUES.laborContract}>
            <EmployeeLaborContract />
          </TabPanel>
          <TabPanel sx={{ px: 0 }} value={TAB_VALUES.employeeSignUp}>
            <EmployeeSignUp />
          </TabPanel>
        </TabContext>
      </Grid>
    </Grid>
  );
}
