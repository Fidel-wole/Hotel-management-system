import { Staff } from "../../interface/staff";
import StaffService from "../../services/User/staff.service";
import Dispatcher from "../../utils/dispatcher";
import { Response, Request } from "express";

export default class StaffController {
  static async addStaff(req: Request, res: Response) {
    const staffData: Staff = {
      name: req.body,
      email: req.body,
      phoneNumber: req.body,
      role: req.body,
      department: req.body,
      hireDate: req.body,
      isActive: true,
      dateOfBirth: req.body,
      address: req.body,
      password: req.body,
    };

    try {
      await StaffService.addStaff(staffData);
      Dispatcher.DispatchSuccessMessage(res, "Staff registered successfully");
    } catch (err: any) {
      Dispatcher.DispatchErrorMessage(res, err.message);
      return;
    }
  }
}
