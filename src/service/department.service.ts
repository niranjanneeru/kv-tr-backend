import Department from "../entity/department.entity";
import HttpException from "../exceptions/http.exception";
import DepartmentRepository from "../repository/department.repository";

class DepartmentService{
    constructor(
        private departmentRepository: DepartmentRepository
    ){}

    getAllDepartment(): Promise<Department []>{
        return this.departmentRepository.find();
    }

    getDepartmentById =async (id:number): Promise<Department> => {
        const department = await this.departmentRepository.findDepartmentById(id);
        if(!department){
            throw new HttpException(404, `Department with id ${id} not found`);
        }
        return department;
    }

    createDepartment(name: string, descrption: string) : Promise<Department>{
        const department = new Department();
        department.name = name;
        department.description = descrption;

        return this.departmentRepository.createDepartment(department);
    }

    editDepartment = async(id: number, params): Promise<Department> => {
        const department = await this.departmentRepository.findDepartmentById(id);
        if(!department){
            throw new HttpException(404, `Department with id ${id} not found`);
        }
        let keys = Object.keys(params);
        keys.forEach(key => {
            department[key] = params[key];
        });
        return this.departmentRepository.updateDepartment(department);
    }

    removeDepartment = async(id: number): Promise<Department> => {
        const department = await this.departmentRepository.findDepartmentById(id);
        if(!department){
            throw new HttpException(404, `Department with id ${id} not found`);
        }
        return this.departmentRepository.deleteDepartment(department);
    }
}

export default DepartmentService;