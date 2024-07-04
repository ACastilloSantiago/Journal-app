import {
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { FirebaseAuth } from './config';

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(FirebaseAuth, googleProvider);
    // const credentials = GoogleAuthProvider.credentialFromResult(result);

    const { displayName, email, uid, photoURL } = result.user;

    return {
      ok: true,
      displayName,
      email,
      uid,
      photoURL,
    };
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.code;
    return {
      ok: false,
      errorCode,
      errorMessage,
    };
  }
};

export const registerUserWithEmailPassword = async ({
  email,
  password,
  displayName,
}) => {
  try {
    const resp = await createUserWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );
    const { uid, photoURL } = resp.user;
    await updateProfile(FirebaseAuth.currentUser, { displayName });
    // TODO: Actualizar Displayname
    return {
      ok: true,
      uid,
      photoURL,
      displayName,
      email,
    };
  } catch (error) {
    console.log({ error });

    return {
      ok: false,
      errorMessage: error.message,
    };
  }
};

export const loginWithEmailPassword = async ({ email, password }) => {
  // ! signInWithEmailAndPassword
  try {
    const {
      user: { uid, photoURL, displayName },
    } = await signInWithEmailAndPassword(FirebaseAuth, email, password);

    return {
      ok: true,
      uid,
      photoURL,
      displayName,
      email,
    };
  } catch (error) {
    return {
      ok: false,
      errorMessage: error.message,
    };
  }
};

export const logoutFirebase = async () => {
  return await FirebaseAuth.signOut();
};
