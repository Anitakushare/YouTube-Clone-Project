
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
   userName: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/.+\@.+\..+/, "Please enter a valid email address"],
    },
    password: {
        type: String,
        required: [true, "password is required"],
        minlength: 4,
      },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
const userModel=new mongoose.model("user",UserSchema);
export default userModel;