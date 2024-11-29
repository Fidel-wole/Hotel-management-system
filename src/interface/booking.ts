import { Room } from "./room";
import { User } from "./user";

export interface Booking{
    userId: User | string;
    roomId:Room | string;
    checkInDate: Date;
    checkOutDate: Date;
    numberOfGuests: number;
    bookingStatus: string;
}