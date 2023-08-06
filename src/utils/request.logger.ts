import { Request } from "express";
import winston from "winston";
import RequestWithUser from "./request.user";

interface RequestWithLogger extends RequestWithUser{
    req_id : string
}

export default RequestWithLogger;