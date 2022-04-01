import { CreateUserDto } from "../users/dto/create-user.dto";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
export declare class AuthService {
    private userService;
    private jwtservise;
    constructor(userService: UsersService, jwtservise: JwtService);
    login(userDto: CreateUserDto): Promise<{
        token: string;
    }>;
    registration(userDto: CreateUserDto): Promise<{
        token: string;
    }>;
    private generateToken;
    private validateUser;
}
