import { Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getPermissionList, getRoleList, putPermission } from 'redux/slices/dashboard/user';
import { dispatch, useSelector } from 'redux/store';
import { RHFMultiSelect } from '@/components/hook-form';
import FormProvider from '@/components/hook-form/FormProvider';
import { PermissionWrapper } from '@/components/permission/PermissionWrapper';
import { useSettingsContext } from '@/components/settings';
import { PermissionAction, PermissionList } from '@/constants/app.constants';
import { useLocales } from '@/locales';
import EditIcon from '@mui/icons-material/Edit';
import {
  Button,
  Card,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Typography,
  useTheme,
} from '@mui/material';
import { resetNav } from '../../../../../redux/slices/nav/navSlice';

// const permissionList = [
//   'bank',
//   'dayOff',
//   'department',
//   'district',
//   'medical',
//   'nation',
//   'position',
//   'project',
//   'province',
//   'ward',
//   'employee',
//   'contact',
//   'bank',
//   'insurance',
//   'insurance-progress',
//   'insurance-history',
//   'tax',
//   'relationship',
//   'profile',
//   'new-contract/details',
//   'salary',
// ];

type Props = {};

const PermissionUser = (props: Props) => {
  const { t } = useLocales();
  // Dialog
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Theme
  const { themeMode } = useSettingsContext();
  const theme = useTheme();
  const isDark = themeMode === 'dark';
  const ERROR_MAIN = theme.palette.error.main;
  const PRIMARY_MAIN = theme.palette.primary.main;
  const BACKGROUND_MAIN = theme.palette.primary;

  //   useSelector
  const { roleList, permissionList } = useSelector((state) => state.user);

  // useState
  const [dataPermission, setDataPermission] = useState([]);

  const [roleData, setRoleData] = useState('');
  const [functionId, setFunctionId] = useState('');
  // Form
  const methods = useForm<any>({
    // resolver: yupResolver(),
    defaultValues: {
      role: [],
    },
  });
  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;
  const onSubmit = async (data: any) => {
    const submitValues = {
      functionId,
      actionId: roleData,
      roleId: data.role.join(',').length > 0 ? data.role.join(',') : null,
    };
    await dispatch(putPermission(submitValues));
    await dispatch(getPermissionList());
    await handleClose();
  };

  useEffect(() => {
    // Tạo mảng object theo FunctionId
    const result = permissionList.reduce((acc: any, item) => {
      const { FunctionId, ActionName, FeatureName, ActionId, RoleId } = item;
      const existingIndex = acc.findIndex((obj: any) => obj.FunctionId === FunctionId);
      if (existingIndex !== -1) {
        // Đã tồn tại FunctionId trong mảng acc, thêm Action vào FunctionId tương ứng
        acc[existingIndex].Actions.push({
          ActionName,
          ActionId,
          RoleId,
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
              RoleId,
            },
          ],
        };
        acc.push(newObject);
      }
      return acc;
    }, []);
    setDataPermission(result);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [permissionList]);

  useEffect(() => {
    dispatch(getPermissionList());
    dispatch(getRoleList());
  }, []);

  const changeColor = (action: string) => {
    switch (action) {
      case PermissionAction.UPDATE:
        return theme.palette.warning.main;
      case PermissionAction.DELETE:
        return theme.palette.error.main;
      case PermissionAction.CREATE:
        return theme.palette.primary.main;
      case PermissionAction.VIEW:
        return theme.palette.info.main;
      default:
        return 'auto';
    }
  };

  return (
    <>
      <Card sx={{ p: 3, mt: 2, backgroundColor: `${BACKGROUND_MAIN}` }}>
        <Grid sx={{ mt: 2 }} container>
          <Grid container sx={{ mb: 4 }} sm={12} lg={12} xl={12}>
            <Grid item sm={4} md={2} xl={4}>
              <Typography variant="overline">{t('groupPermission')}</Typography>
            </Grid>
            <Grid item sm={2} md={2} lg={2} xl={2}>
              <Typography display={{ xs: 'none', lg: 'block' }} variant="overline">
                {t('actionPermission')}
              </Typography>
            </Grid>
            <Grid item sm={6} md={6} lg={6} xl={6}>
              <Typography display={{ xs: 'none', lg: 'block' }} variant="overline">
                {t('role')}
              </Typography>
            </Grid>
          </Grid>
          <Divider />
          {dataPermission?.map((item: any, index: number | string) => {
            return (
              <Grid key={index} spacing={2} container sx={{ mb: 2 }} xl={12}>
                <Grid item xs={12} md={2} xl={4}>
                  {t(item.FeatureName)}
                </Grid>
                <Grid container item xs={12} md={10} xl={8} spacing={2}>
                  {item?.Actions?.map((action: any, indexAction: string | number) => {
                    return (
                      <Fragment key={indexAction}>
                        <Grid item xs={12} md={3} xl={3} style={{ marginBottom: '15px' }}>
                          <Typography sx={{ color: changeColor(action.ActionId) }}>
                            {action.ActionName}
                          </Typography>
                        </Grid>
                        <Grid
                          container
                          spacing={2}
                          xs={12}
                          md={9}
                          xl={9}
                          style={{ marginBottom: '15px' }}
                        >
                          <Grid item xs={11} xl={8}>
                            {action.RoleId?.split(',').map(
                              (role: string, indexRole: number | string) => {
                                const roleName = roleList?.find((roleItem) => {
                                  return roleItem.Id === Number(role);
                                });

                                return (
                                  <Chip
                                    key={indexRole}
                                    sx={{ mr: 2, mb: 1 }}
                                    label={roleName?.Name}
                                    color="primary"
                                    variant="outlined"
                                  />
                                );
                              }
                            )}
                          </Grid>
                          <Grid item xs={1} xl={4}>
                            <PermissionWrapper
                              actionId={PermissionAction.UPDATE}
                              functionId={PermissionList.ASSIGN_ROLE}
                              children={
                                <IconButton
                                  onClick={() => {
                                    setValue('role', action.RoleId?.split(','));
                                    setRoleData(action.ActionId);
                                    setFunctionId(item.FunctionId);
                                    handleClickOpen();
                                  }}
                                  aria-label="edit"
                                  size="small"
                                >
                                  <EditIcon fontSize="small" />
                                </IconButton>
                              }
                            />
                          </Grid>
                        </Grid>
                      </Fragment>
                    );
                  })}
                </Grid>
              </Grid>
            );
          })}
        </Grid>
      </Card>
      <Dialog fullWidth maxWidth="sm" open={open} onClose={handleClose}>
        <FormProvider onSubmit={handleSubmit(onSubmit)} methods={methods}>
          <DialogTitle>{t('editRole')}</DialogTitle>
          <DialogContent>
            <Grid sx={{ pt: 1 }} container spacing={3}>
              <Grid item xs={12} sm={12} md={12}>
                <Typography sx={{ mb: 1 }} variant="overline">
                  {t('role')}
                </Typography>
                <RHFMultiSelect
                  chip
                  size="small"
                  checkbox
                  label=""
                  sx={{ width: '100%' }}
                  name="role"
                  placeholder={t('role')}
                  options={roleList?.map((item: any) => {
                    return {
                      label: item?.Name,
                      value: item?.Id.toString(),
                    };
                  })}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} variant="outlined" color="inherit">
              {t('close')}
            </Button>

            <Button type="submit" variant="contained">
              {t('save')}
            </Button>
          </DialogActions>
        </FormProvider>
      </Dialog>
    </>
  );
};

export default PermissionUser;
