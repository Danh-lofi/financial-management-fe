type ITax = {
  id: number | string;
  taxCode: number | string;
  typeOfTaxDocument: string;
  employee_id?: number | string;
  appliedTax: string;
  relationships?: IRelationshipTax[];
};

type IRelationshipTax = {
  id: number | string;
  fullName: string;
  identityCard: string;
  dateOfBirth: Date | string;
  taxCode: string;
  relationship: string;
  typeOfDocument: string;
  startDate: Date | string;
  endDate: Date | string;
  employee_id: number | string;
  documentCode: string;
  document_url: string | null;
  note: string;
};
