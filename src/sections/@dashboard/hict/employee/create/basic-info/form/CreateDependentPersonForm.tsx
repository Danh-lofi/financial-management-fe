import { identifyList } from 'assets/data/employee-info-vi';
import { isAfter } from 'date-fns';
import moment from 'moment';
import { useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import {
  createEmployeeRelationship,
  getEmployeeTax,
  updateEmployeeRelationship,
} from 'redux/slices/dashboard/employee';
import { dispatch } from 'redux/store';
import { DependentPersonFormSchema } from 'utils/schemas';
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
  TextField,
  useTheme,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { IDependentPerson } from '../../../../../../../@types/employee';
import { useSettingsContext } from '../../../../../../../components/settings';
import UploadFileV2 from '../../../../../../../components/upload/UploadFileV2';
import { backgroundColor } from '../../../../../../../constants/app.constants';
import { Utils } from '../../../../../../../utils/utils';

// interface FormValuesProps extends IDependentPerson {
//   fullName: string;
//   identityCard: string;
//   taxCode: string;
//   relationship: string;
//   typeOfDocument: string;
//   startDate?: any;
//   endDate?: any;
// }

interface Props {
  openCreate: boolean;
  handleClose: () => void;
  relation?: IRelationshipTax | null;
}

const CreateDependentPersonForm = ({ openCreate, handleClose, relation }: Props) => {
  const { t } = useLocales();
  const params = useParams();

  const { themeMode } = useSettingsContext();
  const theme = useTheme();
  const isDark = themeMode === 'dark';

  // state
  const [documentUrl, setDocumentUrl] = useState('');

  const defaultValues: IRelationshipTax = {
    id: 0,
    employee_id: Number(params.id) ?? 0,
    fullName: '',
    identityCard: '',
    taxCode: '',
    relationship: '',
    typeOfDocument: '',
    startDate: new Date(),
    endDate: new Date(),
    dateOfBirth: new Date(),
    document_url: '',
    documentCode: '',
    note: '',
  };

  const methods = useForm({
    resolver: yupResolver(DependentPersonFormSchema),
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

  const onSubmit = async (data: IRelationshipTax) => {
    if (typeof documentUrl === 'string') {
      data.document_url = documentUrl;
    } else {
      data.document_url = await Utils.uploadFile(documentUrl, 'profile');
    }
    const dateOfBirth = moment(data.dateOfBirth).format('YYYY-MM-DD');
    const startDate = moment(data.startDate).format('YYYY-MM-DD');
    const endDate = moment(data.endDate).format('YYYY-MM-DD');
    if (relation) {
      await dispatch(updateEmployeeRelationship({ ...data, dateOfBirth, startDate, endDate }));
    } else {
      await dispatch(createEmployeeRelationship({ ...data, dateOfBirth, startDate, endDate }));
    }
    setDocumentUrl('');
    handleClose();
    reset(defaultValues);
    if (params.id) await dispatch(getEmployeeTax(params.id));
  };

  useEffect(() => {
    if (relation && relation.document_url) {
      setDocumentUrl(relation.document_url);
    }
  }, [relation]);
  // reset
  useEffect(() => {
    if (relation) {
      const {
        fullName,
        identityCard,
        taxCode,
        relationship,
        typeOfDocument,
        startDate,
        endDate,
        employee_id,
        dateOfBirth,
        documentCode,
        document_url,
        id,
        note,
      } = relation;
      reset({
        fullName,
        identityCard,
        taxCode,
        relationship,
        typeOfDocument,
        startDate,
        endDate,
        employee_id,
        dateOfBirth,
        documentCode,
        document_url,
        id,
        note,
      });
    } else {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [relation]);

  return (
    <Dialog fullWidth maxWidth="md" open={openCreate} onClose={handleClose}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle
          sx={{
            backgroundColor: () => {
              return isDark ? theme.palette.mode : backgroundColor.white;
            },
          }}
        >
          {t('addDependentPerson')}
        </DialogTitle>
        <DialogContent>
          <Grid sx={{ pt: 1 }} container spacing={3}>
            <Grid item xs={12} sm={12} md={6}>
              <RHFTextField shrink={false} isRequired name="fullName" label={t('name')} />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <RHFDatePicker name="dateOfBirth" label={t('birthDate')} />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <RHFTextField shrink={false} isRequired name="identityCard" label={t('idCard')} />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <RHFTextField shrink={false} name="taxCode" isRequired label={t('taxId')} />
            </Grid>

            <Grid item xs={12} sm={12} md={6}>
              <RHFDatePicker name="startDate" views={["year","month"]} label={t('timeStartDateRelationship')} />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <RHFDatePicker name="endDate" views={["year","month"]} label={t('timeEndDateRelationship')} />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <RHFTextField
                shrink={false}
                isRequired
                name="documentCode"
                label={t('documentCode')}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <UploadFileV2
                dirName="profile"
                fileNameUpload="documentRegister"
                fileUrl={documentUrl}
                setFileUrl={setDocumentUrl}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <RHFTextField
                shrink={false}
                isRequired
                name="relationship"
                label={t('relationshipWithEmployee')}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <RHFTextField shrink={false} name="note" label={t('note')} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleClose();
              setDocumentUrl('');
            }}
            variant="outlined"
            color="inherit"
          >
            {t('close')}
          </Button>
          <Button type="submit" variant="contained">
            {relation ? t('update') : t('add')}
          </Button>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
};

export default CreateDependentPersonForm;
