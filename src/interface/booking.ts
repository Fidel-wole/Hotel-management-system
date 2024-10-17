import { User } from "./user";

export interface Booking{
    userId: User | string;
    roomId: number;
    checkInDate: Date;
    checkOutDate: Date;
    numberOfGuests: number;
    bookingStatus: string;
}