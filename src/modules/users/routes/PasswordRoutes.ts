import { Router } from "express";
import ForgotPasswordControllers from "../controllers/ForgotPasswordControllers";
import ResetPasswordController from "../controllers/ResetPasswordController";
import {
  ForgotPasswordSchema,
  ResetPasswordSchema,
} from "../schemas/PasswordSchemas";

const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordControllers();
const resetPasswordController = new ResetPasswordController();

passwordRouter.post(
  "/forgot",
  ForgotPasswordSchema,
  forgotPasswordController.create
);

passwordRouter.post(
  "/reset",
  ResetPasswordSchema,
  resetPasswordController.create
);

export default passwordRouter;
