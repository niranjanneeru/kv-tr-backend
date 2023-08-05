import { Role } from "../utils/role.enum";

class RoleService{
    getRoles(){
        return Object.keys(Role);
    }
}

export default RoleService;