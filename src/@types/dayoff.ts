export type IDayoff = {
    dayoffId?: number | string;
    dayoffName?: string;
    id?: number | string | any;
    code?: string | number;
    name?: string;
}

export type IDayoffState = {
    dayoffList: IDayoff[];
    dayoffCount: number;
    dayoffDetail: IDayoff
}