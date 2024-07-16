import {
  authSlice,
  checkingCredentials,
  login,
  logout,
} from '../../../src/store/auth/authSlice';
import {
  authenticatedState,
  demoUser,
  initialState,
  notAuthenticatedState,
} from '../../fixtures/authFixtures';

describe('Pruebas en authSlice', () => {
  test('Debe de regresar el estado inicial y llamarse auth', () => {
    // console.log(authSlice);
    expect(authSlice.name).toBe('auth');

    const state = authSlice.reducer(initialState, {});

    expect(state).toEqual(initialState);

    //   authSlice
  });

  test('Debe de realizar la autenticación', () => {
    const state = authSlice.reducer(initialState, login(demoUser));

    expect(state).toEqual({
      status: 'authenticated',
      uid: demoUser.uid,
      email: demoUser.email,
      displayName: demoUser.displayName,
      photoURL: demoUser.photoURL,
      errorMessage: null,
    });
  });

  test('debe de realizar el logout sin argumentos', () => {
    const state = authSlice.reducer(authenticatedState, logout());

    expect(state).toEqual(notAuthenticatedState);
  });
  test('debe de realizar el logout y mostrar mensaje de error', () => {
    const errorMessage = 'Credenciales no correctas';
    const state = authSlice.reducer(
      authenticatedState,
      logout({ errorMessage })
    );
    expect(state).toEqual({
      ...notAuthenticatedState,
      errorMessage: errorMessage,
    });
  });

  test('debe de cambiar el status a "checking"', () => {
    const state = authSlice.reducer(
      notAuthenticatedState,
      checkingCredentials()
    );

    expect(state).toEqual({
      ...notAuthenticatedState,
      status: 'checking',
    });
    expect(state.status).toBe('checking');
  });
});
