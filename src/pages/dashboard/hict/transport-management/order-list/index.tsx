import LoadingComponent from 'pages/components/Loading';
import { useEffect, useRef, useState } from 'react';
import { deleteEmployeeRow } from 'redux/slices/dashboard/employee';
import { dispatch } from 'redux/store';
import PageWrapper from '@/components/page-wrapper';
import { useLocales } from '@/locales';
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
import { basicRenderColumns } from '../../../../../components/react-data-grid/basic-render-data';
import { JOBMODE_OPTION, STATUS_ORDER_OPTION } from '../../../../../constants/app.constants';
import useResponsiveV2 from '../../../../../hooks/useResponsiveV2';
import { PATH_DASHBOARD } from '../../../../../routes/paths';
import OrderTableToolbar from '../../../../../sections/@dashboard/hict/transport/list/OrderTableToolbar';

// @mui







// routes

// sections










export default function EmployeeListPage() {
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
          key: 'status',
          name: 'Trạng thái',
          width: 250,
          editable: false,
          type: columnTypes.Select,
          options: STATUS_ORDER_OPTION,
          textAlign: 'left',
        },
        {
          key: 'jobmodecode',
          name: 'Tác nghiệp',
          width: 250,
          editable: false,
          type: columnTypes.Select,
          options: JOBMODE_OPTION,
          textAlign: 'left',
        },
        {
          key: 'pincode',
          name: 'Số PinCode',
          width: 250,
          editable: false,
        },
        {
          key: 'containercode',
          name: 'Số Container',
          width: 250,
          editable: false,
        },
        {
          key: 'driverusername',
          name: 'Tài xế',
          width: 250,
          editable: false,
        },
        {
          key: 'drivermobile',
          name: 'Số điện thoại TX',
          width: 250,
          editable: false,
        },
        {
          key: 'truckno',
          name: 'Số xe',
          width: 250,
          editable: false,
        },
        {
          key: 'remoocno',
          name: 'Số remooc',
          width: 250,
          editable: false,
        },
        {
          key: 'remoocweight',
          name: 'Trọng lượng remooc',
          width: 250,
          editable: false,
        },
        {
          key: 'remoocweightallowed',
          name: 'Trọng lượng remooc cho phép',
          width: 250,
          editable: false,
        },
        {
          key: 'truckweight',
          name: 'Trọng lượng xe',
          width: 250,
          editable: false,
        },
        {
          key: 'truckweightallowed',
          name: 'Trọng lượng xe cho phép',
          width: 250,
          editable: false,
        },
        {
          key: 'operationcode',
          name: 'Hãng KT',
          width: 250,
          editable: false,
        },
        {
          key: 'isosizetype',
          name: 'Kích cỡ ISO',
          width: 250,
          editable: false,
        },
        {
          key: 'seal',
          name: 'Seal',
          width: 250,
          editable: false,
        },
        {
          key: 'tare',
          name: 'Tare',
          width: 250,
          editable: false,
        },
        {
          key: 'createdtime',
          name: 'Ngày tạo đơn',
          width: 250,
          editable: false,
        },
        {
          key: 'expireddate',
          name: 'Ngày hết hạn',
          width: 250,
          editable: false,
        },
        {
          key: 'startaddress',
          name: 'Điểm đi',
          width: 250,
          editable: false,
        },
        {
          key: 'destinationaddress',
          name: 'Điểm đến',
          width: 250,
          editable: false,
        },
        {
          key: 'sumprice',
          name: 'Tổng tiền',
          width: 250,
          editable: false,
        },
      ],
      listOrder
    );

  const getListOrderHandle = async () => {
    setLoading(true);
    const response = await DriverHostApi.getListOrder(params);
    const list = response.data?.payload.map((item: any, index: number) => {
      return {
        ...item,
        isRowSelected: true,
      };
    }); // map data
    // setListOrder(response.data?.payload ?? []);
    setListOrder(list ?? []);
    setLoading(false);
  };
  useEffect(() => {
    getListOrderHandle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return (
    <PageWrapper title="Đơn hàng">
      <Container maxWidth={false}>
        {isExtraDesktop && (
          <CustomBreadcrumbs
            heading="Danh sách đơn hàng"
            links={[
              { name: t('dashboard'), href: PATH_DASHBOARD.root },
              { name: 'Đơn hàng', href: PATH_DASHBOARD.hict.employeeManagement.employeeStatus },
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
