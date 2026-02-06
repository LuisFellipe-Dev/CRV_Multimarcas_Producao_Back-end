interface data {
    User: string;
    Password: string;
}
export declare const authUserService: {
    get(authHeader: string): Promise<{
        message: string;
        error?: never;
    } | {
        error: string;
        message?: never;
    } | undefined>;
    post(data: data): Promise<{
        message: string;
        error?: never;
        token?: never;
    } | {
        error: string;
        message?: never;
        token?: never;
    } | {
        token: string;
        message?: never;
        error?: never;
    }>;
};
export {};
//# sourceMappingURL=authUser.service.d.ts.map