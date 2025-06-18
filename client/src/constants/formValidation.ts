import * as Yup from "yup";

export const loginForm = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("password is required"),
});

export const registerOrganizationValidation = Yup.object({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Minimum 6 characters").required("Password is required"),
  phone: Yup.string().required("Phone number is required"),
  name: Yup.string().required("Org name is required"),
  description: Yup.string().required("Description is required"),
  facebook: Yup.string().url("Invalid URL").notRequired(),
  youtube: Yup.string().url("Invalid URL").notRequired(),
  instagram: Yup.string().url("Invalid URL").notRequired(),
  website: Yup.string().url("Invalid URL").notRequired(),
  commercialRegister: Yup.number()
    .typeError("Must be a number")
    .required("Commercial Register is required"),
});

export const registerVolunteerValidation = Yup.object({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Minimum 6 characters").required("Password is required"),
  phone: Yup.string().required("Phone number is required"),
});

export const forgotPasswordValidation = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

export const resetPasswordValidation = Yup.object({
  code: Yup.string().required("Verification code is required"),
  password: Yup.string().min(6, "Minimum 6 characters").required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});

export const editUserValidation = Yup.object({
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string().required("phone is required"),
})

export const editPasswordValidation = Yup.object({
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Required"),
  newPassword: Yup.string().min(6, "Password must be at least 6 characters").required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .required("Required"),
});

export const rejectOrgValidation = Yup.object({
  message: Yup.string().required("Rejection reason is required"),
});

export const editOrganizationValidation = Yup.object({
  name: Yup.string().required("Organization name is required"),
  description: Yup.string().required("Description is required"),
  facebook: Yup.string().url("Invalid Facebook URL").notRequired(),
  youtube: Yup.string().url("Invalid YouTube URL").notRequired(),
  instagram: Yup.string().url("Invalid Instagram URL").notRequired(),
  website: Yup.string().url("Invalid Website URL").notRequired(),
  commercialRegister: Yup.number()
    .typeError("Commercial Register must be a number")
    .required("Commercial Register is required"),
});

export const createChanceValidation = Yup.object({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  location: Yup.string().required("Location is required"),
  noOfVolunteer: Yup.number()
    .typeError("Must be a number")
    .positive("Must be greater than zero")
    .required("Number of volunteers is required"),
  duration: Yup.string().required("Duration is required"),
});