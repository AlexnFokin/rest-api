import {BelongsToMany, Column, DataType, HasMany, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {Role} from "../roles/roles.models";
import {UserRoles} from "../roles/users-roles-model";
import {Post} from "../posts/posts.model";


interface UserCreationAttrs {
    email: string
    password: string
}
@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs> {
    @ApiProperty({example: '12', description: 'unique id'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: string

    @ApiProperty({example: 'email@email.com', description: 'email'})
    @Column({type: DataType.STRING, unique: true ,allowNull: false})
    email: string

    @ApiProperty({example: 'mypassword', description: 'password'})
    @Column({type: DataType.STRING, allowNull: false})
    password: string

    @ApiProperty({example: 'banned', description: 'true'})
    @Column({type: DataType.BOOLEAN, defaultValue: false})
    banned: boolean

    @ApiProperty({example: 'ban reason', description: ''})
    @Column({type: DataType.STRING, allowNull: true })
    banReason: string

    @BelongsToMany(() => Role, ()=> UserRoles)
    roles: Role[]

    @HasMany(()=> Post)
    posts: Post[]
}