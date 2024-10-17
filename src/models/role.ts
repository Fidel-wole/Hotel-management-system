import mongoose, { Schema, Document } from "mongoose";
import { Role as RoleInterface } from  "../interface/role";

const role = new Schema<RoleDocument>(
  {
    name: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

interface RoleDocument extends RoleInterface, Document {}
const Role = mongoose.model<RoleDocument>("Role", role);

export default Role;
