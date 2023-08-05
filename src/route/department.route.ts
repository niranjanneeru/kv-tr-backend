import DepartmentController from "../controller/department.controller";
import dataSource from "../db/postgres.db";
import Department from "../entity/department.entity";
import DepartmentRepository from "../repository/department.repository";
import DepartmentService from "../service/department.service";

const departmentRoute = new DepartmentController(
    new DepartmentService(
        new DepartmentRepository(
            dataSource.getRepository(Department
            )
        )
    )
).router;

export default departmentRoute;