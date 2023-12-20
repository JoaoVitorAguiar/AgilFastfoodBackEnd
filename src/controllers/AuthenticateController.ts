import { Request, Response } from "express";
import {prisma} from "../lib/prisma"
import { AppError } from "../errors/AppError";
import Zod from 'zod';
import { compare, hash } from "bcrypt";
import { excludeFields } from "../utils/excludeFields";
import { sign } from "jsonwebtoken";

export class AuthenticateController  {

    public async create(request: Request, response: Response){
        const bodySchema = Zod.object({
            email: Zod.string().email(),
            password: Zod.string().min(3),
        }).strict();
 
        const {email, password} = bodySchema.parse(request.body);
        const { id } = request.params;

        const user = await prisma.user.findFirst({
            where: {email}
        })

        if(!user) throw new AppError('Incorrect Email or Password', 401);  

        const passwordMatch = await compare(password, user.password_hash);
        
        if(!passwordMatch) throw new AppError('Incorrect Email or Password', 401);  

        const token = sign(
            { userId: user.id },
            process.env.JWT_SECRET_KEY, // Use a secret key from environment variables
            {
                subject: user.id.toString(),
                expiresIn: '1d'
            }
        );
        return response.status(200).json({
            token: token,
            user: user.fullName,
            isAdmin: user.isAdmin
        });
    }
}