import { USER_ROLE } from "../constants/enums";

export interface UserData {
  id: number,
  nick_name: string,
  gender: string,
  email: string,
  phone_number: string,
  rating: number,
  number_of_reviewers: number,
  birthday: Date,
}

export interface ChangePassword {
  current_password: string,
  new_password: string
  new_password_again: string
}

export interface UserDataForm {
  display_name: string,
  gender: string,
  phone_number: string,
}

export interface UserState {
  email: string;
  status: string;
  error: unknown;
  role: string;
  data: UserData
}

export interface LoginCredentials {
  email: string;
  password: string;
  role: string;
}

export interface Token {
  token: string;
}

export interface User {
  email: string;
  role: USER_ROLE;
}

export interface UserInfo{
  id: number;
  display_name: string;
  role: string;
}

export interface GlobalLink {
  title: string;
  link: string;
  type?: "button" | "submit" | "reset";
}

export interface GlobalIcon {
  Icon1: JSX.Element;
  Title: string;
  Icon2: JSX.Element;
}

export interface GlobalIcon1 {
  disable: boolean;
  icon: JSX.Element;
  title: string;
  component: JSX.Element;
}