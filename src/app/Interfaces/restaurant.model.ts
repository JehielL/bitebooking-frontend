import { Booking } from "./booking.model";

export interface Restaurant {
    id: number;
    name: string;
    //location: RestaurantLocation;
    phone: string;
    //kitchenType: RestaurantType;
    openingTime: string;
    closingTime: string;
    averageRating: number;
    //bookings: Booking[];
    status: boolean;
  }