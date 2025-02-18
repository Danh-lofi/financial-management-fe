import { differenceInDays } from 'date-fns';
import { ChangeEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { RHFSelect, RHFTextField } from '@/components/hook-form';
import FormProvider from '@/components/hook-form/FormProvider';
import Iconify from '@/components/iconify/Iconify';
import { useSettingsContext } from '@/components/settings';
import {
  DURATION_UNLIMITED,
  PermissionAction,
  PermissionList,
  SIZE_FIELD,
  backgroundColor,
} from '@/constants/app.constants';
import { useLocales } from '@/locales';
import {
  addEmployeeContract,
  deleteContract,
  getEmployeeContract,
  selectCurrentContract,
  updateContract,
} from '@/redux/slices/dashboard/contract';
import { dispatch, useSelector } from '@/redux/store';
import { EmployeeLaborContractSchema } from '@/utils/schemas';
import { Utils } from '@/utils/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { AddCircleOutline } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Card,
  Grid,
  IconButton,
  MenuItem,
  Radio,
  Tooltip,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { GridValueFormatterParams } from '@mui/x-data-grid';
import ContractApi from '../../../../../../apis/contract.api';
import ConfirmDialog from '../../../../../../components/confirm-dialog/ConfirmDialog';
import { PermissionWrapper } from '../../../../../../components/permission/PermissionWrapper';
import { fDate } from '../../../../../../utils/formatTime';
import SnakeBar from '../../../../../../utils/snackbar';
import DataGridBasic from '../../../../../_examples/mui/data-grid/DataGridBasic';
import CreateContractForm from './form/CreateContractForm';

const EmployeeLaborContract = () => {
  const { t } = useLocales();
  // Params
  const params = useParams();

  // Theme
  const theme = useTheme();
  const { themeMode } = useSettingsContext();
  const isDark = themeMode === 'dark';
  const ERROR_MAIN = theme.palette.error.main;
  const PRIMARY_MAIN = theme.palette.primary.main;

  // useSelector
  const { contracts, haveContract } = useSelector((state) => state.contract);
  const listTypeContractIdSelected: number[] = [];
  contracts.forEach((contract) => {
    if (contract.contractType_id) {
      listTypeContractIdSelected.push(Number(contract.contractType_id));
    }
  });
  const { projectList } = useSelector((state) => state.project);
  const { employeeDetails } = useSelector((state) => state.employee);
  // useState
  const [projectSelected, setProjectSelected] = useState<number>(0);
  const [isAddDetail, setIsAddDetail] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [openCreateContract, setOpenCreateContract] = useState<boolean>(false);
  const [contractSelected, setContractSelected] = useState<IContract>();
  const [stateContractDelete, setStateContractDelete] = useState<{
    isOpen: boolean;
    contractId?: number | string;
  }>({ isOpen: false, contractId: undefined });
  // Contract ID
  const [selectedContract, setSelectedContract] = useState<any>();
  // Confirm Delete
  const handleOpenConfirm = (contractId: string | number) => {
    setStateContractDelete({ isOpen: true, contractId });
  };

  const handleCloseConfirm = () => {
    setStateContractDelete({ isOpen: false, contractId: undefined });
  };

  // Form
  const methods = useForm<any>({
    resolver: yupResolver(EmployeeLaborContractSchema),
    defaultValues: {
      customerCode: '',
      projectId: '',
      employeeId: '',
    },
  });
  const {
    watch,
    control,
    setValue,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { isSubmitting, errors },
  } = methods;
  const values = watch();

  const onSubmit = async (data: IContractCreated) => {
    const { projectId } = data;
    const employeeId = params.id;
    if (employeeId) {
      const dataSubmit = { ...data, employeeId };
      if (!haveContract) {
        await dispatch(addEmployeeContract(dataSubmit));
      } else {
        await dispatch(updateContract(dataSubmit));
      }
      await dispatch(getEmployeeContract({ employeeId, projectId }));
    }
  };
  // changeEditContractHandle
  const changeEditContractHandle = (contract: IContract) => {
    setContractSelected(contract);
    setOpenCreateContract(true);
  };

  // handle close create contract
  const closeCreateContractHandle = () => {
    setOpenCreateContract(false);
    setContractSelected(undefined);
  };

  // handleDeleteContract
  const handleDeleteContract = async () => {
    if (stateContractDelete.contractId)
      await dispatch(deleteContract(stateContractDelete.contractId));
    setStateContractDelete({ isOpen: false, contractId: undefined });
    const employeeId = params.id;

    if (employeeId)
      await dispatch(getEmployeeContract({ employeeId, projectId: values.projectId }));
  };

  console.log(selectedContract);
  const columnsContract = [
    {
      field: 'radio',
      headerName: '',
      minWidth: 100,
      renderCell: (record: any) => {
        return (
          <Radio
            onChange={() => {
              setSelectedContract(Number(record.row.id));
              dispatch(
                selectCurrentContract({
                  employeeId: record.row.employee_id,
                  contractId: record.row.id,
                })
              );
            }}
            checked={selectedContract === record.row.id}
            value={record.row.id}
          />
        );
      },
    },
    {
      field: 'contractType',
      headerName: t('contractType'),
      minWidth: 150,
      editable: false,
    },
    {
      field: 'duration',
      headerName: t('duration'),
      minWidth: 100,
      editable: false,
      type: 'number',
      valueGetter: (cell: any) => {
        const startDate = cell.getValue(cell.id, 'startDate') as Date;
        const endDate = cell.getValue(cell.id, 'endDate') as Date;

        if (startDate && endDate) {
          // caculate duration
          const duration = differenceInDays(new Date(endDate), new Date(startDate));
          return duration;
        }

        return '';
      },
    },
    {
      field: 'startDate',
      headerName: t('effectiveDate'),
      minWidth: 200,
      editable: false,
      type: 'date',
      valueFormatter: (date: GridValueFormatterParams) => {
        const formattedDate = fDate(date.value as Date, 'dd/MM/yyyy');
        return formattedDate;
      },
    },
    {
      field: 'endDate',
      headerName: t('expirationDate'),
      minWidth: 200,
      editable: false,
      type: 'date',
      valueFormatter: (date: GridValueFormatterParams) => {
        const formattedDate = fDate(date.value as Date, 'dd/MM/yyyy');
        return formattedDate;
      },
    },
    {
      field: 'jobStartDate',
      headerName: t('jobStartDate'),
      minWidth: 200,
      editable: false,
      type: 'date',
      valueFormatter: (date: GridValueFormatterParams) => {
        const formattedDate = fDate(date.value as Date, 'dd/MM/yyyy');
        return formattedDate;
      },
    },
    {
      field: 'jobEndDate',
      headerName: t('jobEndDate'),
      minWidth: 200,
      editable: false,
      // type: 'date',

      valueFormatter: (date: GridValueFormatterParams) => {
        const formattedDate = fDate(date.value as Date, 'dd/MM/yyyy');
        return formattedDate;
      },
    },

    {
      field: 'actions',
      headerName: '',
      sortable: false,
      minWidth: 100,
      renderCell: (record: any) => {
        return (
          <>
            <PermissionWrapper
              functionId={PermissionList.LABOR_CONTRACT_INFORMATION}
              actionId={PermissionAction.DELETE}
              children={
                <Tooltip title={t('deleteContract')}>
                  <IconButton size="large" onClick={() => handleOpenConfirm(record.row.id)}>
                    <DeleteIcon sx={{ color: ERROR_MAIN }} fontSize={SIZE_FIELD.SMALL} />
                  </IconButton>
                </Tooltip>
              }
            />
            <PermissionWrapper
              functionId={PermissionList.LABOR_CONTRACT_INFORMATION}
              actionId={PermissionAction.UPDATE}
              children={
                <Tooltip title={t('editContract')}>
                  <IconButton size="large" onClick={() => changeEditContractHandle(record.row)}>
                    <EditIcon sx={{ color: PRIMARY_MAIN }} fontSize={SIZE_FIELD.SMALL} />
                  </IconButton>
                </Tooltip>
              }
            />
          </>
        );
      },
    },
  ];

  // Get Contract

  const changeProjectHandle = async (e: ChangeEvent<HTMLInputElement>) => {
    const employeeId = params.id ?? '';
    const res = await dispatch(getEmployeeContract({ employeeId, projectId: e.target.value }));
    setProjectSelected(Number(e.target.value));
  };

  const handleDownloadContract = async () => {
    await ContractApi.download({ employeeId: params.id ?? '', projectId: values.projectId });
  };

  const openCreateContractHandle = () => {
    if (!values.projectId) {
      SnakeBar.error(t('validate.selectProject'));
      return;
    }
    setOpenCreateContract(true);
  };

  // useEffect(() => {
  //   reset({projectId: employeeDetails.project_id})
  // },[employeeDetails.project_id,reset])
  useEffect(() => {
    if (contracts.length) {
      const currentContract = contracts?.find((item: any) => {
        return item.isCurrent === true;
      });
      setSelectedContract(Number(currentContract?.id));
    }
  }, [contracts]);
  useEffect(() => {
    Utils.checkViewPermission(PermissionList.LABOR_CONTRACT_INFORMATION);
  }, []);
  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        {/* Create Contract */}
        <Card
          sx={{
            p: 3,
            mb: 3,
            backgroundColor: () => {
              return isDark ? theme.palette.mode : backgroundColor.white;
            },
          }}
        >
          <Grid container spacing={3}>
            <Grid
              container
              alignItems="center"
              spacing={1}
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={12}
            >
              <Grid item xs={12} sm={12} md={12} xl={2}>
                <Typography>
                  {t('idEmployee')}
                  <span className="required">*</span>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} xl={10}>
                <RHFTextField
                  placeholderColor="#000"
                  backgroundColor="#fff"
                  inputColor="#000"
                  name="employeeId"
                  value={employeeDetails.g_id ?? ''}
                  disabled
                  size={SIZE_FIELD.SMALL}
                  // label=""
                />
              </Grid>
            </Grid>

            <Grid
              item
              container
              alignItems="center"
              spacing={1}
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={12}
            >
              <Grid item xs={12} sm={12} md={12} xl={2}>
                <Typography>
                  {t('project')}
                  <span className="required">*</span>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} xl={10}>
                <RHFSelect
                  // disabled
                  name="projectId"
                  placeholder={t('projectId')}
                  size={SIZE_FIELD.SMALL}
                  handleChange={changeProjectHandle}
                >
                  {projectList?.map((item, index) => (
                    <MenuItem key={index} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </RHFSelect>
              </Grid>
              {/* <Grid item xs={12} sm={12} md={12} xl={haveContract ? 0 : 1}>
                {!haveContract && (
                  <Link
                    to={`${PATH_DASHBOARD.fm.setting.createProject}`}
                    style={{ textDecoration: 'none', color: PRIMARY_MAIN }}
                  >
                    <Tooltip title={t('addProject')}>
                      <IconButton size="large">
                        <AddCircleOutline sx={{ color: PRIMARY_MAIN }} />
                      </IconButton>
                    </Tooltip>
                  </Link>
                )}
              </Grid> */}
            </Grid>
            <Grid
              item
              container
              // alignItems="revert"
              justifyContent="flex-end"
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={12}
            >
              <Grid item textAlign="right" xs={12} sm={12} md={12} lg={12} xl={12}>
                <PermissionWrapper
                  functionId={PermissionList.LABOR_CONTRACT_INFORMATION}
                  actionId={PermissionAction.CREATE}
                  children={
                    <LoadingButton
                      loading={loading}
                      onClick={openCreateContractHandle}
                      type="button"
                      variant="contained"
                    >
                      {t('addContract')}
                    </LoadingButton>
                  }
                />
              </Grid>
            </Grid>
          </Grid>
        </Card>
        {/* End Create Contract */}

        {/* Contract */}
        <Card
          sx={{
            p: 3,
            mb: 3,
            backgroundColor: () => {
              return isDark ? theme.palette.mode : backgroundColor.white;
            },
          }}
        >
          <Grid xs={12} sm={12} md={12} lg={12} xl={12}>
            <Typography variant="h6">{t('listContract')}</Typography>
          </Grid>
          <Grid xs={12} sm={12} md={12} lg={12} xl={12}>
            <Box sx={{ height: 400, width: '100%' }}>
              <DataGridBasic
                columns={columnsContract}
                isCheckbox={false}
                data={contracts.length && contracts[0].id ? contracts : []}
              />
            </Box>
          </Grid>
        </Card>
        {/* End Contract */}

        {/* Download Contract  */}
        {/* {haveContract && (
          <Card
            sx={{
              p: 3,
              backgroundColor: () => {
                return isDark ? theme.palette.mode : backgroundColor.white;
              },
            }}
          >
            <Grid
              sx={{ mt: 2, ml: 1, textAlign: 'left' }}
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={12}
            >
              <LoadingButton
                disabled={disabled}
                loading={loading}
                onClick={handleDownloadContract}
                type="button"
                variant="contained"
              >
                <Iconify icon="eva:download-outline" sx={{ mr: 1 }} />
                {t('downloadAllContract')}
              </LoadingButton>
            </Grid>
          </Card>
        )} */}
        {/* End Download Contract */}
      </FormProvider>

      {/* confirm delete contract */}
      <ConfirmDialog
        open={stateContractDelete.isOpen}
        onClose={handleCloseConfirm}
        title={t('delete')}
        content={t('deleteConfirm')}
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDeleteContract();
            }}
          >
            {t('delete')}
          </Button>
        }
      />

      <CreateContractForm
        openCreate={openCreateContract}
        handleClose={closeCreateContractHandle}
        projectSelected={projectSelected}
        contractSelected={contractSelected}
        // listTypeContractIdSelected = {listTypeContractIdSelected}
      />
    </>
  );
};

export default EmployeeLaborContract;
