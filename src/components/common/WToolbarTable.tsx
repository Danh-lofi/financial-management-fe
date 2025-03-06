import React, { useState } from 'react';
import {
  AddBox,
  AddCircleOutlined,
  BarChartOutlined,
  CheckCircleOutlined,
  CheckOutlined,
  CloseOutlined,
  CloudDownloadOutlined,
  CodeOffOutlined,
  CopyAllOutlined,
  DeleteOutlined,
  EditOutlined,
  FileDownloadOutlined,
  FileOpenOutlined,
  ImageOutlined,
  InfoOutlined,
  KeyOutlined,
  SaveAltOutlined,
  SearchOutlined,
  SendOutlined,
  SettingsOutlined,
  SwapVertOutlined,
  SyncOutlined,
  VerticalAlignBottomOutlined,
  Warning,
  WarningAmberOutlined,
} from '@mui/icons-material';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Iconify from '../iconify';
import WTooltipTable from './WTooltipTable';

export type ToolBarButtonType = {
  [key: string]: {
    id: string;
    label: string;
    fontColor?: string;
    icon: JSX.Element;
    alert?: boolean;
    message?: string;
    tooltipTitle?: string;
    style?: React.CSSProperties;
    disabled?: boolean;
    variant?: string;
  };
};

export const toolBarButtonTypes: ToolBarButtonType = {
  refresh: {
    id: 'refresh',
    label: 'Nạp dữ liệu',
    fontColor: '#2ab8df',
    icon: <SyncOutlined style={{ stroke: '#2ab8df', strokeWidth: 30 }} />,
  },
  load: {
    id: 'load',
    label: 'Nạp dữ liệu',
    fontColor: '#2ab8df',
    icon: <CloudDownloadOutlined style={{ stroke: '#2399fa', strokeWidth: 30 }} />,
  },
  send: {
    id: 'send',
    label: 'Chuyển',
    fontColor: '#f5a442',
    icon: <SendOutlined />,
    alert: true,
    message: 'Bạn có muốn chuyển?',
  },
  cancel: {
    id: 'cancel',
    label: 'Hủy gửi',
    fontColor: '#f54f40',
    icon: <CloseOutlined style={{ stroke: '#f54f40', strokeWidth: 30 }} />,
    alert: true,
    message: 'Bạn có muốn hủy gửi thông điệp?',
  },
  cancelgetin: {
    id: 'cancelgetin',
    label: 'Hủy getin',
    fontColor: '#f54f40',
    icon: <CloseOutlined style={{ stroke: '#f54f40', strokeWidth: 30 }} />,
    alert: true,
    message: 'Bạn có muốn hủy getin?',
  },
  save: {
    id: 'save',
    label: 'Lưu',
    icon: <Iconify icon="eva:save-fill" />,
    variant: 'outlined',
  },
  delete: {
    id: 'delete',
    label: 'Xóa',
    fontColor: 'error',
    variant: 'outlined',
    icon: <Iconify icon="eva:trash-fill" />,
    alert: true,
    message: 'Bạn có muốn xóa dữ liệu?',
  },
  deletegetout: {
    id: 'delete_getout',
    label: 'Xóa Getout',
    fontColor: '#dc3545',
    icon: <DeleteOutlined style={{ stroke: '#dc3545', strokeWidth: 30 }} />,
    alert: true,
    message: 'Bạn có muốn xóa getout?',
  },
  newdeclare: {
    id: 'new_declare',
    label: 'Quét tờ khai mới',
    fontColor: '#2399fa',
    icon: <SendOutlined style={{ stroke: '#2399fa', strokeWidth: 30 }} />,
  },
  exportFile: {
    id: 'exportFile',
    label: 'Xuất file',
    fontColor: '#2399fa',
    icon: <FileOpenOutlined />,
  },
  exportExcel: {
    id: 'export_excel',
    label: 'Xuất excel',
    // fontColor: 'error',
    variant: 'outlined',
    icon: <FileUploadIcon />,
  },
  exportExcelAndImage: {
    id: 'exportExcelAndImage',
    label: 'Xuất excel và hình ảnh',
    fontColor: '#2399fa',
    icon: <FileDownloadOutlined />,
  },
  liquidationButton: {
    id: 'liquidationButton',
    label: 'Thanh lý',
    fontColor: '#2399fa',
    icon: <FileDownloadOutlined />,
  },
  downloadEir: {
    id: 'download_eir',
    label: 'Tải EIR',
    fontColor: '#2399fa',
    icon: <FileDownloadOutlined />,
  },
  exampleExcel: {
    id: 'exampleExcel',
    label: 'Excel mẫu',
    fontColor: '#039cfd',
    icon: <FileDownloadOutlined />,
  },
  importExcel: {
    id: 'importExcel',
    label: 'Nhập Excel',
    // fontColor: 'error',
    variant: 'outlined',
    icon: <Iconify icon="eva:plus-fill" />,
  },
  add: {
    id: 'add',
    label: 'Thêm dòng',
    icon: <Iconify icon="eva:plus-fill" />,
    alert: false,
    message: '',
  },
  copySource: {
    id: 'copySource',
    label: 'Nhân bản',
    fontColor: '#039cfd',
    icon: <CopyAllOutlined style={{ stroke: '#198754', strokeWidth: 30 }} />,
    alert: false,
    message: '',
  },
  add_modal: {
    id: 'add_modal',
    label: 'Thêm dòng',
    fontColor: '#039cfd',
    icon: <AddCircleOutlined style={{ stroke: '#039cfd', strokeWidth: 30 }} />,
    alert: false,
    message: '',
  },
  import: {
    id: 'import',
    label: 'Import',
    fontColor: '#039cfd',
    icon: <VerticalAlignBottomOutlined style={{ stroke: '#039cfd', strokeWidth: 30 }} />,
    alert: false,
    message: '',
  },
  sync: {
    id: 'sync',
    label: 'Đồng bộ dữ liệu TOS',
    fontColor: '#039cfd',
    icon: <SyncOutlined style={{ stroke: '#0e499a', strokeWidth: 30 }} />,
    alert: false,
    message: '',
  },

  loadData: {
    id: 'loadData',
    label: 'Nạp dữ liệu',
    fontColor: '#039cfd',
    icon: <SyncOutlined style={{ stroke: '#ee9322', strokeWidth: 30 }} />,
    alert: false,
    message: '',
  },
  // refresh: {
  //   id: "refresh",
  //   label: "Làm mới trang",
  //   fontColor: "#50a81d",
  //   icon: <ReloadOutlined style={{ stroke: "#50a81d", strokeWidth: 30 }} />,
  //   alert: false,
  //   message: "",
  // },
  setting: {
    id: 'setting',
    label: 'Cấu hình',
    fontColor: '#f5a442',
    icon: <SettingsOutlined style={{ stroke: '#f5a442', strokeWidth: 30 }} />,
    alert: false,
    message: '',
  },
  complete: {
    id: 'complete',
    label: 'Hoàn thành',
    fontColor: '#50a81d',
    icon: <CheckOutlined style={{ stroke: '#50a81d', strokeWidth: 30 }} />,
    alert: false,
    message: '',
  },
  edit: {
    id: 'edit',
    label: 'Sửa chữa',
    fontColor: '#2399fa',
    icon: <EditOutlined style={{ stroke: '#2399fa', strokeWidth: 30 }} />,
    alert: false,
    message: '',
  },
  sentData: {
    id: 'sentData',
    label: 'Dữ liệu gửi',
    fontColor: '#2399fa',
    icon: <BarChartOutlined style={{ stroke: '#2399fa', strokeWidth: 30 }} />,
    alert: false,
    message: '',
  },
  receiveData: {
    id: 'receiveData',
    label: 'Dữ liệu nhận',
    fontColor: '#2399fa',
    icon: <BarChartOutlined style={{ stroke: '#2399fa', strokeWidth: 30 }} />,
    alert: false,
    message: '',
  },
  sendAgain: {
    id: 'sendAgain',
    label: 'Gửi lại',
    fontColor: '#2399fa',
    icon: <BarChartOutlined style={{ stroke: '#2399fa', strokeWidth: 30 }} />,
    alert: false,
    message: '',
  },
  editContainer: {
    id: 'editContainer',
    label: 'Chỉnh sửa',
    fontColor: '#2399fa',
    icon: <EditOutlined style={{ stroke: '#2399fa', strokeWidth: 30 }} />,
    alert: false,
    message: '',
  },
  confirm: {
    id: 'confirm',
    label: 'Xác nhận',
    fontColor: '#50a81d',
    icon: <CheckOutlined style={{ stroke: '#50a81d', strokeWidth: 30 }} />,
    alert: false,
    message: '',
  },
  permision_all: {
    id: 'permision_all',
    label: 'Phân quyền tất cả',
    fontColor: '#50a81d',
    icon: <CheckOutlined style={{ stroke: '#50a81d', strokeWidth: 30 }} />,
    alert: false,
    message: '',
  },
  remove_permision_all: {
    id: 'remove_permision_all',
    label: 'Bỏ tất cả phân quyền ',
    fontColor: '#50a81d',
    icon: <DeleteOutlined style={{ stroke: '#f54f40', strokeWidth: 30 }} />,
    alert: false,
    message: '',
  },
  reset_permision: {
    id: 'reset_permision',
    label: 'Làm mới',
    fontColor: '#50a81d',
    icon: <SyncOutlined style={{ stroke: '#50a81d', strokeWidth: 30 }} />,
    alert: false,
    message: '',
  },
  attachments: {
    id: 'attachments',
    label: 'Tệp đính kèm',
    fontColor: '#50a81d',
    icon: <FileDownloadOutlined style={{ stroke: '#50a81d', strokeWidth: 30 }} />,
    alert: false,
    message: '',
  },
  addMenu: {
    id: 'addMenu',
    label: 'Thêm Menu',
    fontColor: '#039cfd',
    icon: <AddCircleOutlined style={{ stroke: '#039cfd', strokeWidth: 30 }} />,
    alert: false,
    message: '',
  },
  delconfig: {
    id: 'delconfig',
    label: 'Xóa Biểu Cước',
    fontColor: '#f54f40',
    icon: <DeleteOutlined style={{ stroke: '#f54f40', strokeWidth: 30 }} />,
    alert: true,
    message: 'Bạn có muốn xóa Biểu cước không?',
  },
  addContainer: {
    id: 'addContainer',
    label: 'Lưu danh sách container',
    fontColor: '#039cfd',
    icon: <SaveAltOutlined style={{ stroke: '#039cfd', strokeWidth: 30 }} />,
    alert: false,
    message: '',
  },
  add_tariff: {
    id: 'add_tariff',
    label: 'Chọn biểu cước',
    fontColor: '#039cfd',
    icon: <AddCircleOutlined style={{ stroke: '#039cfd', strokeWidth: 30 }} />,
    alert: false,
    message: '',
  },
  add_user: {
    id: 'add_user',
    label: 'Chọn người dùng',
    fontColor: '#039cfd',
    icon: <AddCircleOutlined style={{ stroke: '#039cfd', strokeWidth: 30 }} />,
    alert: false,
    message: '',
  },
  info: {
    id: 'info',
    label: 'Chi tiết',
    // fontColor: '#039cfd',
    icon: <Iconify icon="eva:info-fill" />,
    alert: false,
    message: '',
  },
  change: {
    id: 'change',
    label: 'Chuyển đổi',
    fontColor: '#039cfd',
    icon: <SwapVertOutlined style={{ stroke: '#039cfd', strokeWidth: 30 }} />,
    alert: false,
    message: '',
  },
  downloadPDF: {
    id: 'downloadPDF',
    label: 'Tải file PDF',
    fontColor: '#039cfd',
    icon: <FileDownloadOutlined style={{ stroke: '#039cfd', strokeWidth: 30 }} />,
    alert: false,
    message: '',
  },
  downloadXML: {
    id: 'downloadXML',
    label: 'Tải file XML',
    fontColor: '#039cfd',
    icon: <FileDownloadOutlined style={{ stroke: '#039cfd', strokeWidth: 30 }} />,
    alert: false,
    message: '',
  },

  cancel_booking: {
    id: 'cancel_booking',
    label: 'Hủy',
    fontColor: '#f54f40',
    icon: <CloseOutlined style={{ stroke: '#f54f40', strokeWidth: 30 }} />,
    alert: true,
    message: 'Bạn có muốn hủy Booking?',
  },
  approve: {
    id: 'approve',
    label: 'Duyệt',
    fontColor: '#f54f40',
    icon: <CheckCircleOutlined style={{ stroke: '#50a81d', strokeWidth: 30 }} />,
    alert: false,
  },
  editData: {
    id: 'editData',
    label: 'Điều chỉnh',
    fontColor: '#006aff',
    icon: <InfoOutlined style={{ stroke: '#006aff', strokeWidth: 30 }} />,
    alert: false,
  },
  cancelButton: {
    id: 'cancelButton',
    label: 'Hủy',
    fontColor: '#f54f40',
    icon: <CloseOutlined style={{ stroke: '#f54f40', strokeWidth: 30 }} />,
    alert: false,
  },
  change_pass: {
    id: 'change_pass',
    label: 'Đổi mật khẩu',
    fontColor: '#f54f40',
    icon: <KeyOutlined style={{ stroke: '#f54f40', strokeWidth: 30 }} />,
    alert: false,
  },
  viewImg: {
    id: 'view-img',
    label: 'Xem hình ảnh',
    fontColor: '#f54f40',
    icon: <ImageOutlined style={{ stroke: '#0E499A', strokeWidth: 30 }} />,
    alert: false,
  },
  confirmCont: {
    id: 'confirm-cont',
    label: 'Chọn container',
    fontColor: '#f54f40',
    icon: <CodeOffOutlined style={{ stroke: '#50a81d', strokeWidth: 35, fontSize: '18px' }} />,
    alert: false,
  },
  findListCont: {
    id: 'find-list-cont',
    label: 'Tìm list cont',
    fontColor: '#f54f40',
    icon: <SearchOutlined style={{ stroke: '#ffbf1a ', strokeWidth: 35, fontSize: '18px' }} />,
    alert: false,
  },
  clearFindListCont: {
    id: 'clear-find-list-cont',
    label: 'Hủy tìm kiếm',
    fontColor: '#f54f40',
    icon: <SearchOutlined style={{ stroke: '#f54f40 ', strokeWidth: 35, fontSize: '18px' }} />,
    alert: false,
  },
  removeCont: {
    id: 'remove-cont',
    label: 'Xóa container',
    fontColor: '#f54f40',
    icon: <DeleteOutlined style={{ stroke: '#f54f40', strokeWidth: 35, fontSize: '18px' }} />,
    alert: false,
  },
};

type ToolBarProps = {
  buttonConfig: Array<ToolBarButtonType[keyof ToolBarButtonType]>;
  handleConfirm: ({ type, value }: { type: string; value?: any }) => void;
  style?: React.CSSProperties;
};

const WToolbarTable = ({ buttonConfig, handleConfirm, style }: ToolBarProps) => {
  return (
    <Stack direction="row" spacing={1}>
      {buttonConfig.map((item, index) => {
        if (Object.keys(item).length > 0) {
          return (
            <React.Fragment key={item.id}>
              <MyButton item={item} handleConfirm={handleConfirm} />
              {index !== buttonConfig.length - 1 ? (
                <Box
                  sx={{
                    backgroundImage:
                      'linear-gradient(rgba(153, 153, 153, 0.1) 0px, rgb(179 176 176) 40%, rgb(169 167 167) 60%, rgba(153, 153, 153, 0.1) 100%)',
                    height: '24px',
                    width: '1.8px',
                    paddingRight: '1px',
                    borderRadius: '0px',
                  }}
                />
              ) : (
                ''
              )}
            </React.Fragment>
          );
        }
        return <></>;
      })}
    </Stack>
  );
};

export default WToolbarTable;

const MyButton = ({ item, handleConfirm }: any) => {
  const [open, setOpen] = useState(false);
  const [dialogType, setDialogType] = useState('');
  const [formValue, setFormValue] = useState(1);

  const handleClick = (id: any) => {
    if (id === 'add') {
      setDialogType('add');
      setOpen(true);
    } else if (item.alert) {
      setDialogType('alert');
      setOpen(true);
    } else {
      handleConfirm({ type: id });
    }
  };

  const handleClose = () => setOpen(false);

  const handleOk = () => {
    if (dialogType === 'add') {
      handleConfirm({ type: 'add', value: formValue });
    } else if (dialogType === 'alert') {
      handleConfirm({ type: item.id });
    }
    handleClose();
  };

  return (
    <>
      <Button
        disabled={item.disabled}
        className={item.disabled && 'disabled-btn'}
        key={item.id}
        variant={item?.variant ?? 'contained'}
        color={item.fontColor ?? 'primary'}
        startIcon={item.icon}
        style={{ ...(item?.style ?? {}) }}
        onClick={() => handleClick(item.id)}
      >
        {item.label}
      </Button>

      <Dialog open={open} onClose={handleClose}>
        {dialogType === 'add' ? (
          <>
            <DialogTitle>
              <Stack direction="row" spacing={1} alignItems={'center'}>
                <AddCircleOutlined />
                <Typography variant="h6">Thêm dữ liệu</Typography>
              </Stack>
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  Nhập số dòng
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="number"
                    value={formValue}
                    onChange={(e) => setFormValue(Number(e.target.value))}
                    fullWidth
                    defaultValue={1}
                  />
                </Grid>
              </Grid>
            </DialogContent>
          </>
        ) : (
          <>
            <DialogTitle>
              <Stack direction="row" spacing={1}>
                <WarningAmberOutlined />
                <Typography variant="h6">Cảnh báo</Typography>
              </Stack>
            </DialogTitle>
            <DialogContent>{item.message}</DialogContent>
          </>
        )}
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Hủy
          </Button>
          <Button onClick={handleOk} color="primary">
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
