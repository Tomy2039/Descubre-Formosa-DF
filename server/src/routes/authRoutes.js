import express from "express";
const { Router } = express;

import {
    register,
    login
} from "../controllers/controllers.js"

const authRouter = Router();

authRouter.post('/register', register);
authRouter.post('/login', login);

export { authRouter };