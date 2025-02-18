import { Fragment, useEffect, useMemo } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import EmployeeApi from '@/apis/employee.api';
import { RHFTextField } from '@/components/hook-form';
import FormProvider from '@/components/hook-form/FormProvider';
import { useSettingsContext } from '@/components/settings';
import { backgroundColor } from '@/constants/app.constants';
import { useLocales } from '@/locales';
import CreateComponent from '@/pages/components/CreateComponent';
import { getEmployeeContact } from '@/redux/slices/dashboard/employee';
import { dispatch } from '@/redux/store';
import { EmployeeContactInfoSchema } from '@/utils/schemas';
import { yupResolver } from '@hookform/resolvers/yup';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { Card, Grid, IconButton, Tooltip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SnakeBar from '../../../../../../utils/snackbar';

type Props = {
  editUser?: boolean;
  employeeId?: string | number;
};
type IEmployeeContactInfo = {
  id: number;
  fullName: string;
  phoneNumber: string;
  relationship: string;
  employee_id?: string | number;
};

const EmployeeContactInformation = ({ editUser, employeeId }: Props) => {
  const theme = useTheme();
  const { themeMode, onToggleMode } = useSettingsContext();
  const isDark = themeMode === 'dark';
  const { t } = useLocales();
  const params = useParams();
  const isEdit = params.id || employeeId;
  const PRIMARY_MAIN = theme.palette.primary.main;
  const ERROR_MAIN = theme.palette.error.main;
  const defaultValues: { people: IEmployeeContactInfo[] } = {
    people: [],
  };
  const methods = useForm({
    resolver: yupResolver(EmployeeContactInfoSchema),
    defaultValues,
  });
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'people',
  });

  const onSubmit = async (data: any) => {
    let errorCount = 0;
    data.people.forEach((info: any) => {
      EmployeeApi.createContact(info).catch(() => {
        errorCount += 1;
      });
    });

    if (errorCount === 0) {
      SnakeBar.success(t('updateSuccess'));
    }
  };

  const getContact = async (id: any) => {
    const { payload } = await dispatch(
      getEmployeeContact({
        employeeId: id,
      })
    );
    console.log(payload)
    append(payload);
  };

  const handleAddNewRow = () => {
    append({
      id: 0,
      fullName: '',
      phoneNumber: '',
      relationship: '',
      employee_id: params.id || employeeId,
    });
  };

  useEffect(() => {
    getContact(params.id || employeeId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id, employeeId]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Card sx={{ px: 3, py: 3, backgroundColor:() => {
        return isDark ? theme.palette.mode : backgroundColor.main
      }  }}>
        <Grid container spacing={3}>
          {fields.length > 0 ? (
            fields.map((field, index) => {
              return (
                <Fragment key={index}>
                  <>
                    <Grid item xs={12} sm={12} md={6} lg={5} xl={5}>
                      <RHFTextField
                        placeholderColor="#000"
                        backgroundColor="#fff"
                        inputColor="#000"
                        name={`people[${index}].fullName`}
                        label={t('emergencyContactName')}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={3} lg={4} xl={4}>
                      <RHFTextField
                        placeholderColor="#000"
                        backgroundColor="#fff"
                        inputColor="#000"
                        name={`people[${index}].phoneNumber`}
                        label={t('phoneNumber')}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
                      <RHFTextField
                        placeholderColor="#000"
                        backgroundColor="#fff"
                        inputColor="#000"
                        name={`people[${index}].relationship`}
                        label={t('relationship')}
                      />
                    </Grid>
                  </>

                  <Grid item xs={12} sm={12} md={1} lg={1} xl={1}>
                    {index === fields.length - 1 ? (
                      <Tooltip onClick={handleAddNewRow} title={t('addEmergencyContactMember')}>
                        <IconButton size="large">
                          <AddCircleIcon sx={{ color: PRIMARY_MAIN }} fontSize="large" />
                        </IconButton>
                      </Tooltip>
                    ) : (
                      <Tooltip onClick={() => remove(index-1)} title={t('delete')}>
                        <IconButton size="large">
                          <DeleteIcon sx={{ color: ERROR_MAIN }} fontSize="large" />
                        </IconButton>
                      </Tooltip>
                    )}
                  </Grid>
                </Fragment>
              );
            })
          ) : (
            <Tooltip
              sx={{ mt: 3, ml: 2 }}
              onClick={handleAddNewRow}
              title={t('addEmergencyContactMember')}
            >
              <IconButton size="large">
                <AddCircleIcon sx={{ color: PRIMARY_MAIN }} fontSize="large" />
              </IconButton>
            </Tooltip>
          )}
        </Grid>
      </Card>
      <CreateComponent isEdit isSubmitting={isSubmitting} />
    </FormProvider>
  );
};

export default EmployeeContactInformation;
