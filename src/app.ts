import "reflect-metadata"
import express, { NextFunction, Request, Response } from "express"
import dataSource from "./db/postgres.db";
import loggerMiddleware from "./middleware/logger.middleware";
import employeeRoute from "./route/employee.route";
import HttpException from "./exception/http.exception";
import errorMiddleware from "./middleware/error.middleware";
import departmentRoute from "./route/department.route";

const server = express();

server.use(express.json());

server.use(loggerMiddleware);

server.use('/employees', employeeRoute);
server.use('/departments', departmentRoute);

server.all('*', (req: Request, res: Response) => {
    res.status(404).send("Not Found");
});

server.use(errorMiddleware);

(async () => { await dataSource.initialize(); server.listen(3000);})();