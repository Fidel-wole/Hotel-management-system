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

static async getAllPendingBookings(req: Request, res: Response): Promise<void> {
  try {
    const bookings = await BookingService.getAllPendingBookings();
    Dispatcher.DispatchSuccessMessage(res, "Bookings retrieved", bookings);
  } catch (err: any) {
    Dispatcher.DispatchErrorMessage(res, err.message);
  }
}

static async getAllRecentBookings(req: Request, res: Response): Promise<void> {
  try {
    const bookings = await BookingService.getRecentBookings();
    Dispatcher.DispatchSuccessMessage(res, "Bookings retrieved", bookings);
  } catch (err: any) {
    Dispatcher.DispatchErrorMessage(res, err.message);
  }
}

static async updateBooking(req: Request, res: Response){
  const {id} = req.params;
  const {status} = req.body;
  if (!status){
    Dispatcher.DispatchErrorMessage(res, "Status is required");
  }else{
  try {
    const updatedBooking = await BookingService.updateBooking(id, status);
    Dispatcher.DispatchSuccessMessage(res, "Booking status updated", updatedBooking);
  } catch (err: any) {
    Dispatcher.DispatchErrorMessage(res, err.message);
  }
}
}
}