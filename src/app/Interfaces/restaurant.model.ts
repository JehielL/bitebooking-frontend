import { Booking } from "./booking.model";

export interface Restaurant {
    id: number;
    name: string;
    //location: RestaurantLocation;
    phone: string;
    restaurantType: RestaurantType;
    openingTime: Date;
    closingTime: Date;
    averageRating: number;
    //bookings: Booking[];
    //tables: Tables[];
    status: boolean;
  }


export enum RestaurantType {
  JAPANESE_FOOD,

  THAI_FOOD,

  SPAIN_FOOD,

  CHINESE_FOOD,

  BRUNCH, 

  COFFEE_STORE, 

  BAR, 
  
  VIETNAM_FOOD,

  ITALIAN_FOOD,

  FRENCH_FOOD,

  TEX_MEX_FOOD,

  KOREAN_FOOD,

  VEGAN_FOOD,

  AMERICAN_FOOD,

  GERMAN_FOOD,

  PORTUGUESE_FOOD,

  FUSION_FOOD,

  GREEK_FOOD,

  INDIAN_FOOD,

  PERUVIAN_FOOD,

  CANADIAN_FOOD,

  DOMINICAN_FOOD,

  LATIN_AMERICAN_FOOD,

  ARGENTINE_FOOD,

  BALKAN_FOOD,

  GEORGIAN_FOOD,

  ARABIAN_FOOD,

  MARRAKECH_FOOD,

  ASIAN_FOOD,

  AFRICAN_FOOD,

  MAGHREB_FOOD,

  CARIBBEAN_FOOD
}


 