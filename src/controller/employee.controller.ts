import { NextFunction, Request, Response, Router } from "express";
import EmployeeService from "../service/employee.service";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import ValidationException from "../exception/validation.exception";
import ResponseBody from "../utils/response.body";
import EditEmployeeDto from "../dto/edit-employee.dto";
import SetEmployeeDto from "../dto/patch-employee.dto";
import CreateEmployeeDto from "../dto/create-employee.dto";
import LoginEmployeeDto from "../dto/login.employee.dto";
import authenticate from "../middleware/authenticate.middleware";
import authorize from "../middleware/authorize.middleware";
import { Role } from "../utils/role.enum";
import { StatusMessages } from "../utils/status.message.enum";
import { StatusCodes } from "../utils/status.code.enum";
import RequestWithLogger from "../utils/request.logger";
import Logger from "../logger/logger.singleton";

class EmployeeController {
    public router: Router;

    constructor(private employeeService: EmployeeService) {
        this.router = Router();

        this.router.get("/", authenticate, this.getAllEmployees);
        this.router.post("/", authenticate, authorize(Role.HR, Role.MANAGER), this.createEmployee);
        this.router.get("/:id", authenticate, this.getEmployeeById);
        this.router.put("/:id", authenticate, this.editEmployee);
        this.router.patch("/:id", authenticate, this.setFieldEmployee);
        this.router.delete("/:id", authenticate, authorize(Role.HR), this.removeEmployee);
        this.router.post("/login", this.loginEmployee);
    }

    // TODO Change Dept -> Dept.id
    getAllEmployees = async (req: Request, res: Response) => {
        const employees = await this.employeeService.getAllEmployees();
        const responseBody = new ResponseBody(employees, null, StatusMessages.OK);
        responseBody.set_meta(employees.length);
        res.status(StatusCodes.OK).send(responseBody);
    }

    // TODO Change Dept -> Dept.id
    getEmployeeById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const employeeId = req.params.id;
            const employee = await this.employeeService.getEmployeeByID(employeeId);
            const responseBody = new ResponseBody(employee, null, StatusMessages.OK);
            responseBody.set_meta(1);
            res.status(StatusCodes.OK).send(responseBody);
        } catch (error) {
            next(error);
        }
    }

    // TODO Change Dept -> Dept.id
    createEmployee = async (req: RequestWithLogger, res: Response, next) => {
        try {
            const createEmployeeDto = plainToInstance(CreateEmployeeDto, req.body);
            const errors = await validate(createEmployeeDto);
            if (errors.length > 0) {
                throw new ValidationException(400, "Validation Errors", errors);
            }
            const employee = await this.employeeService.createEmployee(createEmployeeDto);
            const responseBody = new ResponseBody(employee, null, StatusMessages.CREATED);
            responseBody.set_meta(1);
            res.status(StatusCodes.CREATED).send(responseBody);
            Logger.getLogger().log({ level: 'info', message: `Employee Created (${employee.id})`, label: req.req_id});
        } catch (err) {
            next(err);
        }
    }

    editEmployee = async (req: Request, res: Response, next: NextFunction) => {
        let employeeId = req.params.id;
        try {
            const editEmployeeDto = plainToInstance(EditEmployeeDto, req.body);
            const errors = await validate(editEmployeeDto);
            if (errors.length > 0) {
                throw new ValidationException(400, "Validation Errors", errors);
            }
            const employee = await this.employeeService.editEmployee(employeeId, editEmployeeDto);
            const responseBody = new ResponseBody(employee, null, StatusMessages.OK);
            responseBody.set_meta(1);
            res.status(StatusCodes.OK).send(responseBody);
        } catch (err) {
            next(err);
        }
    }

    setFieldEmployee = async (req: Request, res: Response, next: NextFunction) => {
        let employeeId = req.params.id;
        try {
            const setEmployeeDto = plainToInstance(SetEmployeeDto, req.body);
            const errors = await validate(setEmployeeDto, { skipMissingProperties: true });
            if (errors.length > 0) {
                throw new ValidationException(400, "Validation Errors", errors);
            }
            const employee = await this.employeeService.editEmployee(employeeId, setEmployeeDto as EditEmployeeDto);
            const responseBody = new ResponseBody(employee, null, StatusMessages.OK);
            responseBody.set_meta(1);
            res.status(StatusCodes.OK).send(responseBody);
        } catch (err) {
            next(err);
        }
    }

    removeEmployee = async (req: RequestWithLogger, res: Response, next: NextFunction) => {
        let employeeId = req.params.id;
        try {
            const employee = await this.employeeService.removeEmployee(employeeId);
            res.status(StatusCodes.NO_CONTENT).send();
            Logger.getLogger().log({ level: 'info', message: `Employee Deleted (${employee.id})`, label: req.req_id});
        } catch (err) {
            next(err);
        }
    }

    loginEmployee = async (req: Request, res: Response, next: NextFunction) => {
        const loginEmployeeDto = plainToInstance(LoginEmployeeDto, req.body);
        const errors = await validate(LoginEmployeeDto);
        if (errors.length > 0) {
            throw new ValidationException(400, "Validation Errors", errors);
        }
        try {
            const data = await this.employeeService.loginEmployee(loginEmployeeDto);
            const responseBody = new ResponseBody(data, null, StatusMessages.OK);
            responseBody.set_meta(1);
            res.status(StatusCodes.OK).send(responseBody);
        } catch (err) {
            next(err);
        }
    }
}


export default EmployeeController;