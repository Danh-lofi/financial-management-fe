export type IPosition = {
    positionId?: number | string;
    positionName?: string;
    id?: number | string | any;
    code?: string | number;
    name?: string;
}

export type IPositionState = {
    positionList: IPosition[];
    positionCount: number;
    positionDetail: IPosition
}