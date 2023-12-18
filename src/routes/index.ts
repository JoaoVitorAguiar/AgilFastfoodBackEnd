import { Router } from "express";
import { authenticateRoutes } from "./authenticateRoutes";
import { usersRoutes } from "./usersRoutes";
import { foodsRoutes } from "./foodsRoutes";
import { ordersRoutes } from "./ordersRoutes";

const routes = Router();

// routes.use("/hello-world", helloWorldRoutes);
routes.use("/users", usersRoutes);
routes.use("/foods", foodsRoutes);
routes.use("/sessions", authenticateRoutes);
routes.use("/orders", ordersRoutes);

routes.get("/", (_request, response) => {
    return response.status(200).json({
        message: "Hello World!"
    });
});

export {routes}