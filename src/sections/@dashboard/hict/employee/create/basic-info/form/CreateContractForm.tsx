import moment from 'moment';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import { getContractType } from 'redux/slices/dashboard/objectType';
import { dispatch, useSelector } from 'redux/store';
import FormProvider, { RHFDatePicker, RHFSelect, RHFTextField } from '@/components/hook-form';
import { useLocales } from '@/locales';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
} from '@mui/material';
import ConfirmDialog from '../../../../../../../components/confirm-dialog/ConfirmDialog';
import { DURATION_UNLIMITED } from '../../../../../../../constants/app.constants';
import {
  addEmployeeContract,
  deleteDetail,
  getEmployeeContract,
  updateContract,
} from '../../../../../../../redux/slices/dashboard/contract';
import { EmployeeContractForm } from '../../../../../../../utils/schemas';
import SnakeBar from '../../../../../../../utils/snackbar';
import AnnexContract from '../list-contract/AnnexContract';
import CreateAllowanceForm from './CreateAllowanceForm';
import UpdateAllowanceForm from './UpdateAllowanceForm';

interface Props {
  openCreate: boolean;
  projectSelected: number;
  contractSelected?: IContract;
  handleClose: () => void;
  // listTypeContractIdSelected: number[];
}

const CreateContractForm = ({
  openCreate,
  handleClose,
  projectSelected,
  contractSelected,
}: // listTypeContractIdSelected,
Props) => {
  const { t } = useLocales();
  const params = useParams();

  const isEdit = contractSelected && contractSelected.id !== 0;
  // store
  const { contractType } = useSelector((state) => state.objectType);

  // const listContractType = contractType?.filter(
  //   (item) => !listTypeContractIdSelected.includes(Number(item.id))
  // );

  const { employeeDetails } = useSelector((state) => state.employee);
  const { contracts } = useSelector((state) => state.contract);

  // state
  const [openUpdateAllowance, setOpenUpdateAllowance] = useState<boolean>(false);
  const [annex, setAnnex] = useState<IDetailContract[]>([]);
  const [stateAnnexDelete, setStateAnnexDelete] = useState<{
    isOpen: boolean;
    annexId: number | string | null;
  }>({ isOpen: false, annexId: null });
  const [annexSelect, setAnnexSelect] = useState<IDetailContract>();
  const [openCreateAllowance, setOpenCreateAllowance] = useState<boolean>(false);
  //

  const defaultValues: IContractCreated = {
    id: 0,
    contractTypeId: '',
    contractNo: '',
    contract_url: '',
    projectId: 0,
    employeeId: 0,
    customerCode: '',
    startDate: new Date(),
    endDate: new Date(),
    jobStartDate: new Date(),
    jobEndDate: new Date(),
    reason: '',
    name: '',
    note: '',
    details: [],
  };

  const methods = useForm<IContractCreated>({
    resolver: yupResolver(EmployeeContractForm),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    setError,
    handleSubmit,
    clearErrors,
    formState: { isSubmitting, errors },
  } = methods;

  const watchContractType = watch('contractTypeId');

  // handle submit
  const onSubmit = async (data: IContractCreated) => {
    const employeeId = params.id ?? '';
    const jobStartDate = moment(data.jobStartDate).format('YYYY-MM-DD');
    const startDate = moment(data.startDate).format('YYYY-MM-DD');

    const submitData: IContractCreated = {
      ...data,
      employeeId,
      projectId: projectSelected,
      name: employeeDetails.fullName ?? '',
      details: annex ?? [],
      jobStartDate,
      startDate,
      endDate: moment(data.endDate).format('YYYY-MM-DD'),
    };
    if (data.id === 0) {
      await dispatch(addEmployeeContract(submitData));
    } else {
      await dispatch(updateContract(submitData));
    }
    await getContractHandle();
    await handleClose();
    await reset();
  };

  const handleUpdateAllowance = async () => {
    setOpenUpdateAllowance(true);
  };

  // handle open add allowance
  const openAddAllowanceToAnnexHandle = (annexSelected: IDetailContract) => {
    setAnnexSelect(annexSelected);
    setOpenCreateAllowance(true);
  };

  // handle get contract
  const getContractHandle = async () => {
    const employeeId = params.id ?? '';
    const projectId = projectSelected;
    await dispatch(getEmployeeContract({ employeeId, projectId }));
  };

  // handle update annex
  const handleProcessRowUpdate = (updatedRow: IDetailContract, originalRow: IDetailContract) => {
    // Validate
    // if (!updatedRow.name) {
    //   SnakeBar.error(i18next.t('validate.annex.name'));
    //   return originalRow;
    // }
    if (!updatedRow.startDate) {
      SnakeBar.error(t('validate.annex.dateInvalid'));
      return originalRow;
    }
    if (!updatedRow.endDate) {
      SnakeBar.error(t('validate.annex.dateInvalid'));
      return originalRow;
    }
    if (new Date(updatedRow.startDate) > new Date(updatedRow.endDate)) {
      SnakeBar.error(t('validate.annex.date'));
      return originalRow;
    }
    // if (!updatedRow.contractNo) {
    //   SnakeBar.error(i18next.t('validate.annex.contractNo'));
    //   return originalRow;
    // }
    // if (!updatedRow.position) {
    //   SnakeBar.error(i18next.t('validate.annex.position'));
    //   return originalRow;
    // }
    // if (!updatedRow.insuranceRate) {
    //   SnakeBar.error(i18next.t('validate.annex.insuranceRate'));
    //   return originalRow;
    // }
    // if (!updatedRow.basicSalary) {
    //   SnakeBar.error(i18next.t('validate.annex.basicSalary'));
    //   return originalRow;
    // }
    // End validate

    // Find the index of the row that was edited
    const rowIndex = annex.findIndex((row) => row.id === updatedRow.id);
    const updatedRows = [...annex];
    updatedRows[rowIndex] = updatedRow;
    updatedRows[rowIndex].endDate = moment(updatedRow.endDate).format('YYYY-MM-DD');
    updatedRows[rowIndex].startDate = moment(updatedRow.startDate).format('YYYY-MM-DD');
    setAnnex(updatedRows);
    // Return the updated row to update the internal state of the DataGrid
    return updatedRow;
  };

  // handle  add annex
  const handleAddAnnex = () => {
    const newAnnex: IDetailContract = {
      id: 0,
      contract_id: 0,
      employee_id: Number(employeeDetails.g_id),
      name: 'phụ lục 1',
      duration: 0,
      startDate: new Date(),
      endDate: new Date(),
      position: '',
      insuranceRate: 0,
      basicSalary: 0,
      allowance1: 0,
      allowance2: 0,
      allowance3: 0,
      allowance4: 0,
      allowance5: 0,
      note: '',
    };
    setAnnex([...annex, newAnnex]);
  };

  // Confirm Delete annex
  const handleOpenConfirm = (annexId: string | number) => {
    setStateAnnexDelete({ isOpen: true, annexId });
  };

  const handleCloseConfirm = () => {
    setStateAnnexDelete({ isOpen: false, annexId: null });
  };

  // handleDeleteAnnex
  const handleDeleteAnnex = async () => {
    if (stateAnnexDelete.annexId) {
      await dispatch(deleteDetail(stateAnnexDelete.annexId));
    }
    const newAnnex = annex.filter((item) => item.id !== stateAnnexDelete.annexId);
    setAnnex(newAnnex);
    setStateAnnexDelete({ isOpen: false, annexId: null });
    getContractHandle();
  };

  // handle reset when close dialog

  // Get contract type
  useEffect(() => {
    dispatch(getContractType());
  }, []);

  // Get info for update
  useEffect(() => {
    const contractUpdate = contracts.find((item) => item.id === contractSelected?.id);
    if (contractUpdate) {
      const { employee_id, project_id, details } = contractUpdate;
      const employeeId = employee_id ?? '';
      const projectId = project_id ?? '';
      const contractTypeId = contractUpdate.contractType_id;
      reset({ ...contractUpdate, employeeId, projectId, contractTypeId });
      if (details.length > 0) {
        setAnnex(details);
      }
    } else {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contracts]);

  useEffect(() => {
    if (contractSelected) {
      const { employee_id, project_id, details } = contractSelected;
      const employeeId = employee_id ?? '';
      const projectId = project_id ?? '';
      const contractTypeId = contractSelected.contractType_id;
      reset({ ...contractSelected, employeeId, projectId, contractTypeId });
      if (details.length > 0) {
        setAnnex(details);
      }
    } else {
      reset(defaultValues);
      setAnnex([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contractSelected, reset]);

  return (
    <Dialog fullWidth maxWidth="lg" open={openCreate} onClose={handleClose}>
      <FormProvider onSubmit={handleSubmit(onSubmit)} methods={methods}>
        <DialogTitle>{isEdit ? t('editContract') : t('addContract')}</DialogTitle>
        <DialogContent>
          <Grid sx={{ pt: 1 }} container spacing={3}>
            <Grid item xs={12} sm={12} md={6}>
              <RHFSelect
                placeholderColor="#000"
                backgroundColor="#fff"
                inputColor="#000"
                name="contractTypeId"
                placeholder={t('contractType')}
                label={t('contractType')}
                shrink
                isRequired
              >
                {contractType?.map((item, index) => (
                  <MenuItem key={index} value={item.id}>
                    {item.objectName}
                  </MenuItem>
                ))}
              </RHFSelect>
            </Grid>

            <Grid item xs={12} sm={12} md={6}>
              <RHFTextField
                inputColor="#000"
                placeholderColor="#000"
                backgroundColor="#fff"
                name="employeeId"
                label={t('employeeId')}
                value={employeeDetails.g_id}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <RHFTextField
                inputColor="#000"
                placeholderColor="#000"
                backgroundColor="#fff"
                name="contractNo"
                isRequired
                label={t('contractNo')}
                shrink={false}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <RHFTextField
                inputColor="#000"
                placeholderColor="#000"
                backgroundColor="#fff"
                name="contract_url"
                label={t('contract_url')}
                shrink={false}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={12}>
              <RHFTextField
                inputColor="#000"
                placeholderColor="#000"
                backgroundColor="#fff"
                name="name"
                label={t('name')}
                // shrink={false}
                disabled
                value={employeeDetails.fullName}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <RHFDatePicker label={t('jobStartDate')} name="jobStartDate" />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <RHFDatePicker label={t('jobEndDate')} name="jobEndDate" />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <RHFTextField
                inputColor="#000"
                placeholderColor="#000"
                backgroundColor="#fff"
                name="reason"
                label={t('reason')}
                shrink={false}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <RHFDatePicker label={t('startDate')} name="startDate" />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              {watchContractType !== DURATION_UNLIMITED && (
                <RHFDatePicker label={t('endDate')} name="endDate" />
              )}
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <RHFTextField
                inputColor="#000"
                placeholderColor="#000"
                backgroundColor="#fff"
                name="note"
                label={t('note')}
                shrink={false}
              />
            </Grid>
          </Grid>

          <Grid sx={{ pt: 5 }} container spacing={3}>
            <Grid item xs={12} sm={12} md={12}>
              <AnnexContract
                annex={annex}
                onUpdateAllowance={handleUpdateAllowance}
                onOpenAllowance={openAddAllowanceToAnnexHandle}
                onOpenConfirm={handleOpenConfirm}
                onAddItemToAnnex={handleAddAnnex}
                onProcessRowUpdate={handleProcessRowUpdate}
                isUnlimited={watchContractType === DURATION_UNLIMITED}
                isEdit={isEdit ?? false}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined" color="inherit">
            {t('close')}
          </Button>
          <Button type="submit" variant="contained">
            {isEdit ? t('update') : t('add')}
          </Button>
        </DialogActions>
      </FormProvider>

      {/* Allowance */}
      <CreateAllowanceForm
        projectId={projectSelected}
        annex={annexSelect}
        openCreate={openCreateAllowance}
        handleClose={() => setOpenCreateAllowance(false)}
      />

      {/* Update allowance */}
      <UpdateAllowanceForm
        currentContract={Number(contractSelected?.id)}
        openUpdate={openUpdateAllowance}
        handleClose={() => setOpenUpdateAllowance(false)}
      />

      <ConfirmDialog
        open={stateAnnexDelete.isOpen}
        onClose={handleCloseConfirm}
        title={t('delete')}
        content={t('deleteConfirm')}
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDeleteAnnex();
            }}
          >
            {t('delete')}
          </Button>
        }
      />
    </Dialog>
  );
};

export default CreateContractForm;
