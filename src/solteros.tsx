import Box from '@mui/material/Box';
import { colores } from './theme';
import { montar } from './montar';
import { Nav } from './components/Nav';
import { Solteros } from './components/Solteros';
import { Footer } from './components/Footer';

montar(
  <Box sx={{ color: colores.tinta, minHeight: '100vh' }}>
    <Nav raiz="../" />
    <Solteros />
    <Footer />
  </Box>,
);
