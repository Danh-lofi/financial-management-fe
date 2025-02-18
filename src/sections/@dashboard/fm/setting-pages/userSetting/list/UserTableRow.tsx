import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { RHFMultiSelect, RHFSelect } from '@/components/hook-form';
import FormProvider from '@/components/hook-form/FormProvider';
import Iconify from '@/components/iconify/Iconify';
import MenuPopover from '@/components/menu-popover/MenuPopover';
import { useSettingsContext } from '@/components/settings';
import { DEFAULT_PAGINATION, backgroundColor } from '@/constants/app.constants';
import { useLocales } from '@/locales';
import { assignProject, assignRole } from '@/redux/slices/dashboard/user';
import { dispatch, useSelector } from '@/redux/store';
import {
  Autocomplete,
  Button,
  Checkbox,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  TableCell,
  TableRow,
  useTheme,
} from '@mui/material';
import { IProjectUser, IUser } from '../../../../../../@types/userSetting';
import ConfirmDialog from '../../../../../../components/confirm-dialog/ConfirmDialog';
import RHFAutocompleteMulti from '../../../../../../components/hook-form/RHFAutocompleteMulti';

// @mui

// @types






// ----------------------------------------------------------------------

type Props = {
  row: IUser;
  selected: boolean;
  onEditRow?: VoidFunction;
  onSelectRow?: VoidFunction;
  onDeleteRow: VoidFunction;
  getUserList?: any;
};

export default function UserTableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
  getUserList,
}: Props) {
  const { t } = useLocales();

  // Theme
  const theme = useTheme();
  const { themeMode } = useSettingsContext();
  const isDark = themeMode === 'dark';

  const { Id, Email, UserName, EmployeeId, Roles, PhoneNumber, Project } = row;
  const projectListState = row.projectList;

  const { userList, userCount, roleList } = useSelector((state) => state.user);
  const { projectList } = useSelector((state) => state.project);

  // state
  const [roleState, setRoleState] = useState([]);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [openUpdateProject, setOpenUpdateProject] = useState(false);
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);
  const [projectId, setProjectId] = useState<string>('');
  //
  const methods = useForm<any>({
    defaultValues: {
      role: [],
      project_id: [],
    },
  });

  const {
    reset,
    watch,
    setError,
    handleSubmit,
    clearErrors,
    setValue,
    formState: { isSubmitting, errors },
  } = methods;

  const listProjectId = watch('project_id');

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleOpenUpdateProject = () => {
    setOpenUpdateProject(true);
  };

  const handleCloseUpdateProject = () => {
    setOpenUpdateProject(false);
  };

  const handleOpenConfirmDelete = () => {
    setOpenConfirmDelete(true);
  };

  const handleCloseConfirmDelete = () => {
    setOpenConfirmDelete(false);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const updateProjectHandle = async () => {
    // convert to list id string
    let listId = '';
    listProjectId?.forEach((item: any) => {
      listId += `${item.value},`;
    });
    listId = listId.slice(0, -1);

    const employeeId = EmployeeId;
    if (!employeeId) return;
    const data = { employeeId, projectId: listId };
    await dispatch(assignProject(data));
    getUserList({
      keyword: '',
      pageIndex: DEFAULT_PAGINATION.PAGE_INDEX,
      pageSize: DEFAULT_PAGINATION.PAGE_SIZE,
    });
  };

  // const handleSelectedProject = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setProjectId(event.target.value);
  // };

  const onSubmit = async (data: any) => {
    const rolesArray = data.role.toString();
    await dispatch(
      assignRole({
        employeeId: EmployeeId,
        roles: rolesArray,
      })
    );
    getUserList({
      keyword: '',
      pageIndex: DEFAULT_PAGINATION.PAGE_INDEX,
      pageSize: DEFAULT_PAGINATION.PAGE_SIZE,
    });
    handleCloseConfirm();
  };

  useEffect(() => {
    setValue('role', roleState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roleState]);

  useEffect(() => {
    if (projectListState && projectListState.length) {
      /*
      convert IProjectUser to ProjectId
      1. filter projectList
        {
          label: `${item.name}`,
          value: item.id,
        }
      2. reset
      */
      //  filter
      let ProjectId = '';
      projectListState.forEach((item) => {
        ProjectId += `${item.project_id},`;
      });
      ProjectId = ProjectId.slice(0, -1);
      const listIdFilter = ProjectId.toString().split(',');
      const list = projectList.filter((item) => {
        return listIdFilter.includes(item.id.toString());
      });
      const resetProjectId = list.map((item) => {
        return {
          label: `${item.name}`,
          value: item.id,
        };
      });

      reset({ project_id: resetProjectId });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectListState, openUpdateProject]);

  return (
    <>
      <TableRow>
        <TableCell
          style={{
            position: 'sticky',
            left: 0,
            backgroundColor: isDark ? theme.palette.mode : backgroundColor.white,
            zIndex: 800,
          }}
          padding="checkbox"
        >
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>
        <TableCell align="left">{EmployeeId}</TableCell>
        <TableCell align="left">{UserName}</TableCell>
        <TableCell align="left">{Email}</TableCell>
        {/* <TableCell align="left">{PhoneNumber}</TableCell> */}
        <TableCell align="left">
          {Roles
            ? Roles?.split(',').map((role: string, indexRole: number | string) => {
                const roleName = roleList?.find((roleItem) => {
                  return roleItem.Id === Number(role);
                });

                return (
                  <Chip
                    key={indexRole}
                    sx={{ mr: 1, mb: 1 }}
                    label={roleName?.Name}
                    color="primary"
                    variant="outlined"
                  />
                );
              })
            : ''}
        </TableCell>
        <TableCell align="left">
          {projectListState
            ? projectListState.map((project: IProjectUser, indexRole: number | string) => {
                return (
                  <Chip
                    key={indexRole}
                    sx={{ mr: 1, mb: 1 }}
                    label={project?.projectName}
                    color="secondary"
                    variant="soft"
                  />
                );
              })
            : ''}
        </TableCell>

        <TableCell
          style={{
            position: 'sticky',
            right: 0,
            backgroundColor: isDark ? theme.palette.mode : backgroundColor.white,
            zIndex: 800,
          }}
          align="right"
        >
          <IconButton color={openPopover ? 'inherit' : 'default'} onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>
      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            setRoleState(Roles?.split(','));
            handleOpenConfirm();
            handleClosePopover();
          }}
          sx={{ color: 'success.main' }}
        >
          {t('role')}
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleOpenUpdateProject();
            handleClosePopover();
          }}
          sx={{ color: 'success.main' }}
        >
          {t('updateProject')}
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleOpenConfirmDelete();
            handleClosePopover();
          }}
          sx={{ color: 'error.main' }}
        >
          {t('delete')}
        </MenuItem>
      </MenuPopover>

      {/* Update Role */}
      <Dialog fullWidth maxWidth="sm" open={openConfirm} onClose={handleCloseConfirm}>
        <FormProvider onSubmit={handleSubmit(onSubmit)} methods={methods}>
          <DialogTitle>{t('role')}</DialogTitle>
          <DialogContent>
            <RHFMultiSelect
              chip
              checkbox
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
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseConfirm} variant="outlined" color="inherit">
              {t('close')}
            </Button>
            <Button type="submit" variant="contained">
              {t('add')}
            </Button>
          </DialogActions>
        </FormProvider>
      </Dialog>

      {/* Update Project */}
      <Dialog fullWidth maxWidth="sm" open={openUpdateProject} onClose={handleCloseUpdateProject}>
        <FormProvider onSubmit={handleSubmit(onSubmit)} methods={methods}>
          <DialogTitle>{t('updateProject')}</DialogTitle>
          <DialogContent>
            <RHFAutocompleteMulti
              multiple
              // size={SIZE_FIELD.SMALL}
              shrink={false}
              placeholderColor="#000"
              backgroundColor="#fff"
              inputColor="#000"
              name="project_id"
              // isLabel
              // size={SIZE_FIELD.SMALL}
              // handleChange={handleSelectedProject}
              getOptionLabel={(option) => (typeof option === 'string' ? '' : option.label)}
              options={projectList.map((item) => {
                return {
                  label: `${item.name}`,
                  value: item.id,
                };
              })}
              isOptionEqualToValue={(option, value) => option?.value === value?.value}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseUpdateProject} variant="outlined" color="inherit">
              {t('close')}
            </Button>
            <Button type="button" variant="contained" onClick={() => updateProjectHandle()}>
              {t('update')}
            </Button>
          </DialogActions>
        </FormProvider>
      </Dialog>

      {/* Confirm Dialog */}
      <ConfirmDialog
        open={openConfirmDelete}
        onClose={handleCloseConfirmDelete}
        title={t('delete')}
        content={t('deleteConfirm')}
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              onDeleteRow();
              handleCloseConfirmDelete();
            }}
          >
            {t('delete')}
          </Button>
        }
      />
    </>
  );
}
