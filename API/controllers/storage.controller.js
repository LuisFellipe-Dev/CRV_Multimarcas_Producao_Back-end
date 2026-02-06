import { storageService } from '../services/storage.service.js';
export const storageController = {
    async index(req, res) {
        try {
            const response = await storageService.get(req.query);
            return res.json(response);
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao buscar itens' });
        }
    },
    async store(req, res) {
        try {
            const { Brand, Model, Size, Description } = req.body;
            const response = await storageService.post({
                Brand,
                Model,
                Size,
                Description,
            });
            return res.status(201).json(response);
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao inserir item' });
        }
    },
    async delete(req, res) {
        try {
            if (req.params.id) {
                await storageService.delete(req.params.id);
                return res.status(204).send({ message: 'Item deletado com sucesso' });
            }
            return res.status(500).json({ error: 'Erro ao deletar item' });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao deletar item' });
        }
    },
};
//# sourceMappingURL=storage.controller.js.map