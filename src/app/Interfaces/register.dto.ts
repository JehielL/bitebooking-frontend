import { Role } from "./role.model";

export interface Register {
  id:number;
    firstName: string;
    lastName: string;
    birthdayDate: Date;
    email: string;
    password: string;
    phone: string;
    role: Role;
    imgUser: string;
}
