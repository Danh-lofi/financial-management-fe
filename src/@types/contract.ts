type IUpdateCurrentContract = {
  isCurrent: boolean;
  contractId: number;
};
// v2
type IContractCreated = {
  id: number | string;
  employeeId: string | number;
  projectId: string | number;
  customerCode: string | number;
  contractTypeId: string | number;
  contractNo: string;
  contract_url: string;
  startDate: Date | string;
  endDate: Date | string | null;
  jobStartDate: Date | string; 
  jobEndDate: Date;
  name: string;
  reason: string;
  note: string;
  details: IDetailContract[] | [];
};
// v1
// type IContractCreated = {
//   employeeId: string | number;
//   projectId: string | number;
//   customerCode: string | number;
//   contractTypeId: string | number;
//   duration: number;
//   startDate: Date;
//   endDate: Date;
// };
type IContractFilter = {
  employeeId: string | number;
  projectId?: string | number;
};

type IContract = {
  id: number;
  contractType: string;
  contractType_id: string;
  employee_id: number;
  project_id: number;
  employeeCode: string | number;
  customerCode: string | number;
  isCurrent: boolean;
  details: IDetailContract[];
  allowanceList?: IAllowance[];
  contractNo: string;
  contract_url: string;
  startDate: Date;
  endDate: Date;
  jobStartDate: Date;
  jobEndDate: Date;
  name: string;
  reason: string;
  note: string;
};

type IDetailContract = {
  id: number;
  contract_id: number;
  employee_id: number;
  name: string;
  duration: number;
  startDate: Date | string;
  endDate: Date | string;
  // contractNo: string;
  position: string;
  insuranceRate: number;
  basicSalary: number;
  allowance1?: number;
  allowance1Id?: number;
  allowance2?: number;
  allowance2Id?: number;
  allowance3?: number;
  allowance3Id?: number;
  allowance4?: number;
  allowance4Id?: number;
  allowance5?: number;
  allowance5Id?: number;
  note: string;
};

// Allowance
type IAllowance = {
  id: number | string;
  contract_id: number | string;
  name: string;
  value: number | string;
};

type assignAllowance = {
  contractId?: number;
  contractDetailId?: number;
  allowance1Id?: number;
  allowance2Id?: number;
  allowance3Id?: number;
  allowance4Id?: number;
  allowance5Id?: number;
};
