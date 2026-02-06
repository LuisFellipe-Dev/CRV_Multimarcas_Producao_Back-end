interface filterStorage {
    Brand?: string;
    Model?: string;
    Size?: string;
    Description?: string;
}
interface data {
    Brand: string;
    Model: string;
    Size: string;
    Description: string;
}
export declare const storageService: {
    get(filters: filterStorage): Promise<{
        id: string;
        Brand: string;
        Model: string;
        Size: string;
        Description: string;
        Status: string;
    }[]>;
    post(data: data): Promise<{
        id: string;
        Brand: string;
        Model: string;
        Size: string;
        Description: string;
        Status: string;
    }>;
    delete(id: string): Promise<{
        id: string;
        Brand: string;
        Model: string;
        Size: string;
        Description: string;
        Status: string;
    }>;
};
export {};
//# sourceMappingURL=storage.service.d.ts.map