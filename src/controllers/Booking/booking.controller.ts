import BookingService from "../../services/Booking/booking.service";
import { Request, Response } from "express";
import Dispatcher from "../../utils/dispatcher";
import { CustomRequest } from "../../interface/custom-request";
import { Booking } from "../../interface/booking";

export default class BookingController {
  static async createBooking(req: Request, res: Response): Promise<void> {
    try {
      const bookingData: Booking = {
        userId: (req as CustomRequest).userId,
        ...req.body,
      };
      const booking = await BookingService.createBooking(bookingData);
      Dispatcher.DispatchSuccessMessage(res, "Booking created", booking);
      return;
    } catch (err: any) {
      Dispatcher.DispatchErrorMessage(res, err.message);
      return;
    }
  }

  static async getBookings(req: Request, res: Response): Promise<void> {
    try {
      const bookings = await BookingService.getBookings(
        (req as CustomRequest).userId
      );
      Dispatcher.DispatchSuccessMessage(res, "Bookings retrieved", bookings);
      return;
    } catch (err: any) {
      Dispatcher.DispatchErrorMessage(res, err.message);
      return;
    }
  }
  static async getBookingById(req: Request, res: Response): Promise<void> {
    try {
      const bookingId = req.params.id;
      const booking = await BookingService.getBookingById(bookingId);
      Dispatcher.DispatchSuccessMessage(res, "Booking retrieved", booking);
      return;
    } catch (err: any) {
      Dispatcher.DispatchErrorMessage(res, err.message);
  }
}
}