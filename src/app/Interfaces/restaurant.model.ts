import { RestaurantLocation } from "./restaurantLocation.model";
import { RestaurantType } from "./restaurantType.model";

export interface Restaurant {

    id: number;
    name: string;
    location: RestaurantLocation;
    phone: number;
    restaurantType: RestaurantType;
    description: string;
    openingTime: Date;
    closingTime: Date;
    averageRating: number;
    imageUrl: string;
    status: boolean;
  }




 
