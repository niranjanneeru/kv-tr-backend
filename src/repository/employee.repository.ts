import { DataSource, Repository } from "typeorm";
import Employee from "../entity/employee.entity";

class EmployeeRepository {
    constructor(private repository: Repository<Employee>) { }

    find(): Promise<Employee[]> {
        // return this.repository.find();
        return this.repository
            .createQueryBuilder('employee')
            .leftJoinAndSelect('employee.department', 'department')
            .addSelect('employee.departmentId')
            .getMany();
    }

    findEmployeeById(id: string): Promise<Employee> {
        return this.repository.findOne({
            where: { id },
            relations: {
                address: true,
                department: true
            }
        });
    }

    findEmployeeByEmail(email: string): Promise<Employee> {
        return this.repository.findOne({
            where: { email }
        });
    }

    createEmployee(employee: Employee): Promise<Employee> {
        return this.repository.save(employee);
    }

    updateEmployee(employee: Employee): Promise<Employee> {
        return this.repository.save(employee);
    }

    deleteEmployee(employee: Employee): Employee | PromiseLike<Employee> {
        return this.repository.softRemove(employee);
    }

    findByFilter(params: any[]): Promise<Employee[]> {
        return this.repository.createQueryBuilder()
            .where('name LIKE :name', { name: `${params[0] || ""}%` })
            .andWhere('email LIKE :email', { email: `%${params[1] || ""}%` })
            .getMany()
    }
}


export default EmployeeRepository;