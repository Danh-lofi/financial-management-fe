export type IObjectType = {
    id?: number | string;
    objectType?: string ;
    objectCode?: string | number;
    objectName?: string ;
}

export type IObjectState = {
    status?: IObjectType[],
    experienceStatus?: IObjectType[],
    contractType?: IObjectType[],
}