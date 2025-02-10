export interface ColumnTax {
  field:
    | 'stt'
    | 'fullName'
  | 'dateOfBirth'
    | 'taxCode'
    | 'identityCard'
    | 'relationship'
    | 'startDate'
    | 'endDate'
  | 'documentCode'
  | 'document_url'
    | 'note'
    | 'actions';
  headerName: string;
  width?: number;
  align?: any;
  editable?: boolean;
  sortable?: boolean;
  format?: (value: number) => string;
  renderCell?: any;
  rowSpan?: number;
  colSpan?: number;
}

export interface DataTaxTable {
  stt: string | number;
  fullName: string;
  birthDate: string | Date;
  taxCode: number | string;
  identityCard: string | number;
  relationship: string;
  startDate: string | Date;
  endDate: string | Date;
  numberOfDocument: string | number;
  typeOfDocument: string;
  actions?: any;
}
