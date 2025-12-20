export type User = {
  id: string;
  name: string;
  username: string;
  email: string;
  password: string;
  profileImage?: string;
  role: "user" | "admin";
  createdAt: string;
};

export type UserResponse = {
  studiesCount: number;
  tasksCount?: number;
  studiesPercentage?: number;
  user: User;
};
