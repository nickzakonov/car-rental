import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Box, Paper } from '@mui/material';

ReactDOM.render(
  <React.StrictMode>
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh">
      <Paper
        sx={{
          padding: 3,
          width: 1 / 4
        }}>
        <App />
      </Paper>
    </Box>
  </React.StrictMode>,
  document.getElementById('root')
);
