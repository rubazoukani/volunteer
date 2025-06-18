export type ToastMessage = {
  message: string;
  type: "SUCCESS" | "ERROR";
};

export type ToastProps = {
  onClose: () => void
} & ToastMessage

export type Variant = "info" | "danger" | "warning" | "secondary";
export type Input = "text" | "color" | "number" | "password" | "email";

export type Warning = {
  message: string;
  btn1: string;
  btn2: string;
  styleBtn1?: Variant;
  styleBtn2?: Variant;
  handleBtn2: () => void;
};

export type AppContext = {
  isLoggedIn: boolean;
  showToast: (toastMessage: ToastMessage) => void;
  showWarning: (warning: Warning) => void;
  user: User
};

export type CommonParent = {
  children: React.JSX.Element
}

export type User = {
  id: number,
  username: string,
  email: string,
  role: string,
  phone: string
}

export interface InputField {
  name: string;
  label?: string;
  labelStyle?: string;
  type: Input;
  inputMode?: "numeric";
  styles?: string;
  placeholder?: string;
  dir?: string;
  innerDivStyle?: string;
  Icon?: React.ReactNode;
  iconStyle?: string;
  autoComplete?: "on" | "off"
}

export type Login = {
  email: string;
  password: string;
};

export interface Button {
  variant: "main" | "main-outline" | "main-gradient"
}

export type RegisterOrganizationForm = {
  username: string,
  email: string,
  password: string,
  phone: string,
  name: string,
  description: string,
  facebook?: string,
  youtube?: string,
  instagram?: string,
  website?: string,
  commercialRegister: number
}

export type RegisterVolunteerForm = {
  username: string,
  email: string,
  password: string,
  phone: string,
}

export type ResetForgottenPasswordForm = {
  code: string,
  password: string
  confirmPassword: string
}

export type ForgotPasswordForm = {
  email: string;
};

export type Volunteer = {
  volunteerId: number
} & User

export type VolunteerCard = {
  volunteer: Volunteer,
  onSuccess: () => void
}

export type EditUserForm = {
  username: string,
  email: string,
  phone: string,
}

export type EditUserModal = {
  user: User,
  show: boolean,
  onClose: () => void,
  onSuccess: () => void
}

export type EditPasswordForm = {
  password: string,
  newPassword: string
  confirmPassword: string
}

export type EditPasswordModal = {
  userId: number | string,
  show: boolean,
  onClose: () => void,
  onSuccess: () => void
}

export type Organization = {
  id: number,
  name: string,
  description: string,
  facebook?: string,
  youtube?: string,
  instagram?: string,
  website?: string,
  commercialRegister: number,
  verified: boolean,
  User: User
}

export type organizationCard = {
  organization: Organization,
  onSuccess: () => void
}

export type RejectOrganization = {
  message: string,
  id: number | string
}
export type RejectOrgModal = {
  show: boolean;
  onClose: () => void;
  organization: Organization;
  onSuccess: () => void
}

export interface TextAreaField {
  name: string;
  label?: string;
  placeholder?: string;
  styles?: string;
  labelStyle?: string;
  dir?: "rtl" | "ltr" | "auto";
  innerDivStyle?: string;
  Icon?: React.ReactNode;
  iconStyle?: string;
}

export type EditOrganizationForm = {
  name: string,
  description: string,
  facebook: string | undefined,
  youtube: string | undefined,
  instagram: string | undefined,
  website: string | undefined,
  commercialRegister: number,
}

export type EditOrganizationModal = {
  organization: Organization,
  show: boolean,
  onClose: () => void,
  onSuccess: () => void
}

export type Chance = {
  id: number,
  name: string,
  description: string,
  location: string,
  noOfVolunteer: number,
  duration: string,
  organizationId: number,
  Organization: {
    name: string
  }
}

export type AddChanceForm = {
  name: string,
  description: string,
  location: string,
  noOfVolunteer: number,
  duration: string,
}

export type FloatButton = {
  onClick: () => void;
  top?: number | "auto";
  right?: number | "auto";
  bottom?: number | "auto";
  left?: number | "auto";
  children: React.ReactNode;
}

export type AddChanceModal = {
  show: boolean,
  onClose: () => void,
  onSuccess: () => void
}

export type EditChanceModal = {
  show: boolean,
  onClose: () => void,
  onSuccess: () => void,
  chance: Chance
}

export type ChanceCard = {
  chance: Chance,
  onSuccess: () => void
}

export type LanChanceCard = {
  chance: Chance,
}