export type IDepartment = {
    departmentId?: number | string;
    departmentName?: string;
    id?: number | string | any;
    code?: string | number;
    name?: string;
}

export type IDepartmentState = {
    departmentList: IDepartment[];
    departmentCount: number;
    departmentDetail: IDepartment
}