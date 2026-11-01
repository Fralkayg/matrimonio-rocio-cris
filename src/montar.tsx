import { StrictMode, type ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme';
import './styles/fonts.css';
import './styles/global.css';

/** Lo que comparten todas las páginas del sitio: tema, estilos y #root. */
export function montar(pagina: ReactNode) {
  const contenedor = document.getElementById('root');
  if (!contenedor) throw new Error('No se encontró #root');

  createRoot(contenedor).render(
    <StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {pagina}
      </ThemeProvider>
    </StrictMode>,
  );
}
