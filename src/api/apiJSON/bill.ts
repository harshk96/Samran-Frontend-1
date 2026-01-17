import { IListBillParams } from "../../types";
import {IAddBill} from '../../types/request_data/bill';
export const BILLAPIJSON = {
    AddBill: ({
        ppaId,
        billingMonth,
        billingYear,
        generatedUnits,
        consumedUnits,
        exportedUnits,
    } : IAddBill) => {
        const formData = new FormData();
        console.log(ppaId, billingMonth, billingYear, generatedUnits, consumedUnits, exportedUnits);
        if (ppaId !== undefined && ppaId !== null) {
            formData.append("ppaId", ppaId);
        }
        if (billingMonth !== undefined && billingMonth !== null) {
            formData.append("billingMonth", billingMonth.toString());        
        }
        if (billingYear !== undefined && billingYear !== null) {
            formData.append("billingYear", billingYear.toString());        
        }
        if (generatedUnits !== undefined && generatedUnits !== null) {
            formData.append("generatedUnits", generatedUnits.toString());        
        }
        if (consumedUnits !== undefined && consumedUnits !== null) {
            formData.append("consumedUnits", consumedUnits.toString());        
        }
        if (exportedUnits !== undefined && exportedUnits !== null) {
            formData.append("exportedUnits", exportedUnits.toString());        
        }
        return formData;
    },

    listBill: ({
        page,
        limit,
        sortKey,
        sortOrder,
        needCount,
        searchTerm,
        ppaId
    }: IListBillParams) => {
        return {
            pageNo : page,
            limit,
            sortKey,
            sortOrder,
            needCount,
            ...(searchTerm !== undefined && {searchTerm: searchTerm.trim()}),
            ...(ppaId !== undefined && {ppaId: ppaId.trim()}),
        };
    }
}