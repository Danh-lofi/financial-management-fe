export type IPolicyEmployee = {
    codeOfPolicyList: string | number;
    nameOfBudgetExpenseList: string | number;
    quantity: string;
    fromLevel: string | number;
    toLevel: string | number;
    effectiveDate: string;
    applicableTo: string;
    legalAcceptable: string;
    industry: string;
    region: string;
    department: string;
    level: string;
    position: string;
    employeeId: string | number;
    employeeName: string;
    phoneNumber: string | number;
    purpose: string;
    referenceCardNumber: string | number;
    numberOfDaysOccurrences: string | number;
    scheduleFromDate: string;
    scheduleToDate: string;
    advancePaymentDate: string;
    refundDate: string;
    uploadedDocuments: any;
    additionalExplanation: string;
  };
  
  export type IPolicyEmployeeState = {
    employeeList: IPolicyEmployee[];
  };