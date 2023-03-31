import { Schema } from "mongoose";

export const CollaboratorSchema = new Schema(
  {
    albumId: { type: Schema.Types.ObjectId, required: true, ref: "Album" },
    accountId: { type: Schema.Types.ObjectId, required: true, ref: "Account" },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

CollaboratorSchema.virtual("album", {
  localField: "albumId",
  foreignField: "_id",
  ref: "Album",
});

CollaboratorSchema.virtual("profile", {
  localField: "accountId",
  foreignField: "_id",
  justOne: true,
  ref: "Account",
});
