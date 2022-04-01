import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {CreateUserDto} from "../users/dto/create-user.dto";
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {

    constructor(private userService: UsersService,
                private jwtservise: JwtService) {}

    async login(userDto: CreateUserDto) {
        const user = await this.validateUser(userDto)
        return this.generateToken(user)
    }

    async registration(userDto: CreateUserDto) {
        const candidate = await this.userService.getUserByEmail(userDto.email)
        if (candidate) {
            throw new HttpException(`user with ${userDto.email} exists`, HttpStatus.BAD_REQUEST)
        }
        const hashPassword = await bcrypt.hash(userDto.password, 5)
        const user = this.userService.createUser({...userDto, password: hashPassword})
        return this.generateToken(user)
    }

    private async generateToken(user) {
        const payload = {email: user.email, id: user.id, roles: user.roles}
        return {
            token: this.jwtservise.sign(payload)
        }
    }

    private async validateUser(userDto: CreateUserDto) {
        const user = await this.userService.getUserByEmail(userDto.email)
        const passwordEqals = await bcrypt.compare(userDto.password, user.password)
        if (user && passwordEqals) {
            return user
        }
        throw new UnauthorizedException({message: 'user or password not correct'})
    }
}
