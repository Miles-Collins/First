import { Schema } from "mongoose";

export const AlbumSchema = new Schema(
  {
    title: { type: String, required: true, minLength: 2, maxLength: 50 },
    category: {
      type: String,
      enum: [
        "cars",
        "animals",
        "pokemon",
        "misc",
        "fish",
        "food",
        "germs",
        "coding",
        "games",
        "music",
      ],
      default: "misc",
    },
    archived: { type: Boolean, default: false },
    coverImg: { type: String, required: true },
    creatorId: { type: Schema.Types.ObjectId, required: true, ref: "Account" },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

AlbumSchema.virtual("creator", {
  localField: "creatorId",
  foreignField: "_id",
  justOne: true,
  ref: "Account",
});

AlbumSchema.virtual("memberCount", {
  localField: "_id",
  foreignField: "albumId",
  count: true,
  ref: "Collaborator",
});
