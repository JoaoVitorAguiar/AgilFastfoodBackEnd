import { Router } from "express";
import { UsersController } from "../controllers/UsersController";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";
import { ensureAdmin } from "../middlewares/ensureAdmin";

const usersRoutes = Router();
const controller = new UsersController();

// Usuário não precisa esta autenticado
usersRoutes.post('/create', controller.create) 

usersRoutes.use(ensureAuthenticate);

usersRoutes.use(ensureAdmin);
// Usuário precisa ser admin
usersRoutes.get('/show/:id', controller.show) 
usersRoutes.put('/update/:id', controller.update)
usersRoutes.delete('/delete/:id', controller.delete)  
usersRoutes.get('/list', controller.list) 

export {usersRoutes}