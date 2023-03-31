import { Auth0Provider } from "@bcwdev/auth0provider";
import { accountService } from "../services/AccountService";
import { collaboratorsService } from "../services/CollaboratorsService";
import BaseController from "../utils/BaseController";

export class AccountController extends BaseController {
  constructor() {
    super("account");
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get("", this.getUserAccount)
      .get("/collaborators", this.getMyCollaborations);
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo);
      res.send(account);
    } catch (error) {
      next(error);
    }
  }

  async getMyCollaborations(req, res, next) {
    try {
      let userId = req.userInfo.id;
      let myCollaborations = await collaboratorsService.getMyCollaborations(
        userId
      );
      return res.send(myCollaborations);
    } catch (error) {
      next(error);
    }
  }
}
