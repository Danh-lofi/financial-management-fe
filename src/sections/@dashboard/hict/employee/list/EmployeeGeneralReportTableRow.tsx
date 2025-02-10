import { paramCase } from 'change-case';
import moment from 'moment';
import { useNavigate } from 'react-router';
import { PATH_DASHBOARD } from 'routes/paths';
import { useLocales } from '@/locales';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton, TableCell, TableRow, Tooltip } from '@mui/material';
import { EmployeeForm } from '../../../../../@types/employee';

type Props = {
  row: EmployeeForm;
};

export default function EmployeeGeneralReportTableRow({ row }: Props) {
  const { t } = useLocales();
  const { id, fullName, identityCard, phoneNumber, email, startDate, endDate } = row;

  const navigate = useNavigate();

  return (
    <TableRow>
      <TableCell align="left">{fullName}</TableCell>
      <TableCell align="left">{identityCard}</TableCell>
      <TableCell align="left">{phoneNumber}</TableCell>
      <TableCell align="left">{email}</TableCell>
      <TableCell align="left">{moment(startDate).format('DD-MM-YYYY')}</TableCell>
      <TableCell align="left">{moment(endDate).format('DD-MM-YYYY')}</TableCell>
      <TableCell align="left">
        <Tooltip
          onClick={() =>
            navigate(PATH_DASHBOARD.hict.employeeManagement.editEmployee(paramCase(id.toString())))
          }
          title={t('edit')}
        >
          <IconButton>
            <EditIcon />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
}
