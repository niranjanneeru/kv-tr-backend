import { NextFunction, Request, Response } from "express";
import HttpException from "../exceptions/http.exception";
import ValidationException from "../exceptions/validation.exception";

const errorMiddleware=(error: Error, req: Request, res: Response, next: NextFunction) => {
    try{
        if(error instanceof ValidationException){
            res.status(error.status).send({message: error.message,errors: error.getMessage()});
            return;
        }
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