export type ErrorResponse = {
  status: number;
  message: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  status: number;
  message: string;
  data?: {
    token?: string;
  };
};

export type RegisterResponse = {
  status: number;
  message: string;
};
