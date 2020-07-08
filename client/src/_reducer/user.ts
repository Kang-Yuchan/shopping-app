import produce from "immer";

type UserType = {
  _id: number;
  isAdmin: boolean;
  isAuth: boolean;
  email: string;
  name: string;
  lastname: string;
  role: number;
  image: Array<string>;
  userId: string;
  loginSuccess: boolean;
  message: string;
  isMatch: string | null;
  existUser: string | null;
};

type SignUpData = {
  success: boolean;
  err: string | null;
  userId: string;
};

interface StateType {
  isLoggingOut: boolean;
  isLoggingIn: boolean;
  logInErrorReason: string;
  signedUp: boolean;
  isSigningUp: boolean;
  signUpErrorReason: string;
  signUpData: SignUpData | null;
  me: UserType | null;
}

export const initialState: StateType = {
  isLoggingOut: false, // Logout request
  isLoggingIn: false, // Login request
  logInErrorReason: "", // Login error reason
  signedUp: false, // Sign up success
  isSigningUp: false, // Signup request
  signUpErrorReason: "", // Signup error reason
  signUpData: null,
  me: null // My information
};

export type Action = {
  type: string;
  data: any;
  reason: string;
  error: string;
  index: number;
};

export const SIGN_UP_REQUEST = "SIGN_UP_REQUEST";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE";

export const LOG_IN_REQUEST = "LOG_IN_REQUEST";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAILURE = "LOG_IN_FAILURE";

export const LOG_OUT_REQUEST = "LOG_OUT_REQUEST";
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS";
export const LOG_OUT_FAILURE = "LOG_OUT_FAILURE";

export const AUTH_REQUEST = "AUTH_REQUEST";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_FAILURE = "AUTH_FAILURE";

const reducer = (state = initialState, action: Action) => {
  return produce(state, draft => {
    switch (action.type) {
      case LOG_IN_REQUEST: {
        draft.isLoggingIn = true;
        draft.logInErrorReason = "";
        break;
      }
      case LOG_IN_SUCCESS: {
        draft.isLoggingIn = false;
        draft.logInErrorReason = "";
        draft.me = action.data;
        break;
      }
      case LOG_IN_FAILURE: {
        draft.isLoggingIn = false;
        draft.logInErrorReason = action.reason;
        draft.me = null;
        break;
      }
      case LOG_OUT_REQUEST: {
        draft.isLoggingOut = true;
        break;
      }
      case LOG_OUT_SUCCESS: {
        draft.isLoggingOut = false;
        draft.me = null;
        break;
      }
      case SIGN_UP_REQUEST: {
        draft.isSigningUp = true;
        draft.signedUp = false;
        draft.signUpErrorReason = "";
        draft.signUpData = null;
        break;
      }
      case SIGN_UP_SUCCESS: {
        draft.isSigningUp = false;
        draft.signedUp = true;
        draft.signUpData = action.data;
        break;
      }
      case SIGN_UP_FAILURE: {
        draft.isSigningUp = false;
        draft.signUpErrorReason = action.error;
        break;
      }
      case AUTH_REQUEST: {
        draft.logInErrorReason = "";
        break;
      }
      case AUTH_SUCCESS: {
        draft.me = action.data;
        break;
      }
      case AUTH_FAILURE: {
        draft.logInErrorReason = action.error;
        break;
      }
      default: {
        break;
      }
    }
  });
};
export default reducer;
