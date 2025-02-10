// eslint-disable-next-line import/no-extraneous-dependencies
import * as excelJs from 'exceljs';
// eslint-disable-next-line import/no-extraneous-dependencies
import removeAccents from 'remove-accents';

export function formatDateTime(isoString: string) {
  if (!isoString) {
    return '';
  }
  // eslint-disable-next-line no-unsafe-optional-chaining
  const [datePart, timePart] = isoString?.split('T');
  const [year, month, day] = datePart.split('-');
  const [hours, minutes] = timePart.split(':');
  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

export function formatDateTimeConvert(dateString: string) {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export const formatPrice = (price: any) => {
  const numberString = String(price);
  const numberArray = numberString.split('');
  const dotPosition = numberArray.length % 3 || 3;
  for (let i = dotPosition; i < numberArray.length; i += 4) {
    numberArray.splice(i, 0, '.');
  }
  const formattedNumber = numberArray.join('');
  return formattedNumber;
};

export const reorderArray = (arr: any[], idxs: any[], to: number) => {
  const movedElements = arr.filter((_, idx) => idxs.includes(idx));
  const targetIdx = Math.min(...idxs) < to ? to + 1 : to;
  const leftSide = arr.filter((_, idx) => idx < targetIdx && !idxs.includes(idx));
  const rightSide = arr.filter((_, idx) => idx >= targetIdx && !idxs.includes(idx));
  return [...leftSide, ...movedElements, ...rightSide];
};

export const handleColumnsReorder = (
  tableData: { reactGridColumns: any; reactGridRows: any },
  targetColumnId: any,
  columnIds: any[]
) => {
  const columns = tableData.reactGridColumns;
  const rows = tableData.reactGridRows;

  const to = columns.findIndex((column: { columnId: any }) => column.columnId === targetColumnId);
  const columnIdxs = columnIds.map((columnId) =>
    columns.findIndex((c: any) => c.columnId === columnId)
  );

  const reorderedColumns = reorderArray(columns, columnIdxs, to);

  const reorderCells = (cells: any[]) => {
    const cellMap = cells.reduce((acc, cell, idx) => {
      acc[columns[idx].columnId] = cell;
      return acc;
    }, {});
    return reorderedColumns.map((col) => cellMap[col.columnId]);
  };

  const reorderedRows = rows.map((row: { cells: any[] }) => ({
    ...row,
    cells: reorderCells(row.cells),
  }));

  return {
    reactGridColumns: reorderedColumns,
    reactGridRows: reorderedRows,
  };
};

export const handleRowsReorder = (
  tableData: { reactGridRows: any },
  targetRowId: any,
  rowIds: any[]
) => {
  const rows = tableData.reactGridRows;

  const to = rows.findIndex((row: { rowId: any }) => row.rowId === targetRowId);
  const rowIdxs = rowIds.map((rowId) =>
    rows.findIndex((row: { rowId: any }) => row.rowId === rowId)
  );

  const reorderedRows = reorderArray(rows, rowIdxs, to);

  return {
    ...tableData,
    reactGridRows: reorderedRows,
  };
};

export const handleRowsSearch = (
  reactGridRows: any[],
  searchValue: string,
  columnsFormat: any,
  columnIds: any
) => {
  const indexList = getColumnIndex(columnsFormat, columnIds);
  if (!searchValue) return reactGridRows;
  const searchLower = removeAccents(searchValue.toLowerCase());

  const filteredRows = reactGridRows.slice(1).filter((row) => {
    return indexList?.some((index: string | number) =>
      removeAccents((row.cells[index]?.text || '')?.toLowerCase()).includes(searchLower)
    );
  });

  return [reactGridRows[0], ...filteredRows];
};

export function getColumnIndex(columnsFormat: any[], columnIds: any[]) {
  return columnIds?.reduce((acc, id) => {
    const index = columnsFormat?.findIndex((column) => column.columnId === id);
    if (index !== -1) {
      acc.push(index);
    }
    return acc;
  }, []);
}

export function isArrayNotEmpty(arr: null | undefined) {
  // eslint-disable-next-line no-nested-ternary
  const array = Array.isArray(arr) ? arr : arr !== undefined && arr !== null ? [arr] : [];
  return array.length > 0;
}

export const exportExcelHandle = async (datasource: any, columns: any[]) => {
  const workbook = new excelJs.Workbook();
  const worksheet = workbook.addWorksheet('My Sheet');

  const header: any = {};
  columns.forEach((column) => {
    header[column.key] = column.header;
  });
  datasource?.unshift(header);

  const STATES_ORDER: any = {
    0: 'Chờ nhận',
    1: 'Sẵn sàng',
    2: 'Vào cổng',
    3: 'Ra cổng',
    6: 'Hoàn tất',
  };

  worksheet.columns = columns.map((column) => ({
    header: column.title,
    key: column.key,
    width: column.width || 20, // Adjust width as needed
  }));

  // Add data rows
  datasource.forEach((item: any) => {
    item.status = STATES_ORDER[Number(item.status)];
    worksheet.addRow(item);
  });

  // Style header row
  const headerRow = worksheet.getRow(1); // Assuming header row is the first row
  headerRow.eachCell((cell: any) => {
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF14B0CD' }, // Background color
    };
    cell.font = {
      color: { argb: 'FFFFFFFF' }, // Text color
      bold: true,
    };
  });

  // Add total row with custom styling
  // const totalRow = worksheet.addRow({
  //   _id: "Tổng cộng",
  //   driverHostName: this.state.orderListSum[0].totalAmount.toLocaleString(
  //     "vi-VN",
  //     { style: "currency", currency: "VND" }
  //   ),
  // });
  // totalRow.eachCell((cell) => {
  //   cell.font = {
  //     color: { argb: "FF14B0CD" }, // Text color
  //     bold: true,
  //   };
  // });

  // Create link to download
  const excelBlob = await workbook.xlsx.writeBuffer();
  const excelUrl = URL.createObjectURL(
    new Blob([excelBlob], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    })
  );

  const link = document.createElement('a');
  link.href = excelUrl;
  link.download = 'report.xlsx';
  document.body.appendChild(link);
  link.click();

  // Clean up
  URL.revokeObjectURL(excelUrl);
  document.body.removeChild(link);
};

export function formatDateToYYYYMMDD(isoDate: string | number | Date) {
  const date = new Date(isoDate);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

export function convertObjectToQueryString(
  obj: { [x: string]: string | number | boolean },
  types: { [x: string]: string }
) {
  const typesList = Object.keys(types);
  // eslint-disable-next-line array-callback-return, consistent-return
  const filterobj = Object.keys(obj).filter((item, key) => {
    if (typesList.includes(item)) {
      if (obj[item] && obj[item] !== 'all') {
        return obj[item];
      }
    }
  });
  // eslint-disable-next-line array-callback-return, consistent-return
  const filters = filterobj.map((key, index) => {
    if (obj[key] && typesList.includes(key)) {
      const type = types[key] || 'like';
      return `filter[${index}][field]=${key}&filter[${index}][type]=${type}&filter[${index}][value]=${encodeURIComponent(
        obj[key]
      )}`;
    }
  });
  return filters.join('&');
}
export function buildFilters(filters: any[]) {
  return filters
    .map((filter, index) => {
      return `filter[${index}][field]=${encodeURIComponent(
        filter.field
      )}&filter[${index}][type]=${encodeURIComponent(
        filter.type
      )}&filter[${index}][value]=${encodeURIComponent(filter.value)}`;
    })
    .join('&');
}

export const createColumnsFormat = (fields: any[]) => {
  return fields.map((field) => ({
    columnId: field.id,
    width: field.width || 150,
    resizable: field.resizable !== undefined ? field.resizable : true,
    reorderable: field.reorderable !== undefined ? field.reorderable : true,
    header: field.header,
  }));
};

export const createRowsHeader = (headers: any[]) => {
  return headers.map((header) => ({
    type: 'header',
    text: header.text,
  }));
};

export const createrowFormat = (container: any, fieldConfig: any = {}) => {
  if (!container) return [];

  return Object.keys(container).map((key) => {
    const value = container[key];

    if (typeof value === 'object' && value !== null && 'label' in value && 'value' in value) {
      return {
        type: fieldConfig[key]?.type || 'text',
        nonEditable:
          fieldConfig[key]?.nonEditable !== undefined ? fieldConfig[key].nonEditable : false,
        text: fieldConfig[key]?.text ? fieldConfig[key].text(value.value) : value.label || '*',
      };
    }

    return {
      type: fieldConfig[key]?.type || 'text',
      nonEditable:
        fieldConfig[key]?.nonEditable !== undefined ? fieldConfig[key].nonEditable : false,
      text: fieldConfig[key]?.text ? fieldConfig[key].text(value) : value || '*',
    };
  });
};

export const getFormatToCurrentTimeZone = (date: string | Date) => {
  const newDate = new Date(date || new Date());
  const timezoneOffset = newDate.getTimezoneOffset() * 60000;
  const localISODate = `${new Date(newDate.getTime() - timezoneOffset)
    .toISOString()
    .slice(0, -1)}Z`;
  return localISODate;
};

export const convertCurrency = (value: number | bigint, currency: string) => {
  let result = '';
  if (currency === 'USD') {
    result = new Intl.NumberFormat('en-US', {
      style: 'decimal',
      currency: 'USD',
    }).format(value);
  } else if (currency === 'VND') {
    result = new Intl.NumberFormat('vi-VN', {
      style: 'decimal',
      currency: 'VND',
    }).format(value);
  }

  return result;
};

export const non_signed = (str: {
  normalize: (arg0: string) => any;
  replaceAll: (arg0: RegExp, arg1: string) => any;
}) => {
  str = str.normalize('NFC');
  str = str.replaceAll(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/, 'a');
  str = str.replaceAll(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/, 'e');
  str = str.replaceAll(/(ì|í|ị|ỉ|ĩ)/, 'i');
  str = str.replaceAll(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/, 'o');
  str = str.replaceAll(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/, 'u');
  str = str.replaceAll(/(ỳ|ý|ỵ|ỷ|ỹ)/, 'y');
  str = str.replaceAll(/(đ)/, 'd');
  str = str.replaceAll(/(À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ)/, 'A');
  str = str.replaceAll(/(È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ)/, 'E');
  str = str.replaceAll(/(Ì|Í|Ị|Ỉ|Ĩ)/, 'I');
  str = str.replaceAll(/(Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ)/, 'O');
  str = str.replaceAll(/(Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ)/, 'U');
  str = str.replaceAll(/(Ỳ|Ý|Ỵ|Ỷ|Ỹ)/, 'Y');
  str = str.replaceAll(/(Đ)/, 'D');
  return str;
};
export const titleCase = (str = '') => {
  return str
    .toLowerCase()
    .split(' ')
    .filter((filterItem) => filterItem)
    .map((mapItem) => mapItem.charAt(0).toUpperCase() + mapItem.substring(1))
    .join(' ');
};

export const handleUrl = (url = '') => {
  return url.toLowerCase();
};

export const uppercase = (str = '') => {
  return str.toUpperCase();
};

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export const generateString = (length = 8) => {
  let result = '';
  const charactersLength = characters.length;
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};

export const isNumeric = (string: string) => /^[+-]?\d+(?:,?\d+)?(\.\d+)?$/.test(string);

export const convertNumber = (value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
