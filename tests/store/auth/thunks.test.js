import {
  loginWithEmailPassword,
  logoutFirebase,
  registerUserWithEmailPassword,
  signInWithGoogle,
} from '../../../src/firebase/providers';
import {
  checkingCredentials,
  login,
  logout,
} from '../../../src/store/auth/authSlice';
import {
  checkingAuthentication,
  startCreatingUserWithEmailPassword,
  startGoogleSignIn,
  startLoginWithcEmailPassword,
  startLogout,
} from '../../../src/store/auth/thunks';
import { clearNoteLogout } from '../../../src/store/journal';
import { demoUser } from '../../fixtures/authFixtures';

// ! mock de todas las funciones y exportaciones de este directorio. Para "imitar" sus retornos o funcionalidades.
jest.mock('../../../src/firebase/providers');

describe('Pruebas en thunks', () => {
  const dispatch = jest.fn();
  beforeEach(() => jest.clearAllMocks());

  test('Debe de invocar el "checkingAuthentication"', async () => {
    await checkingAuthentication()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());

    expect(dispatch).toHaveBeenCalledWith({
      payload: undefined,
      type: 'auth/checkingCredentials',
    });
  });

  test('startGoogleSignIn debe de llamar checkingCredentials y login - Exito', async () => {
    const loginData = { ok: true, ...demoUser };

    await signInWithGoogle.mockResolvedValue(loginData);

    await startGoogleSignIn()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(loginData));
  });

  test('startGoogleSignIn debe de llamar checkingCredentials y logout - Error', async () => {
    const loginData = { ok: false, errorMessage: 'un error' };

    await signInWithGoogle.mockResolvedValue(loginData);

    await startGoogleSignIn()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage));
  });

  test('startLoginWithcEmailPassword debe de llamar checkingCredentials y login - Éxito', async () => {
    const loginData = { ok: true, ...demoUser };
    const formData = { email: demoUser.email, password: '123456' };

    await loginWithEmailPassword.mockResolvedValue(loginData);
    await startLoginWithcEmailPassword(formData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(demoUser));
  });

  test('startLoginWithcEmailPassword debe de llamar checkingCredentials y logout - Error', async () => {
    const loginData = { ok: false, errorMessage: 'un error' };
    const formData = { email: 'demoUser@email.cassasd', password: '123456' };

    await loginWithEmailPassword.mockResolvedValue(loginData);
    await startLoginWithcEmailPassword(formData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(
      logout({ errorMessage: loginData.errorMessage })
    );
  });

  test('startCreatingUserWithEmailPassword debe de llamar checkingCredentials y login - Éxito', async () => {
    const formData = {
      email: demoUser.email,
      password: '123456',
      displayName: demoUser.displayName,
    };

    const loginData = { ok: true, ...formData };

    await registerUserWithEmailPassword.mockResolvedValue(loginData);

    await startCreatingUserWithEmailPassword(formData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(
      login({ ...demoUser, photoURL: undefined, uid: undefined })
    );
  });
  test('startCreatingUserWithEmailPassword debe de llamar checkingCredentials y logout - Error', async () => {
    const formData = {
      email: demoUser.email,
      password: '123456',
      displayName: demoUser.displayName,
    };

    const loginData = { ok: false, errorMessage: 'un error' };

    await registerUserWithEmailPassword.mockResolvedValue(loginData);

    await startCreatingUserWithEmailPassword(formData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(
      logout({ errorMessage: loginData.errorMessage })
    );
  });

  test('startLogout debe de llamar logoutFirebase, logout y clearNoteLogout', async () => {

    await startLogout()(dispatch);
    
    expect(logoutFirebase).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(logout());
    expect(dispatch).toHaveBeenCalledWith(clearNoteLogout());
  });
});
