import { RestaurantLocation } from "./restaurantLocation.model";
import { RestaurantType } from "./restaurantType.model";

export interface Restaurant {
  id: number;
  name: string;
  // location: RestaurantLocation;
  phone: string;
  restaurantType: RestaurantType;
  openingTime: Date;
  closingTime: Date;
  averageRating: number;
  //bookings: Booking[];
  //tables: Tables[];
  status: boolean;
  imageUrl: string;
}