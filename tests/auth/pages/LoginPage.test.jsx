import { render, screen } from '@testing-library/react';

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import { LoginPage } from '../../../src/auth/pages/LoginPage';
import { authSlice } from '../../../src/store/auth';
import { MemoryRouter } from 'react-router-dom';

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
  // preloadedState:{}
});

describe('Pruebas en LoginPage', () => {
  test('Debe de mostrar el componente correctamente', () => {
    render(
      <Provider store={store}>
        <MemoryRouter >
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );
  });

    
    screen.debug()
  
});
