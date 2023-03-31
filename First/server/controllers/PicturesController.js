import { Auth0Provider } from "@bcwdev/auth0provider";
import { picturesService } from "../services/PicturesService";
import BaseController from "../utils/BaseController";

export class PicturesController extends BaseController {
  constructor() {
    super("api/pictures");
    this.router.use(Auth0Provider.getAuthorizedUserInfo).post("", this.create);
  }

  async create(req, res, next) {
    try {
      let pictureData = req.body;
      pictureData.creatorId = req.userInfo.id;
      let picture = await picturesService.Create(pictureData);
      return res.send(picture);
    } catch (error) {
      next(error);
    }
  }
}
