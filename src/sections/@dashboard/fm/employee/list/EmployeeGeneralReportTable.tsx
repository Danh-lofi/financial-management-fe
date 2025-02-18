import { useCallback } from 'react';
import { TableHeadCustom, TableNoData, TablePaginationCustom, useTable } from '@/components/table';
import { useLocales } from '@/locales';
import LoadingComponent from '@/pages/components/Loading';
import { useSelector } from '@/redux/store';
import { Box, Table, TableBody, TableContainer } from '@mui/material';
import Scrollbar from '../../../../../components/scrollbar';
import EmployeeGeneralReportTableRow from './EmployeeGeneralReportTableRow';

interface Props {
  params: any;
  setParams: (value: any) => void;
  filters?: any;
}

const EmployeeGeneralReportTable = ({ setParams, params, filters }: Props) => {
  const { t } = useLocales();

  const { generalReport, generalReportCount } = useSelector((state) => state.employee);

  const TABLE_HEAD = [
    { id: 'fullName', label: t('name'), align: 'left' },
    { id: 'identityCard', label: t('idCard'), align: 'left' },
    { id: 'phoneNumber', label: t('phoneNumber'), align: 'left' },
    { id: 'email', label: t('email'), align: 'left' },
    { id: 'startDate', label: t('startDate'), align: 'left' },
    { id: 'endDate', label: t('endDate'), align: 'left' },
    {
      id: '',
      label: '',
      style: {
        position: 'sticky',
        right: 0,
        zIndex: 8,
      },
    },
  ];
  const { dense, order, orderBy, onSort, onChangeDense } = useTable();

  const onChangePage = useCallback(
    (event: unknown, newPage: number) => {
      setParams({
        ...params,
        pageIndex: newPage + 1,
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [params]
  );

  const onChangeRowsPerPage = useCallback(

    (event: any) => {
      setParams({
        ...params,
        pageSize: event.target.value,
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [params]
  );

  const isNotFound = !generalReport.length;

  return (
    <Box>
      <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
        <Scrollbar>
          {/* {filters} */}
          <Table size={dense ? 'small' : 'medium'}>
            <TableHeadCustom
              order={order}
              orderBy={orderBy}
              headLabel={TABLE_HEAD}
              rowCount={generalReport.length}
              onSort={onSort}
            />
            <LoadingComponent loading={false} />
            <TableBody>
              {generalReport?.map((row: any) => (
                <EmployeeGeneralReportTableRow key={row.provinceId} row={row} />
              ))}
              <TableNoData isNotFound={isNotFound} />
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>

      <TablePaginationCustom
        count={generalReportCount}
        page={params.pageIndex - 1}
        rowsPerPage={params.pageSize}
        onPageChange={onChangePage}
        onRowsPerPageChange={onChangeRowsPerPage}
        dense={dense}
        onChangeDense={onChangeDense}
      />
    </Box>
  );
};

export default EmployeeGeneralReportTable;
