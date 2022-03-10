import { Alert, Button, Grid, TextField, Typography } from '@mui/material';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import InputPassword from './InputPassword';

const messages = {
  password: 'Enter your password',
  passwordConfirm: 'Confirm your password',
  name: 'Enter your full name',
  email: 'Enter your email address'
};

const RegisterForm: FC = () => {
  const { register, handleSubmit, errors, watch, formState } = useForm({ mode: 'onChange' });
  const { isDirty, isValid } = formState;
  const password = watch('password', '');
  const [response, setResponse] = useState<string>();

  const onSubmit = async (values: { [val: string]: string }) => {
    const { name, email, password } = values;
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    };
    fetch('http://localhost:5000/user/register', requestOptions)
      .then((response) => response.json())
      .then((data) => setResponse(data.status === 'SUCCESS' ? 'SUCCESS' : 'FAILED'));
  };

  return (
    <form noValidate onSubmit={handleSubmit((data) => onSubmit(data))}>
      <Typography variant="h3" gutterBottom>
        Registration
      </Typography>
      <TextField
        inputRef={register({
          required: { value: true, message: 'Full name can not be empty' },
          minLength: {
            value: 5,
            message: 'Full name should be at least 5 characters long'
          },
          maxLength: {
            value: 80,
            message: 'Full name must be less than 80 characters long'
          }
        })}
        fullWidth
        margin="normal"
        variant="outlined"
        required
        label="Name"
        name="name"
        InputLabelProps={{
          shrink: true
        }}
        error={!!errors.name}
        helperText={errors?.name?.message || messages?.name}
      />
      <TextField
        inputRef={register({
          required: { value: true, message: 'Email can not be empty' },
          pattern: {
            value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
            message: 'Invalid email format'
          }
        })}
        fullWidth
        margin="normal"
        variant="outlined"
        required
        label="Email"
        name="email"
        InputLabelProps={{
          shrink: true
        }}
        error={!!errors.email}
        helperText={errors?.email?.message || messages?.email}
      />
      <InputPassword
        id="password-field"
        inputRef={register({
          required: { value: true, message: 'Please, provide your password' },
          pattern: {
            value: /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/,
            message: 'The password should contain at least one number and one character'
          },
          minLength: { value: 8, message: 'Password must be at least 8 characters long' },
          maxLength: { value: 20, message: 'Password must be less than 20 characters long' }
        })}
        required
        name="password"
        label="Password"
        helperText={errors?.password?.message || messages?.password}
        error={!!errors.password}
        InputLabelProps={{
          shrink: true
        }}
      />
      <InputPassword
        id="password-confirmation-field"
        inputRef={register({
          required: { value: true, message: 'Please, provide password confirmation' },
          validate: (value) => value === password || 'The passwords do not match'
        })}
        InputLabelProps={{
          shrink: true
        }}
        required
        name="passwordConfirm"
        label="Password Confirmation"
        error={!!errors.passwordConfirm}
        helperText={errors?.passwordConfirm?.message || messages?.passwordConfirm}
      />
      {response === 'SUCCESS' && <Alert severity="success">User successfully registered</Alert>}
      {response && response !== 'SUCCESS' && (
        <Alert severity="error">Unable to register user</Alert>
      )}
      <Grid
        container
        sx={{
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 5,
          marginTop: 3
        }}>
        <Grid item>
          <Button type="submit" variant="contained" color="primary" disabled={!isDirty || !isValid}>
            Submit
          </Button>
        </Grid>
        <Grid item>
          <Link to="/login">Already have an account? Login &rarr;</Link>
        </Grid>
      </Grid>
    </form>
  );
};

export default RegisterForm;
