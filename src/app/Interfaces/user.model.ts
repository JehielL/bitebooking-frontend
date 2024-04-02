export interface User { 
    id:number;
    firtsName: string;
    lastName: string;
    birthdayDate: Date;
    email: string;
    password: string;
    phone: string;
    role: Role;
    imgUser: imgUser;
}

export enum Role {
    ADMIN, USER
}