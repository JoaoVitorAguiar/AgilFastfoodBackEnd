import 'express-async-errors';
import express from "express";
import { routes } from "./routes/";
import { errorInterceptor } from './errors/errorInterceptor';
import 'dotenv/config';
import { insertAdminUser } from './insertAdminUser';
import cors from 'cors';
import { prisma } from './lib/prisma';

const app = express();
app.use(cors());


app.use(express.json());
app.use(routes);
app.use(errorInterceptor);

// Insira o usuário admin quando o servidor é iniciado
insertAdminUser(prisma);

app.listen(3333, () => {
    console.log("Server started on port 3333")
 });