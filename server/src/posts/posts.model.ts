import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../users/users.model";


interface PostCreationAttrs {
	title: string
	content: string
	userId: number
	image: string
}
@Table({tableName: 'posts'})
export class Post extends Model<Post, PostCreationAttrs> {
	@ApiProperty({example: '12', description: 'unique id'})
	@Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
	id: string

	@ApiProperty({example: 'Header post', description: 'title post'})
	@Column({type: DataType.STRING, unique: true ,allowNull: false})
	title: string

	@ApiProperty({example: 'content some text', description: 'content'})
	@Column({type: DataType.STRING, allowNull: false})
	content: string

	@Column({type: DataType.STRING})
	image: string

	@ForeignKey(()=> User)
	@Column({type: DataType.INTEGER})
	userId: number
	@BelongsTo(()=> User)
	author: User
}