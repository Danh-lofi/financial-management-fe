import { t } from 'i18next';
import { useEffect, useState } from 'react';
import { Utils } from 'utils/utils';
import { PermissionAction, PermissionList } from '@/constants/app.constants';
import { Grid } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { StyledDotIcon, StyledIcon } from '../../../../../components/nav-section/vertical/styles';
import useWindowSize from '../../../../../hooks/useWindowSize';
import { useSelector } from '../../../../../redux/store';
import {
  EmployeeBankInformation,
  EmployeeBasicInfo,
  EmployeeContactInformation,
  EmployeeIncomeTaxInformation,
  EmployeeLaborContract,
  EmployeeProfileInformation,
  EmployeeSignUp,
} from '../create';

// const TAB_VALUES = [
//   {
//     name: 'basic',
//     component: <EmployeeBasicInfo />,
//     view: true,
//   },
//   {
//     name: 'banking',
//     component: <EmployeeBankInformation />,
//     view: Utils.checkPermission(PermissionList.EMPLOYEE_BANK, PermissionAction.VIEW),
//   },
//   {
//     name: 'insurance',
//     component: <EmployeeInsuranceInfo />,
//     view: Utils.checkPermission(PermissionList.EMPLOYEE_INSURANCE, PermissionAction.VIEW),
//   },
//   {
//     name: 'incomeTax',
//     component: <EmployeeIncomeTaxInformation />,
//     view: Utils.checkPermission(PermissionList.EMPLOYEE_TAX, PermissionAction.VIEW),
//   },
//   {
//     name: 'profile',
//     component: <EmployeeProfileInformation />,
//     view: Utils.checkPermission(PermissionList.EMPLOYEE_PROFILE, PermissionAction.VIEW),
//   },
//   {
//     name: 'laborContractInformation',
//     component: <EmployeeLaborContract />,
//     view: Utils.checkPermission(PermissionList.LABOR_CONTRACT_INFORMATION, PermissionAction.VIEW),
//   },
//   {
//     name: 'employeeSignUp',
//     component: <EmployeeSignUp />,
//     view: true,
//   },
// ];

const resetTab = () => {
  return [
    {
      name: 'basic',
      component: <EmployeeBasicInfo />,
      view: true,
    },
    {
      name: 'banking',
      component: <EmployeeBankInformation />,
      view: Utils.checkPermission(PermissionList.EMPLOYEE_BANK, PermissionAction.VIEW),
    },
    // {
    //   name: 'insurance',
    //   component: <EmployeeInsuranceInfo />,
    //   view: Utils.checkPermission(PermissionList.EMPLOYEE_INSURANCE, PermissionAction.VIEW),
    // },
    {
      name: 'incomeTax',
      component: <EmployeeIncomeTaxInformation />,
      view: Utils.checkPermission(PermissionList.EMPLOYEE_TAX, PermissionAction.VIEW),
    },
    {
      name: 'profile',
      component: <EmployeeProfileInformation />,
      view: Utils.checkPermission(PermissionList.EMPLOYEE_PROFILE, PermissionAction.VIEW),
    },
    {
      name: 'laborContractInformation',
      component: <EmployeeLaborContract />,
      view: Utils.checkPermission(PermissionList.LABOR_CONTRACT_INFORMATION, PermissionAction.VIEW),
    },
    {
      name: 'employeeSignUp',
      component: <EmployeeSignUp />,
      view: true,
    },
  ];
};

export default function CreateEmployeeFormVertical() {
  const TAB_VALUES = [
    {
      name: 'basic',
      component: <EmployeeBasicInfo />,
      view: true,
    },
    {
      name: 'banking',
      component: <EmployeeBankInformation />,
      view: Utils.checkPermission(PermissionList.EMPLOYEE_BANK, PermissionAction.VIEW),
    },
    // {
    //   name: 'insurance',
    //   component: <EmployeeInsuranceInfo />,
    //   view: Utils.checkPermission(PermissionList.EMPLOYEE_INSURANCE, PermissionAction.VIEW),
    // },
    {
      name: 'incomeTax',
      component: <EmployeeIncomeTaxInformation />,
      view: Utils.checkPermission(PermissionList.EMPLOYEE_TAX, PermissionAction.VIEW),
    },
    {
      name: 'profile',
      component: <EmployeeProfileInformation />,
      view: Utils.checkPermission(PermissionList.EMPLOYEE_PROFILE, PermissionAction.VIEW),
    },
    {
      name: 'laborContractInformation',
      component: <EmployeeLaborContract />,
      view: Utils.checkPermission(PermissionList.LABOR_CONTRACT_INFORMATION, PermissionAction.VIEW),
    },
    {
      name: 'employeeSignUp',
      component: <EmployeeSignUp />,
      view: true,
    },
  ];

  const [tab, setTab] = useState(TAB_VALUES[0].name);
  const { width } = useWindowSize();
  const xxl = width && width >= 1920;

  return (
    <Grid container spacing={2}>
      <Grid
        item
        xl={3}
        lg={3}
        md={3}
        xs={0}
        sx={{
          width: '100%',
          borderRadius: 2,
          maxWidth: 360,
          bgcolor: 'background.paper',
          paddingRight: 1,
          flexBasis: `${xxl && 20}% !important`,
        }}
      >
        <nav aria-label="secondary mailbox folders" className="nav-sticky">
          <List>
            {TAB_VALUES.filter((tabFilter: any) => {
              return tabFilter.view === true;
            }).map((item) => (
              <ListItem
                sx={{
                  marginBottom: 2,
                }}
                disablePadding
                onClick={() => setTab(item.name)}
              >
                <ListItemButton>
                  <StyledIcon>
                    <StyledDotIcon active={item.name === tab} />
                  </StyledIcon>

                  <ListItemText
                    primaryTypographyProps={{
                      style: {
                        fontWeight: `${item.name === tab ? '600' : 'normal'}`,
                      },
                    }}
                    primary={t(item.name)}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </nav>
      </Grid>
      <Grid
        item
        xs={12}
        md={9}
        lg={9}
        xl={9}
        sx={{
          flexBasis: `${xxl && 80}% !important`,
          maxWidth: `${xxl && 80}% !important`,
        }}
      >
        {TAB_VALUES.map((item) => {
          return item.name === tab ? <>{item.component}</> : <></>;
        })}
      </Grid>
    </Grid>
  );
}
