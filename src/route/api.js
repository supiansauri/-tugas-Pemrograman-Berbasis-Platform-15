import express from "express";
import userController from "../controller/user-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";
import sepatuController from "../controller/sepatu-controller.js";

const userRouter = new express.Router();
userRouter.use(authMiddleware);

// User API
userRouter.get("/api/users/current", userController.get);
userRouter.patch("/api/users/current", userController.update);
userRouter.delete("/api/users/logout", userController.logout);

// Sepatu API
userRouter.post("/api/sepatu", sepatuController.create)
userRouter.get("/api/sepatu/:idSepatu", sepatuController.get)
userRouter.put("/api/sepatu/:idSepatu", sepatuController.update)
userRouter.delete("/api/sepatu/:idSepatu", sepatuController.remove)
userRouter.get("/api/sepatu", sepatuController.search)


export { userRouter };
