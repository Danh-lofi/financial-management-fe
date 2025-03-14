import { useEffect, useState } from 'react';
import { ITransaction } from '@/@types/transaction';
import TransactionApi from '@/apis/transaction.api';
import CustomBreadcrumbs from '@/components/custom-breadcrumbs';
import CustomDataGrid from '@/components/custom-data-grid/CustomDataGrid';
import AutocompleteEditInputCell from '@/components/custom-data-grid/components/AutocompleteEditInputCell';
import DatePickerEditInputCell from '@/components/custom-data-grid/components/DatePickerEditInputCell';
import PageWrapper from '@/components/page-wrapper';
import { useLocales } from '@/locales';
import { getCategories } from '@/redux/slices/category/category';
import { getTransactions } from '@/redux/slices/transaction/transaction';
import { dispatch, useSelector } from '@/redux/store';
import { PATH_DASHBOARD } from '@/routes/paths';
import OrderTableToolbar from '@/sections/@dashboard/fm/transport/list/OrderTableToolbar';
import { formatVND } from '@/utils/formatNumber';
import SnakeBar from '@/utils/snackbar';
import { Box, Card, Container } from '@mui/material';
import { GridColDef, GridValidRowModel } from '@mui/x-data-grid';

export default function TransactionListPage() {
  const { t } = useLocales();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { categories } = useSelector((state) => state.category);
  const { transactions } = useSelector((state) => state.transaction);
  const [rows, setRows] = useState<ITransaction[]>([]);
  const [params, setParams] = useState<any>({});

  const columns: GridColDef[] = [
    {
      field: 'amount',
      headerName: 'Số tiền',
      flex: 1,
      editable: true,
      renderCell: (params) => {
        return formatVND(params?.value || 0);
      },
    },
    {
      field: 'description',
      headerName: 'Mô tả',
      flex: 1,
      editable: true,
    },
    {
      field: 'category',
      headerName: 'Loại chi tiêu',
      flex: 1,
      editable: true,
      renderEditCell: (params) => {
        return (
          <AutocompleteEditInputCell
            params={params}
            options={categories.map((item) => ({ label: item.name, value: item.id || '' }))}
          />
        );
      },
      renderCell: (params) => {
        const category = categories.find((item) => item.id === params?.value);
        return category?.name || '';
      },
    },
    {
      field: 'transactionDate',
      headerName: 'Ngày giao dịch',
      flex: 1,
      type: 'date',
      editable: true,
      renderEditCell: (params) => {
        return <DatePickerEditInputCell params={params} />;
      },
      renderCell: (params) => {
        return new Date(params?.value).toLocaleDateString();
      },
    },
  ];

  const submitDataHandle = async (data: GridValidRowModel[]) => {
    await Promise.all(data.map((item) => TransactionApi.upsert(item as ITransaction)));
    getDataHandle();
    SnakeBar.success('Cập nhật thành công');
  };

  const deleteDataHandle = async (ids: string[]) => {
    await Promise.all(ids.map((id) => TransactionApi.delete(id)));
    getDataHandle();
    SnakeBar.success('Xóa thành công');
  };

  const getDataHandle = async () => {
    setIsLoading(true);
    await getCategoriesHandle();
    await dispatch(getCategories({}));
    setIsLoading(false);
  };

  const getCategoriesHandle = async () => {
    if (!categories.length) await dispatch(getCategories({}));
  };

  useEffect(() => {
    getDataHandle();
  }, []);

  useEffect(() => {
    setRows(transactions);
  }, [transactions]);

  return (
    <PageWrapper title="Danh sách chi tiêu">
      <Container maxWidth={false}>
        <CustomBreadcrumbs
          heading="Danh sách chi tiêu"
          links={[
            { name: t('dashboard'), href: PATH_DASHBOARD.root },
            { name: 'Đơn hàng', href: PATH_DASHBOARD.fm.employeeManagement.employeeStatus },
            { name: 'Danh sách' },
          ]}
        />

        <Box>
          <OrderTableToolbar setParams={setParams} params={params} />
        </Box>
        <Card sx={{ mt: 3 }}>
          <CustomDataGrid
            rows={rows}
            columns={columns}
            setRow={setRows}
            loading={isLoading}
            onSave={submitDataHandle}
            onDeleteRows={deleteDataHandle}
            onReload={getDataHandle}
          />
        </Card>
      </Container>
    </PageWrapper>
  );
}
