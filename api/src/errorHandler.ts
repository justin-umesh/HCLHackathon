import { NextFunction, Request, Response } from "express"
import { ErrorCode, HttpException } from "./exceptions/root"
import { InternalException } from "./exceptions/internalException"
import { BadRequestException } from "./exceptions/badRequests"
import { ZodError } from "zod"

export const errorHandler = (fn: Function) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await fn(req, res, next)
        } catch(error) {
            let exception:HttpException
            if(error instanceof HttpException) {
                exception = error;
            } else {
                if(error instanceof ZodError) {
                    exception = new BadRequestException("UnProcessable entity", ErrorCode.UNPROCESSABLE_ENTITY)
                }
                exception = new InternalException('Something went wrong!', error, ErrorCode.INTERNAL_ESCEPTION)
            }
            next(exception)
        }
    }
}