import { Router } from "express";
import { storageController } from "../controllers/storage.controller.js";

const router = Router()

router.get('/Storage', storageController.index)
router.post('/Storage', storageController.store)
router.delete('/Storage', storageController.delete)

export default router