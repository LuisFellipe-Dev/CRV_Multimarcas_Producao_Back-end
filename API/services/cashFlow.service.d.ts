interface filterCashFlow {
    Description?: string;
    Value?: string;
    Operation?: string;
    Type?: string;
    Date?: string;
}
interface data {
    Description: string;
    Value: string;
    Operation: string;
    Type: string;
    Date: string;
}
export declare const cashFlowService: {
    get(filters: filterCashFlow): Promise<{
        id: string;
        Description: string;
        Value: number;
        Type: string;
        Date: string;
        Operation: string;
    }[]>;
    post(data: data): Promise<{
        id: string;
        Description: string;
        Value: number;
        Type: string;
        Date: string;
        Operation: string;
    } | {
        message: string;
    }>;
    put(id: string, data: Object): Promise<{
        id: string;
        Description: string;
        Value: number;
        Type: string;
        Date: string;
        Operation: string;
    }>;
    delete(id: string): Promise<{
        id: string;
        Description: string;
        Value: number;
        Type: string;
        Date: string;
        Operation: string;
    } | {
        message: string;
    }>;
};
export {};
//# sourceMappingURL=cashFlow.service.d.ts.map