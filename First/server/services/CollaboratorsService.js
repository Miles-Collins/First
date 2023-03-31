import { dbContext } from "../db/DbContext";
import { BadRequest, Forbidden } from "../utils/Errors";

class CollaboratorsService {
  // DELETE
  async Delete(collaboratorId, userId) {
    let collaborator = await dbContext.Collaborator.findById(
      collaboratorId
    ).populate("profile");
    if (collaborator == null) {
      throw new BadRequest("That Collaborator does not exist.");
    }
    if (collaborator.accountId != userId) {
      throw new Forbidden(`You do not have permission to delete Collaborator.`);
    }
    await collaborator.remove();
    return `Collaborator successfully deleted.`;
  }

  // GET ALL
  async getCollaborators(albumId) {
    let collaborators = await dbContext.Collaborator.find({ albumId })
      .populate("album")
      .populate("profile");
    return collaborators;
  }

  // CREATE
  async Create(coData) {
    let collaborator = await dbContext.Collaborator.create(coData);
    await collaborator.populate("album");
    await collaborator.populate("profile");
    return collaborator;
  }

  // SECTION ACCOUNT

  // MY COLLABORATED ALBUMS
  async getMyCollaborations(accountId) {
    let myCollaboratedAlbums = await dbContext.Collaborator.find({
      accountId,
    }).populate("album");
    return myCollaboratedAlbums;
  }
}

export const collaboratorsService = new CollaboratorsService();
