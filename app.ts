import express, { Request, Response } from "express"
import employeeRouter from "./employee_router";
import loggerMiddleware from "./middlewares/loggerMiddleware";

const server = express();

server.use(express.json());

server.use(loggerMiddleware);

server.use('/employees', employeeRouter);

server.all('*', (req: Request, res: Response) => {
    res.status(404).send("Not Here");
})

server.listen(3000);
