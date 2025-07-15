export type ActionResponse = {
  success: boolean;
  data?: unknown;
};

export type ActionValidationError = ActionResponse & {
  errors: Record<string, string | boolean>;
  message: string;
  isValidationError: boolean;
};

export type IUser = {
  username: string;
  password: string;
  email: string;
  phone?: string;
  img?: string;
  address?: string;
  isAdmin: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type DBError = Error & {
  code: number;
  keyPattern: Record<string, string>;
};
