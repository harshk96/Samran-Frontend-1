export interface IListPpaParams {
    page: number;
    limit: number;
    needCount: boolean;
    searchTerm?: string;
    sortKey?: string;
    sortOrder?: number;
    userId? : string;
}


export interface IListPpa {
    _id: string,
    plantDetail: {
        plantId: string,
        propertyType: string,
        address: string,
        city: string,
        userId: string,
        name: string,
    },
    plantCapacity: number,
    tarrif : number,
    expectedYears : number,
    startDate: string,
    endDate: string,
    ppaDocument: string,
    leaseDocument: string,
    isSigned: boolean,
    signedAt: string,
    deleted : boolean,
}