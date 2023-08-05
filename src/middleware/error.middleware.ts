import { NextFunction, Request, Response } from "express";
import HttpException from "../exception/http.exception";
import ValidationException from "../exception/validation.exception";
import { JsonWebTokenError } from "jsonwebtoken";
import ResponseBody from "../utils/response.body";

const errorMiddleware = (error: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(error);
    try {
        if (error instanceof ValidationException) {
            const responseBody = new ResponseBody(null, error.getMessage(), error.message);
            responseBody.set_meta(0);
            res.status(error.status).send(responseBody);
            return;
        }
        if (error instanceof HttpException) {
            const responseBody = new ResponseBody(null, error.message as unknown as object, error.message);
            responseBody.set_meta(0);
            res.status(error.status).send(responseBody);
            return;
        }
        if (error instanceof JsonWebTokenError) {
            res.status(403).send("Forbidden");
            return;
        }
        res.status(500).send({ error: error.message });
    } catch (error) {
        next(error);
    }
}

export default errorMiddleware;