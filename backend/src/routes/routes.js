import { Router } from "express";

import { verifyAccessToken } from "../helpers/jwt.js";

import auth from "./auth.js";
import product from "./product.js";
import order from "./order.js";

const router = Router();

router.get("/", (req, res) => {
  res.end("hey bb");
});

router.use("/auth", auth);
router.use("/product", product);
router.use("/order", verifyAccessToken, order);

export default router;
