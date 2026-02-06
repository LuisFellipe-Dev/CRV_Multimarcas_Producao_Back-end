import type { Request, Response } from "express";
export declare const authUserController: {
    index(req: Request, res: Response): Promise<Response<any, Record<string, any>> | {
        error: string;
    }>;
    createToken(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
};
//# sourceMappingURL=authUser.controller.d.ts.map