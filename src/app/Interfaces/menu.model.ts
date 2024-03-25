import { Restaurant } from "./restaurant.model";
import { RestaurantType } from "./restaurantType.model";

export interface Menu {

    id: number;
    title: string;
    description: string;
    imgMenu: string;
    active: boolean;
    restaurantType: RestaurantType;
    alergys: boolean;
    restaurant: Restaurant;
    
}