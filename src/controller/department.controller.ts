import { Request, Response, Router } from "express";
import DepartmentService from "../service/department.service";
import { NextFunction } from "express-serve-static-core";

class DepartmentController {
    public router: Router;
    constructor(
        private departmentService: DepartmentService
    ) {
        this.router = Router();

        this.router.get("/", this.getAllDepartments)
        this.router.post("/", this.createDepartment);
        this.router.get("/:id", this.getDepartmentById);
        this.router.put("/:id", this.editDepartment);
        this.router.patch("/:id", this.setDepartment);
        this.router.delete("/:id", this.removeDepartment);
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
            const { name, description } = req.body
            const department = await this.departmentService.createDepartment(name, description);
            res.status(201).send(department);
        } catch (err) {
            next(err);
        }
    }

    editDepartment = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const deptId = +req.params.id;
            const { name, description } = req.body
            let params = { 'name': name, 'descrption': description }
            const department = await this.departmentService.editDepartment(deptId, params);
            res.status(200).send(department);
        } catch (err) {
            next(err);
        }
    }

    setDepartment = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const deptId = +req.params.id;
            const { name, description } = req.body
            let params = {}
            if (name) params['name'] = name;
            if (description) params['description'] = description;
            const department = await this.departmentService.editDepartment(deptId, params);
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