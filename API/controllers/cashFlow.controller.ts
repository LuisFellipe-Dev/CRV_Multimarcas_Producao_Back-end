import type { Request, Response } from "express";
import { cashFlowService } from "../services/cashFlow.service.js"

export const cashFlowController = {
    async index(req: Request, res: Response){
        try {
            const response = await cashFlowService.get(req.query)
            return res.status(200).json(response)
        } catch (error) {
            console.error(error)
            return res.status(500).json({error: "Erro ao buscar dados"})
        }
    },
    async registerCashFlow(req: Request, res: Response){
        try {
            const response = await cashFlowService.post(req.body)
            return res.status(201).json(response)
        } catch (error) {
            console.error(error)
            return res.status(500).json({error: "Erro ao Inserir operação"})
        }
    },
    async update(req: Request, res: Response){
        try {
            if(req.params.id){
                const response = await cashFlowService.put(req.params.id, req.body)
                return res.status(201).json(response)
            }
             return res.status(500).json({error: "Erro ao Editar operação"})
        } catch (error) {
            console.error(error)
            return res.status(500).json({error: "Erro ao Editar operação"})
        }
    },
    async delete(req: Request, res: Response){
        try {
            if(req.params.id){
                await cashFlowService.delete(req.params.id)
                return res.status(201).json({message: "Operação deletada com sucesso"})
            }
            return res.status(500).json({error: "Erro ao deletar operação"})
        } catch (error) {
            console.error(error)
            return res.status(500).json({error: "Erro ao deletar operação"})
        }
    }
}