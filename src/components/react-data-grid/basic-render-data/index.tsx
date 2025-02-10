// eslint-disable-next-line import/no-extraneous-dependencies

import dayjs from 'dayjs';
import { isNumeric } from 'utils/common';
import SnakeBar from 'utils/snackbar';
import { FORMAT_DATE, FORMAT_DATE_TIME, statusPayment } from '@/constants/app.constants';
import MBadge from '../../common/MBadge';
import MErrorList from '../../common/MErrorList';
import WCheckBoxTable from '../../common/WCheckBoxTable';
import WProgressTable from '../../common/WProgressTable';
import WSwitchTable from '../../common/WSwitchTable';
import { columnTypes } from '../ReactDataGrid';
import { renderCellEditToolBar } from '../render-edit-component/DataGridCellEditToolBar';
import DataGridTooltipError from '../render-edit-component/DataGridTooltipError';

// eslint-disable-next-line import/no-cycle









type ItemColumnType = {
  key: string;
  type: string;
  options: { value: string; label: string }[];
  onCellChange?: (data: { row: any[]; key?: string; value: boolean }) => void;
  style?: React.CSSProperties;
  buttonConfig: { key?: string; value?: boolean; button: React.ReactNode }[];
  handleConfirm: (props: { row: any[]; key: string }) => void;
  disabled: boolean;
};

export const convertDataTable = ({ column, row, onRowChange }: any, itemColumn: ItemColumnType) => {
  const keyValue = column.key;
  const typeColumn = itemColumn.type;
  let dataConvert;
  switch (typeColumn) {
    case 'Checkbox':
      dataConvert = WCheckBoxTable({
        name: keyValue,
        defaultChecked:
          typeof row[keyValue] === 'boolean' ? row[keyValue] : !!parseInt(row[keyValue], 10),
        value: typeof row[keyValue] === 'boolean' ? row[keyValue] : !!parseInt(row[keyValue], 10),
        onRowChange,
        onCellChange: itemColumn.onCellChange,
        row,
        key: keyValue,
        disabled: 'keyDisabled' in column ? row[column.keyDisabled] : itemColumn.disabled,
      });
      break;
    case 'Select': {
      const dataSelect = itemColumn.options.filter((item) => item.value === row[keyValue]);
      dataConvert = dataSelect.length > 0 ? dataSelect[0].label : row[keyValue];
      break;
    }

    case 'Badge':
      dataConvert = MBadge({
        count:
          keyValue === 'order_status'
            ? statusPayment[row[keyValue] as keyof typeof statusPayment]?.text
            : row[keyValue],
        color: statusPayment[row[keyValue] as keyof typeof statusPayment]?.color,
      });
      break;

    case 'Progress':
      // eslint-disable-next-line no-case-declarations
      const { status: statusProgress } = column.config ?? {};
      dataConvert = WProgressTable({
        value: row[keyValue] ?? 0,
        status: statusProgress,
      });
      break;

    case 'Switch':
      dataConvert = WSwitchTable({
        defaultChecked: !!parseInt(row[keyValue], 10),
        // name: keyValue,
        onRowChange,
        checked: !!parseInt(row[keyValue], 10),
        key: keyValue,
        row,
        onCellChange: itemColumn.onCellChange,
      });
      break;

    case 'Password':
      dataConvert = '*'.repeat(row[keyValue] ? row[keyValue].length : 8);
      break;

    case 'NumberInput': {
      const numberString = isNumeric(row[keyValue])
        ? row[keyValue]
            .toString()
            ?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            ?.replace(/(\.\0*$)/, '')
        : row[keyValue];
      dataConvert = `${row[keyValue]}` ? numberString : row[keyValue];
      break;
    }
    case 'DatePicker': {
      const stringDateFormat = itemColumn.key === 'birthday' ? FORMAT_DATE : FORMAT_DATE_TIME;

      dataConvert = row[keyValue] ? dayjs(row[keyValue]).format(stringDateFormat) : '';
      break;
    }

    case 'ToolBar': {
      const listButtonToolbar: any[] = [];
      itemColumn.buttonConfig.forEach((btnToolbar) => {
        const keyCheckShow = btnToolbar.key;
        if (keyCheckShow) {
          if (!!row[keyCheckShow] === btnToolbar.value) {
            listButtonToolbar.push(btnToolbar.button);
          }
        } else listButtonToolbar.push(btnToolbar.button);
      });

      dataConvert = renderCellEditToolBar({
        onRowChange,
        row,
        key: keyValue,
        buttonConfig: listButtonToolbar,
        handleConfirm: (props: { row: any[]; key: string }) => itemColumn.handleConfirm(props),
      });
      break;
    }

    case 'Tooltip':
      // eslint-disable-next-line no-case-declarations
      const status = row.errors?.length > 0 ? 'error' : 'success';
      // eslint-disable-next-line no-case-declarations
      const message = row.errorMessage;
      dataConvert = row.errors ? <DataGridTooltipError status={status} text={message} /> : '';
      break;

    case 'TextEditor':
      dataConvert = row[keyValue] ? `${row[keyValue]}` : '';

      if (keyValue === 'containerStatus') {
        const now = dayjs();
        const expired = dayjs(row.expireDate);
        const conts = row.container;
        const complete = conts.filter((p: { isComplete: boolean }) => p?.isComplete === true) ?? [];
        const notComplete =
          conts.filter((p: { isComplete: boolean }) => p?.isComplete === false) ?? [];
        const active = conts.filter((p: { isActive: boolean }) => p?.isActive === true) ?? [];
        const notActive = conts.filter((p: { isActive: boolean }) => p?.isActive === false) ?? [];

        if (complete.length && !notComplete.length && complete.length === conts.length) {
          dataConvert = 'Đã hoàn tất';
        }

        if (notComplete.length && active.length) {
          dataConvert = 'Đang thực hiện';
        }

        if (notActive.length && notActive.length === conts.length && !complete.length) {
          dataConvert = 'Chưa thực hiện';
        }

        if (now.isAfter(expired)) {
          dataConvert = 'Quá hạn';
        }
      }
      break;

    default:
      dataConvert = row[keyValue] ? `${row[keyValue]}` : '';
      break;
  }

  let textAlign: any;
  switch (column.textAlign) {
    case 'center':
      textAlign = 'center';
      break;
    case 'right':
      textAlign = 'right';
      break;
    case 'left':
      textAlign = 'left';
      break;
    default:
      if (
        typeColumn === 'Checkbox' ||
        typeColumn === 'DatePicker' ||
        keyValue === 'STT' ||
        typeColumn === 'Switch' ||
        typeColumn === 'Badge' ||
        typeColumn === 'Tooltip'
      )
        textAlign = 'center';
      else if (
        typeof row[keyValue] === 'number' ||
        [
          'size',
          'width',
          'quantity',
          'hours',
          'mate_usd',
          'mate_vnd',
          'vat',
          'taxcode',
          'deposit',
          'date_part',
          'total',
        ].includes(keyValue)
      )
        textAlign = 'right';
      else textAlign = 'left';
      break;
  }
  if (row.key === 'row-total' && keyValue === 'STT') dataConvert = '';

  return (
    <div
      style={{
        ...itemColumn.style,
        textAlign,
        padding: '0 8px',
        fontWeight: row.key === 'row-total' ? 'bold' : 'normal',
        fontSize: '13px',
        textTransform: column.uppercase === true ? 'uppercase' : 'none',
        border: `${row.isError && row.errors?.includes(keyValue) ? '1px solid #ebb6b6' : 'unset'}`,
        height: '100%',
      }}
    >
      {dataConvert}
    </div>
  );
};

export const basicRenderColumns = (columns: any = [], rows: any = []) => {
  let newColumns: any = columns;
  if (rows.find((item: any) => item.errors)) {
    newColumns = [
      ...newColumns,
      {
        key: 'errors',
        editable: false,
        name: '',
        frozen: true,
        type: columnTypes.Tooltip,
      },
    ];
  }
  return newColumns.map((itemColumn: any) => {
    if (!itemColumn.render) {
      return {
        ...itemColumn,
        render: (itemRender: {
          column: any;
          row: any;
          onRowChange: (row: any, isEdit: boolean) => void;
        }) => {
          return convertDataTable(itemRender, itemColumn);
        },
      };
    }
    return itemColumn;
  });
};

/**
 *
 * @param { value: row.size, name: "SIZE", key: "size", isNull: false }[]
 * @returns
 */
export const isCheckNumber = (value = []) => {
  const valueCheck = value.map(
    (item: { key: string; name: string; value: any; isNull: boolean }) => {
      if (isNumeric(item.value)) {
        if (item.value < 0) {
          return { key: item.key, name: item.name, isNumber: false };
        }
        return { key: item.key, name: item.name, isNumber: true };
      }
      return {
        key: item.key,
        name: item.name,
        isNumber: !!(!item.value && item.isNull),
      };
    }
  );

  let messageCheckNumber = '';
  const listCheckNumber = valueCheck.filter((item) => !item.isNumber);
  if (listCheckNumber.length > 0) {
    listCheckNumber.forEach((item, index) => {
      messageCheckNumber = `${messageCheckNumber + item.name}${
        index === listCheckNumber.length - 1 ? '' : ', '
      }`;
    });
    SnakeBar.error(`${messageCheckNumber} phải là số nguyên dương`);
    return { isNumber: false };
  }
  const valueNumber: {
    [x: string]: number | null;
  } = {};
  value.forEach(
    // eslint-disable-next-line no-return-assign
    (item: { key: string; value: any }) =>
      (valueNumber[item.key] = item.value ? Number(item.value) : null)
  );
  return {
    isNumber: true,
    value: valueNumber,
  };
};

export const saveFormRequest = (rows = []): any => {
  const formData: any[] = [];
  const listRowsChange = rows.filter((row: any) => row?.isEdit || row?.isNew);
  listRowsChange.forEach((row: any) => {
    const { STT, errors, isError, createdAt, updatedAt, id, isNew, isEdit, ...rest } = row;
    formData.push(isEdit ? { ...rest, id } : { ...rest });
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  formData.length === 0 && SnakeBar.warning('Không có dữ liệu thay đổi');
  return formData;
};

export const deleteFormRequest = (
  rows: any[],
  dataSend: { size: any; has: (arg0: any) => any },
  byKey = 'id'
) => {
  if (!dataSend.size) {
    SnakeBar.warning('Vui lòng chọn dữ liệu cần xóa');
    return {
      newRows: rows,
      listRowsDel: [],
    };
  }
  const rowsNewRemove = rows.filter(
    (item: { [x: string]: any; isNew: any }) => !(dataSend.has(item[byKey]) && item?.isNew)
  );
  const listRowsDel = rows.filter(
    (item: { [x: string]: any; isNew: any; hasOwnProperty: (arg0: string) => any }) =>
      // eslint-disable-next-line no-prototype-builtins
      dataSend.has(item[byKey]) && !item?.isNew && item.hasOwnProperty(byKey)
  );
  return {
    newRows: rowsNewRemove,
    listRowsDel,
  };
};

export const copyFormRequest = (
  rows: any[],
  dataSend: { size: any; has: (arg0: any) => any },
  byKey = 'id'
) => {
  if (!dataSend.size) {
    SnakeBar.warning('Vui lòng chọn dữ liệu bạn muốn nhân bản');
    return {
      newRows: rows,
      listRowsCopy: [],
    };
  }
  const listRowsCopy = rows.filter(
    (item: { [x: string]: any; isNew: any; hasOwnProperty: (arg0: string) => any }) =>
      // eslint-disable-next-line no-prototype-builtins
      dataSend.has(item[byKey]) && !item?.isNew && item.hasOwnProperty(byKey)
  );
  return {
    listRowsCopy,
  };
};

export const messageErrorList = (message = '', columns = []) => {
  if (Array.isArray(message)) {
    return MErrorList({ messageList: message, columns });
  }
  return message;
};
