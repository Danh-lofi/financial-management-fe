// library

import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ICategory } from '@/@types/category';
import CategoryApi from '@/apis/category.api';
import CustomBreadcrumbs from '@/components/custom-breadcrumbs';
import CustomDataGrid from '@/components/custom-data-grid/CustomDataGrid';
import PageWrapper from '@/components/page-wrapper';
import { useLocales } from '@/locales';
import { getCategories } from '@/redux/slices/category/category';
import { dispatch, useSelector } from '@/redux/store';
import { PATH_DASHBOARD } from '@/routes/paths';
import SnakeBar from '@/utils/snackbar';
import { Card, Container } from '@mui/material';
import { GridColDef, GridValidRowModel } from '@mui/x-data-grid';

// alias path local

type IFormValue = {
  TruckNo: string;
  TruckRegisterNo: string;
};

const CategoryPage = () => {
  const { t } = useLocales();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { categories } = useSelector((state) => state.category);
  const [rows, setRows] = useState<ICategory[]>([]);
  const tableRef = useRef<any>(null);

  const methods = useForm<IFormValue>({
    defaultValues: {},
  });
  const { handleSubmit } = methods;

  const handleFilter = async (data: IFormValue) => {};

  const handleCheckSelect = (rowSelected: Set<number>) => {
    console.log('🚀 ~ handleCheckSelect ~ rowSelected:', rowSelected);
  };

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Tên loại chi tiêu', editable: true, flex: 1 },
    {
      field: 'description',
      headerName: 'Mô tả',
      flex: 1,
      editable: true,
    },
  ];

  const submitDataHandle = async (data: GridValidRowModel[]) => {
    await Promise.all(data.map((item) => CategoryApi.upsert(item as ICategory)));
    getCategoriesHandle();
    SnakeBar.success('Cập nhật thành công');
  };

  const deleteDataHandle = async (ids: string[]) => {
    await Promise.all(ids.map((id) => CategoryApi.delete(id)));
    getCategoriesHandle();
    SnakeBar.success('Xóa thành công');
  }

  const getCategoriesHandle = async () => {
    setIsLoading(true);
    await dispatch(getCategories({}));
    setIsLoading(false);
  };

  useEffect(() => {
    getCategoriesHandle();
  }, []);

  useEffect(() => {
    if (categories.length > 0) {
      setRows(categories);
    }
  }, [categories]);

  return (
    <PageWrapper title="Loại chi tiêu">
      <Container maxWidth={false}>
        <CustomBreadcrumbs
          heading="Loại chi tiêu"
          links={[
            { name: t('dashboard'), href: PATH_DASHBOARD.root },
            { name: t('category') },
            { name: 'Loại chi tiêu' },
          ]}
        />
        <Card sx={{ mt: 3 }}>
          <CustomDataGrid
            rows={rows}
            columns={columns}
            setRow={setRows}
            loading={isLoading}
            onSave={submitDataHandle}
            onDeleteRows={deleteDataHandle}
            onReload={getCategoriesHandle}
          />
        </Card>
      </Container>
    </PageWrapper>
  );
};

export default CategoryPage;
