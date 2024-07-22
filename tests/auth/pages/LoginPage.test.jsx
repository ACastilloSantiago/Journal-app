import { fireEvent, render, screen } from '@testing-library/react';

import { Provider, useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import { LoginPage } from '../../../src/auth/pages/LoginPage';
import { authSlice } from '../../../src/store/auth';
import { MemoryRouter } from 'react-router-dom';
import { notAuthenticatedState } from '../../fixtures/authFixtures';
import { startLoginWithcEmailPassword } from '../../../src/store';

const mockStartGoogleSignIn = jest.fn();
const mockStartLoginWithEmailPassword = jest.fn();

jest.mock('../../../src/store/auth/thunks', () => ({
  startGoogleSignIn: () => mockStartGoogleSignIn,
  startLoginWithcEmailPassword:
    ({ email, password }) =>
    () =>
      mockStartLoginWithEmailPassword({ email, password }),
}));


jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => (fn) => fn(),
}));

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
  preloadedState: {
    auth: notAuthenticatedState,
  },
});

describe('Pruebas en LoginPage', () => {
  beforeEach(() => jest.clearAllMocks());

  test('Debe de mostrar el componente correctamente', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );
    // screen.debug()
    expect(screen.getAllByText('Login').length).toBeGreaterThanOrEqual(1);
  });

  test('btn de google debe de llamar el startGoogleSignIn', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );
    // console.log(store.getState());
    const googleBtn = screen.getByLabelText('google-btn');

    fireEvent.click(googleBtn);
    // console.log(store.getState());

    expect(mockStartGoogleSignIn).toHaveBeenCalled();
  });

  test('Debe de llamar el startLoginWithcEmailPassword ', () => {
    const email = 'sattog@gmail.com';
    const password = '123456';

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    const emailField = screen.getByRole('textbox', { name: 'Correo' });

    fireEvent.change(emailField, { target: { name: 'email', value: email } });

    const passwordField = screen.getByTestId('password');
    fireEvent.change(passwordField, {
      target: { name: 'password', value: password },
    });
    const loginForm = screen.getByLabelText('submit-form');
    fireEvent.submit(loginForm);

    expect(mockStartLoginWithEmailPassword).toHaveBeenCalledWith({
      email,
      password,
    });
    
    // screen.debug()
    // console.log({emailField});

    // startLoginWithcEmailPassword
  });
});
