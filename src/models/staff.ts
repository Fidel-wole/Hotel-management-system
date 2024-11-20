import mongoose, { Schema, Document } from "mongoose";
import { Staff as StaffInterface } from "../interface/staff";

interface StaffDocument extends StaffInterface, Document {}

const staffSchema = new Schema<StaffDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true },
    phoneNumber: { type: String, unique: true },
    role: { type: Schema.Types.ObjectId, ref: "Role" },
    department: { type: String },
    hireDate: { type: Date },
    isActive: { type: Boolean },
    dateOfBirth: { type: Date },
    address: { type: String },
    password: { type: String, default: null },
    passwordResetOtp: { type: Number },
    otpExpiry: { type: Date },
  },
  {
    timestamps: true,
  }
);

const Staff = mongoose.model<StaffDocument>("Staff", staffSchema);

export default Staff;