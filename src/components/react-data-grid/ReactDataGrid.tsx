/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable @typescript-eslint/no-unused-expressions */

/* eslint-disable no-prototype-builtins */

/* eslint-disable react-hooks/exhaustive-deps */

import { isArray, groupBy as rowGrouper } from 'lodash-es';
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import ReactDataGrid, { SelectColumn, SortColumn, TreeDataGrid, textEditor } from 'react-data-grid';
import { v4 as uuidv4 } from 'uuid';
import WButtonImportFile from '@/components/common/WButtonImportFile';
import Scrollbar from '@/components/scrollbar';
import { handleExportExel, handleExportExelTemplate } from '@/utils/excel';
import { ImportExportOutlined, Search } from '@mui/icons-material';
import {
  Box,
  CircularProgress,
  Divider,
  Grid,
  InputAdornment,
  Tab,
  TablePagination,
  Tabs,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import WToolbarTable from '../common/WToolbarTable';
import EmptyContent from '../empty-content';
import {
  copyFormRequest,
  deleteFormRequest,
  messageErrorList,
  saveFormRequest,
} from './basic-render-data';
import { renderCellEditCascade } from './render-edit-component/DataGridCellEditCascade';
import { renderCellEditDatePicker } from './render-edit-component/DataGridCellEditDatePicker';
import { renderCellEditDateExpand } from './render-edit-component/DataGridCellEditExpand';
import { renderCellEditMutilpleSelect } from './render-edit-component/DataGridCellEditMutilpleSelect';
import { useRenderCellEditPassword } from './render-edit-component/DataGridCellEditPassword';
import { renderCellEditSelect } from './render-edit-component/DataGridCellEditSelect';
import { renderCellEditToolBar } from './render-edit-component/DataGridCellEditToolBar';
import { useRenderCellTextInput } from './render-edit-component/DataGridNewInput';
import { useRenderCellNumberInput } from './render-edit-component/DataGridNewNumberInput';

// eslint-disable-next-line import/no-extraneous-dependencies


// eslint-disable-next-line import/no-extraneous-dependencies

















// eslint-disable-next-line import/no-cycle



export const clickSelectRowType = {
  none: 'none',
  cell: 'cell',
};

export const selectionTypes = {
  multi: 'multi',
  single: 'single',
  none: 'none',
};

export const columnTypes = {
  DatePicker: 'DatePicker',
  TextEditor: 'TextEditor',
  Checkbox: 'Checkbox',
  Select: 'Select',
  MutipleSelect: 'MutipleSelect',
  Cascade: 'Cascade',
  ToolBar: 'ToolBar',
  Password: 'Password',
  TextInput: 'TextInput',
  NumberInput: 'NumberInput',
  Switch: 'Switch',
  Badge: 'Badge',
  Expanded: 'Expanded',
  Tooltip: 'Tooltip',
  ProgressBar: 'Progress',
  TreeView: 'TreeView',
};

export const paginationTypes = {
  none: 'none',
  scroll: 'scroll',
  pagination: 'pagination',
};

const getEditCell = (key: string, cellType: string, options: object[], baseColumn: object[]) => {
  switch (cellType) {
    case columnTypes.DatePicker:
      return ({ row, onRowChange }: { row: any; onRowChange: () => void }) =>
        renderCellEditDatePicker({
          key,
          row,
          onRowChange,
          baseColumn,
        });
    case columnTypes.Select:
      return ({ row, onRowChange }: { row: any; onRowChange: () => void }) =>
        renderCellEditSelect({
          key,
          row,
          onRowChange,
          options,
          baseColumn,
        });

    case columnTypes.MutipleSelect:
      return ({ row, onRowChange }: { row: any; onRowChange: () => void }) =>
        renderCellEditMutilpleSelect({
          key,
          row,
          onRowChange,
          options,
          baseColumn,
        });
    case columnTypes.Cascade:
      return ({ row, onRowChange }: { row: any; onRowChange: () => void }) =>
        renderCellEditCascade({
          key,
          row,
          onRowChange,
          options,
          baseColumn,
        });
    case columnTypes.ToolBar:
      return ({
        row,
        onRowChange,
        handleConfirm,
        buttonConfig,
      }: {
        row: any;
        onRowChange: () => void;
        handleConfirm: () => void;
        buttonConfig: [];
      }) =>
        renderCellEditToolBar({
          key,
          row,
          handleConfirm,
          onRowChange,
          options,
          buttonConfig,
        });

    case columnTypes.Password:
      return ({ row, onRowChange }: { row: any; onRowChange: () => void }) =>
        useRenderCellEditPassword({
          key,
          row,
          onRowChange,
        });

    case columnTypes.TextInput:
      return ({ row, onRowChange }: { row: any; onRowChange: () => void }) =>
        useRenderCellTextInput({
          key,
          row,
          onRowChange,
          baseColumn,
        });

    case columnTypes.NumberInput:
      return ({ row, onRowChange }: { row: any; onRowChange: () => void }) =>
        useRenderCellNumberInput({
          key,
          row,
          onRowChange,
          baseColumn,
        });
    // case columnTypes.Expanded:
    //   return ({ row, onRowChange }: { row: any; onRowChange: () => void }) =>
    //     renderCellEditDateExpand({
    //       key,
    //       row,
    //       onRowChange,
    //       baseColumn,
    //     });

    default:
      return ({
        row,
        onRowChange,
        column,
        onClose,
      }: {
        row: any;
        onRowChange: () => void;
        column: any;
        onClose: () => void;
      }) => {
        if (!row.isNew) {
          row.isEdit = true;
        }
        const propsTextEditor: any = {
          column,
          row,
          onRowChange,
          onClose,
        };
        return textEditor(propsTextEditor);
      };
  }
};

const handleRenderColumn = ({
  type = columnTypes.TextEditor,
  editable = true,
  visible = true,
  render,
  key,
  selection,
  index,
  baseColumn,
  width,
  isRequired,
  ...props
}: {
  type: string;
  editable: boolean;
  visible: boolean;
  render: () => {};
  key: string;
  selection: any;
  index: number;
  baseColumn: [];
  options?: [];
  renderCell: () => void;
  width?: number;
  isRequired?: boolean;
  renderHeaderCell: null;
  // [key: string]: any;
}) => {
  const column: any = {
    ...props,
    key,
    width,
    renderEditCell: editable ? getEditCell(key, type, props?.options ?? [], baseColumn) : null,
  };

  // Hide column when visible = true
  if (!visible) return null;

  // custom renderCell
  if (typeof render === 'function') column.renderCell = render;

  // Hide header of column SelectColumn
  if (selection === selectionTypes.single && index === 0) column.renderHeaderCell = null;

  // Hide all SelectColumn
  if (selection === selectionTypes.none && index === 0) {
    return null;
  }

  if (isRequired) {
    // console.log("isRequired", isRequired);
    column.name = (
      <div>
        {column.name}
        <span style={{ color: 'red' }}> *</span>
      </div>
    );
  }
  return column;
};

function EmptyRowsRenderer() {
  return (
    <div style={{ textAlign: 'center', gridColumn: '1/-1', padding: '10px' }}>
      <EmptyContent title="Không có dữ liệu" />
    </div>
  );
}

export const dataGridType = {
  datagrid: 'datagrid',
  treedatagrid: 'treedatagrid',
};

const pickComponent = (type: any) =>
  ({
    [dataGridType.datagrid]: ReactDataGrid,
    [dataGridType.treedatagrid]: TreeDataGrid,
  }[type]);

type DataGridProps = {
  direction?: 'ltr' | 'rtl';
  style?: React.CSSProperties;
  columns: any[];
  className?: string;
  columnKeySelected?: string;
  selection?: string;
  clickSelectRow?: string;
  selectedOption?: any[];
  expandedGroupIdsProps?: any[];
  rows: any[];
  setRows: (rows: any[]) => void;
  onFocus?: () => void;
  limit?: number;
  maxHeight?: number;
  pagination?: string;
  isSearch?: boolean;
  toolbar?: React.ReactNode;
  isFill?: boolean;
  typeDataGrid?: string;
  handleGetSelect?: (obj: any) => boolean;
  handleCheckSelect?: (obj: any) => void;
  onCellDoubleClick?: (obj: object) => void;
  onCellClick?: (value: object) => void;
  rowHeightExpanded?: number;
  // eslint-disable-next-line react/no-unused-prop-types
  filterColumn?: any;
  onRowChange?: (row: any, obj: any) => void;
  defaultSelects?: any;
  searchData: any[];
  currentData: any[];
  dataGridRef: any;
  fitContent?: boolean;
  isCount?: boolean;
  // eslint-disable-next-line react/no-unused-prop-types
  totalRow?: number;
  [key: string]: any; // Allow additional properties
  exportfileName?: string;
  isTabs?: boolean;
  tabItems: any[];
  setTabItem: (tab: any) => void;
  isLoading?: boolean;
  defaultData?: any;
  buttonConfirm?: (p: any) => void;
};

type reactDataGridHandle = {
  getSelectedRows: () => void;
  setSelectedRows: (value: Set<string>) => void;
  getRows: () => void;
  insertRows: () => void;
  handleResetSelected: () => void;
  handleValidate: () => void;
};

const DataGrid = forwardRef<reactDataGridHandle, DataGridProps>(
  (
    {
      direction = 'ltr',
      style,
      columns = [],
      className = '',
      columnKeySelected = 'id',
      selection = selectionTypes.multi,
      clickSelectRow = clickSelectRowType.none,
      selectedOption = [],
      expandedGroupIdsProps = [],
      rows = [],
      setRows,
      onFocus,
      limit = 10,
      maxHeight = 600,
      pagination = paginationTypes.scroll,
      isSearch = true,
      fitContent = false,
      isFill = true,
      typeDataGrid = dataGridType.datagrid,
      handleGetSelect,
      handleCheckSelect,
      onCellDoubleClick = () => {},
      onCellClick = () => {},
      rowHeightExpanded = 100,
      onRowChange,
      defaultSelects = new Set(),
      searchData = [],
      currentData = [],
      dataGridRef = {},
      isCount = true,
      toolbar = [],
      // eslint-disable-next-line react/prop-types
      functionRequire,
      exportfileName,
      isTabs = false,
      tabItems = [],
      setTabItem,
      isLoading = false,
      defaultData = {},
      buttonConfirm,
    },
    ref
  ) => {
    const [sortColumns, setSortColumns] = useState([] as SortColumn[]);
    const [selectedRows, setSelectedRows] = useState(defaultSelects);
    const [currentRows, setCurrentRows] = useState(currentData);
    const [filterData, setFilterData] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const reactDataGridRef = useRef(dataGridRef);
    const [isSearching, setIsSearching] = useState(false);
    const [dataSearch, setDataSearch] = useState(searchData);
    const [expandedGroupIds, setExpandedGroupIds] = useState(new Set<any>([]));

    useEffect(() => {
      if (expandedGroupIdsProps.length > 0) {
        setExpandedGroupIds(new Set(expandedGroupIdsProps));
      }
    }, [expandedGroupIdsProps]);

    const ComponentDataGrid = useMemo(() => {
      return pickComponent(typeDataGrid);
    }, [typeDataGrid]);

    useEffect(() => {
      handleRenderRows(currentPage, limit, pagination, !isSearching ? rows : dataSearch);
    }, [currentPage, limit, pagination, rows, dataSearch, isSearching]);

    useEffect(() => {
      const listSelectdRows = [...selectedRows];
      if (listSelectdRows.length === 0 && isSearching) {
        const missRow = dataSearch.filter((rowSearch: any) => {
          return !rows.some((rowItem: any) => rowItem.id === rowSearch.id);
        });
        const newDataSearch = dataSearch.filter((rowSearch: any) => {
          return !missRow.some((rowMiss: any) => rowMiss.id === rowSearch.id);
        });
        setDataSearch(newDataSearch);
      }
    }, [selectedRows]);

    const handleRenderRows = (
      // eslint-disable-next-line @typescript-eslint/no-shadow
      currentPage: number,
      // eslint-disable-next-line @typescript-eslint/no-shadow
      limit: number,
      // eslint-disable-next-line @typescript-eslint/no-shadow
      pagination: string,
      // eslint-disable-next-line @typescript-eslint/no-shadow
      rows: any[]
    ) => {
      const start_index = (currentPage - 1) * limit;
      const dataRowCurrent = rows?.slice(start_index, start_index + limit);
      switch (pagination) {
        case 'none':
          setCurrentRows(rows);
          break;
        case 'scroll': {
          let dataRowCurrentScroll: any = [];
          if (start_index === 0) {
            dataRowCurrentScroll = rows.slice(
              rateScreen * start_index,
              rateScreen * (start_index + limit)
            );
          } else {
            dataRowCurrentScroll = rows.slice(
              rateScreen * start_index,
              rateScreen * start_index + limit
            );
          }
          if (
            currentRows.length === selectedRows.size &&
            currentRows.length !== 0 &&
            selectedRows.size !== 0
          ) {
            const idArrRowCurrent = dataRowCurrentScroll.map(
              (item: any) => item[columnKeySelected]
            );
            setSelectedRows(
              (prevSelectedRows: any) => new Set([...prevSelectedRows, ...idArrRowCurrent])
            );
          }
          setCurrentRows((prevCurrenRows: any[]) => {
            return [...prevCurrenRows, ...dataRowCurrentScroll];
          });
          break;
        }
        case 'pagination':
          setCurrentRows(dataRowCurrent);
          break;
        default:
          break;
      }
    };

    useEffect(() => {
      const currentPageChange = Math.ceil(rows.length / limit);
      if (rows.length > 0 && currentPageChange < currentPage) {
        setCurrentPage(currentPageChange);
      }

      // eslint-disable-next-line no-return-assign
      rows.map((row: any, index: number) => (row.STT = index + 1));
      if (pagination === 'scroll') {
        reactDataGridRef.current?.element.addEventListener('scroll', handleScroll);
      }
      return () => {
        reactDataGridRef.current?.element.removeEventListener('scroll', handleScroll);
      };
    }, [rows]);

    const rateScreen = useMemo(() => {
      return Math.ceil(maxHeight / (limit * 30));
    }, []);

    const summaryRows = useMemo(() => {
      return [
        {
          id: 'total_0',
          totalCount: rows.length,
          totalSearch: dataSearch.length,
          // cntrNoCount: [...cntrNoCount].length,
        },
      ];
    }, [rows, dataSearch]);

    const columnsCombined = useMemo(() => {
      return [
        {
          ...SelectColumn,
          editable: false,
        },
        ...columns,
      ]
        .map((column, index) => {
          return handleRenderColumn({
            ...column,
            editable:
              column?.key === 'STT' || column?.type === 'Checkbox' ? false : column?.editable,
            baseColumn: column,
            width: fitContent ? column?.width || 'max-content' : column?.width,
            selection,
            index,
          });
        })
        .filter((column) => column);
    }, [columns, selection, rows]);

    const rowHeight = useMemo(() => {
      if (columns.some((item: any) => item?.type === 'ToolBar')) {
        // return 40;
        return 30;
      }
      return 30;
    }, [columns]);

    const handleFill = useCallback(({ columnKey, sourceRow, targetRow }: any) => {
      const columnFill = columns.find((column: any) => column.key === columnKey);
      if (!isFill || columnFill?.isFill === false) {
        return { ...targetRow };
      }
      return { ...targetRow, [columnKey]: sourceRow[columnKey] };
    }, []);

    const handlePaste = useCallback(
      ({ sourceColumnKey, sourceRow, targetColumnKey, targetRow }: any) => {
        return { ...targetRow, [targetColumnKey]: sourceRow[sourceColumnKey] };
      },
      []
    );

    const handleCopy = useCallback(
      ({ sourceRow, sourceColumnKey }: { sourceRow: any; sourceColumnKey: string }) => {
        if (window.isSecureContext) {
          navigator.clipboard.writeText(sourceRow[sourceColumnKey]);
        }
      },
      []
    );

    const handleResetSelected = () => {
      setSelectedRows(new Set());
    };

    useImperativeHandle(
      ref,
      () => {
        return {
          getSelectedRows: () => {
            return selectedRows;
          },
          setSelectedRows: (value) => {
            setSelectedRows(value);
          },
          getRows: () => {
            return rows;
          },
          insertRows,
          handleResetSelected,
          handleValidate,
        };
      },
      [selectedRows, rows, dataSearch]
    );

    const handleScroll = () => {
      const dataGridScrollTop = reactDataGridRef.current.element.scrollTop;
      const dataGridScrollHeight = reactDataGridRef.current.element.scrollHeight;
      const dataGridClientHeight = reactDataGridRef.current.element.clientHeight;
      if (dataGridScrollTop + 20 >= dataGridScrollHeight - dataGridClientHeight) {
        setCurrentPage((prevPage) => {
          return prevPage + 1;
        });
      }
    };

    function findObjectsWithDiffValues(arr1: any[], arr2: any[]) {
      // eslint-disable-next-line no-restricted-syntax
      for (const element of arr1) {
        const object1 = element;
        const matchingObject = arr2.find((object2) => object1.id === object2.id);

        if (matchingObject) {
          const isDifferent = Object.keys(object1)
            .filter((key) => key !== 'id')
            .some((key) => object1[key] !== matchingObject[key]);

          if (isDifferent) {
            return { ...matchingObject };
          }
        }
      }
      return {};
    }

    const handleRowsChange = (newRows: any[], { indexes, column }: any) => {
      if (pagination === paginationTypes.pagination) {
        if (isSearching) {
          const rowDiff = findObjectsWithDiffValues(currentRows, newRows);
          if (rowDiff) {
            // const pageDiff = Math.ceil(rows.findIndex((item) => item.id === rowDiff[columnKeySelected]) / limit)
            const indexRowDiff = rows.findIndex(
              (item: any) => item.id === rowDiff[columnKeySelected]
            );
            setDataSearch([
              ...dataSearch.slice(0, (currentPage - 1) * limit),
              ...newRows,
              ...dataSearch.slice(currentPage * limit),
            ]);
            const newRowsOrigin = rows.map((row: any) => {
              if (row[columnKeySelected] === rowDiff[columnKeySelected])
                return { ...rowDiff, STT: indexRowDiff + 1 };
              return { ...row };
            });
            setRows(newRowsOrigin);
          }
        } else {
          setRows([
            ...rows.slice(0, (currentPage - 1) * limit),
            ...newRows,
            ...rows.slice(currentPage * limit),
          ]);
        }
      } else {
        setRows(newRows);
      }
      onRowChange?.(newRows, { indexes, column });
    };

    const insertRows = (rowNumb = 1, insertRowIdx = 0, keyInsert = 'id', rowCustom = {}) => {
      const newRow: any = {};
      columns.forEach((column: any) => {
        let valueColumn;

        if (defaultData[column.key] !== undefined) {
          valueColumn = defaultData[column.key];
        } else if (column.type === columnTypes.Checkbox) {
          valueColumn = false;
        } else if (column.type === columnTypes.DatePicker) {
          valueColumn = undefined;
        } else {
          valueColumn = undefined;
        }

        newRow[column.key] = valueColumn;
      });
      const newRows: any = [];
      Array(rowNumb)
        .fill(0)
        .map((_p: any) => {
          const newRowValue = {
            ...newRow,
            ...rowCustom,
            isNew: true,
          };
          newRowValue[keyInsert] = uuidv4();
          return newRows.push(newRowValue);
        });
      const newRowsInsert = [
        ...rows.slice(0, insertRowIdx),
        ...newRows,
        ...rows.slice(insertRowIdx),
      ];

      setRows(newRowsInsert);
      if (isSearching) {
        setDataSearch([
          ...dataSearch.slice(0, insertRowIdx),
          ...newRows,
          ...dataSearch.slice(insertRowIdx),
        ]);
      }
    };

    const handleSelected = (idRowSelected: any) => {
      if (selection === selectionTypes.multi) {
        setSelectedRows(idRowSelected);
        handleGetSelect?.(idRowSelected);
      }
      if (selection === selectionTypes.single || clickSelectRow === clickSelectRowType.cell) {
        let value = idRowSelected;
        if (typeof value === 'object') {
          const rowSelectedArr = [...value];
          value = rowSelectedArr[rowSelectedArr.length - 1];
        }
        setSelectedRows(() => new Set([value]));
        handleGetSelect?.(value);
      }
    };

    const handleValidate = (keyId = 'id') => {
      const listRowsChange = rows.filter((row: any) => row?.isEdit || row?.isNew);
      const requiredFields = columns.filter((field: any) => field.required);
      const listValidate = listRowsChange.map((item: any) => {
        const errors: any = [];
        requiredFields.forEach((field: any) => {
          if ((field.required && !item.hasOwnProperty(field.key)) || !item[field.key]) {
            errors.push(field.key);
          }
        });
        return { [keyId]: item[keyId], isError: errors.length > 0, errors };
      });

      setRows(
        rows.map((row: any) => {
          const indexValidate = listValidate.findIndex(
            (itemValidate: any) => itemValidate[keyId] === row[keyId]
          );
          if (indexValidate !== -1) {
            const messageError = listValidate[indexValidate].errors.map((item: any) => {
              return `${item} bắt buộc phập`;
            });
            const newRow = {
              ...row,
              isError: listValidate[indexValidate].isError,
              errors: listValidate[indexValidate].errors,
              errorMessage: messageErrorList(messageError, columns),
            };

            listValidate[indexValidate]?.errors?.length === 0 && delete newRow.errors;
            return newRow;
          }
          return {
            ...row,
          };
        })
      );
      return {
        isCheck: !listValidate.some((item: any) => item.isError),
        validate: listValidate,
      };
    };

    const handleSearchTable = (value: any) => {
      setFilterData(value);
      if (value === '') {
        setIsSearching(false);
        handleRenderRows(1, limit, pagination, rows);
      } else {
        setIsSearching(true);
        const newRows = handleFindSearch(value);
        handleRenderRows(1, limit, pagination, newRows);
      }
      setCurrentPage(1);
    };

    const handleFindSearch = (value: any) => {
      const filterColumnSearch = columns.map((item: any) => item.key);
      const newRows = rows.filter((row: any) => {
        return filterColumnSearch.some((column: any) => {
          return row[column]?.toString().toUpperCase().includes(value?.toUpperCase());
        });
      });
      setDataSearch(newRows);
      return newRows;
    };

    const handleImportExcel = (data: any) => {
      const newRows = data.map((item: any) => {
        const listKey = Object.keys(item);
        if (isArray(listKey)) {
          // eslint-disable-next-line array-callback-return
          listKey.map((key) => {
            item[key] = item[key] === 'undefined' ? null : item[key];
          });
        }

        delete item.STT;
        return {
          ...item,
          id: uuidv4(),
          isNew: true,
        };
      });
      setRows([...newRows, ...rows]);
    };

    const renderToolbar = useMemo(() => {
      // if (toolbar.find((item: any) => item.id === 'importExcel')) {
      //   return toolbar.map((item: any) => {
      //     if (item.id === 'importExcel') {
      //       return {
      //         ...item,
      //         icon: (
      //           <>
      //             <WButtonImportFile
      //               className="upload-table"
      //               onUpload={handleImportExcel}
      //               headers={columns}
      //               title=""
      //             >
      //               {' '}
      //             </WButtonImportFile>
      //             <ImportExportOutlined />
      //           </>
      //         ),
      //       };
      //     }
      //     return item;
      //   });
      // }
      return toolbar;
    }, [toolbar]);

    const handleConfirmButton = ({ type, value }: any) => {
      switch (type) {
        case 'add':
          insertRows(parseInt(value, 10));
          break;
        case 'importExcel':
          break;
        case 'export_excel':
          handleExportExel(columns, rows, exportfileName);
          break;
        case 'exampleExcel':
          handleExportExelTemplate(columns);
          break;
        case 'save': {
          const rowsSave = saveFormRequest(rows);
          const { isCheck } = handleValidate();
          if (isCheck) {
            // eslint-disable-next-line react/prop-types
            functionRequire?.saveFunction(rowsSave);
          }
          break;
        }
        case 'delete': {
          const { newRows, listRowsDel } = deleteFormRequest(rows, selectedRows);
          setRows(newRows);
          // eslint-disable-next-line react/prop-types
          functionRequire?.deleteFunction(listRowsDel);
          break;
        }
        case 'sync': {
          // eslint-disable-next-line react/prop-types
          functionRequire.syncFunction();
          break;
        }
        case 'loadData': {
          // eslint-disable-next-line react/prop-types
          functionRequire.loadDataFunction();
          break;
        }
        case 'copySource': {
          const { newRows, listRowsCopy } = copyFormRequest(rows, selectedRows);
          // eslint-disable-next-line react/prop-types
          functionRequire.copySourceFunction(listRowsCopy);
          break;
        }

        case 'send':
          // eslint-disable-next-line react/prop-types
          functionRequire?.sendFunction(selectedRows);
          break;

        default:
          break;
      }
    };

    return (
      <Box sx={{ position: 'relative', width: '100%' }}>
        <Box sx={{ m: 2 }}>
          {isLoading && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                zIndex: 10,
              }}
            >
              <CircularProgress size={40} />
            </Box>
          )}
          <Grid container direction="column" className="table__container" sx={{ height: '100%' }}>
            {isSearch || toolbar.length > 0 ? (
              <Grid
                item
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 0',
                }}
              >
                {isSearch && (
                  <TextField
                    variant="outlined"
                    size="small"
                    value={filterData}
                    onChange={(e) => handleSearchTable(e.target.value)}
                    placeholder="Tìm kiếm"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Search />
                        </InputAdornment>
                      ),
                    }}
                    // sx={{ width: 280 }}
                  />
                )}
                <WToolbarTable
                  buttonConfig={renderToolbar}
                  handleConfirm={(p) => {
                    handleConfirmButton?.(p);
                    buttonConfirm?.(p);
                  }}
                />
              </Grid>
            ) : null}
            {isTabs && (
              <Grid item>
                <Tabs
                  value={tabItems.findIndex((item: any) => item.active)} // Adjust this according to your tabItems structure
                  onChange={(_, newValue) => setTabItem(tabItems[newValue])}
                >
                  {tabItems.map((tab: any, index: any) => (
                    <Tab key={index} label={tab.label} />
                  ))}
                </Tabs>
              </Grid>
            )}
            <Grid item sx={{ flexGrow: 1, height: '100%', maxHeight }}>
              <Scrollbar>
                {/* Replace ComponentDataGrid with your MUI DataGrid component */}
                <ComponentDataGrid
                  ref={reactDataGridRef}
                  className={`rdg-light rdg-custom none_uppercase ${className} ${
                    pagination === 'scroll' ? 'fill-grid' : ''
                  }`}
                  style={{
                    height: 'calc(100% - 40px)',
                    maxHeight,
                    ...style,
                  }}
                  renderers={{ noRowsFallback: <EmptyRowsRenderer /> }}
                  defaultColumnOptions={{ sortable: true, resizable: true }}
                  sortColumns={sortColumns}
                  onSortColumnsChange={setSortColumns}
                  rows={currentRows}
                  columns={columnsCombined}
                  selectedRows={selectedRows}
                  groupBy={selectedOption}
                  rowGrouper={rowGrouper}
                  expandedGroupIds={expandedGroupIds}
                  onExpandedGroupIdsChange={setExpandedGroupIds}
                  rowHeight={(row: any) => {
                    return row.type === 'DETAIL' ? rowHeightExpanded : rowHeight;
                  }}
                  headerRowHeight={38}
                  direction={direction}
                  rowKeyGetter={(row: any) => row[columnKeySelected]}
                  onRowsChange={handleRowsChange}
                  onSelectedCellChange={typeof onFocus === 'function' ? onFocus : () => {}}
                  enableVirtualization
                  onFill={typeDataGrid === dataGridType.treedatagrid ? null : handleFill}
                  onCopy={handleCopy}
                  onPaste={handlePaste}
                  onSelectedRowsChange={(row) => {
                    if (handleCheckSelect && !handleCheckSelect(row)) return;
                    
                    handleSelected(row);
                  }}
                  onCellDoubleClick={(args) => {
                    onCellDoubleClick(args);
                  }}
                  onCellClick={(args: any, event: any) => {
                    onCellClick(args.row[columnKeySelected]);
                    if (args.column.key === 'title') {
                      event.preventGridDefault();
                      args.selectCell(true);
                    }
                    if (clickSelectRow === clickSelectRowType.cell) {
                      handleSelected(args.row[columnKeySelected]);
                    }
                  }}
                />
              </Scrollbar>
              <Divider />
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  height: 40,
                  padding: '10px 0',
                }}
              >
                {isCount && (
                  <Typography variant="subtitle1" color="text.secondary">
                    {isSearching
                      ? `Số dòng tìm kiếm: ${dataSearch.length} / ${summaryRows[0].totalCount}`
                      : `${summaryRows[0].totalCount === 0 ? 0 : limit * (currentPage - 1) + 1}-${
                          summaryRows[0].totalCount > limit * currentPage
                            ? limit * currentPage
                            : summaryRows[0].totalCount
                        } of ${summaryRows[0].totalCount} rows`}
                  </Typography>
                )}
                {pagination === 'pagination' && summaryRows[0].totalCount > 0 && (
                  <TablePagination
                    component="div"
                    count={isSearching ? dataSearch.length : rows.length}
                    page={currentPage - 1}
                    onPageChange={(_, newPage) => setCurrentPage(newPage + 1)}
                    rowsPerPage={limit}
                    rowsPerPageOptions={[]}
                  />
                )}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    );
  }
);

export default DataGrid;
