import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { colores } from '../theme';
import { Reveal } from './ui/Reveal';

/**
 * La invitación propiamente tal, con el texto del documento de contenido.
 * Hace de puente entre el hero y la historia.
 */
export function Invitacion() {
  return (
    <Box
      component="section"
      id="invitacion"
      sx={{
        maxWidth: 820,
        mx: 'auto',
        px: 3,
        pt: { xs: 6, md: 8 },
        pb: { xs: 2, md: 4 },
        textAlign: 'center',
      }}
    >
      <Reveal>
        <Typography variant="h2" sx={{ fontSize: 'clamp(30px, 4.4vw, 46px)', lineHeight: 1.15 }}>
          Se acerca la fecha de nuestro matrimonio…
        </Typography>
        <Typography
          sx={{
            mt: 3,
            fontSize: { xs: 20, sm: 23 },
            lineHeight: 1.6,
            color: colores.texto,
          }}
        >
          …¡y estamos muy felices de compartir este momento con ustedes! Queremos invitarlos a
          celebrar nuestra unión y disfrutar juntos de un día lleno de alegría, amor, recuerdos y
          buena compañía.
        </Typography>
        <Typography
          sx={{
            mt: 2.5,
            fontSize: { xs: 18, sm: 20 },
            fontStyle: 'italic',
            lineHeight: 1.6,
            color: colores.apagado,
          }}
        >
          Para que puedan organizarse y disfrutar al máximo este día tan importante para nosotros,
          aquí abajo están todos los detalles.
        </Typography>
      </Reveal>
    </Box>
  );
}
