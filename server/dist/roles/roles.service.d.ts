import { CreateRoleDto } from "./CreateRoleDto";
import { Role } from "./roles.models";
export declare class RolesService {
    private roleRepository;
    constructor(roleRepository: typeof Role);
    createRole(dto: CreateRoleDto): Promise<Role>;
    getRoleByValue(value: string): Promise<Role>;
}
