import type { Request, Response } from "express";
import { customersService } from "../services/customers.service.js";

export const customersController = {
    async index(req: Request, res: Response){
        try {
            const response = await customersService.get(req.query)
            return res.json(response)
        } catch (error) {
            console.error(error)
            return res.status(500).json({ error: 'Erro ao buscar clientes'})
        }
    },
    async registerCustomer(req: Request, res: Response){
        try {
            const response = await customersService.post(req.body)
            return res.status(201).json(response)
        } catch (error) {
            console.error(error)
            return res.status(500).json({ error: 'Erro ao inserir o cliente'})
        }
    },
    async update(req: Request, res: Response){
        try {
            if(req.params.id){
                const response = await customersService.put(req.params.id, req.body)
                return res.status(200).json(response)
            }
            return res.status(500).json({ error: 'Erro ao editar o cliente'})
        } catch (error) {
            console.error(error)
            return res.status(500).json({ error: 'Erro ao editar o cliente'})
        }
    },
    async disable(req: Request, res: Response){
        try {
            if(req.params.id){
                await customersService.put(req.params.id, req.body)
                return res.status(204).json({message: 'Cliente disativado com sucesso'})
            }
            return res.status(500).json({ error: 'Erro ao desativar cliente'})
        } catch (error) {
            console.error(error)
            return res.status(500).json({ error: 'Erro ao desativar cliente'})
        }
    }
}