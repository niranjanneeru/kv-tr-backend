import { NextFunction, Response } from "express"
import RequestWithLogger from "../utils/request.logger"
import { validate as v } from "class-validator";
import ValidationException from "../exception/validation.exception";
import { plainToInstance } from "class-transformer";

const validateMiddleware = (cls, options = {}) => {
    return async (req: RequestWithLogger, res: Response, next: NextFunction) => {
        try {
            const dto = plainToInstance(cls, req.body);
            const errors = await v(dto, options);
            if (errors.length > 0) {
                throw new ValidationException(400, "Validation Errors", errors);
            }
            req.dto = dto;
            next();
        } catch (error) {
            next(error);
        }
    }
}

export default validateMiddleware;