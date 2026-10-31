import Box from '@mui/material/Box';
import { colores } from '../../theme';
import { CANCION } from '../../config';

/** Spotify ofrece el embebido en 80 px (compacto) o 152 px. */
const ALTO = 80;

export const hayReproductor = CANCION.tipo === 'spotify' && Boolean(CANCION.id);

/** El botón ♪ del header. Abre o cierra el reproductor. */
export function BotonCancion({ abierto, onClick }: { abierto: boolean; onClick: () => void }) {
  return (
    <Box
      component="button"
      type="button"
      onClick={onClick}
      aria-pressed={abierto}
      aria-label={abierto ? 'Ocultar nuestra canción' : 'Escuchar nuestra canción'}
      sx={{
        ml: 1.5,
        width: 36,
        height: 36,
        borderRadius: '50%',
        border: `1px solid ${abierto ? colores.verde : colores.bordeFuerte}`,
        background: abierto ? colores.verde : 'transparent',
        color: abierto ? '#FFFFFF' : colores.apagado,
        fontSize: 18,
        lineHeight: 1,
        cursor: 'pointer',
        verticalAlign: 'middle',
        transition: 'background 200ms, color 200ms, border-color 200ms',
        '&:hover': { borderColor: colores.verde, color: abierto ? '#FFFFFF' : colores.verde },
      }}
    >
      ♪
    </Box>
  );
}

/**
 * El reproductor vive dentro del header sticky, así acompaña todo el scroll.
 * Se monta recién al primer clic (nadie carga Spotify sin pedirlo) y al
 * cerrarse solo se pliega: desmontarlo cortaría la canción.
 */
export function ReproductorCancion({ abierto, montado }: { abierto: boolean; montado: boolean }) {
  if (!montado) return null;

  return (
    <Box
      aria-hidden={!abierto}
      sx={{
        height: abierto ? ALTO + 16 : 0,
        overflow: 'hidden',
        transition: 'height 250ms ease',
      }}
    >
      <Box sx={{ maxWidth: 520, mx: 'auto', px: 2, pb: 2 }}>
        <Box
          component="iframe"
          src={`https://open.spotify.com/embed/track/${CANCION.id}?theme=0`}
          title={`${CANCION.titulo} · ${CANCION.artista}`}
          tabIndex={abierto ? 0 : -1}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          sx={{ display: 'block', width: '100%', height: ALTO, border: 0, borderRadius: 3 }}
        />
      </Box>
    </Box>
  );
}
