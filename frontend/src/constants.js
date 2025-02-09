// API-END-POINTS
//----------------------------------------------------------------
export const IMAGE_BASE_URL_ORIGINAL = "https://image.tmdb.org/t/p/original";
export const IMAGE_BASE_URL_SMALL = "https://image.tmdb.org/t/p/w500";

export const SIGN_UP = "/api/v1/auth/signup";
export const LOGIN = "/api/v1/auth/login";
export const CHECK_IS_AUTH = "/api/v1/auth/isAuthenticatedUser";
export const LOGOUT = "/api/v1/auth/logout";

//----------------------------------------------------------------

// RESPONSE MESSAGE CONSTANTS
//----------------------------------------------------------------
export const ACC_CREATED_SUCCESS = "Account Created Successfully";
export const ACC_CREATE_FAILED = "Signup failed";
export const LOGIN_FAILED = "Login failed";
export const LOGIN_SUCCESS = "Logged in successfully";
export const LOGOUT_FAILED = "Logout failed";
export const SOMETHING_WENT_WRONG = "Something went wrong";

//----------------------------------------------------------------
// CATEGORIES
//----------------------------------------------------------------
export const MOVIE_CATEGORIES = [
  "now_playing",
  "top_rated",
  "popular",
  "upcoming",
];
export const TV_CATEGORIES = [
  "airing_today",
  "on_the_air",
  "popular",
  "top_rated",
];

//----------------------------------------------------------------
