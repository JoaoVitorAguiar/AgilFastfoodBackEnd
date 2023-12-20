import { Request, Response } from "express";
import {prisma} from "../lib/prisma"
import { AppError } from "../errors/AppError";
import Zod from 'zod';
import { hash } from "bcrypt";
import { excludeFields } from "../utils/excludeFields";

export class UsersController  {
    public async list(_request : Request, response : Response) {
        const users = await prisma.user.findMany();

        const usesrWithoutPassword = users.map((user)=>{
            return excludeFields(user, ['password_hash'])
        });
        return response.status(200).json(users);
    }

    public async show(request : Request, response : Response) {
        const { id } = request.params;

        const user = await prisma.user.findUnique({
            where: {id}
        })

        if(!user) throw new AppError('User not found', 404);  
        
        const userWithoutPassword = excludeFields(user, ['password_hash']);
        return response.status(200).json(userWithoutPassword);
    }

    public async create(request: Request, response: Response) {
        const bodySchema = Zod.object({
          fullName: Zod.string().min(3),
          email: Zod.string().email(),
          password: Zod.string().min(3),
          password_confirmation: Zod.string().min(3),
          cpf: Zod.string(),
          phone: Zod.string(),
          zipCode: Zod.string(),
          state: Zod.string(),
          city: Zod.string(),
          neighborhood: Zod.string(),
          address: Zod.string(),
          number: Zod.string(),
          complement: Zod.string(), 
        }).strict().refine((data) => data.password === data.password_confirmation, {
          message: "Passwords don't match",
          path: ['password_confirmation'],
        });
    
        const { 
            fullName, 
            email, 
            password, 
            cpf, 
            phone, 
            zipCode, 
            state, 
            city, 
            neighborhood, 
            address, 
            number, 
            complement } = bodySchema.parse(request.body);
    
        const userExists = await prisma.user.findFirst({
          where: { email },
        });
    
        if (userExists) throw new AppError('User already registered', 409);
        
        const cpfExists = await prisma.user.findFirst({
          where: { cpf },
        });
      
        if (cpfExists) throw new AppError('CPF already registered', 409);
    
        const password_hash = await hash(password, 6);
    
        const user = await prisma.user.create({
          data: {
            fullName,
            email,
            password_hash,
            cpf,
            phone,
            zipCode,
            state,
            city,
            neighborhood,
            address,
            number,
            complement,
          },
        });
    
        const userWithoutPassword = excludeFields(user, ['password_hash']);
        return response.status(200).json(userWithoutPassword);
      }

      
      public async update(request: Request, response: Response) {
        const { id } = request.params;
        const bodySchema = Zod.object({
          fullName: Zod.string().min(3).nullish(),
          email: Zod.string().email().nullish(),
          cpf: Zod.string().nullish(),
          phone: Zod.string().nullish(),
          zipCode: Zod.string().nullish(),
          state: Zod.string().nullish(),
          city: Zod.string().nullish(),
          neighborhood: Zod.string().nullish(),
          address: Zod.string().nullish(),
          number: Zod.string().nullish(),
          complement: Zod.string().nullish(), 
        }).strict();
    
        const { 
            fullName, 
            email, 
            cpf, 
            phone, 
            zipCode, 
            state, 
            city, 
            neighborhood, 
            address, 
            number, 
            complement } = bodySchema.parse(request.body);
    
        const userExists = await prisma.user.findUnique({
          where: { id },
        });
    
        if (!userExists) throw new AppError('User not found', 404);

        // Só atualiza se o cpf for o mesmo cadastrado
        const cpfExists = await prisma.user.findFirst({
          where: { cpf },
        });
      
        if (cpfExists === cpf) throw new AppError('CPF já cadastrado.', 409);
    
        let data: { fullName?: string; email?: string; cpf?: string; phone?: string; zipCode?: string; state?: string; city?: string; neighborhood?: string; address?: string; number?: string; complement?: string } = {};
    
        if (fullName) data.fullName = fullName;
        if (email) data.email = email;
        if (cpf) data.cpf = cpf;
        if (phone) data.phone = phone;
        if (zipCode) data.zipCode = zipCode;
        if (state) data.state = state;
        if (city) data.city = city;
        if (neighborhood) data.neighborhood = neighborhood;
        if (address) data.address = address;
        if (number) data.number = number;
        if (complement) data.complement = complement;
    
        const updatedUser = await prisma.user.update({
          where: { id },
          data,
        });
    
        const userWithoutPassword = excludeFields(updatedUser, ['password_hash']);
        return response.status(200).json(userWithoutPassword);
      }

    public async delete(request : Request, response : Response) {
        const { id } = request.params;

        const user = await prisma.user.findUnique({
            where: {id}
        })

        if(!user) throw new AppError('User not found', 404); 

        await prisma.user.delete({
            where: {id}
        })

        const userWithoutPassword = excludeFields(user, ['password_hash']);
        return response.status(200).json(userWithoutPassword);
    }
}