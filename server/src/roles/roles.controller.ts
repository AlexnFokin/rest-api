import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {RolesService} from "./roles.service";
import {CreateRoleDto} from "./CreateRoleDto";

@ApiTags('roles')
@Controller('roles')
export class RolesController {

    constructor(private roleService: RolesService) {}

    @Post()
    create(@Body() dto:CreateRoleDto) {
        return this.roleService.createRole(dto)
    }

    @Get('/:value')
    getByValue(@Param('value') value: string) {
        return this.roleService.getRoleByValue(value)
    }
}
