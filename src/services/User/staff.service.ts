import Staff from "../../models/staff";

export default class StaffService {
  static async addStaff(data: any) {
    try {
      const existingStaff = await Staff.findOne({ email: data.email });
      if (existingStaff) {
        throw new Error("Staff with this email already exist");
      }
      return await Staff.create(data);
    } catch (err: any) {
      throw err;
    }
  }

  static async getStaffs() {
    try {
      return await Staff.find().populate("role");
    } catch (err: any) {
      throw err;
    }
  }
}
