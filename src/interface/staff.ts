import { Role } from "./role";

export interface Staff {
  name: string;
  email?: string;
  phoneNumber?: string;
  role: Role;
  department: string;
  hireDate: Date;
  isActive: boolean;
  dateOfBirth?: Date;
  address?: string;
  password: string;
  passwordResetOtp?: number;
  otpExpiry?: Date;
}
