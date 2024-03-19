export interface UserForm { 
    id:number;
    firtsName: string;
    lastName: string;
    birthdayDate: Date;
    email: string;
    password: string;
    phone: string;
    role: Role;
    fotourl: string;
}

export enum Role {
    ADMIN, USER
}