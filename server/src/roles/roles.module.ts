import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Role} from "./roles.models";
import {User} from "../users/users.model";
import {UserRoles} from "./users-roles-model";



@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports: [
      SequelizeModule.forFeature([Role, User, UserRoles])
  ],
  exports: [
      RolesService
  ]
})
export class RolesModule {}
