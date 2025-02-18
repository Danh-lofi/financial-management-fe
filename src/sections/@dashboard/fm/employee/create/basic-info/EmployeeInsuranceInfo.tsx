// import { yupResolver } from '@hookform/resolvers/yup';
// import AddCircleIcon from '@mui/icons-material/AddCircle';
// import DeleteIcon from '@mui/icons-material/Delete';
// import {
//   Box,
//   Button,
//   Card,
//   CardHeader,
//   Grid,
//   IconButton,
//   MenuItem,
//   Tooltip,
//   Typography,
//   useTheme,
// } from '@mui/material';

// import Paper from '@mui/material/Paper';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import EmployeeApi from '@/apis/employee.api';
// import ConfirmDialog from '@/components/confirm-dialog/ConfirmDialog';
// import {
//   RHFAutocomplete,
//   RHFCheckbox,
//   RHFNumberTextField,
//   RHFRadioGroup,
//   RHFSelect,
//   RHFTextField,
// } from '@/components/hook-form';
// import FormProvider from '@/components/hook-form/FormProvider';
// import { PermissionWrapper, canPerformAction } from '@/components/permission/PermissionWrapper';
// import { useSettingsContext } from '@/components/settings';
// import {
//   DEFAULT_PAGINATION,
//   LABOR_OPTIONS,
//   PermissionAction,
//   PermissionList,
//   SIZE_FIELD,
//   textColor,
// } from '@/constants/app.constants';
// import { useLocales } from '@/locales';
// import moment from 'moment';
// import CreateComponent from '@/pages/components/CreateComponent';
// import { useEffect, useRef, useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { useParams } from 'react-router';
// import {
//   createEmployeeInsurance,
//   deleteInsuranceHistory,
//   deleteInsuranceProgress,
//   getEmployeeInsurance,
//   updateEmployeeInsurance,
// } from '@/redux/slices/dashboard/employee';
// import {
//   getListMedicalFacility,
//   getMedicalFacilityDetail,
// } from '@/redux/slices/dashboard/medicalFacility';
// import { getListPosition } from '@/redux/slices/dashboard/position';
// import { dispatch, useSelector } from '@/redux/store';
// import DataGridBasic from 'sections/_examples/mui/data-grid/DataGridBasic';
// import { EmployeeInsuranceInfoSchema } from '@/utils/schemas';
// import { Utils } from '@/utils/utils';
// import { IEmployeeInsurance } from '../../../../../../@types/employee';
// import { StyledTableCell, StyledTableRow } from '../../../../../../utils/styleTable';
// import CreateInsuranceProgessForm from './form/CreateInsuranceProgessForm';
// import CreateReceiveHistoryForm from './form/CreateReceiveHistoryForm';

// type Props = {};

// const SALARY_RANGE = [
//   { id: '1', name: '1' },
//   { id: '2', name: '2' },
//   { id: '3', name: '3' },
//   { id: '4', name: '4' },
// ];

// function createData(name: string, laborer: string, business: string, total: string) {
//   return { name, laborer, business, total };
// }

// const rows = [
//   createData('%', '10.5%', '21.5%', '32%'),
//   createData('BHXH (%)', '8.0%', '17.5%', ''),
//   createData('BHYT (%)', '1.5%', '3.0%', ''),
//   createData('BHTN (%)', '1.0%', '1.0%', ''),
// ];

// const rowsExternal = [
//   createData('%', '9.5%', '20.5%', '30.0%'),
//   createData('BHXH (%)', '8.0%', '17.5%', ''),
//   createData('BHYT (%)', '1.5%', '3.0%', ''),
//   createData('BHTN (%)', '0.0%', '0.0%', ''),
// ];

// const EmployeeInsuranceInfo = (props: Props) => {
//   const { t } = useLocales();
//   const debounceSearchFacility = useRef<any>(null);

//   // Theme
//   const { themeMode } = useSettingsContext();
//   const theme = useTheme();
//   const isDark = themeMode === 'dark';
//   const ERROR_MAIN = theme.palette.error.main;
//   const PRIMARY_MAIN = theme.palette.primary.main;
//   const BACKGROUND_MAIN = theme.palette.primary;
//   // Selector
//   const { medicalFacilityList } = useSelector((state) => state.medicalFacility);
//   const { employeeInsuranceDetail } = useSelector((state) => state.employee);
//   const { positionList } = useSelector((state) => state.position);
//   const { status } = useSelector((state) => state.objectType);
//   // State
//   const [insuranceId, setInsuranceId] = useState('');
//   const [facilityOptions, setFacilityOptions] = useState({
//     pageIndex: DEFAULT_PAGINATION.PAGE_INDEX,
//     pageSize: DEFAULT_PAGINATION.PAGE_SIZE,
//     keyword: '',
//   });
//   const [row, setRow] = useState(null);
//   const [tableData, setTableData] = useState([]);
//   const [tableDataHistory, setTableDataHistory] = useState([]);
//   const [typeRow, setTypeRow] = useState('');
//   const [openCreate, setOpenCreate] = useState<boolean>(false);
//   const [openCreateReceiveHistory, setOpenCreateReceiveHistory] = useState<boolean>(false);
//   const [openConfirm, setOpenConfirm] = useState(false);
//   // Params
//   const params = useParams();
//   const isEdit = !!params.id;
//   const methods = useForm<IEmployeeInsurance>({
//     resolver: yupResolver(EmployeeInsuranceInfoSchema),
//     defaultValues: {
//       insuranceNumber: '',
//       healthInsuranceCode: '',
//       householdCode: '',
//       salaryRange: '',
//       currentSalary: '',
//       facility_id: '',
//       isAttend: false,
//       sourceOptions: LABOR_OPTIONS[0].value,
//     },
//   });
//   const {
//     reset,
//     watch,
//     control,
//     setValue,
//     handleSubmit,
//     formState: { isSubmitting, errors },
//   } = methods;
//   const valuesAttend = watch('isAttend');
//   const valueFacility = watch('facility_id');
//   const valueSourceOptions = watch('sourceOptions');
//   const isInternal = valueSourceOptions === LABOR_OPTIONS[0].value;
//   const tableRateIC = isInternal ? rows : rowsExternal;

//   const onSubmit = async (data: IEmployeeInsurance) => {
//     const submitData = {
//       ...data,
//       id: insuranceId ?? 0,
//       employee_id: params.id,
//       facility_id: data.facility_id.value,
//       currentSalary: data.isAttend ? 0 : data.currentSalary,
//     };
//     if (insuranceId) {
//       await dispatch(updateEmployeeInsurance(submitData));
//     } else {
//       await dispatch(createEmployeeInsurance(submitData));
//     }
//     getInsurance();
//   };

//   const handleClose = (e: any) => {
//     setOpenCreate(false);
//   };
//   const handleCloseConfirm = () => {
//     setOpenConfirm(false);
//   };
//   const handleOpenConfirm = () => {
//     setOpenConfirm(true);
//   };
//   const handleDeleteRow = async (type: string, item: any) => {
//     if (type === 'progress') {
//       await dispatch(deleteInsuranceProgress(item?.row.id));
//       await getInsurance();
//     }
//     if (type === 'history') {
//       await dispatch(deleteInsuranceHistory(item?.row.id));
//       await getInsurance();
//     }
//   };

//   const columns = [
//     {
//       field: 'fromDate',
//       headerName: t('startDate'),
//       width: 130,
//       renderCell: (record: any) => {
//         return moment(record.row.startDate).format('DD-MM-YYYY');
//       },
//     },
//     {
//       field: 'toDate',
//       headerName: t('endDate'),
//       width: 150,
//       renderCell: (record: any) => {
//         return moment(record.row.endDate).format('DD-MM-YYYY');
//       },
//     },
//     {
//       field: 'position',
//       headerName: t('position'),
//       width: 150,
//       editable: true,
//       valueFormatter: (item: any) => {
//         const positionItem = item.value;
//         const positionValue = positionList.find((position) => {
//           return position.id === Number(positionItem);
//         });
//         if (positionValue) {
//           return positionValue?.name;
//         }
//         return null;
//       },
//     },
//     { field: 'paymentRate', headerName: t('salary'), width: 150, editable: true, type: 'number' },
//     // { field: 'ratio', headerName: t('ratioInsurance'), width: 150, editable: true },
//     {
//       field: 'plan',
//       headerName: t('plan'),
//       width: 120,
//       editable: true,
//       valueFormatter: (item: any) => {
//         const statusItem = item.value;
//         return t(statusItem);
//       },
//     },
//     { field: 'profileNumber', headerName: t('documentNumber'), width: 100, editable: true },
//     { field: 'note', headerName: t('note'), width: 150, editable: true },
//     {
//       field: 'actions',
//       headerName: '',
//       sortable: false,
//       width: 50,
//       renderCell: (record: any) => {
//         return (
//           <PermissionWrapper
//             actionId={PermissionAction.DELETE}
//             functionId={PermissionList.EMPLOYEE_INSURANCE_PROGRESS}
//             children={
//               <Tooltip title={t('delete')}>
//                 <IconButton
//                   size="large"
//                   onClick={() => {
//                     setRow(record);
//                     handleOpenConfirm();
//                     setTypeRow('progress');
//                   }}
//                 >
//                   <DeleteIcon sx={{ color: ERROR_MAIN }} />
//                 </IconButton>
//               </Tooltip>
//             }
//           />
//         );
//       },
//     },
//   ];

//   const columnsHistory = [
//     {
//       field: 'year',
//       headerName: t('year'),
//       width: 130,
//       // renderCell: (record: any) => {
//       //   return moment(record.row.startDate).format('DD-MM-YYYY');
//       // },
//     },
//     {
//       field: 'description',
//       headerName: t('monthTurn'),
//       width: 150,
//     },
//     { field: 'type', headerName: t('modeType'), width: 150, editable: true },
//     { field: 'typeDetail', headerName: t('modeDetail'), width: 150, editable: true },
//     {
//       field: 'fromDate',
//       headerName: t('startDate'),
//       width: 130,
//       renderCell: (record: any) => {
//         return moment(record.row.startDate).format('DD-MM-YYYY');
//       },
//     },
//     {
//       field: 'toDate',
//       headerName: t('endDate'),
//       width: 150,
//       renderCell: (record: any) => {
//         return moment(record.row.endDate).format('DD-MM-YYYY');
//       },
//     },
//     {
//       field: 'total',
//       headerName: t('totalDate'),
//       width: 120,
//       editable: true,
//       valueFormatter: (item: any) => {
//         const statusItem = item.value;
//         return t(statusItem);
//       },
//     },
//     { field: 'accum', headerName: t('accumulatedYTD'), width: 200, editable: true },
//     { field: 'amount', headerName: t('amountReceive'), width: 150, editable: true },
//     { field: 'account', headerName: t('subsidizedAccount'), width: 250, editable: true },

//     {
//       field: 'actions',
//       headerName: '',
//       sortable: false,
//       width: 50,
//       renderCell: (record: any) => {
//         return (
//           <PermissionWrapper
//             actionId={PermissionAction.DELETE}
//             functionId={PermissionList.EMPLOYEE_INSURANCE_HISTORY}
//             children={
//               <Tooltip title={t('delete')}>
//                 <IconButton
//                   size="large"
//                   onClick={() => {
//                     setRow(record);
//                     handleOpenConfirm();
//                     setTypeRow('history');
//                     // handleDeleteProgress(record);
//                   }}
//                 >
//                   <DeleteIcon sx={{ color: ERROR_MAIN }} />
//                 </IconButton>
//               </Tooltip>
//             }
//           />
//         );
//       },
//     },
//   ];

//   const getInsurance = async () => {
//     await dispatch(
//       getListPosition({
//         pageIndex: 1,
//         pageSize: 1000,
//       })
//     );

//     await EmployeeApi.getInsurance({
//       employeeId: params.id,
//     }).then(async (res) => {
//       // call api get medical facility
//       const facilityId = res.data.facility_id
//         ? await dispatch(getMedicalFacilityDetail(res.data.facility_id))
//         : null;
//       reset({
//         ...res.data,
//         facility_id: facilityId
//           ? {
//               label: `${facilityId?.payload?.code} - ${facilityId?.payload?.name}`,
//               value: facilityId?.payload?.id,
//               name: facilityId?.payload?.name,
//             }
//           : '',
//         sourceOptions: LABOR_OPTIONS[0].value,
//       });
//       setInsuranceId(res.data.id);
//       setTableData(res.data.progressList);
//       setTableDataHistory(res.data.historyList);
//     });
//   };
//   useEffect(() => {
//     if (params.id) {
//       dispatch(
//         getEmployeeInsurance({
//           employeeId: params.id,
//         })
//       );
//       getInsurance();
//     }

//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [params.id]);

//   // Get Medical Facility
//   const handleGetFacility = async (options: any) => {
//     await dispatch(getListMedicalFacility(options));
//   };
//   useEffect(() => {
//     handleGetFacility(facilityOptions);
//   }, [facilityOptions]);

//   useEffect(() => {
//     Utils.checkViewPermission(PermissionList.EMPLOYEE_INSURANCE);
//   }, []);

//   return (
//     <>
//       <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
//         <Box>
//           <Card sx={{ p: 3, mt: 4, backgroundColor: `${BACKGROUND_MAIN}` }}>
//             <Grid container spacing={4}>
//               <Grid container spacing={2} item xs={12} sm={12} md={6} lg={6} xl={6}>
//                 <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
//                   <RHFTextField
//                     placeholderColor="#000"
//                     backgroundColor="#fff"
//                     inputColor="#000"
//                     isRequired
//                     name="insuranceNumber"
//                     label={t('socialInsuranceNumber')}
//                     isLabel
//                     size={SIZE_FIELD.SMALL}
//                   />
//                 </Grid>

//                 <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
//                   <RHFTextField
//                     isRequired
//                     placeholderColor="#000"
//                     backgroundColor="#fff"
//                     inputColor="#000"
//                     name="healthInsuranceCode"
//                     label={t('healthInsuranceId')}
//                     isLabel
//                     size={SIZE_FIELD.SMALL}
//                   />
//                 </Grid>

//                 <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
//                   <RHFTextField
//                     placeholderColor="#000"
//                     backgroundColor="#fff"
//                     inputColor="#000"
//                     name="householdCode"
//                     label={t('householdCode')}
//                     isLabel
//                     size={SIZE_FIELD.SMALL}
//                   />
//                 </Grid>
//                 {/* Range Salary */}
//                 <Grid container spacing={2} item xs={12} sm={12} md={12} lg={12} xl={12}>
//                   <Grid
//                     container
//                     alignItems="center"
//                     item
//                     xs={12}
//                     sm={12}
//                     md={12}
//                     lg={12}
//                     xl={12}
//                     spacing={1}
//                   >
//                     <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
//                       <Typography
//                         variant="body1"
//                         sx={{
//                           color: isDark ? textColor.white : textColor.black,
//                           fontSize: '0.9rem',
//                           fontWeight: '500',
//                         }}
//                       >
//                         {t('salaryRange')}
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>
//                       <RHFSelect isRequired name="salaryRange" size={SIZE_FIELD.SMALL}>
//                         {SALARY_RANGE?.map((item, index) => (
//                           <MenuItem key={index} value={item.id}>
//                             {item.name}
//                           </MenuItem>
//                         ))}
//                       </RHFSelect>
//                     </Grid>
//                     {/* <Grid item xs={12} sm={1} md={1} lg={1} xl={1}><></></Grid> */}
//                   </Grid>

//                   <Grid
//                     container
//                     alignItems="center"
//                     item
//                     xs={12}
//                     sm={12}
//                     md={12}
//                     lg={12}
//                     xl={12}
//                     spacing={1}
//                   >
//                     <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
//                       <Typography
//                         variant="body1"
//                         sx={{
//                           color: isDark ? textColor.white : textColor.black,
//                           fontSize: '0.9rem',
//                           fontWeight: '500',
//                         }}
//                       >
//                         {t('currentSalarySIP')}
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>
//                       <RHFNumberTextField
//                         shrink={false}
//                         placeholderColor="#000"
//                         backgroundColor="#fff"
//                         inputColor="#000"
//                         name="currentSalary"
//                         disabled={valuesAttend}
//                         size={SIZE_FIELD.SMALL}
//                       />
//                     </Grid>
//                   </Grid>
//                 </Grid>

//                 {/* End Range Salary */}
//               </Grid>

//               <Grid container item xs={12} sm={12} md={5} lg={5} xl={6}>
//                 <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
//                   <Typography
//                     sx={{
//                       marginBlock: { xs: '0.5rem', sm: '0.5rem', md: '0rem' },
//                       marginTop: { xs: '1.5rem', sm: '1.5rem', md: '0rem' },
//                     }}
//                     variant="subtitle1"
//                   >
//                     {t('titlePlaceOfExamination')}
//                   </Typography>
//                 </Grid>

//                 <Grid
//                   sx={{
//                     marginTop: { xs: '1rem', sm: '1rem', xl: 4 },
//                   }}
//                   container
//                   alignItems="center"
//                   item
//                   xs={12}
//                   sm={12}
//                   md={12}
//                   lg={12}
//                   xl={12}
//                 >
//                   <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
//                     <Typography
//                       variant="body1"
//                       sx={{
//                         color: isDark ? textColor.white : textColor.black,
//                         fontSize: '0.9rem',
//                         fontWeight: '400',
//                       }}
//                     >
//                       {t('idPlaceOfExamination')}
//                     </Typography>
//                   </Grid>
//                   <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
//                     {/* <RHFAutocomplete
//                       placeholder={t('namePlaceOfExamination')}
//                       placeholderColor="#000"
//                       backgroundColor="#fff"
//                       inputColor="#000"
//                       name="facility_id"
//                       shrink={false}
//                       options={medicalFacilityList?.map((item) => {
//                         return {
//                           label: `${item.code} - ${item.name}`,
//                           value: item.id,
//                           name: item.name,
//                         };
//                       })}
//                       isOptionEqualToValue={(option, value) => option?.value === value?.value}
//                       size={SIZE_FIELD.SMALL}
//                     /> */}
//                     <RHFAutocomplete
//                       placeholder={t('namePlaceOfExamination')}
//                       placeholderColor="#000"
//                       backgroundColor="#fff"
//                       inputColor="#000"
//                       onInputChange={(event, newInputValue) => {
//                         if (debounceSearchFacility.current) {
//                           clearTimeout(debounceSearchFacility.current);
//                         }
//                         debounceSearchFacility.current = setTimeout(() => {
//                           setFacilityOptions({
//                             ...facilityOptions,
//                             keyword: newInputValue,
//                           });
//                         }, 1000);
//                       }}
//                       shrink={false}
//                       name="facility_id"
//                       handleScroll={() => {
//                         setFacilityOptions({
//                           ...facilityOptions,
//                           pageSize: (facilityOptions.pageSize += 10),
//                         });
//                       }}
//                       options={medicalFacilityList?.map((item) => {
//                         return {
//                           label: `${item.code} - ${item.name}`,
//                           value: item.id,
//                           name: item.name,
//                         };
//                       })}
//                       isOptionEqualToValue={(option, value) => option?.value === value?.value}
//                       size={SIZE_FIELD.SMALL}
//                     />
//                   </Grid>
//                   <Grid sx={{ mt: 3 }} item xs={12} sm={12} md={12} lg={12} xl={12}>
//                     <RHFTextField
//                       shrink={false}
//                       isLabel
//                       readOnly
//                       value={valueFacility?.name || ''}
//                       label={t('namePlaceOfExamination')}
//                       placeholderColor="#000"
//                       backgroundColor="#fff"
//                       inputColor="#000"
//                       name="facility_code"
//                       size={SIZE_FIELD.SMALL}
//                     />
//                   </Grid>
//                 </Grid>

//                 <Grid item xs={0} sm={12} md={12} lg={12} xl={12}>
//                   <br />
//                 </Grid>
//                 <Grid item xs={0} sm={12} md={12} lg={12} xl={12}>
//                   <br />
//                 </Grid>
//                 <Grid item xs={0} sm={12} md={12} lg={12} xl={12}>
//                   <br />
//                 </Grid>
//                 <Grid item xs={0} sm={12} md={12} lg={12} xl={12}>
//                   <br />
//                 </Grid>
//                 <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
//                   <RHFCheckbox
//                     sx={{ marginLeft: { md: 1 } }}
//                     name="isAttend"
//                     label={t('isAttend')}
//                   />
//                 </Grid>
//               </Grid>
//             </Grid>
//           </Card>
//         </Box>
//         {/* Rate of payment of social insurance */}
//         <Box>
//           <Card sx={{ p: 3, mt: 4, backgroundColor: `${BACKGROUND_MAIN}` }}>
//             <Grid container spacing={3}>
//               <Grid item xs={12} sm={12} md={12}>
//                 <Typography variant="h6">{t('ratePaymentSI')}</Typography>
//               </Grid>
//               <Grid container alignItems="center" item xs={12} sm={12} md={12} lg={12} xl={12}>
//                 <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
//                   <Typography variant="body1">{t('typeLabor')}</Typography>
//                 </Grid>
//                 <Grid item xs={12} sm={12} md={9} lg={9} xl={9}>
//                   <RHFRadioGroup
//                     row
//                     // spacing={4}
//                     name="sourceOptions"
//                     options={LABOR_OPTIONS}
//                   />
//                 </Grid>
//               </Grid>
//               {/* Table Rate IC */}
//               <Grid container item xs={12} sm={12} md={12} lg={12} xl={12}>
//                 <TableContainer component={Paper}>
//                   <Table sx={{ minWidth: 700 }} aria-label="customized table">
//                     <TableHead>
//                       <TableRow>
//                         <StyledTableCell>{t('rate')}</StyledTableCell>
//                         <StyledTableCell align="left">{t('laborer')}</StyledTableCell>
//                         <StyledTableCell align="left">{t('business')}</StyledTableCell>
//                         <StyledTableCell align="left">{t('total')}</StyledTableCell>
//                       </TableRow>
//                     </TableHead>
//                     <TableBody>
//                       {tableRateIC.map((r) => (
//                         <StyledTableRow key={r.name}>
//                           <StyledTableCell component="th" scope="r">
//                             {r.name}
//                           </StyledTableCell>
//                           <StyledTableCell align="left">{r.laborer}</StyledTableCell>
//                           <StyledTableCell align="left">{r.business}</StyledTableCell>
//                           <StyledTableCell align="left">{r.total}</StyledTableCell>
//                         </StyledTableRow>
//                       ))}
//                     </TableBody>
//                   </Table>
//                 </TableContainer>
//               </Grid>
//             </Grid>
//           </Card>
//         </Box>

//         <Card sx={{ p: 3, mt: 4 }}>
//           <Grid container spacing={3}>
//             <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
//               <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                 <CardHeader title={t('progessInsurance')} />
//                 <PermissionWrapper
//                   actionId={PermissionAction.CREATE}
//                   functionId={PermissionList.EMPLOYEE_INSURANCE_PROGRESS}
//                   children={
//                     <Tooltip onClick={() => setOpenCreate(true)} title={t('addProgessInsurance')}>
//                       <IconButton size="large">
//                         <AddCircleIcon sx={{ color: PRIMARY_MAIN }} fontSize="large" />
//                       </IconButton>
//                     </Tooltip>
//                   }
//                 />
//               </Box>
//             </Grid>

//             <PermissionWrapper
//               actionId={PermissionAction.VIEW}
//               functionId={PermissionList.EMPLOYEE_INSURANCE_PROGRESS}
//               children={
//                 <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
//                   <Box sx={{ height: 550 }}>
//                     <DataGridBasic columns={columns} data={tableData} isCheckbox={false} />
//                   </Box>
//                 </Grid>
//               }
//             />
//           </Grid>
//         </Card>

//         {/* Receiving history */}
//         <Card sx={{ p: 3, mt: 4 }}>
//           <Grid container spacing={3}>
//             <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
//               <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                 <CardHeader title={t('receiveHistory')} />

//                 <PermissionWrapper
//                   functionId={PermissionList.EMPLOYEE_INSURANCE_HISTORY}
//                   actionId={PermissionAction.CREATE}
//                   children={
//                     <Tooltip
//                       onClick={() => setOpenCreateReceiveHistory(true)}
//                       title={t('addProgessInsurance')}
//                     >
//                       <IconButton size="large">
//                         <AddCircleIcon sx={{ color: PRIMARY_MAIN }} fontSize="large" />
//                       </IconButton>
//                     </Tooltip>
//                   }
//                 />
//               </Box>
//             </Grid>
//             <PermissionWrapper
//               functionId={PermissionList.EMPLOYEE_INSURANCE_HISTORY}
//               actionId={PermissionAction.VIEW}
//               children={
//                 <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
//                   <Box sx={{ height: 550 }}>
//                     <DataGridBasic
//                       columns={columnsHistory}
//                       data={tableDataHistory}
//                       isCheckbox={false}
//                     />
//                   </Box>
//                 </Grid>
//               }
//             />
//           </Grid>
//         </Card>
//         {canPerformAction(employeeInsuranceDetail, PermissionList.EMPLOYEE_INSURANCE) && (
//           <CreateComponent isEdit={isEdit} isSubmitting={isSubmitting} />
//         )}
//       </FormProvider>
//       <ConfirmDialog
//         open={openConfirm}
//         onClose={handleCloseConfirm}
//         title={t('delete')}
//         content={t('deleteConfirm')}
//         action={
//           <Button
//             variant="contained"
//             color="error"
//             onClick={() => {
//               handleDeleteRow(typeRow, row);
//               setOpenConfirm(false);
//             }}
//           >
//             {t('delete')}
//           </Button>
//         }
//       />
//       <CreateInsuranceProgessForm
//         openCreate={openCreate}
//         handleClose={handleClose}
//         getInsurance={getInsurance}
//       />
//       <CreateReceiveHistoryForm
//         openCreate={openCreateReceiveHistory}
//         handleClose={() => setOpenCreateReceiveHistory(false)}
//         getInsurance={getInsurance}
//       />
//     </>
//   );
// };

// export default EmployeeInsuranceInfo;
