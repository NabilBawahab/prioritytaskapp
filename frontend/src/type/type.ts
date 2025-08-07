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

export type ProfileResponse = {
  status: number;
  username: string;
  email: string;
  data?: {
    id: string;
    createdAt: Date;
    title: string;
    description: string | null;
    priority: string;
    status: string;
    dueDate: Date;
    updatedAt: Date;
    userId: string;
  }[];
};

export type CreateTaskInput = {
  title: string;
  description: string;
  priority: string;
  status: string;
  dueDate: string;
};

export type Task = {
  id: string;
  createdAt: Date;
  title: string;
  description: string | null;
  priority: string;
  status: string;
  dueDate: Date;
  updatedAt: Date;
  userId: string;
};

export type GeneralAPISuccessResponse = {
  status: number;
  message: string;
};
