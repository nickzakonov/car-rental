import { Alert, Button, Grid, TextField, Typography } from '@mui/material';
import { FC, useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import InputPassword from '../InputPassword';
import { authContext } from '../../providers/AuthProvider';
import { LoginDto, LoginResponse } from '../../types/generated';

const messages = {
  password: 'Enter your password',
  email: 'Enter your email address'
};

const LoginForm: FC = () => {
  const { register, handleSubmit, errors, formState } = useForm<LoginDto>({ mode: 'onChange' });
  const { isDirty, isValid } = formState;
  const [response, setResponse] = useState<LoginResponse>();
  const { changeCurrentUser } = useContext(authContext);

  const onSubmit = async (values: LoginDto) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    };
    fetch('http://localhost:5000/user/login', requestOptions)
      .then((response) => response.json())
      .then((data) => setResponse(data));
  };

  useEffect(() => {
    response?.token && changeCurrentUser(response?.token);
  }, [response, changeCurrentUser]);

  return (
    <form data-testid="loginForm" noValidate onSubmit={handleSubmit((data) => onSubmit(data))}>
      <Typography variant="h3" gutterBottom>
        Login
      </Typography>
      <TextField
        inputRef={register({
          required: { value: true, message: 'Email can not be empty' },
          pattern: {
            value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
            message: 'Entered value does not match email format'
          }
        })}
        inputProps={{ 'data-testid': 'email' }}
        variant="outlined"
        required
        fullWidth
        margin="normal"
        label="Email Address"
        name="email"
        autoComplete="email"
        error={!!errors?.email}
        helperText={errors?.email?.message || messages?.email}
      />
      <InputPassword
        inputRef={register({
          required: { value: true, message: 'Please, provide your password' }
        })}
        inputProps={{ 'data-testid': 'password' }}
        required
        name="password"
        label="Password"
        error={!!errors?.password}
        helperText={errors?.password?.message || messages?.password}
      />
      {response && !response?.token && <Alert severity="error">Incorrect email or password</Alert>}
      <Grid
        container
        sx={{
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 5,
          marginTop: 3
        }}>
        <Grid item>
          <Button
            aria-label="submit"
            data-testid="submitButton"
            type="submit"
            variant="contained"
            color="primary"
            disabled={!isDirty || !isValid}>
            Submit
          </Button>
        </Grid>
        <Grid item>
          <Link to="/register">{"Don't have an account? Sign Up "}&rarr;</Link>
        </Grid>
      </Grid>
    </form>
  );
};

export default LoginForm;
