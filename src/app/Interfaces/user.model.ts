import { Role } from "./role.model";

export interface User { 
    id:number;
    firstName: string;
    lastName: string;
    birthdayDate: Date;
    email: string;
    password: string;
    phone: string;
    role: Role;
    imgUser: string;
    city: string;
    aboutMe: string;
}