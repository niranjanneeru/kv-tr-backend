import express, { Request, Response } from 'express'
import Employee from './models/Employee';

const employeeRouter = express.Router();

const employees: Employee[] = [{
        id: 1,
        name: "NB",
        email: "nb@nb.me",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 2,
        name: "LV",
        email: "lv@lh.me",
        createdAt: new Date(),
        updatedAt: new Date()
    }]

let count = employees.length;

employeeRouter.get('/', (req : Request, res: Response)=> {
    res.status(200).send(employees);
});

employeeRouter.get('/:id', (req: Request, res: Response)=> {
    let employeeId = +req.params.id;
    let employee = employees.find((employee) => employee.id === employeeId);
    if(employee) res.status(200).send(employee);
    else res.status(404).send("No Employee Found");
});

employeeRouter.post('/', (req: Request, res:Response)=> {
    const employee = new Employee(
        ++count,
        req.body.name,
        req.body.email
    );
    employees.push(employee);
    res.status(201).send(employee);
});

employeeRouter.put('/:id', (req: Request, res:Response)=> {
    let employeeId = +req.params.id;
    let employee = employees.find((employee) => employee.id === employeeId);
    let name = req.body.name;
    let email = req.body.email;
    if(!name || !email){
        res.status(400).send("Missing Fields");
        return;
    }
    if(employee){
        employee.name = name;
        employee.email = email;
        employee.updatedAt = new Date();
        res.status(204).send();
    }
    else res.status(404).send("No Employee Found");
});

employeeRouter.patch('/:id', (req: Request, res:Response)=> {
    let employeeId = +req.params.id;
    let employee = employees.find((employee) => employee.id === employeeId);
    let name = req.body.name;
    let email = req.body.email;
    if(!name && !email){
        res.status(400).send("Missing Fields");
        return;
    }
    if(employee){
        if(name) employee.name = name;
        if(email) employee.email = email;
        employee.updatedAt = new Date();
        res.status(204).send();
    }
    else res.status(404).send("No Employee Found");
});

employeeRouter.delete('/:id', (req: Request, res:Response)=> {
    let employeeId = +req.params.id;
    let employeeIndex = employees.findIndex((employee) => employee.id === employeeId);
    if(employeeIndex != -1) {
        employees.splice(employeeIndex, 1);
        res.status(204).send();
    }
    else res.status(404).send("No Employee Found");
});

export default employeeRouter;