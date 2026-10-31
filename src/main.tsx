import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme';
import App from './App';
import './styles/fonts.css';
import './styles/global.css';

const contenedor = document.getElementById('root');
if (!contenedor) throw new Error('No se encontró #root');

createRoot(contenedor).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>,
);
