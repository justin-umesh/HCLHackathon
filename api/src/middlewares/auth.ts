import { NextFunction, Request, Response } from "express";
import { UnAuthorizedException } from "../exceptions/unAuthorized";
import { ErrorCode } from "../exceptions/root";
import * as jwt from "jsonwebtoken"
import prisma from "../../lib/prisma";

const authMiddleware = async(req: Request, res: Response, next: NextFunction) => {
    // extract token from header 
    const token = req.headers.authorization!

    // if token not present, throe an error of unatrorized,
    if(!token) {
        next(new UnAuthorizedException("Unauthorized", ErrorCode.UNAUTHORIZED))
    }

    try {
        // if the token is present, verify that token and extract the payload
        const payload = jwt.verify(token, process.env.JWT_SECRET!) as any

        // to get the user from the payload
        const user = await prisma.user.findFirst({where: {id: payload.userId}})
        if(!user) {
            next(new UnAuthorizedException("Unauthorized", ErrorCode.UNAUTHORIZED))
        }

        // to attach the user to the current request object
        req.user = user!;
        next()

    } catch(error) {
        next(new UnAuthorizedException("Unauthorized", ErrorCode.UNAUTHORIZED))
    }
}

export default authMiddleware