import moment from 'moment';
import CreateComponent from 'pages/components/CreateComponent';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import {
  createEmployeeTax,
  deleteRelationship,
  getEmployeeTax,
  updateEmployeeTax,
} from 'redux/slices/dashboard/employee';
import { dispatch, useSelector } from 'redux/store';
import DataGridBasic from 'sections/_examples/mui/data-grid/DataGridBasic';
import { EmployeeIncomeTaxInformationSchema } from 'utils/schemas';
import { Utils } from 'utils/utils';
import EmployeeApi from '@/apis/employee.api';
import ConfirmDialog from '@/components/confirm-dialog/ConfirmDialog';
import FormProvider, { RHFRadioGroup, RHFSelect, RHFTextField } from '@/components/hook-form';
import { canPerformAction } from '@/components/permission/PermissionWrapper';
import { useSettingsContext } from '@/components/settings';
import {
  DEFAULT_PAGINATION,
  PermissionList,
  SIZE_FIELD,
  SOURCE_OPTIONS,
  TAX_OPTIONS,
  backgroundColor,
} from '@/constants/app.constants';
import { useLocales } from '@/locales';
import { yupResolver } from '@hookform/resolvers/yup';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Grid,
  IconButton,
  Link,
  MenuItem,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  Tooltip,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ColumnTax } from '../../../../../../@types/table/tax-table';
import { identifyList } from '../../../../../../assets/data/employee-info-vi';
import Iconify from '../../../../../../components/iconify/Iconify';
import MenuPopover from '../../../../../../components/menu-popover/MenuPopover';
import SnakeBar from '../../../../../../utils/snackbar';
import CreateDependentPersonForm from './form/CreateDependentPersonForm';
import { TableTaxHeader, TableTaxRow } from './table/tax-table';

type IOnCreate = {
  isOpen: boolean;
  relation?: IRelationshipTax | null;
};
const EmployeeIncomeTaxInformation = () => {
  // Params
  const params = useParams();

  // selector
  const { employeeTax } = useSelector((state) => state.employee);
  // theme
  const { t } = useLocales();
  const theme = useTheme();
  const { themeMode } = useSettingsContext();
  const isDark = themeMode === 'dark';
  const ERROR_MAIN = theme.palette.error.main;
  const PRIMARY_MAIN = theme.palette.primary.main;

  // useState
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [row, setRow] = useState<IRelationshipTax | null>(null);
  const [openCreate, setOpenCreate] = useState<IOnCreate>({ isOpen: false, relation: null });

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>, relation: IRelationshipTax) => {
    setOpenPopover(event.currentTarget);
    setRow(relation);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const handleClose = () => {
    setOpenCreate({ isOpen: false, relation: null });
    setRow(null);
  };
  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };
  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };
  const defaultValues: ITax = {
    id: 0,
    employee_id: Number(params.id) ?? 0,
    taxCode: '',
    appliedTax: '',
    typeOfTaxDocument: '',
  };
  const methods = useForm<any>({
    resolver: yupResolver(EmployeeIncomeTaxInformationSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;
  const onSubmit = async (data: ITax) => {
    const submitData = {
      ...data,
      employee_id: params.id,
    };
    if (!employeeTax?.id) {
      await dispatch(createEmployeeTax(submitData));
    } else {
      await dispatch(updateEmployeeTax(submitData));
    }
    if (params.id) await dispatch(getEmployeeTax(params.id));
  };

  const handleDeleteRelationship = async () => {
    if (!row) {
      SnakeBar.error(t('deleteFail'));
      return;
    }
    await dispatch(deleteRelationship(row.id));
    setRow(null);
    getTax();
  };
  // Table

  const columns: ColumnTax[] = [
    { field: 'fullName', headerName: t('name'), width: 180 },
    {
      field: 'dateOfBirth',
      headerName: t('birthDate'),
      width: 150,
      renderCell: (record: any) => {
        return moment(record.row.birthDate).format('DD-MM-YYYY');
      },
    },
    { field: 'taxCode', headerName: t('taxId'), width: 150 },
    { field: 'identityCard', headerName: t('idCard'), width: 200 },
    {
      field: 'relationship',
      headerName: t('relationshipWithEmployee'),
      width: 180,
      editable: true,
    },
    {
      field: 'startDate',
      headerName: t('timeStartDateRelationship'),
      width: 150,
      renderCell: (record: any) => {
        return moment(record.row.startDate).format('MM-YYYY');
      },
    },
    {
      field: 'endDate',
      headerName: t('timeEndDateRelationship'),
      width: 150,
      renderCell: (record: any) => {
        return moment(record.row.endDate).format('MM-YYYY');
      },
    },
    { field: 'documentCode', headerName: t('numberRegister'), width: 200 },

    {
      field: 'document_url',
      headerName: t('documentRelationship'),
      width: 200,
      renderCell: (record: any) => {
        const document_url = record.row.document_url;

        return document_url !== '' ? (
          <Link href={document_url ?? ''} target="_blank" underline="hover">
            {t('documentRegister')}
          </Link>
        ) : (
          <Typography sx={{ fontStyle: 'italic' }}>{t('noUpload')}</Typography>
        );
      },
    },
    { field: 'note', headerName: t('note'), width: 200 },

    {
      field: 'actions',
      headerName: '',
      sortable: false,
      renderCell: (record: any) => {
        return (
          <Box>
            <IconButton
              color={openPopover ? 'inherit' : 'default'}
              onClick={(e) => handleOpenPopover(e, record.row)}
            >
              <Iconify icon="eva:more-vertical-fill" />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  const getTax = async () => {
    if (params.id) await dispatch(getEmployeeTax(params.id));
  };

  const handleOpenEditRelationship = (openRelation: IOnCreate) => {
    setOpenCreate(openRelation);
  };

  // Reset Value
  useEffect(() => {
    if (employeeTax) {
      const { id, taxCode, appliedTax, typeOfTaxDocument } = employeeTax;
      reset({
        id,
        taxCode,
        appliedTax,
        typeOfTaxDocument,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employeeTax]);

  useEffect(() => {
    getTax();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  useEffect(() => {
    Utils.checkViewPermission(PermissionList.EMPLOYEE_TAX);
  }, []);

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Card
          sx={{
            p: 3,
            backgroundColor: () => {
              return isDark ? theme.palette.mode : backgroundColor.white;
            },
          }}
        >
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} sm={12} md={5} lg={4} xl={4}>
              <Typography>
                {t('taxCode')} <span className="required">*</span>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={7} lg={8} xl={8}>
              <RHFTextField
                placeholderColor="#000"
                backgroundColor="#fff"
                inputColor="#000"
                shrink={false}
                size={SIZE_FIELD.SMALL}
                name="taxCode"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={5} lg={4} xl={4}>
              <Typography>
                {t('typeOfDocumentTax')} <span className="required">*</span>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={7} lg={8} xl={8}>
              <RHFSelect
                placeholderColor="#000"
                backgroundColor="#fff"
                shrink={false}
                inputColor="#000"
                size={SIZE_FIELD.SMALL}
                name="typeOfTaxDocument"
                placeholder={t('typeOfDocumentTax')}
              >
                {identifyList?.map((item, index) => (
                  <MenuItem key={index} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </RHFSelect>
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6} xl={12}>
              <Typography>Thuế suất áp dụng</Typography>
              <RHFRadioGroup
                // onChange={handleChangeSourceOptions}
                row
                spacing={4}
                name="appliedTax"
                options={TAX_OPTIONS}
              />
            </Grid>
          </Grid>
          <Card sx={{ mt: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <CardHeader title={t('dependentPerson')} sx={{ mb: 2 }} />
              <Tooltip
                onClick={() => setOpenCreate({ isOpen: true, relation: null })}
                title={t('addRelationshipWithEmployee')}
              >
                <IconButton size="large">
                  <AddCircleIcon sx={{ color: PRIMARY_MAIN }} fontSize="large" />
                </IconButton>
              </Tooltip>
            </Box>

            <Box sx={{ height: 550 }}>
              <DataGridBasic
                isCheckbox={false}
                columns={columns}
                data={employeeTax?.relationships ?? []}
              />
            </Box>
          </Card>
        </Card>
        {canPerformAction(employeeTax, PermissionList.EMPLOYEE_TAX) && (
        <CreateComponent  isSubmitting={isSubmitting} />
      )}
      </FormProvider>
      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title={t('delete')}
        content={t('deleteConfirm')}
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDeleteRelationship();
              setOpenConfirm(false);
            }}
          >
            {t('delete')}
          </Button>
        }
      />
      <CreateDependentPersonForm
        openCreate={openCreate.isOpen}
        relation={openCreate.relation}
        handleClose={handleClose}
      />

      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            handleOpenConfirm();
            handleClosePopover();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="eva:trash-2-outline" />
          {t('delete')}
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleOpenEditRelationship({ isOpen: true, relation: row });
            handleClosePopover();
          }}
        >
          <Iconify icon="eva:edit-fill" />
          {t('edit')}
        </MenuItem>
      </MenuPopover>
    </>
  );
};

export default EmployeeIncomeTaxInformation;
