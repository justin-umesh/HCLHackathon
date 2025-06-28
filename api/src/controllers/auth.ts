import { Request, Response, NextFunction } from "express";
import prisma from "../../lib/prisma";
import { hashSync, compareSync } from "bcrypt";
import * as jwt from "jsonwebtoken"
import { BadRequestException } from "../exceptions/badRequests";
import { ErrorCode } from "../exceptions/root";
import { NotFoundException } from "../exceptions/notFound";
import { signUpSchema } from "../schema/users";


export const signUp = async (req: Request, res: Response, next: NextFunction) => {  
  const {
    email,
    password,
    name,
  }: { email: string; password: string; name: string } = req.body;
    signUpSchema.parse(req.body)
  let user = await prisma.user.findUnique({where: {email}});

    if (user) {
      throw new BadRequestException("User already exists", ErrorCode.USER_ALREADY_EXISTS)
    }

    user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashSync(password, 10),
      },
    });

    res.json(user);

};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  let user = await prisma.user.findFirst({where: {email}});

    if (!user) {
      throw new NotFoundException("User Not Found", ErrorCode.USER_NOT_FOUND)
    }

    if(!compareSync(password, user!.password)) {
      throw new BadRequestException("Incorrect password!", ErrorCode.INCORRECT_PASSWORD)
    }

    const token = jwt.sign({
      userId: user?.id,
      email: user?.email
    }, process.env.JWT_SECRET!);


    res.json({user, token});

};

// me -> return the logged in user
export const me = async (req: Request, res: Response, next: NextFunction) => {
  res.json(req.user);
};

