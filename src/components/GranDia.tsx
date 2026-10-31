import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { colores } from '../theme';
import { LUGAR, MOMENTOS, VESTIMENTA } from '../config';
import { useFecha } from '../hooks/useFecha';
import { PaperCard } from './ui/PaperCard';
import { Reveal } from './ui/Reveal';
import { Script } from './ui/Script';

export function GranDia() {
  const fecha = useFecha();

  return (
    <Box
      component="section"
      id="fechas"
      sx={{
        background: 'rgba(120,100,70,0.045)',
        borderTop: `1px solid ${colores.borde}`,
        borderBottom: `1px solid ${colores.borde}`,
      }}
    >
      <Box
        sx={{
          maxWidth: 1160,
          mx: 'auto',
          px: 3,
          py: { xs: 9, md: 14 },
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
        }}
      >
        {/* Fecha y cuenta regresiva */}
        <Reveal>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              gap: 1.25,
            }}
          >
            <Typography variant="overline" sx={{ color: colores.apagado }}>
              Save the date
            </Typography>
            <Typography variant="h2" sx={{ fontSize: 'clamp(38px, 7vw, 80px)' }}>
              {fecha.larga}
            </Typography>
            <Typography
              variant="overline"
              sx={{ mt: 1.75, fontSize: 18, letterSpacing: '0.24em', color: colores.verdeClaro }}
            >
              {fecha.cuenta}
            </Typography>
          </Box>
        </Reveal>

        {/* Lugar único: la ceremonia y la fiesta son en el mismo fundo. */}
        <Reveal delay={0.05}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="overline" sx={{ color: colores.apagado }}>
              El lugar
            </Typography>
            <Typography
              variant="h3"
              sx={{ mt: 1, fontSize: { xs: 32, sm: 44 }, fontStyle: 'italic' }}
            >
              {LUGAR.nombre}
            </Typography>
            <Typography variant="body2" sx={{ mt: 1, color: colores.texto }}>
              {LUGAR.direccion}
            </Typography>
          </Box>
        </Reveal>

        {/* Ceremonia y fiesta */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: 'minmax(0,1fr)', md: 'repeat(2, minmax(0,1fr))' },
            gap: 4,
          }}
        >
          {MOMENTOS.map((m, i) => (
            <Reveal key={m.titulo} delay={i * 0.1}>
              <PaperCard
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  gap: 1.25,
                }}
              >
                <Script size={40}>{m.rotulo}</Script>
                <Typography
                  variant="h3"
                  sx={{
                    fontSize: 26,
                    fontWeight: 500,
                    letterSpacing: '0.24em',
                    textTransform: 'uppercase',
                    color: colores.apagado,
                  }}
                >
                  {m.titulo}
                </Typography>
                <Typography sx={{ mt: 0.5, fontSize: { xs: 36, sm: 44 }, lineHeight: 1 }}>
                  {m.hora ?? m.texto}
                </Typography>
                {m.hora && (
                  <Typography sx={{ fontSize: 22, fontStyle: 'italic' }}>{m.texto}</Typography>
                )}
                {m.nota && (
                  <Typography
                    variant="body2"
                    sx={{ mt: 1, maxWidth: 360, color: colores.texto }}
                  >
                    {m.nota}
                  </Typography>
                )}
                <Box sx={{ mt: 'auto', pt: 2.5 }}>
                  <Button
                    variant="outlined"
                    href={m.maps}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Cómo llegar
                  </Button>
                </Box>
              </PaperCard>
            </Reveal>
          ))}
        </Box>

        {/* Vestimenta */}
        <Reveal>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              gap: 1,
            }}
          >
            <Typography variant="overline" sx={{ color: colores.apagado }}>
              Vestimenta
            </Typography>
            <Typography sx={{ fontSize: 26, fontStyle: 'italic' }}>{VESTIMENTA.titulo}</Typography>
            <Typography variant="body2" sx={{ maxWidth: 620, color: colores.texto }}>
              {VESTIMENTA.detalle}
            </Typography>
          </Box>
        </Reveal>
      </Box>
    </Box>
  );
}
