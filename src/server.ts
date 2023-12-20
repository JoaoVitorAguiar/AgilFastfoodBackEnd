import 'express-async-errors';
import express from "express";
import { routes } from "./routes/";
import { errorInterceptor } from './errors/errorInterceptor';
import 'dotenv/config';
import cors from 'cors';

const app = express();
// Usar o middleware 'cors'
app.use(cors());


app.use(express.json());
app.use(routes);
app.use(errorInterceptor);

app.listen(3333, () => {
    console.log("Server started on port 3333")
 });