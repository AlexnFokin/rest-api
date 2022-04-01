import { Injectable } from '@nestjs/common';
import {CreateRoleDto} from "./CreateRoleDto";
import {InjectModel} from "@nestjs/sequelize";

import {Role} from "./roles.models";

@Injectable()
export class RolesService {

    constructor(@InjectModel(Role) private roleRepository: typeof Role) {
    }

    async createRole(dto: CreateRoleDto) {
        const role = await this.roleRepository.create(dto)
        return role
    }

    async getRoleByValue(value: string) {
        const role = await this.roleRepository.findOne({where: {value}})
        return role
    }
}
