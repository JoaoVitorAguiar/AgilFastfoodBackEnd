import { Request, Response } from "express";
import {prisma} from "../lib/prisma"
import { AppError } from "../errors/AppError";
import Zod, { ZodError } from 'zod';

export class FoodController  {
    public async list(_request : Request, response : Response) {
        const foods = await prisma.food.findMany();

        return response.status(200).json(foods);
    }

    public async show(request : Request, response : Response) {
        const { id } = request.params;

        const food = await prisma.food.findUnique({
            where: {id}
        })

        if(!food) throw new AppError('food not found', 404);  
        
        return response.status(200).json(food);
    }

    public async create(request: Request, response: Response){
        try {
          const bodySchema = Zod.object({
            name: Zod.string().min(3),
            description: Zod.string(),
            price: Zod.number(),
          }).strict();
      
          const { name, description, price } = bodySchema.parse(request.body);
      
          const foodExists = await prisma.food.findFirst({
            where: { name },
          });
      
          if (foodExists) {
            throw new AppError('Food already exists', 409);
          }
      
          const food = await prisma.food.create({
            data: {
              name,
              description,
              price,
            },
          });
      
          return response.status(200).json(food);
        } catch (error) {
          if (error instanceof ZodError) {
            // Erros de validação do Zod
            return response.status(400).json({ error: error.errors });
          } else {
            // Outros erros
            console.error(error);
            return response.status(500).json({ error: 'Internal Server Error' });
          }
        }
      };

      public async update(request: Request, response: Response){
        try {
          const { id } = request.params;
      
          const bodySchema = Zod.object({
            name: Zod.string().min(3).nullish(),
            description: Zod.string().nullish(),
            price: Zod.number().nullish(),
          }).strict();
      
          const { name, description, price } = bodySchema.parse(request.body);
      
          const foodExists = await prisma.food.findUnique({
            where: { id },
          });
      
          if (!foodExists) {
            throw new AppError('Food not found', 404);
          }
      
          let data: Record<string, unknown> = {};
          if (name) data = { ...data, name };
          if (description) data = { ...data, description };
          if (price) data = { ...data, price };
      
          const food = await prisma.food.update({
            where: { id },
            data,
          });
      
          return response.status(200).json(food);
        } catch (error) {
          if (error instanceof ZodError) {
            // Erros de validação do Zod
            return response.status(400).json({ error: error.errors });
          } else {
            // Outros erros
            console.error(error);
            return response.status(500).json({ error: 'Internal Server Error' });
          }
        }
      };

      public async delete(request: Request, response: Response){
        try {
          const { id } = request.params;
      
          const food = await prisma.food.findUnique({
            where: { id },
          });
      
          if (!food) {
            throw new AppError('Food not found', 404);
          }
      
          await prisma.food.delete({
            where: { id },
          });
      
          return response.status(200).json(food);
        } catch (error) {
          console.error(error);
          return response.status(500).json({ error: 'Internal Server Error' });
        }
      };
}