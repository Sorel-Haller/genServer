import { Router } from "express";
import * as AuthController from "../controllers/auth.controller.js";
import { authSchema } from "../validations/auth.validation.js";
import { validateBody } from "../middlewares/validator.middleware.js";

const router = Router();

router.post('/register', validateBody(authSchema), AuthController.register);
router.post('/login', validateBody(authSchema), AuthController.login);

export default router;