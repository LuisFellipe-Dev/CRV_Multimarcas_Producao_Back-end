import { Router } from "express";
import { customersController } from "../controllers/customers.controller.js";
const router = Router();
router.get('/Customers', customersController.index);
router.post('/Customers', customersController.registerCustomer);
router.put('/Customers:id', customersController.update);
router.delete('/Customers:id', customersController.disable);
export default router;
//# sourceMappingURL=customers.routes.js.map