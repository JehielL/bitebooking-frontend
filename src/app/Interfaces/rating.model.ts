import { Menu } from "./menu.model";
import { User } from "./user.model";

export interface Rating {

    id: number;
    score: number;
    comment: string;
    user?: User;
    menu?: Menu;

}