import {cleanup, fireEvent, render, screen, waitFor} from '@testing-library/react';
import LoginForm from './LoginForm';
import {authContext} from '../../providers/AuthProvider';
import {BrowserRouter} from 'react-router-dom';

beforeAll(() => {
  global.fetch = () =>
    Promise.resolve({
      json: () => Promise.resolve(Promise.resolve([]))
    } as Response);
});

afterEach(() => {
  jest.restoreAllMocks();
  cleanup();
});

describe('LoginForm', () => {
  it('does not pass incorrect data', async () => {
    const { getByText, getByTestId } = render(
      <authContext.Provider
        value={{
          isAuthenticated: () => false,
          changeCurrentUser: jest.fn()
        }}>
        <BrowserRouter>
          <LoginForm />
        </BrowserRouter>
      </authContext.Provider>
    );

    const email = getByTestId('email') as HTMLInputElement;
    const password = getByTestId('password') as HTMLInputElement;
    const form = getByTestId('loginForm') as HTMLFormElement;
    await waitFor(() => getByText('Login'));

    fireEvent.change(email, { target: { value: 'incorrect@email.' } });
    fireEvent.change(password, { target: { value: '123456' } });

    form.submit();

    const emailError = await waitFor(() =>
      screen.getByText('Entered value does not match email format')
    );

    expect(emailError).toBeInTheDocument();
  });

  it('able to sign in with correct data', async () => {
    const { getByTestId } = render(
      <authContext.Provider
        value={{
          isAuthenticated: () => false,
          changeCurrentUser: jest.fn()
        }}>
        <BrowserRouter>
          <LoginForm />
        </BrowserRouter>
      </authContext.Provider>
    );

    const email = getByTestId('email') as HTMLInputElement;
    const password = getByTestId('password') as HTMLInputElement;
    const form = getByTestId('loginForm') as HTMLFormElement;

    fireEvent.change(email, { target: { value: 'correct@email.com' } });
    fireEvent.change(password, { target: { value: '123456' } });

    form.submit();

    expect(
      await waitFor(() => screen.queryByText('Entered value does not match email format'))
    ).toBeNull();
    expect(await waitFor(() => screen.queryByText('Please, provide your password'))).toBeNull();
  });
});
