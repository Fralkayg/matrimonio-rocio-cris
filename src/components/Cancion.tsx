import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { colores } from '../theme';
import { CANCION } from '../config';
import { PaperCard } from './ui/PaperCard';
import { Reveal } from './ui/Reveal';
import { Script } from './ui/Script';

const EMBEBIDOS = {
  spotify: (id: string) => ({
    src: `https://open.spotify.com/embed/track/${id}?theme=0`,
    alto: 152,
    titulo: 'Reproductor de Spotify',
  }),
  youtube: (id: string) => ({
    src: `https://www.youtube-nocookie.com/embed/${id}`,
    alto: 230,
    titulo: 'Reproductor de YouTube',
  }),
} as const;

/**
 * La canción de los novios. Si `CANCION.id` está vacío la sección no se
 * renderiza: vale más que falte a que quede un reproductor en blanco.
 */
export function Cancion() {
  if (!CANCION.id) return null;

  const embebido = EMBEBIDOS[CANCION.tipo](CANCION.id);

  return (
    <Box component="section" id="cancion">
      <Box sx={{ maxWidth: 760, mx: 'auto', px: 3, py: { xs: 8, md: 12 } }}>
        <Reveal>
          <PaperCard
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              gap: 1.25,
            }}
          >
            <Typography variant="overline" sx={{ color: colores.apagado }}>
              Nuestra canción
            </Typography>

            <Typography
              variant="h2"
              sx={{ mt: 0.5, fontSize: 'clamp(32px, 5vw, 48px)', lineHeight: 1.1 }}
            >
              {CANCION.titulo}
            </Typography>

            <Script size={36}>{CANCION.artista}</Script>

            {CANCION.nota && (
              <Typography
                variant="body2"
                sx={{ mt: 1, maxWidth: 480, fontStyle: 'italic', color: colores.texto }}
              >
                {CANCION.nota}
              </Typography>
            )}

            <Box
              component="iframe"
              src={embebido.src}
              title={embebido.titulo}
              loading="lazy"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              sx={{
                mt: 3,
                width: '100%',
                maxWidth: 520,
                height: embebido.alto,
                border: 0,
                borderRadius: 2,
              }}
            />
          </PaperCard>
        </Reveal>
      </Box>
    </Box>
  );
}
