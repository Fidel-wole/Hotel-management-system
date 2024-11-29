import Booking from "../../models/booking";
import RoomService from "../Room/room.service";

export default class BookingService {
  static async createBooking(bookingData: any) {
    try {
      const booking = await Booking.create(bookingData);
      return booking;
    } catch (error) {
      throw error;
    }
  }

  static async getBookings(userId: string) {
    try {
      const bookings = await Booking.find({ userId: userId })
        .populate("userId", "username email name")
        .populate({
          path: "roomId",
          select: "number type category pricePerNight", 
          populate: {
            path: "category", 
            select: "name", 
          },
        });
      return bookings;
    } catch (error) {
      throw error;
    }
  }

  static async getBookingById(id: string) {
    try {
      const booking = await Booking.findById(id)
        .populate("userId", "username email name")
        .populate({
          path: "roomId",
          select: "number type category pricePerNight", 
          populate: {
            path: "category", 
            select: "name", 
          },
        });
      return booking;
    } catch (error) {
      throw error;
    }
  }

  static async getRecentBookings() {
    try {
      const threeDaysAgo = new Date();
      threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

      const recentBookings = await Booking.find({
        createdAt: { $gte: threeDaysAgo },
      })
        .sort({ createdAt: -1 })
        .populate("userId", "username email name")
        .populate({
          path: "roomId",
          select: "number type category pricePerNight", 
          populate: {
            path: "category", 
            select: "name", 
          },
        });
      // Return the bookings
      return recentBookings;
    } catch (err: any) {
      throw new Error("Error fetching recent bookings: " + err.message);
    }
  }
  static async getAllPendingBookings() {
    try {
      const bookings = await Booking.find({
        bookingStatus: "pending",
      })
        .populate("userId", "username email name")
        .populate({
          path: "roomId",
          select: "number type category pricePerNight", 
          populate: {
            path: "category", 
            select: "name", 
          },
        });
      const totalBookings = await Booking.countDocuments({
        bookingStatus: "pending",
      });

      return {
        totalBookings,
        bookings,
      };
    } catch (err: any) {
      throw new Error("Error fetching bookings: " + err.message);
    }
  }

  static async updateBooking(booking_id: string, status: string) {
    try {
      // Update the booking status by booking_id
      const updatedBooking = await Booking.findOneAndUpdate(
        { _id: booking_id },
        { bookingStatus: status },
        { new: true }
      );

      // Check if booking was found and updated
      if (!updatedBooking) {
        throw new Error("Booking not found or update failed.");
      }
      await RoomService.updateRoom(updatedBooking.roomId, { isOccupied: true });
      // Return the updated booking
      return updatedBooking;
    } catch (err: any) {
      throw new Error("Error updating booking status: " + err.message);
    }
  }
}
