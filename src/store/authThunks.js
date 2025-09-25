import { login as loginService, register as registerService } from '../services/authService';
import { loginStart, loginSuccess, loginFailure, logout as logoutAction } from './authSlice';

export const loginUser = (credentials) => async (dispatch) => {
  try {
    dispatch(loginStart());
    const userData = await loginService(credentials);
    dispatch(loginSuccess(userData));
    return userData;
  } catch (error) {
    dispatch(loginFailure(error.message));
    throw error;
  }
};

export const registerUser = (userData) => async (dispatch) => {
  try {
    dispatch(loginStart());
    const response = await registerService(userData);
    dispatch(loginSuccess(response));
    return response;
  } catch (error) {
    dispatch(loginFailure(error.message));
    throw error;
  }
};

export const logoutUser = () => (dispatch) => {
  dispatch(logoutAction());
};
