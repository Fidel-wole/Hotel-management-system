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
}
