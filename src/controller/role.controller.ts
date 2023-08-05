import { Request, Response, Router } from "express";
import RoleService from "../service/role.service";

class RoleController{
    public router: Router;
    constructor(
        private roleService : RoleService
    ){
        this.router = Router();
        this.router.get("/", this.getAllRoles);
    }

    getAllRoles = async (req: Request, res: Response) => {
        const roles =  this.roleService.getRoles();
        res.status(200).send(roles);
    }
}

export default RoleController;