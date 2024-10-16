import mongoose, { Schema, Document } from "mongoose";
import { User as UserInterface } from "../interface/user";

const userSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true },
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    emailVerificationToken: { type: String },
    isEmailVerified: { type: Boolean, default: false },
    password: { type: String, default: null },
    passwordResetOtp: { type: String },
    otpExpiry:{type:Date},
  },
  {
    timestamps: true,
  }
);



interface UserBase extends Omit<UserInterface, "_id"> {}

interface UserDocument extends UserBase, Document {}

const User = mongoose.model<UserDocument>("User", userSchema);

export default User;
