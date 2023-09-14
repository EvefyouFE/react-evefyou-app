import { RoleEnum } from "@common/enums/authEnum";

export type Role = `${RoleEnum}`;



export interface LoginRes {
    /** auth token */
    token: string;
    username: string;
    role: Role;
}