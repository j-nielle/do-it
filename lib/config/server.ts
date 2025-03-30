export const ROOT_ROUTE = "/";
export const DASHBOARD_ROUTE = "/dashboard";
export const SETTINGS_ROUTE = "/settings";
export const LOGIN_ROUTE = "/login";
export const REGISTER_ROUTE = "/register";

export const protectedRoutes = [DASHBOARD_ROUTE, SETTINGS_ROUTE];
export const authRoutes = [LOGIN_ROUTE, REGISTER_ROUTE];

export const SESSION_COOKIE_NAME = "user_session";
