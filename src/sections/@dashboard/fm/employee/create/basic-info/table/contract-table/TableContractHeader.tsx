import React from 'react';
import { TableHeadCustom, useTable } from '@/components/table';
import i18n from '@/locales/i18n';
import { TableRow } from '@mui/material';

const TABLE_HEAD = [
  {
    id: '',
    style: {
      position: 'sticky',

      right: 0,
    },
  },
  { id: 'contractType', label: i18n.t<string>('contractType'), align: 'left', minWidth: '150px' },
  { id: 'appendix', label: i18n.t<string>('appendix'), align: 'left', minWidth: '150px' },
  { id: 'duration', label: i18n.t<string>('duration'), align: 'left', minWidth: '150px' },
  { id: 'startDate', label: i18n.t<string>('effectiveDate'), align: 'left', minWidth: '150px' },
  { id: 'endDate', label: i18n.t<string>('expirationDate'), align: 'left', minWidth: '150px' },
  {
    id: 'contractNumber',
    label: i18n.t<string>('contractNumber'),
    align: 'left',
    minWidth: '150px',
  },
  { id: 'position', label: i18n.t<string>('jobPosition'), align: 'left', minWidth: '150px' },
  { id: 'insurance', label: i18n.t<string>('insurancePremium'), align: 'left', minWidth: '150px' },
  { id: 'salary', label: i18n.t<string>('basicSalary'), align: 'left', minWidth: '150px' },
  { id: 'PC1', label: i18n.t<string>('PC1'), align: 'left', minWidth: '150px' },
  { id: 'PC2', label: i18n.t<string>('PC2'), align: 'left', minWidth: '150px' },
  { id: 'PC3', label: i18n.t<string>('PC3'), align: 'left', minWidth: '150px' },
  { id: 'PC4', label: i18n.t<string>('PC4'), align: 'left', minWidth: '150px' },
  { id: 'PC5', label: i18n.t<string>('PC5'), align: 'left', minWidth: '150px' },
  { id: 'total', label: i18n.t<string>('total'), align: 'left', minWidth: '150px' },
  { id: 'note', label: i18n.t<string>('note'), align: 'left', minWidth: '150px' },
  {
    id: '',
    style: {
      position: 'sticky',

      right: 0,
    },
  },
];

type Props = {};

const TableContractHeader = (props: Props) => {
  const {
    dense,
    order,
    onSort,
    orderBy,
    setPage,
    selected,
    onSelectRow,
    onSelectAllRows,
    onChangeDense,
    setSelected,
  } = useTable();
  return (
    <TableHeadCustom
      order={order}
      orderBy={orderBy}
      headLabel={TABLE_HEAD}
      //    rowCount={employeeList.length}
      numSelected={selected.length}
      onSort={onSort}
      //    onSelectAllRows={(checked) =>
      //      onSelectAllRows(
      //        checked,
      //        employeeList.map((row) => row.id)
      //      )
      //    }
    />
  );
};

export default TableContractHeader;
