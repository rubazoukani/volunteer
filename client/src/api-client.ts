import {
  User,
  Login,
  RegisterOrganizationForm,
  RegisterVolunteerForm,
  ResetForgottenPasswordForm,
  ForgotPasswordForm,
  EditUserForm,
  EditPasswordForm,
  RejectOrganization,
  EditOrganizationForm,
  AddChanceForm
} from "./misc/types";

const DOMAIN = import.meta.env.VITE_DOMAIN;
const API_DIR = import.meta.env.VITE_API_DIR;

const API_BASE_URL = `${DOMAIN}/${API_DIR}`;

export const validateAuthentication = async (): Promise<User> => {
  const response = await fetch(`${API_BASE_URL}/auth/verify`, {
    credentials: "include",
  });

  const responseBody = await response.json();

  if (!response.ok) throw new Error("Error check verification");

  return responseBody;
}

export const login = async (formData: Login) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.msg);

  return responseBody;
};

export const logout = async () => {
  const response = await fetch(`${API_BASE_URL}/auth/logout`, { // http://localhost:5004/api/auth/logout
    method: "POST",
    credentials: "include",
  });

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.msg);

  return responseBody;
};

export const registerOrganization = async (formData: RegisterOrganizationForm) => {
  const response = await fetch(`${API_BASE_URL}/auth/organization`, { // http://localhost:5004/api/auth/organization
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.msg);

  return responseBody;
};

export const registerVolunteer = async (formData: RegisterVolunteerForm) => {
  const response = await fetch(`${API_BASE_URL}/auth/volunteer`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.msg);

  return responseBody;
};

export const forgotPassword = async (formData: ForgotPasswordForm) => {
  const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.msg);

  return responseBody;
};

export const resetForgottenPassword = async (formData: Omit<ResetForgottenPasswordForm, "confirmPassword">) => {
  const response = await fetch(`${API_BASE_URL}/auth/reset-forgotten-password`, {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.msg);

  return responseBody;
};

export const getAdminProfile = async () => {
  const response = await fetch(`${API_BASE_URL}/admin`, {
    credentials: "include",
  });

  if (!response.ok) throw new Error("Error check verification");

  return response.json();
}

export const getVolunteers = async () => {
  const response = await fetch(`${API_BASE_URL}/volunteers`, {
    credentials: "include",
  });

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.msg);

  return responseBody;
};

export const getVolunteer = async (id: number | string) => {
  const response = await fetch(`${API_BASE_URL}/volunteers/${id}`, {
    credentials: "include",
  });

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.msg);

  return responseBody;
};

export const deleteVolunteer = async (id: number | string) => {
  const response = await fetch(`${API_BASE_URL}/volunteers/${id}`, { // http://localhost:5004/api/volunteers/50
    method: "DELETE",
    credentials: "include",
  });

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.msg);

  return responseBody;
};

export const updateUser = async ({ formData, id }: { formData: EditUserForm, id: number | string }) => {
  const response = await fetch(`${API_BASE_URL}/auth/users/${id}`, { // http://localhost:5004/api/auth/users/9
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.msg);

  return responseBody;
};

export const editPassword = async ({ id, formData }: { id: number | string, formData: Omit<EditPasswordForm, "confirmPassword"> }) => {
  const response = await fetch(`${API_BASE_URL}/auth/reset-password/${id}`, {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.msg);

  return responseBody;
};

export const getOrganizations = async () => {
  const response = await fetch(`${API_BASE_URL}/organizations`, {
    credentials: "include",
  });

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.msg);

  return responseBody;
};

export const getPendingOrganizations = async () => {
  const response = await fetch(`${API_BASE_URL}/organizations/unverified`, {
    credentials: "include",
  });

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.msg);

  return responseBody;
};

export const deleteOrganization = async (id: number | string) => {
  const response = await fetch(`${API_BASE_URL}/organizations/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.msg);

  return responseBody;
};

export const verifyOrganization = async (id: number | string) => {
  const response = await fetch(`${API_BASE_URL}/organizations/verify/${id}`, {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.msg);

  return responseBody;
};

export const rejectOrganization = async ({ id, message }: RejectOrganization) => {
  const response = await fetch(`${API_BASE_URL}/organizations/reject/${id}`, {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message })
  });

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.msg);

  return responseBody;
};

export const updateOrganization = async ({ formData, id }: { formData: EditOrganizationForm, id: number | string }) => {
  const response = await fetch(`${API_BASE_URL}/organizations/${id}`, {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.msg);

  return responseBody;
};

export const getOrganization = async (id: number | string) => {
  const response = await fetch(`${API_BASE_URL}/organizations/${id}`, {
    credentials: "include",
  });

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.msg);

  return responseBody;
};

export const getOrganizationChances = async (id: number | string) => {
  const response = await fetch(`${API_BASE_URL}/chances/organization/${id}`, {
    credentials: "include",
  });

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.msg);

  return responseBody;
};

export const getUnjoinedChances = async (id: string | number) => {
  const response = await fetch(`${API_BASE_URL}/chances/unjoined/${id}`, {
    credentials: "include",
  });

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.msg);

  return responseBody;
};

export const getChance = async (id: number | string) => {
  const response = await fetch(`${API_BASE_URL}/chances/${id}`);

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.msg);

  return responseBody;
};
export const getChances = async () => {
  const response = await fetch(`${API_BASE_URL}/chances`);

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.msg);

  return responseBody;
};

export const createChance = async ({ formData, id }: { formData: AddChanceForm, id: number | string }) => {
  const response = await fetch(`${API_BASE_URL}/chances/${id}`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.msg);

  return responseBody;
};

export const deleteChance = async (id: number | string) => {
  const response = await fetch(`${API_BASE_URL}/chances/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.msg);

  return responseBody;
};

export const editChance = async ({ formData, id }: { formData: AddChanceForm, id: number | string }) => {
  const response = await fetch(`${API_BASE_URL}/chances/${id}`, {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.msg);

  return responseBody;
};

export const joinChance = async (id: number | string) => {
  const response = await fetch(`${API_BASE_URL}/volunteers/join/${id}`, {
    method: "POST",
    credentials: "include",
  });

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.msg);

  return responseBody;
};