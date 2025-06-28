import express, {Express, Request, Response} from "express";
import rootRouter from "./routes";
import { errorMiddleWare } from "./middlewares/errors";

const app:Express = express();

app.use(express.json())

app.use('/api', rootRouter)

app.use(errorMiddleWare);

const PORT = 4000;

app.listen(PORT, () => {
    console.log("Server running at : ", PORT)
});