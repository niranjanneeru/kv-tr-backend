import { NextFunction, Request, Response } from "express";

const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    console.log(`${new Date()}: ${req.method} - ${req.url}`);
    next();
};

export default loggerMiddleware;