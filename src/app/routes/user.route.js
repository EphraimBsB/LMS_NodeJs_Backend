import express from "express";
import { userController } from "../controllers";
import { checkAuth, checkRole } from "./../middlewares/check.auth";
import {
  registerValidation,
  loginValidation,
} from "./../middlewares/user.validation";

const router = express.Router();
router.post("/login", loginValidation, userController.login);
router.post(
  "/register",
  registerValidation,
  // checkAuth,
  // checkRole(["librarian", "admin"]),
  userController.signup
);
router.get("/users", userController.allUsers);

export default router;
