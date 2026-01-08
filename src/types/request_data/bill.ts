export interface IBillData {
    ppaDetails: {
        ppaId: string,
        plantId: string,
        userId: string,
        tarrif: number,
        plantCapacity: number,
    },
    billingMonth: number,
    billingYear: number,
    generatedUnits: number,
    consumedUnits: number,
    exportedUnits: number,
    totalAmount: number,
    isPaid: boolean,
}

export interface IAddBill {
    ppaId: string,
    billingMonth: number,
    billingYear: number,
    generatedUnits: number,
    consumedUnits: number,
    exportedUnits: number,
}