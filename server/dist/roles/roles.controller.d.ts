import { RolesService } from "./roles.service";
import { CreateRoleDto } from "./CreateRoleDto";
export declare class RolesController {
    private roleService;
    constructor(roleService: RolesService);
    create(dto: CreateRoleDto): Promise<import("./roles.models").Role>;
    getByValue(value: string): Promise<import("./roles.models").Role>;
}
