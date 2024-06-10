import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
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
