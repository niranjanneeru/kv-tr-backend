import { DeepPartial } from "typeorm";
import Employee from "../entity/employee.entity";
import EmployeeRepository from "../repository/employee.repository"
import Address from "../entity/address.entity";
import HttpException from "../exceptions/http.exception";

class EmployeeService{
    constructor(private employeeRepository: EmployeeRepository){}

    getAllEmployees(params): Promise<Employee[]> {
        if(Object.keys(params).length === 0) return this.employeeRepository.find();
        return this.employeeRepository.findByFilter(params);
    }

    async getEmployeeByID(id: number): Promise<Employee | null>{
        const employee = await this.employeeRepository.findEmployeeById(id);
        if(!employee){
            throw new HttpException(404, "Employee not Found");
        }
        return employee;
    }

    createEmployee(name: string, email: string, address: Address) : Promise<Employee> {
        const employee = new Employee();
        employee.name = name;
        employee.email = email;
        const newAddress = new Address();
        newAddress.line1 = address.line1;
        newAddress.pincode = address.pincode;
        employee.address = newAddress;
        
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