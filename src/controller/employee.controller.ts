import { NextFunction, Request, Response, Router } from "express";
import EmployeeService from "../service/employee.service";

class EmployeeController{
    public router: Router;

    constructor(private employeeService: EmployeeService){
        this.router = Router();
        
        this.router.get("/", this.getAllEmployees);
        this.router.post("/", this.createEmployee);
        this.router.get("/:id", this.getEmployeeById);
        this.router.put("/:id", this.editEmployee);
        this.router.patch("/:id", this.editFieldEmployee);
        this.router.delete("/:id", this.removeEmployee);
    }

    getAllEmployees =  async (req: Request, res: Response) => {
        let params = {}
        // let nameFilter = req.query.name;
        // if(nameFilter) params['name'] = nameFilter;
        // let emailFilter = req.query.email;
        // if(emailFilter) params['email'] = emailFilter;
        // TODO
        const employees = await this.employeeService.getAllEmployees(params);
        res.status(200).send(employees);
    }

    getEmployeeById =  async (req: Request, res: Response, next: NextFunction) => {
        const employeeId = +req.params.id;
        try{
            const employee = await this.employeeService.getEmployeeByID(employeeId);
            res.status(200).send(employee)
        }catch (error){
            next(error);
        }
    }

    createEmployee = async (req: Request, res: Response) => {
        let name = req.body.name;
        let email = req.body.email;
        let address = req.body.address;
        if (!name || !email) {
            res.status(400).send("Missing Fields");
            return;
        }
        const employee = await this.employeeService.createEmployee(name, email, address);
        res.status(201).send(employee);
    }

    editEmployee = async (req: Request, res: Response) => {
        let employeeId = +req.params.id;
        let name = req.body.name;
        let email = req.body.email;
        if (!name || !email) {
            res.status(400).send("Missing Fields");
            return;
        }
        let params = {'name':name, 'email': email}
        const employee = await this.employeeService.editEmployee(employeeId, params);
        if(employee) res.status(200).send(employee);
        else res.status(404).send();
    }

    editFieldEmployee =async (req: Request, res: Response) => {
        let employeeId = +req.params.id;
        let name = req.body.name;
        let email = req.body.email;
        if (!name && !email) {
            res.status(400).send("Missing Fields");
            return;
        }
        let params= {}
        if(name) params['name'] = name
        if(email) params['email'] = email
        const employee = await this.employeeService.editEmployee(employeeId, params);
        if(employee) res.status(200).send(employee);
        else res.status(404).send();
    }

    removeEmployee =async (req: Request, res: Response) => {
        let employeeId = +req.params.id;
        const employee = await this.employeeService.removeEmployee(employeeId);
        if(employee) res.status(204).send()
        else res.status(404).send();
    }
}


export default EmployeeController;