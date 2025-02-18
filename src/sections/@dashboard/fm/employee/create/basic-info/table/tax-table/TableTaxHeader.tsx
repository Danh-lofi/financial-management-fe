import React from 'react';
import { useLocales } from '@/locales';
import { TableCell, TableHead, TableRow, tableCellClasses } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ColumnTax, DataTaxTable } from '../../../../../../../../@types/table/tax-table';

type Props = {
  columns: ColumnTax[];
};




const TableTaxHeader = ({ columns }: Props) => {
  const { t } = useLocales();
  return (
    <>
      <TableRow>
        {/* {columns.map((column: ColumnTax, index: number) => (
          <TableCell
            colSpan={column.colSpan || 1}
            rowSpan={column.rowSpan || 1}
            key={index}
            align={column?.align || 'left'}
            style={{ top: 57, width: column.width }}
          >
            {column.headerName}
          </TableCell>
        ))} */}
        <TableCell width={50} rowSpan={2}>
          {t('STT')}
        </TableCell>
        <TableCell width={150} rowSpan={2}>
          {t('name')}
        </TableCell>
        <TableCell width={150} rowSpan={2}>
          {t('dateOfBirth')}
        </TableCell>
        <TableCell width={150} rowSpan={2}>
          {t('taxId')}
        </TableCell>
        <TableCell width={150} rowSpan={2}>
          {t('idCard')}
        </TableCell>
        <TableCell width={120} rowSpan={2}>
          {t('relationshipWithEmployee')}
        </TableCell>
        <TableCell
          sx={{ borderBottom: '1px solid grey' }}
          width={200}
          colSpan={2}
          align="center"
        >
          {t('deductionCalculationTime')}
        </TableCell>
        <TableCell width={180} rowSpan={2}>
          {t('numberRegister')}
        </TableCell>
        <TableCell width={180} rowSpan={2}>
          {t('documentRegister')}
        </TableCell>
        <TableCell width={180} rowSpan={2}>
          {t('note')}
        </TableCell>
        <TableCell rowSpan={2} width={50}>
          <br />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell align="center" width={200}>
          {t('startDateRelationship')}
        </TableCell>
        <TableCell align="center" width={200}>
          {t('endDateRelationship')}
        </TableCell>
      </TableRow>
    </>
  );
};

export default TableTaxHeader;
