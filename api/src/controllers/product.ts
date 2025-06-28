import { Request, Response, NextFunction } from "express";
import prisma from "../../lib/prisma";
import { NotFoundException } from "../exceptions/notFound";
import { ErrorCode } from "../exceptions/root";

export const createProduct = async(req: Request, res: Response) => {
    
    // Create a validator to this request

    const product = await prisma.product.create({
        data: {
            ...req.body,
            tags: req.body.tags.join(',')
        }
    });

    res.json(product)
}

export const updateProduct =async(req: Request, res: Response) => {
    try {
        const product = req.body;
        if(product.tags) {
            product.tags = product.tags.join(',')
        }
        console.log("req.params.id", req.params.id);
        const updateProduct = await prisma.product.update({
            where: {
                id: req.params.id,
            },
            data: product
        })
        res.json(product)
    } catch(error) {
        throw new NotFoundException("Product not found", ErrorCode.PRODUCT_NOT_FOUND)
    }
}

export const deleteProduct =async(req: Request, res: Response) => {}

export const listProducts =async(req: Request, res: Response) => {
    const count = await prisma.product.count()
    const products = await prisma.product.findMany({
        skip: +req.query.skip! || 0,
        take: 5
    })
    res.json({count, data:products})
}

export const getProductById =async(req: Request, res: Response) => {
    try {
        const product = await prisma.product.findFirstOrThrow({
            where: {
                id: req.params.id
            }
        })
        res.json(product)
    } catch(err) {
        throw new NotFoundException("Product not found", ErrorCode.PRODUCT_NOT_FOUND)
    }
}