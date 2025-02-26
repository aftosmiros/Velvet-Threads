import express from "express";
import { loginUser, registerUser, adminLogin, getUser, putUser } from "../controllers/userController.js"
import authUser from "../middleware/auth.js"
import validateRequest from "../middleware/validateRequest.js";

const userRouter = express.Router();

userRouter.post("/register", validateRequest("default")("register"), registerUser)
userRouter.post("/login", validateRequest("default")("login"), loginUser)
userRouter.post("/admin", validateRequest("default")("adminLogin"), adminLogin)
userRouter.get("/profile", authUser, getUser)
userRouter.put("/profile", authUser, validateRequest("default")("updateProfile"), putUser)

export default userRouter;