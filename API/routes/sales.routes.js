import { Router } from "express";
import { salesController } from "../controllers/sales.controller.js";
const router = Router();
router.get('/Sales', salesController.index);
router.post('/Sales', salesController.registerSale);
router.delete('/Sales:id', salesController.delete);
export default router;
//# sourceMappingURL=sales.routes.js.map