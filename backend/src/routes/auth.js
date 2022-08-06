import express from "express";
const router = express.Router();

import auth from "../controllers/auth/index.js";
import { verifyAccessToken } from "../helpers/jwt.js";

router.post("/register", auth.Register);
router.post("/login", auth.Login);
router.post("/refresh_token", auth.RefreshToken);
router.post("/logout", auth.Logout);
router.get("/me", verifyAccessToken, auth.Me);
router.put("/:user_id", auth.Update);
router.delete("/:item_id/:user_id", auth.DeleteBasketItem);
router.delete("/:user_id", auth.deleteAllBasket);

export default router;
