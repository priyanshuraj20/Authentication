import { Router } from "express";
import register from "../controllers/register.controller.js";

import getMe from "../controllers/get-me.controller.js";
import refreshToken from "../controllers/refreshToken.controller.js"

const authRouter = Router();

authRouter.post("/register", register);

authRouter.get("/get-me",getMe)


authRouter.get("/refesh-token",refreshToken)

export default authRouter;
