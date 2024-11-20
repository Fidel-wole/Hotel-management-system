import Role from "../../models/role";

export default class RoleService {
  static async findByName(role: string) {
    return await Role.findOne({ name: role });
  }
  static async findById(role:any){
    return await Role.findById(role)
  }

  static async getRoles(){
    return await Role.find()
  }
}
