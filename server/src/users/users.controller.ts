import {Body, Controller, Get, Post, UseGuards, UsePipes} from '@nestjs/common';
import {CreateUserDto} from "./dto/create-user.dto";
import {UsersService} from "./users.service";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {User} from "./users.model";
import {JwtAuthGuard} from "../auth/jwt-auth-guard";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";
import {Role} from "../roles/roles.models";
import {AddRoleDto} from "./dto/add-role.dto";
import {BanUserDto} from "./dto/ban-user.dto";
import {ValidationPipe} from "../pipes/validation.pipe";


@ApiTags('users')
@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) {
    }

    @ApiOperation({summary: 'create new user'})
    @ApiResponse({status: 200, type: User})
    @UsePipes(ValidationPipe)
    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.userService.createUser(userDto)
    }

    @ApiOperation({summary: 'get all users'})
    @ApiResponse({status: 200, type: [User]})
    @Roles('admin')
    @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGuard)
    @Get()
    getAll() {
        return this.userService.getUsers()
    }

    @ApiOperation({summary: 'give a role'})
    @ApiResponse({status: 200})
    @Roles('admin')
    @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGuard)
    @Post('/role')
    addRole(@Body()dto: AddRoleDto) {
        return this.userService.addRole(dto)
    }

    @ApiOperation({summary: 'banned user'})
    @ApiResponse({status: 200})
    @Roles('admin')
    @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGuard)
    @Post('/ban')
    ban(@Body() dto: BanUserDto) {
        return this.userService.ban(dto)
    }
}
