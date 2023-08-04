import bcrypt from 'bcrypt'
import Employee from "../entity/employee.entity";
import EmployeeRepository from "../repository/employee.repository"
import Address from "../entity/address.entity";
import HttpException from "../exceptions/http.exception";
import CreateEmployeeDto from "../dto/create-employee.dto";
import LoginEmployeeDto from '../dto/login.employee.dto';
import jwt from 'jsonwebtoken';
import EditAddressDto from '../dto/edit-address.dto';
import EditEmployeeDto from '../dto/edit-employee.dto';

class EmployeeService {
    constructor(private employeeRepository: EmployeeRepository) { }

    getAllEmployees(params): Promise<Employee[]> {
        if (Object.keys(params).length === 0) return this.employeeRepository.find();
        return this.employeeRepository.findByFilter(params);
    }

    async getEmployeeByID(id: number): Promise<Employee | null> {
        const employee = await this.employeeRepository.findEmployeeById(id);
        if (!employee) {
            throw new HttpException(404, `Employee with id ${id} not found`);
        }
        return employee;
    }

    async createEmployee(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
        const employee = new Employee();
        employee.name = createEmployeeDto.name;
        employee.email = createEmployeeDto.email;
        employee.password = await bcrypt.hash(createEmployeeDto.password, 10);

        const newAddress = new Address();
        newAddress.line1 = createEmployeeDto.address.line1;
        newAddress.pincode = createEmployeeDto.address.pincode;
        employee.address = newAddress;

        return this.employeeRepository.createEmployee(employee);
    }

    editEmployee = async (id: number, editEmployeeDto: EditEmployeeDto): Promise<Employee | null> => {
        const employee = await this.employeeRepository.findEmployeeById(id);
        if (!employee) {
            throw new HttpException(404, `Employee with id ${id} not found`);
        }
        let keys = Object.getOwnPropertyNames(editEmployeeDto);
        keys.forEach(key => {
            employee[key] = editEmployeeDto[key];
        });
        // if (address) {
        //     if (address.line1) employee.address.line1 = address.line1;
        //     if (address.pincode) employee.address.pincode = address.pincode
        // }
        return this.employeeRepository.updateEmployee(employee);
    }

    removeEmployee = async (id: number): Promise<Employee | null> => {
        const employee = await this.employeeRepository.findEmployeeById(id);
        if (!employee) {
            throw new HttpException(404, `Employee with id ${id} not found`);
        }
        return this.employeeRepository.deleteEmployee(employee);
    }

    loginEmployee = async (loginEmployeeDto: LoginEmployeeDto) => {
        const employee = await this.employeeRepository.findEmployeeByEmail(loginEmployeeDto.email);
        if (!employee) {
            throw new HttpException(401, 'Incorrect username or password');
        }
        const result = await bcrypt.compare(loginEmployeeDto.password, employee.password);
        if (!result) {
            throw new HttpException(401, 'Incorrect username or password');
        }

        const payload = {
            name: employee.name,
            email: employee.email
        }

        const token = jwt.sign(payload, "ABCDE", {
            expiresIn: "1hr"
        });

        return {token};


    }
}

export default EmployeeService