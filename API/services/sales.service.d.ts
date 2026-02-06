interface filterSales {
    CustomerId?: string;
    ItemId?: string;
    Type?: string;
    Date?: string;
}
interface data {
    CustomerId: string;
    ItemId: string;
    Value: string;
    Type: string;
    Date: string;
}
export declare const salesService: {
    get(filters: filterSales): Promise<({
        Item: {
            id: string;
            Brand: string;
            Model: string;
            Size: string;
            Description: string;
            Status: string;
        };
        Customer: {
            id: string;
            Status: string;
            Name: string;
            Contact: string;
            Debt: number;
        };
    } & {
        id: string;
        CustomerId: string;
        ItemId: string;
        CashflowId: string | null;
        Value: number;
        Type: string;
        Date: string;
    })[]>;
    post(data: data): Promise<{
        id: string;
        Status: string;
        Name: string;
        Contact: string;
        Debt: number;
    } | {
        id: string;
        Bank: number;
        Cash: number;
        Month: number;
        Year: number;
    } | {
        message: string;
    }>;
    delete(id: string): Promise<{
        id: string;
        CustomerId: string;
        ItemId: string;
        CashflowId: string | null;
        Value: number;
        Type: string;
        Date: string;
    } | {
        message: string;
    }>;
};
export {};
//# sourceMappingURL=sales.service.d.ts.map