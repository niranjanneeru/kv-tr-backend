import { DataSource, Repository } from "typeorm";
import Employee from "../entity/employee.entity";
import dataSource from "../db/postgres.db";

class EmployeeRepository{
    constructor(private repository: Repository<Employee>){}

    find(): Promise<Employee[]>{
        return this.repository.find();
    }

    findEmployeeById(id: number): Promise<Employee>{
        return this.repository.findOneBy({
            id: id,
        });
    }

    createEmployee(employee: Employee): Promise<Employee> {
        return this.repository.save(employee);
    }

    updateEmployee(employee: Employee): Promise<Employee>{
        return this.repository.save(employee);
    }

    deleteEmployee(employee: Employee): Employee | PromiseLike<Employee> {
        return this.repository.softRemove(employee);
    }
}


export default EmployeeRepository;