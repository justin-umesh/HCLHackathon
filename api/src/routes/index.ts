import { Router } from "express";
import authRoutes from "./auth";
import productRoutes from "./products";
import usersRoutes from "./users";

const rootRouter: Router = Router()

rootRouter.use('/products', productRoutes)
rootRouter.use('/auth', authRoutes)
rootRouter.use('/users', usersRoutes)

export default rootRouter