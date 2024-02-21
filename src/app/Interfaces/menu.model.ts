export interface Menu {
    id: number;
    title: string;
    description: string;
    //TypeOfFoodEnum;
    isAvailable: boolean;
    allergic: boolean;
    isVegan: boolean;
    // ManyToOne;
    //restaurant: Restaurant;
}