import type { ReactElement } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { colores } from '../theme';
import { DETALLES, REGALOS } from '../config';
import type { Detalle } from '../config';
import { PaperCard } from './ui/PaperCard';
import { Reveal } from './ui/Reveal';
import { SectionHeading } from './ui/SectionHeading';
import { Deco } from './ui/Deco';
import { IconoAuto, IconoPlato, IconoRegalo } from './ui/Iconos';

const ICONOS: Record<Detalle['icono'], (p: { size?: number }) => ReactElement> = {
  auto: IconoAuto,
  plato: IconoPlato,
  regalo: IconoRegalo,
};

function Tarjeta({ detalle }: { detalle: Detalle }) {
  const Icono = ICONOS[detalle.icono];

  return (
    <PaperCard
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 1.5,
        p: { xs: 3.5, sm: 4.5 },
      }}
    >
      <Box sx={{ color: colores.verdeClaro, display: 'flex' }}>
        <Icono size={28} />
      </Box>
      <Typography variant="overline" sx={{ fontSize: 14, color: colores.apagado }}>
        {detalle.rotulo}
      </Typography>
      <Typography variant="h3" sx={{ fontSize: { xs: 27, sm: 31 }, fontStyle: 'italic' }}>
        {detalle.titulo}
      </Typography>
      <Typography variant="body2" sx={{ color: colores.texto }}>
        {detalle.texto}
      </Typography>
    </PaperCard>
  );
}

/** Estacionamiento, alergias y la mesa de novios: lo práctico del día. */
export function Detalles() {
  return (
    <Box component="section" id="detalles" sx={{ position: 'relative', overflow: 'hidden' }}>
      <Deco trazo="rama" color={colores.salvia} width={64} height={82} sx={{ top: 110, left: '6%' }} />
      <Deco trazo="ola" color={colores.azul} width={80} height={20} grosor={3} sx={{ bottom: 140, right: '7%' }} />

      <Box
        sx={{
          position: 'relative',
          maxWidth: 1160,
          mx: 'auto',
          px: 3,
          pt: { xs: 9, md: 14 },
          pb: { xs: 9, md: 13 },
        }}
      >
        <SectionHeading
          rotulo="Detalles importantes"
          titulo="Lo que hay que saber"
          script="para que todo salga redondo"
          mb={8}
        />

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: 'minmax(0,1fr)', md: 'repeat(2, minmax(0,1fr))' },
            gap: 4,
          }}
        >
          {DETALLES.map((d, i) => (
            <Reveal key={d.id} delay={i * 0.1}>
              <Tarjeta detalle={d} />
            </Reveal>
          ))}
        </Box>

        {/* Regalos: destacado, porque lleva el link y el código. */}
        <Reveal delay={0.1}>
          <PaperCard
            id="regalos"
            sx={{
              mt: 4,
              borderTop: `4px solid ${colores.oro}`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              gap: 1.5,
              p: { xs: 3.5, sm: '48px 40px' },
            }}
          >
            <Box sx={{ color: colores.verdeClaro, display: 'flex' }}>
              <IconoRegalo size={30} />
            </Box>
            <Typography variant="overline" sx={{ fontSize: 14, color: colores.apagado }}>
              Regalos
            </Typography>
            <Typography variant="h3" sx={{ fontSize: { xs: 30, sm: 38 }, fontStyle: 'italic' }}>
              Su compañía es el regalo
            </Typography>
            <Typography variant="body2" sx={{ maxWidth: 620, color: colores.texto }}>
              {REGALOS.texto}
            </Typography>
            <Button
              variant="contained"
              href={REGALOS.link}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ mt: 2 }}
            >
              Ver lista de novios
            </Button>
            <Typography
              sx={{
                mt: 1,
                fontSize: 17,
                letterSpacing: '0.12em',
                fontWeight: 600,
                color: colores.apagado,
              }}
            >
              Código del evento: {REGALOS.codigo}
            </Typography>
          </PaperCard>
        </Reveal>
      </Box>
    </Box>
  );
}
