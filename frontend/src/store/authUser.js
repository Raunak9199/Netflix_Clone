import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";
import {
  ACC_CREATE_FAILED,
  ACC_CREATED_SUCCESS,
  CHECK_IS_AUTH,
  LOGIN,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOGOUT,
  LOGOUT_FAILED,
  SIGN_UP,
  SOMETHING_WENT_WRONG,
} from "../../../backend/constants";

export const useAuthStore = create((set) => ({
  user: null,
  isSigningUp: false,
  isLogin: false,
  checkAuth: true,
  isLoggingOut: false,

  signup: async (credentials) => {
    set({ isSigningUp: true });
    try {
      const response = await axios.post(SIGN_UP, credentials);

      set({ user: response.data, isSigningUp: false });
      toast.success(response.message || ACC_CREATED_SUCCESS);
    } catch (error) {
      toast.error(error.response.data.message || ACC_CREATE_FAILED);
      set({ isSigningUp: false, user: null });
    }
  },
  login: async (credentials) => {
    set({ isLogin: true });
    try {
      const response = await axios.post(LOGIN, credentials);
      set({ user: response.data, isSigningUp: false });
      toast.success(response.message || LOGIN_SUCCESS);
    } catch (error) {
      toast.error(error.response.data.message || LOGIN_FAILED);
      set({ isLogin: false, user: null });
    }
  },
  logout: async () => {
    set({ isLoggingOut: true });
    try {
      const response = await axios.post(LOGOUT);
      if (response.statusCode === 200) {
        toast.success(response.message);
        set({ user: null, isLoggingOut: false });
      } else {
        toast.error(response.message || SOMETHING_WENT_WRONG);
      }
    } catch (error) {
      toast.error(error.response.data.message || LOGOUT_FAILED);
      set({ isLoggingOut: false });
    }
  },
  authCheck: async () => {
    set({ checkAuth: true });
    try {
      const response = await axios.get(CHECK_IS_AUTH);
      set({ user: response.data, checkAuth: false });
    } catch (error) {
      // toast.error("Session Expired. Please login again");
      set({ user: null, checkAuth: false });
    }
  },
}));
