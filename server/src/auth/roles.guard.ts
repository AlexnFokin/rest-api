import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException
} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {Observable} from "rxjs";
import {Reflector} from "@nestjs/core";
import {ROLES_KEY} from "./roles-auth.decorator";



@Injectable()
export class RolesGuard implements CanActivate{

    constructor(private jwtService: JwtService,
                private reflector: Reflector) {

    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest()
        try {
            const requireRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
                context.getHandler(),
                context.getClass()
            ])
            if (!requireRoles) {
                return true
            }
            const authHeader = req.headers.authorization
            const bearer = authHeader.split(' ')[0]
            const token = authHeader.split(' ')[1]

            if (bearer !== 'Bearer' || !token) {
                throw new UnauthorizedException({message: 'user not authorized'})
            }
            const user = this.jwtService.verify(token)
            req.user = user
            return user.roles.some(role => requireRoles.includes(role.value))

        }catch (e) {
            console.log(e)
            throw new HttpException('access denied', HttpStatus.FORBIDDEN)
        }
    }

}