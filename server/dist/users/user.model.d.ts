import { Model } from "sequelize-typescript";
interface UserCreationAttrs {
    email: string;
    password: string;
}
export declare class User extends Model<User, UserCreationAttrs> {
    id: string;
    email: string;
    password: string;
    banned: boolean;
    banReason: string;
}
export {};
