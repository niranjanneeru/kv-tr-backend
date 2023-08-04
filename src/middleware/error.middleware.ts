import { NextFunction, Request, Response } from "express";
import HttpException from "../exception/http.exception";
import ValidationException from "../exception/validation.exception";
import { JsonWebTokenError } from "jsonwebtoken";

const errorMiddleware = (error: Error, req: Request, res: Response, next: NextFunction) => {
    try {
        if (error instanceof ValidationException) {
            res.status(error.status).send({ message: error.message, errors: error.getMessage() });
            return;
        }
        if (error instanceof HttpException) {
            res.status(error.status).send({ error: error.message });
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