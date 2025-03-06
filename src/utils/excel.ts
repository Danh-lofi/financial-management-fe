import * as excelJs from 'exceljs';
import { isArray } from 'lodash';
import * as XLSX from 'xlsx';
import snackbar from './snackbar';

const excelUtil = {
  generateTemplate: async ({ headerTitle, title }: any): Promise<any> => {
    const newHeaderTitle = headerTitle.filter((header: any) => header !== 'id');
    // Create a new ExcelJS Workbook
    const workbook = new excelJs.Workbook();
    // Add new sheet
    const worksheet = workbook.addWorksheet('My Sheet');
    if (!isArray(newHeaderTitle)) {
      return snackbar.error('Header title must be an array');
    }
    const columns: any = [];
    newHeaderTitle.forEach((item, index) => {
      columns.push({ key: item, width: 50 });
    });
    worksheet.columns = columns;
    // Add column headers and define column keys and widths
    const headers = newHeaderTitle;
    const headerRow = worksheet.addRow(headers);
    // Style for header
    headerRow.eachCell((cell) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF14B0CD' },
      };
      cell.font = {
        bold: true,
        color: { argb: 'FFFFFFFF' },
      };
    });

    const excelBlob = await workbook.xlsx.writeBuffer();
    const excelUrl = URL.createObjectURL(
      new Blob([excelBlob], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      })
    );

    const link = document.createElement('a');
    link.href = excelUrl;
    link.download = `${title}.xlsx`;
    document.body.appendChild(link);
    link.click();
    URL.revokeObjectURL(excelUrl);
    document.body.removeChild(link);
    return Promise.resolve();
  },

  formatDataFromExcel: (data: any) => {
    const workbook = XLSX.read(data, { type: 'binary' });
    // Get the first sheet
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    // Convert the worksheet to JSON
    const jsonData = XLSX.utils.sheet_to_json(worksheet);
    return jsonData;
  },
};
export { excelUtil };

export const handleExportExel = async (columns: any, datasource: any, exportfileName: string) => {
  if (!columns || !datasource || !Array.isArray(datasource)) return;

  // Filter out columns with "id" key
  columns = columns.filter((column: any) => column.key !== 'id');

  // Create a new ExcelJS Workbook
  const workbook = new excelJs.Workbook();
  const worksheet = workbook.addWorksheet('My Sheet');

  // Calculate column widths based on content length
  const columnWidths = columns.map((column: any) => {
    const maxLength = Math.max(
      column.name.length, // Header length
      ...datasource.map((row) => String(row[column.key] || '').length) // Row data lengths
    );
    return { header: column.name, key: column.key, width: Math.max(10, maxLength + 2) };
  });

  // Apply column configurations
  worksheet.columns = columnWidths;

  // Format data by adding an index (STT)
  const formatData = datasource.map((item, index) => ({ ...item, STT: index + 1 }));

  // Add rows to worksheet
  formatData.forEach((item) => {
    worksheet.addRow(item);
  });

  // Style the header row
  const headerRow = worksheet.getRow(1);
  headerRow.eachCell((cell) => {
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF14B0CD' },
    };
    cell.font = {
      color: { argb: 'FFFFFFFF' },
      bold: true,
    };
  });

  // Create the Excel file download link
  const excelBlob = await workbook.xlsx.writeBuffer();
  const excelUrl = URL.createObjectURL(
    new Blob([excelBlob], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    })
  );

  const link = document.createElement('a');
  link.href = excelUrl;
  link.download = exportfileName ?? 'report.xlsx';
  document.body.appendChild(link);
  link.click();

  // Clean up
  URL.revokeObjectURL(excelUrl);
  document.body.removeChild(link);
};

export const handleImportExcel = async (data: any) => {
  return excelUtil.formatDataFromExcel(data);
};

export const handleExportExelTemplate = async (columns: any) => {
  try {
    const title = 'Template';
    const headerTitle = columns.map((item: any) => item.name);
    await excelUtil.generateTemplate({ headerTitle, title });
  } catch (error: any) {
    console.log(error);
    snackbar.error('Có lỗi xảy ra khi tải file');
  }
};
