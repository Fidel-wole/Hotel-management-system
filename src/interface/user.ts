import { Role } from "./role";

export interface User {
  name: string;
  username: string;
  email: string;
  emailVerificationToken?: string;
  isEmailVerified?: boolean;
  password: string;
  passwordResetOtp?: string;
  otpExpiry?:Date;
  role:Role | string;
}
