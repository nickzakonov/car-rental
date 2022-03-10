import { FC, useContext, useEffect, useState } from 'react';
import { authContext } from '../providers/AuthProvider';
import { AuthContext } from '../contexts/AuthContext';
import { Box, Button } from '@mui/material';
import jwt from 'jwt-decode';
import { User } from '../types/User';

const Home: FC = () => {
  const { token, changeCurrentUser } = useContext<AuthContext>(authContext);
  const [user, setUser] = useState<User>({} as User);

  useEffect(() => {
    !!token && setUser(jwt(token));
  }, [token]);

  return (
    <Box>
      Welcome, {user.name}! To logout{' '}
      <Button variant="text" onClick={() => changeCurrentUser()}>
        click here
      </Button>
    </Box>
  );
};

export default Home;
