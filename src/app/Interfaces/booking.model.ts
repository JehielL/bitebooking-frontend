import { Menu } from "./menu.model";
import { Restaurant } from "./restaurant.model";

export interface Booking {

    id: number;
    createDate: Date;
    title: string;
    price: number;
    numUsers: number;
    observations: string;
    status: boolean;
    discount: number;
    interior: boolean;
    numTable: number;
    totalPrice: number;
    menu: Menu,
    restaurant: Restaurant
}