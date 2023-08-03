import "reflect-metadata"
import express, { Request, Response } from "express"
import dataSource from "./db/postgres.db";
import loggerMiddleware from "./middlewares/logger.middleware";
import employeeRoute from "./route/employee.route";

const server = express();

server.use(express.json());

server.use(loggerMiddleware);

server.use('/employees', employeeRoute);

server.all('*', (req: Request, res: Response) => {
    res.status(404).send("Not Here");
});

(async () => {
    await dataSource.initialize();
    server.listen(3000);
})();