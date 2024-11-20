import RoleService from "../../services/Role/role.service";
import Dispatcher from "../../utils/dispatcher";
import { Response, Request } from "express";

export default class RoleController {
  static async getRoles(req: Request, res: Response) {
    try {
      const role = await RoleService.getRoles();
      Dispatcher.DispatchSuccessMessage(res, "Roles fetched", role);
    } catch (err: any) {
      Dispatcher.DispatchErrorMessage(res, err.message);
      return;
    }
  }
}
