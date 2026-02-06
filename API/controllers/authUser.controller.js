import { authUserService } from "../services/authUser.service.js";
export const authUserController = {
    async index(req, res) {
        try {
            if (req.headers['authorization']) {
                const response = await authUserService.get(req.headers['authorization']);
                return res.json(response);
            }
            return { error: 'Erro ao validar acesso' };
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Erro ao validar acesso" });
        }
    },
    async createToken(req, res) {
        try {
            if (req.body) {
                const response = await authUserService.post(req.body);
                return res.json(response);
            }
            return res.status(500).json({ error: 'Dados não enviados ao servidor' });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao logar no servidor' });
        }
    }
};
//# sourceMappingURL=authUser.controller.js.map