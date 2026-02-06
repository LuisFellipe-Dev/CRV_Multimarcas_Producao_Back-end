import { Router } from "express";
import { authUserController } from "../controllers/authUser.controller.js";

const router = Router()

router.get('/AuthUser', authUserController.index)
router.post('/AuthUser', authUserController.createToken)

export default router