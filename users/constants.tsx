import { User } from "../models/userModels";
import { USER_ROLE } from "../constants/enums";

export const ANONYMOUS_USER: User = {
    email:"",
    role:USER_ROLE.ANONYMOUS.toLowerCase(),
  }
