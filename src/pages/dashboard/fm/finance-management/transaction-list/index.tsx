import { useEffect, useRef, useState } from 'react';
import PageWrapper from '@/components/page-wrapper';
import { basicRenderColumns } from '@/components/react-data-grid/basic-render-data';
import useResponsiveV2 from '@/hooks/useResponsiveV2';
import { useLocales } from '@/locales';
import LoadingComponent from '@/pages/components/Loading';
import { deleteEmployeeRow } from '@/redux/slices/dashboard/employee';
import { dispatch } from '@/redux/store';
import { PATH_DASHBOARD } from '@/routes/paths';
import OrderTableToolbar from '@/sections/@dashboard/fm/transport/list/OrderTableToolbar';
import { PersonAddAlt } from '@mui/icons-material';
import { Box, Card, Container, Table, TableContainer } from '@mui/material';
import DriverHostApi from '../../../../../apis/driver-host.api';
import { toolBarButtonTypes } from '../../../../../components/common/WToolbarTable';
import CustomBreadcrumbs from '../../../../../components/custom-breadcrumbs';
import DataGrid, {
  columnTypes,
  paginationTypes,
  selectionTypes,
} from '../../../../../components/react-data-grid/ReactDataGrid';
import { JOBMODE_OPTION, STATUS_ORDER_OPTION } from '../../../../../constants/app.constants';

export default function TransactionListPage() {
  const tableRef = useRef<any>(null);
  const [listOrder, setListOrder] = useState<IOrderTransport[]>([]);
  const { isExtraDesktop } = useResponsiveV2();
  const { t } = useLocales();
  const [params, setParams] = useState<IParamsGetDriverHostBookingList>({
    StartDate: new Date().toISOString(),
    EndDate: new Date().toISOString(),
    ContainerCode: '',
    DriverNo: '',
    OrderStatus: '',
    PinCode: '',
    RemoocNo: '',
    // JobModeCode: ,
  });

  const [dataModal, setDataModal] = useState({
    isOpen: false,
    orderSelected: {},
  });

  const [loading, setLoading] = useState<boolean>(false);

  const handleDeleteRow = async (id: string) => {
    await dispatch(deleteEmployeeRow({ id, params }));
  };

  const openModalDriverHostHandle = (data: any) => {
    setDataModal({
      isOpen: true,
      orderSelected: data,
    });
  };

  const handleCheckSelect = (rowSelected: Set<number>) => {
    const rowSelectedArray = Array.from(rowSelected);
    // check status lasted row selected > 2
    const lastOrder = listOrder.find((item, index) => {
      return rowSelectedArray.includes(index);
    });
    const statusLasted = lastOrder?.status;
  };

  const columns = () =>
    basicRenderColumns(
      [
        {
          key: 'id',
          name: 'id',
          editable: false,
          visible: false,
          isRowSelected: false,
        },
        {
          key: 'STT',
          name: 'STT',
          editable: false,
          width: 100,
        },
        {
          key: 'date',
          name: 'Ngày chi tiêu',
          width: 250,
          editable: true,
          type: columnTypes.DatePicker,
        },
        {
          key: 'amount',
          name: 'Số tiền',
          width: 250,
          editable: false,
          type: columnTypes.NumberInput,  
          textAlign: 'right',
        },
        {
          key: 'description',
          name: 'Mô tả',
          width: 250,
          editable: true,
        },
        {
          key: 'type',
          name: 'Loại chi tiêu',
          width: 250,
          editable: true,
        },
       
      ],
      listOrder
    );

  const getListOrderHandle = async () => {
    setLoading(true);
    setListOrder( []);
    setLoading(false);
  };
  useEffect(() => {
    getListOrderHandle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return (
    <PageWrapper title="Danh sách chi tiêu">
      <Container maxWidth={false}>
        {isExtraDesktop && (
          <CustomBreadcrumbs
            heading="Danh sách chi tiêu"
            links={[
              { name: t('dashboard'), href: PATH_DASHBOARD.root },
              { name: 'Đơn hàng', href: PATH_DASHBOARD.fm.employeeManagement.employeeStatus },
              { name: 'Danh sách' },
            ]}
          />
        )}
        <Box>
          <OrderTableToolbar setParams={setParams} params={params} />
        </Box>
        <Card sx={{ mt: 3 }}>
          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              {loading ? (
                <LoadingComponent loading={loading} />
              ) : (
                <DataGrid
                  ref={tableRef}
                  columnKeySelected="pincode"
                  selection={selectionTypes.multi}
                  columns={columns()}
                  setRows={(newRows: React.SetStateAction<IOrderTransport[]>) =>
                    setListOrder(newRows)
                  }
                  rows={listOrder}
                  pagination={paginationTypes.pagination}
                  exportfileName="Danh sách đơn hàng"
                  // buttonConfirm={buttonConfirm}
                  functionRequire={{
                    deleteFunction: (data: any) => handleDeleteRow(data),
                    saveFunction: (editedRows: any) => console.log(editedRows),
                  }}
                  toolbar={[
                    toolBarButtonTypes.exportExcel,
                    toolBarButtonTypes.add,
                    toolBarButtonTypes.delete,
                    toolBarButtonTypes.save,
                  ]}
                  limit={12}
                  handleCheckSelect={handleCheckSelect}
                />
              )}
            </Table>
          </TableContainer>
        </Card>
      </Container>
    </PageWrapper>
  );
}
