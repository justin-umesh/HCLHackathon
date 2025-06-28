import {Router} from "express"
import { errorHandler } from "../errorHandler";
import authMiddleware from "../middlewares/auth";
import adminMiddleware from "../middlewares/admin";
import { addAddress, deleteAddress, listAddress } from "../controllers/users";

const usersRoutes: Router = Router()

usersRoutes.post('/address', [authMiddleware],errorHandler(addAddress))
usersRoutes.get('/address', [authMiddleware],errorHandler(listAddress))
usersRoutes.delete('/address/:id', [authMiddleware],errorHandler(deleteAddress))

export default usersRoutes