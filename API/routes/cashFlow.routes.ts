import { Router } from "express";
import { cashFlowController } from "../controllers/cashFlow.controller.js";

const router = Router()

router.get('/CashFlow', cashFlowController.index)
router.post('/CashFlow', cashFlowController.registerCashFlow)
router.put('/CashFlow:id', cashFlowController.update)
router.delete('/CashFlow:id', cashFlowController.delete)

export default router