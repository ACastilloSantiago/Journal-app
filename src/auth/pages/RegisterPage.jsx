import { useMemo, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';


import {
  Alert,
  Button,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';

import { useForm } from '../../hooks';
import { AuthLayout } from '../layout/AuthLayout';
import {  startCreatingUserWithEmailPassword} from "../../store/auth/thunks";

const formData = {
  email: '',
  password: '',
  displayName: '',
};

const formValidations = {
  email: [(value) => value.includes('@'), 'El correo debe de tener una @.'],
  password: [
    (value) => value.length >= 6,
    'El password debe de tener más de 6 letras.',
  ],
  displayName: [(value) => value.length >= 1, 'El nombre es obligatorio.'],
};

export const RegisterPage = () => {
  const dispatch = useDispatch();
  const [formSubmitted, setformSubmitted] = useState(true);

  const { status, errorMessage } = useSelector((state) => state.auth);
  const isCheckingAuthentication = useMemo(
    () => status === 'checking',
    [status]
  );

  const {
    formState,
    displayName,
    email,
    password,
    onInputChange,
    isFormValid,
    displayNameValid,
    emailValid,
    passwordValid,
  } = useForm(formData, formValidations);

  const onSubmit = (event) => {
    event.preventDefault();
    setformSubmitted(true);
    if (!isFormValid) return;

    dispatch(startCreatingUserWithEmailPassword(formState));
  };

  return (
    <AuthLayout title="Crear cuenta">
      {/* <h1>Form Valid: {isFormValid ? 'Valido' : 'Incorrecto'} </h1> */}

      <form
        onSubmit={onSubmit}
        className="animate__animated animate__fadeIn animate__faster"
      >
        <Grid container>
          <Grid item xs={12} sx={{ marginTop: 2 }}>
            <TextField
              label="Nombre completo"
              type="text"
              name="displayName"
              value={displayName}
              onChange={onInputChange}
              placeholder="Santiago Castillo"
              fullWidth
              error={!!displayNameValid && formSubmitted}
              helperText={displayNameValid}
            />
          </Grid>

          <Grid item xs={12} sx={{ marginTop: 2 }}>
            <TextField
              label="Correo"
              type="email"
              name="email"
              value={email}
              onChange={onInputChange}
              placeholder="correo@gmail.com"
              fullWidth
              error={!!emailValid && formSubmitted}
              helperText={emailValid}
            />
          </Grid>

          <Grid item xs={12} sx={{ marginTop: 2 }}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              fullWidth
              name="password"
              value={password}
              onChange={onInputChange}
              error={!!passwordValid && formSubmitted}
              helperText={passwordValid}
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }} id="ss">
            <Grid item xs={12} display={!!errorMessage ? '' : 'none'}>
              <Alert severity="error">{errorMessage}</Alert>
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                fullWidth
                type="submit"
                disabled={isCheckingAuthentication}
              >
                Crear cuenta
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="end">
            <Typography sx={{ mr: 1 }}>¿Ya tienes una cuenta?</Typography>

            <Link component={RouterLink} to="/auth/login">
              Ingresar
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
