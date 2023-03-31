import { dbContext } from "../db/DbContext";
import { BadRequest, Forbidden } from "../utils/Errors";

class AlbumsService {
  async delete(id) {
    let album = await this.getOne(id);
    await album.remove();
  }
  async archive(albumId, userId) {
    let album = await this.getOne(albumId);
    if (album.creatorId != userId) {
      throw new Forbidden(
        `You do not have permission to delete ${album.title}.`
      );
    }
    album.archived = true;
    await album.save();
    return `You have successfully deleted ${album.title}.`;
  }
  async Edit(albumData) {
    let updatedAlbum = await this.getOne(albumData.id);
    if (updatedAlbum.creatorId != albumData.creatorId) {
      throw new Forbidden(
        `You do not have permission to edit ${updatedAlbum.title}.`
      );
    }
    updatedAlbum.title = albumData.title || updatedAlbum.title;
    updatedAlbum.category = albumData.category || updatedAlbum.category;
    updatedAlbum.coverImg = albumData.coverImg || updatedAlbum.coverImg;

    await updatedAlbum.save();
    return updatedAlbum;
  }
  async getOne(albumId) {
    let album = await dbContext.Album.findById(albumId).populate("creator");
    if (album == null) {
      throw new BadRequest("That album does not exist.");
    }
    return album;
  }
  async GetAll() {
    let albums = await dbContext.Album.find()
      .populate("creator")
      .populate("memberCount");
    return albums;
  }
  async Create(albumData) {
    let album = await dbContext.Album.create(albumData);
    await album.populate("creator");
    return album;
  }
}

export const albumsService = new AlbumsService();
