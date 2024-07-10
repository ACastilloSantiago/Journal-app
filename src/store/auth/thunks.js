import {
  loginWithEmailPassword,
  logoutFirebase,
  registerUserWithEmailPassword,
  signInWithGoogle,
} from '../../firebase/providers';
import { clearNoteLogout } from '../journal';
import { checkingCredentials, login, logout } from './authSlice';

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

export const startCreatingUserWithEmailPassword = ({
  email,
  password,
  displayName,
}) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    const { ok, uid, photoURL, errorMessage } =
      await registerUserWithEmailPassword({
        email,
        password,
        displayName,
      });

    if (!ok) return dispatch(logout({ errorMessage }));

    return dispatch(
      login({
        uid,
        displayName,
        email,
        photoURL,
      })
    );
  };
};

export const startLoginWithcEmailPassword = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    const { ok, uid, photoURL, displayName, errorMessage } =
      await loginWithEmailPassword({ email, password });
    if (!ok) return dispatch(logout({ errorMessage }));

    return dispatch(
      login({
        uid,
        displayName,
        email,
        photoURL,
      })
    );
  };
};

export const startLogout = () => {
  return async (dispatch) => {


    await logoutFirebase();

    dispatch(logout());
    dispatch(clearNoteLogout());

    
  };
};
