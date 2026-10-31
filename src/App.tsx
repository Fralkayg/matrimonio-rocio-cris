import Box from '@mui/material/Box';
import { colores } from './theme';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { Invitacion } from './components/Invitacion';
// import { Historia } from './components/Historia';
import { GranDia } from './components/GranDia';
import { Detalles } from './components/Detalles';
import { Cancion } from './components/Cancion';
import { Rsvp } from './components/Rsvp';
// import { Trivia } from './components/Trivia';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <Box sx={{ color: colores.tinta, minHeight: '100vh' }}>
      <Nav />
      <Hero />
      <Invitacion />
      {/* <Historia /> */}
      <GranDia />
      <Detalles />
      <Cancion />
      <Rsvp />
      {/* <Trivia /> */}
      <Footer />
    </Box>
  );
}
