import { Router } from "express";
import BookingController from "../controllers/Booking/booking.controller";
import authMiddleWare from "../middlewares/auth.middleware";
import roleMiddleware from "../middlewares/role.middleware";

const bookingRouter = Router();
bookingRouter.post("/booking", authMiddleWare, BookingController.createBooking);
bookingRouter.get("/booking", authMiddleWare, BookingController.getBookings);
bookingRouter.get("/booking/:id", authMiddleWare, BookingController.getBookingById);
bookingRouter.get("/bookings", authMiddleWare, roleMiddleware(["receptionist", "admin"]), BookingController.getAllBookings)
bookingRouter.put("/update-booking/:id", authMiddleWare, BookingController.updateBooking)
export default bookingRouter;