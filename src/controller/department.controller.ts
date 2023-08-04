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

class DepartmentController {
    public router: Router;
    constructor(
        private departmentService: DepartmentService
    ) {
        this.router = Router();

        this.router.get("/", this.getAllDepartments)
        this.router.post("/", authenticate, authorize, this.createDepartment);
        this.router.get("/:id", this.getDepartmentById);
        this.router.put("/:id", authenticate, authorize, this.editDepartment);
        this.router.patch("/:id", authenticate, authorize, this.setDepartment);
        this.router.delete("/:id", authenticate, authorize, this.removeDepartment);
    }

    getAllDepartments = async (req: Request, res: Response) => {
        const departments = await this.departmentService.getAllDepartment();
        res.status(200).send(departments);
    }

    getDepartmentById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const deptId = +req.params.id;
            const department = await this.departmentService.getDepartmentById(deptId);
            res.status(200).send(department);
        } catch (err) {
            next(err);
        }
    }

    createDepartment = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const createDepartmentDto = plainToInstance(CreateDepartmentDto, req.body);
            const errors = await validate(createDepartmentDto);
            if (errors.length > 0) {
                throw new ValidationException(400, "Validation Errors", errors);
            }
            const department = await this.departmentService.createDepartment(createDepartmentDto);
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
            res.status(200).send(department);
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
            res.status(200).send(department);
        } catch (err) {
            next(err);
        }
    }

    removeDepartment = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const deptId = +req.params.id;
            const department = await this.departmentService.removeDepartment(deptId);
            res.status(204).send();
        } catch (err) {
            next(err);
        }
    }
}

export default DepartmentController;