import {Menu} from "./menu.model"

export interface Booking {
    id: number;
    publishDate: Date;
    title: string;
    numUsers: number;
    observations: string;
    status: string;
    discount: number;
    interior: boolean;
    numTable: number;
    //Many to One
    //user: User;
    totalPrice: number;
    //Many to one
    //restaurant: Restaurant;
    //Many to one
    menu: Menu;
    }