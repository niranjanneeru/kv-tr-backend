import { DeepPartial } from "typeorm";
import Employee from "../entity/employee.entity";
import EmployeeRepository from "../repository/employee.repository"

class EmployeeService{
    constructor(private employeeRepository: EmployeeRepository){}

    getAllEmployees(...args): Promise<Employee[]> {
        if(args.length === 0) return this.employeeRepository.find();
    }

    getEmployeeByID(id: number): Promise<Employee | null>{
        return this.employeeRepository.findEmployeeById(id);
    }

    createEmployee(name: string, email: string) : Promise<Employee> {
        const employee = new Employee();
        employee.name = name;
        employee.email = email;
        return this.employeeRepository.createEmployee(employee);
    }

    editEmployee = async (id:number, params): Promise<Employee | null> => {
        const employee = await this.employeeRepository.findEmployeeById(id);
        if(!employee){
            return null;
        }
        let keys = Object.keys(params);
        keys.forEach(key => {
            employee[key] = params[key];
        });
        return this.employeeRepository.updateEmployee(employee);   
    }

    removeEmployee = async(id: number): Promise<Employee | null> => {
        const employee = await this.employeeRepository.findEmployeeById(id);
        if(!employee) return null;
        return this.employeeRepository.deleteEmployee(employee);
    }
}

export default EmployeeService