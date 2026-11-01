import Box from '@mui/material/Box';
import { colores } from './theme';
import { montar } from './montar';
import { Nav } from './components/Nav';
import { Muro } from './components/Muro';
import { Footer } from './components/Footer';

montar(
  <Box sx={{ color: colores.tinta, minHeight: '100vh' }}>
    <Nav raiz="../" />
    <Muro muro="solteros" />
    <Footer />
  </Box>,
);
