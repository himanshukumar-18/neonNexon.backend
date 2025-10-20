import { Router } from "express"
import { registerUser, loginUser } from "../controller/neonNexa.users.controller.js";
import {getStats } from "../controller/stocks.dashboard.controller.js"

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/dashboard", getStats);


export default router;