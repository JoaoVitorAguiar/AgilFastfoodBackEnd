import { Router } from "express";

const routes = Router();

// routes.use("/hello-world", helloWorldRoutes);
// routes.use("/users", usersRoutes);
// routes.use("/tasks", tasksRoutes);
// routes.use("/sessions", authenticateRoutes);

routes.get("/", (_request, response) => {
    return response.status(200).json({
        message: "Hello World!"
    });
});

export {routes}