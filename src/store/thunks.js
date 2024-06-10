import { signInWithGoogle } from '../firebase/providers';
import { checkingCredentials, login, logout } from './auth/authSlice';

export const checkingAuthentication = (email, password) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
  };
};

export const startGoogleSignIn = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
    const result = await signInWithGoogle();
    console.log({ result });
    // ! Error en loguear
    if (!result.ok) return dispatch(logout(result.errorMessage));
    // * clean
    dispatch(login(result));
  };
};
