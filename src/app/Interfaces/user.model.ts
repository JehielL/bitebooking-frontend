export interface User { 
    id:number;
    firstName: string;
    lastName: string;
    birthdayDate: Date;
    email: string;
    password: string;
    phone: number;
    role: Role;
}

export enum Role {
    ADMIN, USER
}