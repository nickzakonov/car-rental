import React from 'react';
import './App.css';
import LoginForm from './components/LoginForm/LoginForm';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RegisterForm from './components/RegisterForm';
import AuthProvider from './providers/AuthProvider';
import PrivateRoute from './components/PrivateRoute';
import Home from './components/Home';
import EscapeRoute from './components/EscapeRoute';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="login"
            element={
              <EscapeRoute>
                <LoginForm />
              </EscapeRoute>
            }
          />
          <Route
            path="register"
            element={
              <EscapeRoute>
                <RegisterForm />
              </EscapeRoute>
            }
          />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="*"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
