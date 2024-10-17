import { Router } from "express";
import BookingController from "../controllers/Booking/booking.controller";
import authMiddleWare from "../middlewares/auth.middleware";

const bookingRouter = Router();
bookingRouter.post("/booking", authMiddleWare, BookingController.createBooking);
bookingRouter.get("/booking", authMiddleWare, BookingController.getBookings);
bookingRouter.get("/booking/:id", authMiddleWare, BookingController.getBookingById);

export default bookingRouter;