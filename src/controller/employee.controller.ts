import { NextFunction, Request, Response, Router } from "express";
import EmployeeService from "../service/employee.service";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import ValidationException from "../exceptions/validation.exception";
import CreateAddressDto from "../dto/create-address.dto";
import EditEmployeeDto from "../dto/edit-employee.dto";
import SetEmployeeDto from "../dto/patch-employee.dto";
import CreateEmployeeDto from "../dto/create-employee.dto";

class EmployeeController {
    public router: Router;

    constructor(private employeeService: EmployeeService) {
        this.router = Router();

        this.router.get("/", this.getAllEmployees);
        this.router.post("/", this.createEmployee);
        this.router.get("/:id", this.getEmployeeById);
        this.router.put("/:id", this.editEmployee);
        this.router.patch("/:id", this.setFieldEmployee);
        this.router.delete("/:id", this.removeEmployee);
    }

    getAllEmployees = async (req: Request, res: Response) => {
        let params = {}
        // let nameFilter = req.query.name;
        // if(nameFilter) params['name'] = nameFilter;
        // let emailFilter = req.query.email;
        // if(emailFilter) params['email'] = emailFilter;
        // TODO
        const employees = await this.employeeService.getAllEmployees(params);
        res.status(200).send(employees);
    }

    getEmployeeById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const employeeId = +req.params.id;
            const employee = await this.employeeService.getEmployeeByID(employeeId);
            res.status(200).send(employee);
        } catch (error) {
            next(error);
        }
    }

    createEmployee = async (req: Request, res: Response, next) => {
        try {
            const { email, name, address } = req.body;
            const createEmployeeDto = plainToInstance(CreateEmployeeDto, req.body);
            const errors = await validate(createEmployeeDto);
            if (errors.length > 0) {
                throw new ValidationException(400, "Validation Errors", errors);
            }
            const employee = await this.employeeService.createEmployee(name, email, address);
            res.status(201).send(employee);
        } catch (err) {
            next(err);
        }
    }

    editEmployee = async (req: Request, res: Response, next: NextFunction) => {
        let employeeId = +req.params.id;
        try {
            const { name, email, address } = req.body;
            const editEmployeeDto = plainToInstance(EditEmployeeDto, req.body);
            const errors = await validate(editEmployeeDto);
            if (errors.length > 0) {
                throw new ValidationException(400, "Validation Errors", errors);
            }
            let params = { 'name': name, 'email': email};
            const employee = await this.employeeService.editEmployee(employeeId, params, address);
            res.status(200).send(employee);
        } catch (err) {
            next(err);
        }
    }

    setFieldEmployee = async (req: Request, res: Response, next: NextFunction) => {
        let employeeId = +req.params.id;
        try {
            const { name, email, address } = req.body;
            console.log(name, email, address)
            const setEmployeeDto = plainToInstance(SetEmployeeDto, req.body);
            const errors = await validate(setEmployeeDto, { skipMissingProperties: true });
            if (errors.length > 0) {
                throw new ValidationException(400, "Validation Errors", errors);
            }
            let params = {}
            if (name) params['name'] = name;
            if (email) params['email'] = email;
            const employee = await this.employeeService.editEmployee(employeeId, params, address);
            res.status(200).send(employee);
        } catch (err) {
            next(err);
        }
    }

    removeEmployee = async (req: Request, res: Response, next: NextFunction) => {
        let employeeId = +req.params.id;
        try {
            const employee = await this.employeeService.removeEmployee(employeeId);
            res.status(204).send();
        } catch (err) {
            next(err);
        }
    }
}


export default EmployeeController;