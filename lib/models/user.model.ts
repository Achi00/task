import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  image: String,
  images: [String],
});

// on first request it activates model UserSchema and every second time it will reach mongoose.models.User
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
