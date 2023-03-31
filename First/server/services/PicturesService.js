import { dbContext } from "../db/DbContext";

class PicturesService {
  // CREATE
  async Create(pictureData) {
    let picture = await dbContext.Picture.create(pictureData);
    await picture.populate("creator");
    return picture;
  }

  // GET ALL
  async getPictures(albumId) {
    let pictures = await dbContext.Picture.find({ albumId }).populate(
      "creator"
    );
    return pictures;
  }
}

export const picturesService = new PicturesService();
