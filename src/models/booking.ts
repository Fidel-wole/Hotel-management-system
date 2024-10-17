import { Booking as BookingInterface } from "../interface/booking";
import mongoose, { Schema, Document } from "mongoose";

interface BookingDocument extends BookingInterface, Document {}

const bookingSchema = new Schema<BookingDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    roomId: { type: Number, required: true },
    checkInDate: { type: Date, required: true },
    checkOutDate: { type: Date, required: true },
    numberOfGuests: { type: Number, required: true },
    bookingStatus: { 
        type: String, 
        required: true, 
        enum: ["pending", "confirmed", "canceled"],
        default: "pending" 
      }
  },
  {
    timestamps: true,
  }
);


const Booking = mongoose.model<BookingDocument>("Booking", bookingSchema);

export default Booking;
