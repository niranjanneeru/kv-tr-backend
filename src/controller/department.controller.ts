import { Request, Response, Router } from "express";
import DepartmentService from "../service/department.service";
import { NextFunction } from "express-serve-static-core";
import { plainToInstance } from "class-transformer";
import CreateDepartmentDto from "../dto/create.department.dto";
import authenticate from "../middleware/authenticate.middleware";
import { validate } from "class-validator";
import ValidationException from "../exception/validation.exception";
import authorize from "../middleware/authorize.middleware";
import EditDepartmentDto from "../dto/edit.department.dto";
import PatchDepartmentDto from "../dto/patch.department";
import { Role } from "../utils/role.enum";
import { StatusMessages } from "../utils/status.message.enum";
import ResponseBody from "../utils/response.body";
import { StatusCodes } from "../utils/status.code.enum";
import RequestWithLogger from "../utils/request.logger";
import Logger from "../logger/logger.singleton";

class DepartmentController {
    public router: Router;
    constructor(
        private departmentService: DepartmentService
    ) {
        this.router = Router();

        this.router.get("/", this.getAllDepartments)
        this.router.post("/", authenticate, authorize(Role.HR), this.createDepartment);
        this.router.get("/:id", this.getDepartmentById);
        this.router.put("/:id", authenticate, authorize(Role.HR), this.editDepartment);
        this.router.patch("/:id", authenticate, authorize(Role.HR), this.setDepartment);
        this.router.delete("/:id", authenticate, authorize(Role.HR), this.removeDepartment);
    }

    getAllDepartments = async (req: Request, res: Response) => {
        const departments = await this.departmentService.getAllDepartment();
        const responseBody = new ResponseBody(departments, null, StatusMessages.OK);
        responseBody.set_meta(departments.length);
        res.status(StatusCodes.OK).send(responseBody);
    }

    getDepartmentById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const deptId = +req.params.id;
            const department = await this.departmentService.getDepartmentById(deptId);
            const responseBody = new ResponseBody(department, null, StatusMessages.OK);
            responseBody.set_meta(1);
            res.status(StatusCodes.OK).send(responseBody);
        } catch (err) {
            next(err);
        }
    }

    createDepartment = async (req: RequestWithLogger, res: Response, next: NextFunction) => {
        try {
            const createDepartmentDto = plainToInstance(CreateDepartmentDto, req.body);
            const errors = await validate(createDepartmentDto);
            if (errors.length > 0) {
                throw new ValidationException(400, "Validation Errors", errors);
            }
            const department = await this.departmentService.createDepartment(createDepartmentDto);
            const responseBody = new ResponseBody(department, null, StatusMessages.CREATED);
            responseBody.set_meta(1);
            res.status(StatusCodes.CREATED).send(responseBody);
            Logger.getLogger().log({ level: 'info', message: `Department Created (${department.id})`, label: req.req_id});
        } catch (err) {
            next(err);
        }
    }

    editDepartment = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const deptId = +req.params.id;
            const editDepartmentDto = plainToInstance(EditDepartmentDto, req.body);
            const errors = await validate(editDepartmentDto);
            if (errors.length > 0) {
                throw new ValidationException(400, "Validation Errors", errors);
            }
            const department = await this.departmentService.editDepartment(deptId, editDepartmentDto);
            const responseBody = new ResponseBody(department, null, StatusMessages.OK);
            responseBody.set_meta(1);
            res.status(StatusCodes.OK).send(responseBody);
        } catch (err) {
            next(err);
        }
    }

    setDepartment = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const deptId = +req.params.id;
            const patchDepartmentDto = plainToInstance(PatchDepartmentDto, req.body);
            const errors = await validate(patchDepartmentDto, { skipMissingProperties: true });
            if (errors.length > 0) {
                throw new ValidationException(400, "Validation Errors", errors);
            }
            const department = await this.departmentService.editDepartment(deptId, patchDepartmentDto);
            const responseBody = new ResponseBody(department, null, StatusMessages.OK);
            responseBody.set_meta(1);
            res.status(StatusCodes.OK).send(responseBody);
        } catch (err) {
            next(err);
        }
    }

    removeDepartment = async (req: RequestWithLogger, res: Response, next: NextFunction) => {
        try {
            const deptId = +req.params.id;
            const department = await this.departmentService.removeDepartment(deptId);
            res.status(StatusCodes.NO_CONTENT).send();
            Logger.getLogger().log({ level: 'info', message: `Department Deleted (${department.id})`, label: req.req_id});
        } catch (err) {
            next(err);
        }
    }
}

export default DepartmentController;