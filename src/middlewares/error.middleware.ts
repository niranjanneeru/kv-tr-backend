import { NextFunction, Request, Response } from "express";
import HttpException from "../exceptions/http.exception";

const errorMiddleware=(error: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(error);
    try{
        if(error instanceof HttpException){
            res.status(error.status).send({error: error.message});
            return;
        }
        res.status(500).send({error: error.message});
    }catch(error){
        next(error);
    }
}

export default errorMiddleware;