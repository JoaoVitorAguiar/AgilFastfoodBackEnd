import { Router } from "express";
import { FoodController } from "../controllers/FoodController";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";

const foodsRoutes = Router();
const controller = new FoodController();

// Usuário não precisa esta autenticado
foodsRoutes.get('/list', controller.list) 
foodsRoutes.get('/show/:id', controller.show) 

// Usuário precisa ser admin
foodsRoutes.use(ensureAuthenticate);
foodsRoutes.use(ensureAdmin);
foodsRoutes.post('/create', controller.create) 
foodsRoutes.put('/update/:id', controller.update)
foodsRoutes.delete('/delete/:id', controller.delete)  



export {foodsRoutes}