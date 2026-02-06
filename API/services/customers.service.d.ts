interface filtersCustomers {
    Name?: string;
    Contact?: string;
    Debt?: string;
}
interface data {
    Name: string;
    Contact: string;
    Debt: string;
}
export declare const customersService: {
    get(filters: filtersCustomers): Promise<{
        id: string;
        Status: string;
        Name: string;
        Contact: string;
        Debt: number;
    }[]>;
    post(data: data): Promise<{
        id: string;
        Status: string;
        Name: string;
        Contact: string;
        Debt: number;
    }>;
    put(id: string, newData: Object): Promise<{
        id: string;
        Status: string;
        Name: string;
        Contact: string;
        Debt: number;
    }>;
    disable(id: string): Promise<{
        id: string;
        Status: string;
        Name: string;
        Contact: string;
        Debt: number;
    }>;
};
export {};
//# sourceMappingURL=customers.service.d.ts.map