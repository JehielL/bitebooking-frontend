
export interface Booking {
    id: number;
    date: Date;
    title: string;
    price: number;
    numUsers: number;
    observations: string;
    status: string;
    discount: number;
    interior: boolean;
    numTable: number;
    totalPrice: number;
    imageUrl: string;
   // available: false;
    //Many to One
    //user: User;
    
    //Many to one
    //restaurant: Restaurant;
    //Many to one
    //menu: Menu;
    }