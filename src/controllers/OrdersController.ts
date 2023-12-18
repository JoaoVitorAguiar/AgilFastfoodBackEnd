import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { AppError } from "../errors/AppError";
import Zod from 'zod';

export class OrdersController  {
    public async list(request : Request, response : Response) {
        const user_id = request.userId;
        const orders = await prisma.order.findMany({
            where: {userId: user_id},
            include: {
                user: true,
                foods: true,
            },
        });

        return response.status(200).json(orders);
    }

    public async show(request : Request, response : Response) {
        const { id } = request.params;
        const user_id = request.userId;

        const order = await prisma.order.findFirst({
            where: {id, userId: user_id},
            include: {
                user: true,
                foods: true,
            },
        })

        if(!order) throw new AppError('Order not found', 404);  
        
        return response.status(200).json(order);
    }

    public async create(request: Request, response: Response){
        const bodySchema = Zod.object({
            foods: Zod.array(Zod.object({
                foodId: Zod.string(),
                quantity: Zod.number().int(),
            })),
            // Add other fields as necessary
        }).strict();

        const { foods } = bodySchema.parse(request.body);
        const user_id = request.userId;
        const userExists = await prisma.user.findFirst({
            where: {id: user_id}
        })

        if(!userExists) throw new AppError('User not found', 404);  
        const order = await prisma.order.create({
            data: {
                userId: user_id,
                foods: {
                    create: foods,
                },
                // Add other fields as necessary
            },
            include: {
                foods: true,
            },
        });

        return response.status(200).json(order);
    }

    public async update(request: Request, response: Response){
        const {id} =  request.params;
        const bodySchema = Zod.object({
            foods: Zod.array(Zod.object({
                foodId: Zod.string(),
                quantity: Zod.number().int(),
            })).nullish(),
            // Add other fields as necessary
        }).strict();
    
        const { foods } = bodySchema.parse(request.body);
        const user_id = request.userId;
        const orderExists = await prisma.order.findFirst({
            where: {id, userId: user_id},
            include: {
                foods: true,
            },
        })
    
        if(!orderExists) throw new AppError('Order not found', 404); 
        if(!foods) throw new AppError('Foods not defined', 404);

        // Check if all foods exist
        for (const food of foods) {
            const foodExists = await prisma.food.findUnique({
                where: { id: food.foodId },
            });
    
            if (!foodExists) {
                throw new AppError(`Food with id ${food.foodId} not found`, 404);
            }
        }
    
        let data = {}
        if (foods) data = {foods: { set: foods }}; 
        // Add other fields as necessary
    
        const order = await prisma.order.update({
            where: {id},
            data,
            include: {
                foods: true,
            },
        });
    
        return response.status(200).json(order);
    }
    

    public async delete(request : Request, response : Response) {
        const { id } = request.params;
        const user_id = request.userId;
        const order = await prisma.order.findUnique({
            where: {id, userId: user_id},
            include: {
                user: true,
                foods: true,
            },
        })
    
        if(!order) throw new AppError('Order not found', 404); 
    
        // Disassociate foods from the order
        await prisma.foodOnOrder.deleteMany({
            where: { orderId: id }
        });
    
        // Now you can delete the order
        await prisma.order.delete({
            where: {id}
        })
        return response.status(200).json(order);
    }
    
}
