import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { colores } from '../theme';
import { RSVP } from '../config';
import { PaperCard } from './ui/PaperCard';
import { Reveal } from './ui/Reveal';
import { Script } from './ui/Script';
import { Ilustracion } from './ui/Ilustracion';

/** Confirmación de asistencia: el formulario y la fecha límite. */
export function Rsvp() {
  return (
    <Box
      component="section"
      id="confirmar"
      sx={{
        background: 'rgba(120,100,70,0.045)',
        borderTop: `1px solid ${colores.borde}`,
        borderBottom: `1px solid ${colores.borde}`,
      }}
    >
      <Box sx={{ maxWidth: 820, mx: 'auto', px: 3, py: { xs: 9, md: 14 } }}>
        <Reveal>
          <PaperCard
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              gap: 1.5,
            }}
          >
            <Ilustracion src={RSVP.imagen} ancho={200} sx={{ mb: 1 }} />

            <Typography variant="overline" sx={{ color: colores.apagado }}>
              Confirmación de asistencia
            </Typography>
            <Typography variant="h2" sx={{ fontSize: 'clamp(34px, 5.5vw, 56px)', lineHeight: 1.1 }}>
              ¿Nos acompañas?
            </Typography>
            <Script size={38} sx={{ mt: 0.5 }}>
              antes del {RSVP.limite}
            </Script>
            <Typography variant="body1" sx={{ mt: 1.5, maxWidth: 560, color: colores.texto }}>
              Les pedimos confirmar su asistencia{' '}
              <Box component="strong" sx={{ fontWeight: 600, color: colores.tinta }}>
                antes del {RSVP.limite}
              </Box>
              . {RSVP.instruccion} Si tienen alguna alergia o restricción alimentaria, cuéntennos
              ahí mismo.
            </Typography>
            <Button
              variant="contained"
              href={RSVP.formulario}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ mt: 2.5 }}
            >
              Confirmar asistencia
            </Button>
            <Typography
              sx={{
                mt: 2,
                fontSize: 15,
                fontWeight: 600,
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: colores.apagado,
              }}
            >
              {RSVP.soloAdultos}
            </Typography>
          </PaperCard>
        </Reveal>
      </Box>
    </Box>
  );
}
