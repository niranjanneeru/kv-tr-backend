import express, { Request, Response } from 'express'
import Employee from './models/Employee';
import dataSource from './models/dataSource';

const employeeRouter = express.Router();

const employeeRepository = dataSource.getRepository(Employee);

employeeRouter.get('/', async (req: Request, res: Response) => {
    const nameFilter = req.query.name as string;
    const emailFilter = req.query.email as string;

    const employees = await employeeRepository.createQueryBuilder()
    .where('name LIKE :name', {name:`${nameFilter || ""}%`})
    .andWhere('email LIKE :email', {email: `%${emailFilter || ""}%`})
    .getMany();

    res.status(200).send(employees);
});

employeeRouter.get('/:id', async (req: Request, res: Response) => {
    let employeeId = +req.params.id;

    let employee = await employeeRepository.findOneBy({ id: employeeId });

    if (employee) res.status(200).send(employee);
    else res.status(404).send("No Employee Found");
});

employeeRouter.post('/', async (req: Request, res: Response) => {
    if (!req.body.name || !req.body.email) {
        res.status(400).send("Missing Fields");
        return;
    }
    const employee = new Employee();
    employee.name = req.body.name;
    employee.email = req.body.email;
    await employeeRepository.save(employee);
    res.status(201).send(employee);
});

employeeRouter.put('/:id', async (req: Request, res: Response) => {
    let employeeId = +req.params.id;
    let name = req.body.name;
    let email = req.body.email;
    if (!name || !email) {
        res.status(400).send("Missing Fields");
        return;
    }
    let employee = await employeeRepository.findOneBy({ id: employeeId });
    if (employee) {
        employee.name = name;
        employee.email = email;
        await employeeRepository.save(employee);
        res.status(204).send();
    }
    else res.status(404).send("No Employee Found");
});

employeeRouter.patch('/:id', async (req: Request, res: Response) => {
    let employeeId = +req.params.id;
    let name = req.body.name;
    let email = req.body.email;
    if (!name && !email) {
        res.status(400).send("Missing Fields");
        return;
    }
    let employee = await employeeRepository.findOneBy({ id: employeeId });
    if (employee) {
        if (name) employee.name = name;
        if (email) employee.email = email;
        await employeeRepository.save(employee);
        res.status(204).send();
    }
    else res.status(404).send("No Employee Found");
});

employeeRouter.delete('/:id', async (req: Request, res: Response) => {
    let employeeId = +req.params.id;
    let employee = await employeeRepository.findOneBy({ id: employeeId });
    if (employee) {
        await employeeRepository.softRemove(employee);
        res.status(204).send();
    }
    else res.status(404).send("No Employee Found");
});

export default employeeRouter;