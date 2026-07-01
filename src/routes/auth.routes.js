import { Router } from "express";
import register from "../controllers/register.controller.js";

import getMe from "../controllers/get-me.controller.js";
import refreshToken from "../controllers/refreshToken.controller.js";
import logout from "../controllers/logout.contoller.js";
import logoutAll from "../controllers/logoutAll.controllers.js";

const authRouter = Router();

authRouter.post("/register", register);

authRouter.get("/get-me", getMe);

authRouter.get("/refesh-token", refreshToken);

authRouter.get("/logout", logout);
authRouter.get("/logoutAll", logoutAll);

export default authRouter;
