import "reflect-metadata"
import express, { NextFunction, Request, Response } from "express"
import dataSource from "./db/postgres.db";
import loggerMiddleware from "./middlewares/logger.middleware";
import employeeRoute from "./route/employee.route";
import HttpException from "./exceptions/http.exception";
import errorMiddleware from "./middlewares/error.middleware";
import departmentRoute from "./route/department.route";

const server = express();

server.use(express.json());

server.use(loggerMiddleware);

server.use('/employees', employeeRoute);
server.use('/departments', departmentRoute);

server.all('*', (req: Request, res: Response) => {
    res.status(404).send("Not Here");
});

server.use(errorMiddleware);

(async () => { await dataSource.initialize(); server.listen(3000);})();