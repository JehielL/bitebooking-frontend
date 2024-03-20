
import { Booking } from "./booking.model";
import { RestaurantLocation } from "./restaurantLocation.model";
import { RestaurantType } from "./restaurantType.model";

export interface Restaurant {

    id: number;
    name: string;
    location: RestaurantLocation;
    phone: number;
    restaurantType: RestaurantType;
    openingTime: Date;
    closingTime: Date;
    averageRating: number;
    imageUrl: string;
    //bookings: Booking;
    //tables: Tables[];
    status: boolean;
  }




 
