import { Router } from "express";
import { accountController } from "../controllers/account.controller.js";
const router = Router();
router.get('/Account', accountController.index);
export default router;
//# sourceMappingURL=account.routes.js.map