import { accountService } from "../services/account.service.js";
export const accountController = {
    async index(req, res) {
        try {
            const response = await accountService.get();
            return res.status(200).json(response);
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Erro ao buscar dados no servidor" });
        }
    }
};
//# sourceMappingURL=account.controller.js.map