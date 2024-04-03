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
}

export enum Role {
    ADMIN, USER
}