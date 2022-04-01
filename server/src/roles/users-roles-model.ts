import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../users/users.model";
import {Role} from "./roles.models";

@Table({tableName: 'user_roles', createdAt: false, updatedAt: false})
export class UserRoles extends Model<UserRoles> {

    @ApiProperty({example: '12', description: 'unique id'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: string

    @ForeignKey(() => Role)
    @ApiProperty({example: 'admin', description: 'value role'})
    @Column({type: DataType.INTEGER})
    roleId: number

    @ForeignKey(()=> User)
    @ApiProperty({example: 'description', description: 'description role'})
    @Column({type: DataType.INTEGER})
    userId: number

}