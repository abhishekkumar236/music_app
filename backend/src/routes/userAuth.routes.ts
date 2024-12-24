import { Router } from "express";
import * as userAuthController from "../controllers/user.controller";
import auth from "../middleware/auth.middleware";

const router = Router();

router.post("/signup", userAuthController.signup);
router.post("/login", userAuthController.login);
router.get("/profile", auth, userAuthController.userProfile);

export default router;
