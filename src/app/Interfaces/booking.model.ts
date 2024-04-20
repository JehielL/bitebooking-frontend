import { Menu } from "./menu.model";
import { Restaurant } from "./restaurant.model";
import { User } from "./user.model";

export interface Booking {

    id: number;
    createDate: Date;
    user: User;
    numUsers: number;
    observations: string;
    status: boolean;
    interior: boolean;
    numTable: number;
    restaurant: Restaurant,
    isPremium: boolean;
    extraService: string;
    
}