import Booking from "../../models/booking";

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
      const bookings = await Booking.find({ userId: userId }).populate(
        "userId",
        "username email name"
      );
      return bookings;
    } catch (error) {
      throw error;
    }
  }

  static async getBookingById(id: string) {
    try {
      const booking = await Booking.findById(id).populate(
        "userId",
        "username email name"
      );
      return booking;
    } catch (error) {
      throw error;
    }
  }
  static async getAllBookings() {
    try {
      const bookings = await Booking.find({ bookingStatus: "pending" })
        .populate("userId", "username email name");

      const totalBookings = await Booking.countDocuments({ bookingStatus: "pending" });

      return {
        totalBookings,
        bookings,
      };
    } catch (err:any) {
    
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

      // Return the updated booking
      return updatedBooking;
    } catch (err: any) {
      throw new Error("Error updating booking status: " + err.message);
    }
  }
}
