import { Schema } from "mongoose";

export const PictureSchema = new Schema(
  {
    imgUrl: { type: String, required: true, maxLength: 500 },
    albumId: { type: Schema.Types.ObjectId, required: true, ref: "Album" },
    creatorId: { type: Schema.Types.ObjectId, required: true, ref: "Account" },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

PictureSchema.virtual("creator", {
  localField: "creatorId",
  foreignField: "_id",
  justOne: true,
  ref: "Account",
});
