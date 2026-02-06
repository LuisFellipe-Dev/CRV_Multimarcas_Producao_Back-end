import { salesService } from "../services/sales.service.js";
export const salesController = {
    async index(req, res) {
        try {
            const response = await salesService.get(req.query);
            return res.status(200).json(response);
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao buscar vendas' });
        }
    },
    async registerSale(req, res) {
        try {
            const response = await salesService.post(req.body);
            return res.status(201).json(response);
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Erro ao inserir a venda" });
        }
    },
    async delete(req, res) {
        try {
            if (req.params.id) {
                await salesService.delete(req.params.id);
                return res.status(204).json({ message: 'Venda deletada com sucesso' });
            }
            return res.status(500).json({ error: "Erro ao deletar venda" });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Erro ao deletar venda" });
        }
    }
};
//# sourceMappingURL=sales.controller.js.map