
import { RestaurantType } from "./restaurantType.model";

export interface Restaurant {

    id: number;
    name: string;
    phone: string;
    restaurantType: RestaurantType;
    description: string;
    openingTime: Date;
    closingTime: Date;
    averageRating: number;
    imageUrl: string;
    status: boolean;
    city:string;
    address:string;
    number:string;
    postalCode:string;
  }




 
