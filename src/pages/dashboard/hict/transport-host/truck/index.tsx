// library

import LoadingComponent from 'pages/components/Loading';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { PATH_DASHBOARD } from 'routes/paths';
import { toolBarButtonTypes } from '@/components/common/WToolbarTable';
import CustomBreadcrumbs from '@/components/custom-breadcrumbs';
import { RHFTextField } from '@/components/hook-form';
import FormProvider from '@/components/hook-form/FormProvider';
import Iconify from '@/components/iconify';
import PageWrapper from '@/components/page-wrapper';
import DataGrid, {
  columnTypes,
  paginationTypes,
  selectionTypes,
} from '@/components/react-data-grid/ReactDataGrid';
import { basicRenderColumns } from '@/components/react-data-grid/basic-render-data';
import { SIZE_FIELD } from '@/constants/app.constants';
import { useLocales } from '@/locales';
import SearchIcon from '@mui/icons-material/Search';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  Container,
  Grid,
  Table,
  TableContainer,
  Typography,
} from '@mui/material';

// alias path local














type IFormValue = {
  TruckNo: string;
  TruckRegisterNo: string;
};

const TruckPage = () => {
  const { t } = useLocales();
  const tableRef = useRef<any>(null);

  const methods = useForm<IFormValue>({
    defaultValues: {},
  });
  const { handleSubmit } = methods;

  const handleFilter = async (data: IFormValue) => {};

  const handleCheckSelect = (rowSelected: Set<number>) => {
    console.log('🚀 ~ handleCheckSelect ~ rowSelected:', rowSelected);
  };

  const columns = () =>
    basicRenderColumns([
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
        key: 'driverhostid',
        name: 'Mã nhà xe',
        editable: false,
      },
      {
        key: 'truckno',
        name: 'Số xe - đầu kéo',
        editable: false,
      },
      {
        key: 'truckregisterno',
        name: 'Số đăng kiểm',
        editable: false,
      },
      {
        key: 'truckregisterdate',
        name: 'Hạn đăng kiểm',
        editable: false,
        type: columnTypes.DatePicker,
      },
      {
        key: 'truckweightallowed',
        name: 'Tải trọng (KG)',
        editable: false,
      },
      {
        key: 'verifyimages',
        name: 'Danh sách file',
        editable: false,
      },
      {
        key: 'uploadact',
        name: 'Thao tác',
        editable: false,
      },
      // {
      //   key: 'filelists',
      //   name: 'filelists',
      //   editable: false,
      // },
    ]);

  return (
    <PageWrapper title={t('truck')}>
      <Container maxWidth={false}>
        <CustomBreadcrumbs
          heading={t('truck')}
          links={[
            { name: t('dashboard'), href: PATH_DASHBOARD.root },
            { name: t('category') },
            { name: t('truck') },
          ]}
        />

        <Box>
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}>
              <Typography variant="subtitle1">Lọc</Typography>
            </AccordionSummary>

            <AccordionDetails>
              <FormProvider methods={methods} onSubmit={handleSubmit(handleFilter)}>
                <Grid container columnSpacing={2}>
                  <Grid item xs={4}>
                    <RHFTextField
                      size={SIZE_FIELD.SMALL}
                      name="TruckNo"
                      placeholder="Số xe - Đầu kéo"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <RHFTextField
                      size={SIZE_FIELD.SMALL}
                      name="TruckRegisterNo"
                      placeholder="Số đăng kiểm"
                    />
                  </Grid>

                  <Grid item xs={4}>
                    <Button
                      sx={{ width: '100%' }}
                      type="submit"
                      variant="contained"
                      startIcon={<SearchIcon />}
                    >
                      Tra cứu
                    </Button>
                  </Grid>
                </Grid>
              </FormProvider>
            </AccordionDetails>
          </Accordion>
        </Box>

        <Card sx={{ mt: 3 }}>
          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              {false ? (
                <LoadingComponent loading={false} />
              ) : (
                <DataGrid
                  ref={tableRef}
                  columnKeySelected="pincode"
                  selection={selectionTypes.multi}
                  columns={columns()}
                  setRows={(newRows: React.SetStateAction<IOrderTransport[]>) => {}}
                  rows={[]}
                  pagination={paginationTypes.pagination}
                  exportfileName="Danh sách đơn hàng"
                  // buttonConfirm={buttonConfirm}
                  functionRequire={{
                    deleteFunction: (data: any) => {},
                    saveFunction: (editedRows: any) => console.log(editedRows),
                  }}
                  toolbar={[
                    toolBarButtonTypes.exportExcel,
                    toolBarButtonTypes.importExcel,
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
};

export default TruckPage;
