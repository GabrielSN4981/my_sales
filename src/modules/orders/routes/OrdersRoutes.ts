import { Router } from "express";
import OrdersController from "../controllers/OrdersControllers";
import AuthMiddleware from "@shared/middlewares/authMiddleware";
import {
  createOrderValidate,
  idParamsValidate,
} from "../schemas/OrdersSchemas";

const ordersRouter = Router();
const ordersControllers = new OrdersController();

ordersRouter.use(AuthMiddleware.execute);
ordersRouter.get("/:id", idParamsValidate, ordersControllers.show);
ordersRouter.post("/", createOrderValidate, ordersControllers.create);

export default ordersRouter;
