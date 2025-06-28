import { Request, Response } from "express";
import { AdressSchema } from "../schema/users";
import { NotFoundException } from "../exceptions/notFound";
import { ErrorCode } from "../exceptions/root";
import { User } from "@prisma/client";
import prisma from "../../lib/prisma";

export const addAddress = async(req: Request, res: Response) => {
    AdressSchema.parse(req.body)

    const adress = await prisma.address.create({
        data: {
            ...req.body,
            userId: req.user!.id
        }
    })

    res.json(adress)
}

export const deleteAddress = async(req: Request, res: Response) => {
    
}

export const listAddress = async(req: Request, res: Response) => {
    
}