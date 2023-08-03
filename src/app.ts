import "reflect-metadata"
import express, { NextFunction, Request, Response } from "express"
import dataSource from "./db/postgres.db";
import loggerMiddleware from "./middlewares/logger.middleware";
import employeeRoute from "./route/employee.route";
import HttpException from "./exceptions/http.exception";
import e from "express";

const server = express();

server.use(express.json());

server.use(loggerMiddleware);

server.use('/employees', employeeRoute);

server.all('*', (req: Request, res: Response) => {
    res.status(404).send("Not Here");
});

server.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(error);
    if(error instanceof HttpException){
        res.status(error.status).send({error: error.message});
        return;
    }
    res.status(500).send({error: error.message});
    
});

(async () => {
    await dataSource.initialize();
    server.listen(3000);
})();