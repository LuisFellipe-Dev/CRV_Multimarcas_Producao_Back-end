import type { Request, Response } from "express";
import { accountService } from "../services/account.service.js";


export const accountController = {
    async index(req: Request, res: Response){
        try {
            const response = await accountService.get()
            return res.status(200).json(response)
        } catch (error) {
            console.error(error)
            return res.status(500).json({error: "Erro ao buscar dados no servidor"})
        }
    }
}