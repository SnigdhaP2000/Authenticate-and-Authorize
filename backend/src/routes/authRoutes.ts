import express, { Request, Response } from 'express';
import { masterMiddleware } from "../middlewares/masterMiddleware";
import { authMiddleware } from "../middlewares/authMiddleware";
import AuthController from "../controllers/authController";

const router = express.Router();
const authController = new AuthController();
const baseUrl = '/api/auth/';

// route to get all tasks
router.post(`${baseUrl}login`, authMiddleware, masterMiddleware, authController.login);
router.post(`${baseUrl}register`, masterMiddleware, authController.register);

export default router;