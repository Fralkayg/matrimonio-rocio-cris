import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { colores } from '../theme';
import { VESTIMENTA } from '../config';
import { PaperCard } from './ui/PaperCard';
import { Reveal } from './ui/Reveal';
import { Script } from './ui/Script';

/**
 * Código de vestimenta. Va en tarjeta propia y a tamaño de titular: al final de
 * "El gran día", como texto corrido, se perdía.
 */
export function Vestimenta() {
  return (
    <Reveal>
      <PaperCard
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

        {/* La única petición concreta: que se note. */}
        <Box
          sx={{
            mt: 2.5,
            display: 'flex',
            alignItems: 'center',
            gap: 2.5,
            maxWidth: 560,
            px: { xs: 2.5, sm: 3.5 },
            py: 2.5,
            border: `1px solid ${colores.bordeFuerte}`,
            bgcolor: 'rgba(255,255,255,0.7)',
            textAlign: 'left',
          }}
        >
          <Box
            aria-hidden="true"
            sx={{
              flex: '0 0 auto',
              width: 34,
              height: 34,
              borderRadius: '50%',
              bgcolor: '#FFFFFF',
              border: `1px solid ${colores.regla}`,
            }}
          />
          <Typography sx={{ fontSize: { xs: 19, sm: 21 }, fontStyle: 'italic', lineHeight: 1.5 }}>
            {VESTIMENTA.nota}
          </Typography>
        </Box>
      </PaperCard>
    </Reveal>
  );
}
