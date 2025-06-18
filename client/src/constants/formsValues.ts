import { AddChanceForm, EditPasswordForm, ForgotPasswordForm, Login, RegisterVolunteerForm, ResetForgottenPasswordForm } from "../misc/types";
import { RegisterOrganizationForm } from "../misc/types";

export const loginForm: Login = {
  email: "",
  password: "",
};

export const registerOrganizationForm: RegisterOrganizationForm = {
  username: "",
  email: "",
  password: "",
  phone: "",
  name: "",
  description: "",
  facebook: "",
  youtube: "",
  instagram: "",
  website: "",
  commercialRegister: 0,
};

export const registerVolunteerForm: RegisterVolunteerForm = {
  username: "",
  email: "",
  password: "",
  phone: "",
};

export const forgotPasswordForm: ForgotPasswordForm = {
  email: "",
};

export const resetForgottenPassword: ResetForgottenPasswordForm = {
  code: "",
  password: "",
  confirmPassword: "",
};

export const editPassword: EditPasswordForm = {
  newPassword: "",
  password: "",
  confirmPassword: "",
};

export const rejectOrgModal = {
  message: ""
}

export const addChanceForm: AddChanceForm = {
  description: "",
  duration: "",
  location: "",
  name: "",
  noOfVolunteer: 0
}