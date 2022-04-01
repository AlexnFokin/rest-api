import {Module} from "@nestjs/common";
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import {ConfigModule} from "@nestjs/config";
import {User} from "./users/users.model";
import { RolesModule } from './roles/roles.module';
import {Role} from "./roles/roles.models";
import {UserRoles} from "./roles/users-roles-model";
import { AuthModule } from './auth/auth.module';
import {Post} from "./posts/posts.model";
import { FilesService } from './files/files.service';
import { FilesModule } from './files/files.module';
import {PostsModule} from "./posts/posts.module";
import {ServeStaticModule} from "@nestjs/serve-static";
import * as path from 'path';

@Module({
    controllers: [],
    providers: [FilesService],
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRESS_HOST,
            port: Number(process.env.POSTGRESS_PORT),
            username: process.env.POSTGRESS_USER,
            password: process.env.POSTGRESS_PASS,
            database: process.env.POSTGRESS_DB,
            models: [User, Role, UserRoles, Post],
            autoLoadModels: true
        }),
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname, 'static'),
        }),
        UsersModule,
        RolesModule,
        AuthModule,
        FilesModule,
        PostsModule
    ],
})
export class AppModule {}