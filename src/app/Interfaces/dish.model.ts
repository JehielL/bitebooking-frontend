import { Menu } from "./menu.model";

export interface Dish {
    id: number;
    title: string;
    description: string;
    price: number;
    imgDish: string;
    active: boolean;
    alergys: boolean;
    menu: Menu;
}