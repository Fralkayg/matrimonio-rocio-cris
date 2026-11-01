import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { colores } from '../theme';
import { VESTIMENTA } from '../config';
import { PaperCard } from './ui/PaperCard';
import { Reveal } from './ui/Reveal';
import { Script } from './ui/Script';
import { Ilustracion } from './ui/Ilustracion';
import { Regla } from './ui/Deco';

/**
 * Código de vestimenta. Va en tarjeta propia y a tamaño de titular: al final de
 * "El gran día", como texto corrido, se perdía.
 */
export function Vestimenta() {
  return (
    <Reveal>
      <PaperCard
        id="vestimenta"
        sx={{
          borderTop: `4px solid ${colores.oro}`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: 1.25,
          p: { xs: '40px 24px', sm: '56px 48px' },
        }}
      >
        <Ilustracion src={VESTIMENTA.imagen} ancho={210} sx={{ mb: 1 }} />

        <Typography variant="overline" sx={{ color: colores.apagado }}>
          Código de vestimenta
        </Typography>

        <Typography
          variant="h2"
          sx={{ mt: 0.5, fontSize: 'clamp(44px, 8vw, 72px)', color: colores.tinta }}
        >
          {VESTIMENTA.titulo}
        </Typography>

        <Script size={38}>{VESTIMENTA.script}</Script>

        <Typography sx={{ mt: 1.5, maxWidth: 560, fontSize: { xs: 20, sm: 23 }, lineHeight: 1.55 }}>
          {VESTIMENTA.detalle}
        </Typography>

        {/* La única petición concreta del documento de contenido. Va como nota al
            pie, separada por el mismo filete del hero y del pie de página: el
            recuadro anterior pesaba más que el propio código de vestimenta. */}
        <Box
          sx={{
            mt: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1.75,
          }}
        >
          <Regla ancho={100} />
          <Typography
            variant="overline"
            sx={{ fontSize: 13, letterSpacing: '0.34em', color: colores.apagado }}
          >
            Un detalle
          </Typography>
          <Typography
            sx={{
              maxWidth: 440,
              fontSize: { xs: 21, sm: 24 },
              fontStyle: 'italic',
              lineHeight: 1.5,
            }}
          >
            {VESTIMENTA.nota}
          </Typography>
        </Box>

      </PaperCard>
    </Reveal>
  );
}
