import { Router } from "express";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";
import { OrdersController } from "../controllers/OrdersController";

const ordersRoutes = Router();
const controller = new OrdersController();

// Usuário precisa esta autenticado
ordersRoutes.use(ensureAuthenticate);

ordersRoutes.post('/', controller.create); 
ordersRoutes.get('/', controller.list);
ordersRoutes.get('/:id', controller.show); 
ordersRoutes.put('/:id', controller.update);
ordersRoutes.delete('/:id', controller.delete);  

export {ordersRoutes}