import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../users/users.model";
import {UserRoles} from "./users-roles-model";

interface RoleCreationAttrs {
    value: string
    description: string
}
@Table({tableName: 'roles'})
export class Role extends Model<Role, RoleCreationAttrs> {

    @ApiProperty({example: '12', description: 'unique id'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: string

    @ApiProperty({example: 'admin', description: 'value role'})
    @Column({type: DataType.STRING, unique: true ,allowNull: false})
    value: string

    @ApiProperty({example: 'description', description: 'description role'})
    @Column({type: DataType.STRING, allowNull: false})
    description: string

    @BelongsToMany(() => User, () => UserRoles)
    users: User[]
}