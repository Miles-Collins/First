import { Auth0Provider } from "@bcwdev/auth0provider";
import { albumsService } from "../services/AlbumsService";
import { collaboratorsService } from "../services/CollaboratorsService";
import { picturesService } from "../services/PicturesService";
import BaseController from "../utils/BaseController";

export class AlbumsController extends BaseController {
  constructor() {
    super("api/albums");
    this.router
      .get("", this.getAll)
      .get("/:id", this.getOne)
      .get("/:id/pictures", this.getPictures)
      .get("/:id/collaborators", this.getCollaborators)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post("", this.create)
      .put("/:id", this.edit)
      .delete("/:id", this.archive)
      .delete("/:id/delete", this.delete);
  }

  async create(req, res, next) {
    try {
      let albumData = req.body;
      albumData.creatorId = req.userInfo.id;
      let album = await albumsService.Create(albumData);
      return res.send(album);
    } catch (error) {
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      let albums = await albumsService.GetAll();
      return res.send(albums);
    } catch (error) {
      next(error);
    }
  }

  async getOne(req, res, next) {
    try {
      let albumId = req.params.id;
      let albums = await albumsService.getOne(albumId);
      return res.send(albums);
    } catch (error) {
      next(error);
    }
  }

  async edit(req, res, next) {
    try {
      let albumData = req.body;
      albumData.creatorId = req.userInfo.id;
      let editedAlbum = await albumsService.Edit(albumData);
      return res.send(editedAlbum);
    } catch (error) {
      next(error);
    }
  }

  async archive(req, res, next) {
    try {
      let userId = req.userInfo.id;
      let albumId = req.params.id;
      let message = await albumsService.archive(albumId, userId);
      return res.send(message);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      await albumsService.delete(req.params.id);
      return res.send();
    } catch (error) {
      next(error);
    }
  }

  // SECTION PICTURES

  async getPictures(req, res, next) {
    try {
      let albumId = req.params.id;
      let pictures = await picturesService.getPictures(albumId);
      return res.send(pictures);
    } catch (error) {
      next(error);
    }
  }

  // SECTION COLLABORATORS

  async getCollaborators(req, res, next) {
    try {
      let albumId = req.params.id;
      let collaborators = await collaboratorsService.getCollaborators(albumId);
      return res.send(collaborators);
    } catch (error) {
      next(error);
    }
  }
}
