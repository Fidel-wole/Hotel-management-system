import { Staff } from "../../interface/staff";
import StaffService from "../../services/User/staff.service";
import Dispatcher from "../../utils/dispatcher";
import { Response, Request } from "express";
import { hashPassword } from "../../utils/functions";

export default class StaffController {
  static async addStaff(req: Request, res: Response) {
    const staffData: Staff = req.body;
    staffData.isActive = true;
    staffData.password = hashPassword(staffData.password)
    try {
      await StaffService.addStaff(staffData);
      Dispatcher.DispatchSuccessMessage(res, "Staff registered successfully");
    } catch (err: any) {
      Dispatcher.DispatchErrorMessage(res, err.message);
      return;
    }
  }

  static async getStaffs(req:Request, res:Response){
    try{
     const staffs = await StaffService.getStaffs();
     Dispatcher.DispatchSuccessMessage(res, "Staff fetched successfully", staffs);
    }catch(err:any){
      Dispatcher.DispatchErrorMessage(res, err.message);
      return;
    }
  }
}
