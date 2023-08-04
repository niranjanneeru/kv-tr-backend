import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import RequestWithUser from "../utils/request.user";
import { Role } from "../utils/role.enum";
import HttpException from "../exception/http.exception";

const authorize = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
        const role = req.role;
        if(role !== Role.HR){
            throw new HttpException(403, "Forbidden Action");
        }
        next();
    } catch (err) {
        next(err);
    }
}


const getTokenFromRequestHeader = (req: Request) => {
    const bearerToken = req.header("Authorization");
    const token = bearerToken ? bearerToken.replace("Bearer ", "") : "";
    return token;
}

export default authorize;