import EmployeeController from "../controller/employee.controller";
import dataSource from "../db/postgres.db";
import Department from "../entity/department.entity";
import Employee from "../entity/employee.entity";
import DepartmentRepository from "../repository/department.repository";
import EmployeeRepository from "../repository/employee.repository";
import DepartmentService from "../service/department.service";
import EmployeeService from "../service/employee.service";


const employeeRoute = new EmployeeController(
    new EmployeeService(
        new EmployeeRepository(
            dataSource.getRepository(Employee)
        ),
        new DepartmentService(
            new DepartmentRepository(
                dataSource.getRepository(Department)
            )
        )
    )
).router;

export default employeeRoute;