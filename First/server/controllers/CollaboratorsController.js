import { Auth0Provider } from "@bcwdev/auth0provider";
import { collaboratorsService } from "../services/CollaboratorsService";
import BaseController from "../utils/BaseController";

export class CollaboratorsController extends BaseController {
  constructor() {
    super("api/collaborators");
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post("", this.Create)
      .delete("/:id", this.Delete);
  }

  async Create(req, res, next) {
    try {
      let coData = req.body;
      coData.accountId = req.userInfo.id;
      let collaborator = await collaboratorsService.Create(coData);
      return res.send(collaborator);
    } catch (error) {
      next(error);
    }
  }

  async Delete(req, res, next) {
    try {
      let collaboratorId = req.params.id;
      let userId = req.userInfo.id;
      let message = await collaboratorsService.Delete(collaboratorId, userId);
      return res.send(message);
    } catch (error) {
      next(error);
    }
  }
}
