// models/editedImage.model.js
import mongoose from "mongoose";

const editedImageSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  imageUrl: { type: String, required: true },
  originalImageUrl: { type: String, required: true },
});

const EditedImage =
  mongoose.models.EditedImage ||
  mongoose.model("EditedImage", editedImageSchema);

export default EditedImage;
