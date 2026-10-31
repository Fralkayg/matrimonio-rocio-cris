import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { colores } from '../theme';
import { NOVIOS } from '../config';
import { useFecha } from '../hooks/useFecha';
import { Regla } from './ui/Deco';

export function Footer() {
  const fecha = useFecha();

  return (
    <Box component="footer" sx={{ borderTop: `1px solid ${colores.borde}` }}>
      <Box
        sx={{
          maxWidth: 1160,
          mx: 'auto',
          px: 3,
          pt: 9,
          pb: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: 1.75,
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: 22, sm: 28 },
            fontWeight: 500,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: colores.marron,
          }}
        >
          {NOVIOS.titulo}
        </Typography>
        <Regla ancho={80} />
        <Typography sx={{ fontSize: 17, letterSpacing: '0.24em', color: colores.apagado }}>
          {fecha.corta}
        </Typography>
        <Typography sx={{ mt: 0.75, fontSize: 18, fontStyle: 'italic', color: colores.texto }}>
          Con mucho cariño, {NOVIOS.firma}
        </Typography>
      </Box>
    </Box>
  );
}
