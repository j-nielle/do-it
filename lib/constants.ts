export const ROOT_ROUTE = "/";
export const DASHBOARD_ROUTE = "/dashboard";
export const SETTINGS_ROUTE = "/settings";
export const LOGIN_ROUTE = "/login";
export const REGISTER_ROUTE = "/register";

export const protectedRoutes = [DASHBOARD_ROUTE, SETTINGS_ROUTE];
export const authRoutes = [LOGIN_ROUTE, REGISTER_ROUTE];

export const SESSION_COOKIE_NAME = "user_session";

/** tasks-related section */

export enum TaskStatus {
  BACKLOG = "BACKLOG",
  TODO = "TODO",
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
}

export const TASK_COLUMNS = [
  { id: TaskStatus.TODO, title: "TO DO", className: "bg-blue-500/65" },
  { id: TaskStatus.PENDING, title: "PENDING", className: "bg-yellow-500/65" },
  {
    id: TaskStatus.COMPLETED,
    title: "COMPLETED",
    className: "bg-green-500/65",
  },
];
