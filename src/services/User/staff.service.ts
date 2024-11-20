import Staff from "../../models/staff";

export default class StaffService{
    static async addStaff(data:any){
        try{
        return await Staff.create(data)
        }catch(err:any){
            throw err
        }
    }
}