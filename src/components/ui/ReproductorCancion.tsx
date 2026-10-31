import { useEffect, useRef, useState, type RefObject } from 'react';
import Box from '@mui/material/Box';
import { colores } from '../../theme';
import { CANCION } from '../../config';

/** Spotify ofrece el embebido en 80 px (compacto) o 152 px. */
const ALTO = 80;

/**
 * Si al tocar ♪ la canción no arranca en este plazo, el navegador bloqueó el
 * play (pasa en Safari de iPhone) y se muestra el reproductor para tocarlo ahí.
 */
const ESPERA_MS = 2000;

export const hayReproductor = Boolean(CANCION.id);

/** Lo mínimo que se usa del Embed iFrame API de Spotify. */
interface Controlador {
  togglePlay: () => void;
  destroy: () => void;
  addListener: (evento: 'ready' | 'playback_update', cb: (e: { data: { isPaused: boolean } }) => void) => void;
}
interface IFrameApi {
  createController: (
    el: HTMLElement,
    opciones: { uri: string; width: string; height: number },
    cb: (c: Controlador) => void,
  ) => void;
}
declare global {
  interface Window {
    onSpotifyIframeApiReady?: (api: IFrameApi) => void;
  }
}

let apiPromesa: Promise<IFrameApi> | null = null;

/** El script se pide una sola vez aunque React monte el componente dos veces. */
function cargarApi(): Promise<IFrameApi> {
  apiPromesa ??= new Promise((resolve) => {
    window.onSpotifyIframeApiReady = resolve;
    const script = document.createElement('script');
    script.src = 'https://open.spotify.com/embed/iframe-api/v1';
    script.async = true;
    document.body.appendChild(script);
  });
  return apiPromesa;
}

/**
 * El reproductor de Spotify se carga oculto al abrir la página, para que el
 * botón ♪ pueda darle play al instante: si se cargara recién al tocar, el
 * navegador ya no contaría el toque como permiso para sonar.
 */
export function useCancion() {
  const contenedor = useRef<HTMLDivElement>(null);
  const controlador = useRef<Controlador | null>(null);
  const espera = useRef<number>(undefined);
  const [sonando, setSonando] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const host = contenedor.current;
    if (!hayReproductor || !host) return;

    // Spotify reemplaza el nodo que recibe por su iframe; se le da uno propio
    // para no tocar nodos que maneja React.
    const nodo = document.createElement('div');
    host.appendChild(nodo);
    let vigente = true;

    cargarApi().then((api) => {
      if (!vigente) return;
      api.createController(
        nodo,
        { uri: `spotify:track:${CANCION.id}`, width: '100%', height: ALTO },
        (c) => {
          if (!vigente) return c.destroy();
          controlador.current = c;
          c.addListener('playback_update', ({ data }) => {
            setSonando(!data.isPaused);
            if (!data.isPaused) {
              window.clearTimeout(espera.current);
              setVisible(false);
            }
          });
        },
      );
    });

    return () => {
      vigente = false;
      window.clearTimeout(espera.current);
      controlador.current?.destroy();
      controlador.current = null;
      host.replaceChildren();
    };
  }, []);

  function alternar() {
    const c = controlador.current;
    if (!c) return setVisible((v) => !v);
    c.togglePlay();
    if (!sonando) {
      window.clearTimeout(espera.current);
      espera.current = window.setTimeout(() => setVisible(true), ESPERA_MS);
    }
  }

  return { contenedor, sonando, visible, alternar };
}

/** El botón ♪ del header. Da play o pausa a la canción. */
export function BotonCancion({ sonando, onClick }: { sonando: boolean; onClick: () => void }) {
  return (
    <Box
      component="button"
      type="button"
      onClick={onClick}
      aria-pressed={sonando}
      aria-label={sonando ? 'Pausar nuestra canción' : 'Escuchar nuestra canción'}
      sx={{
        ml: 1.5,
        width: 36,
        height: 36,
        borderRadius: '50%',
        border: `1px solid ${sonando ? colores.verde : colores.bordeFuerte}`,
        background: sonando ? colores.verde : 'transparent',
        color: sonando ? '#FFFFFF' : colores.apagado,
        fontSize: 18,
        lineHeight: 1,
        cursor: 'pointer',
        verticalAlign: 'middle',
        transition: 'background 200ms, color 200ms, border-color 200ms',
        '&:hover': { borderColor: colores.verde, color: sonando ? '#FFFFFF' : colores.verde },
        '@keyframes latido': { '50%': { transform: 'scale(1.12)' } },
        animation: sonando ? 'latido 1.6s ease-in-out infinite' : 'none',
      }}
    >
      ♪
    </Box>
  );
}

/**
 * El reproductor vive plegado dentro del header sticky: suena igual aunque no
 * se vea, y solo se despliega si el navegador no dejó darle play desde el botón.
 */
export function ReproductorCancion({
  contenedor,
  visible,
}: {
  contenedor: RefObject<HTMLDivElement | null>;
  visible: boolean;
}) {
  return (
    <Box
      aria-hidden={!visible}
      sx={{
        height: visible ? ALTO + 16 : 0,
        overflow: 'hidden',
        transition: 'height 250ms ease',
      }}
    >
      <Box ref={contenedor} sx={{ maxWidth: 520, mx: 'auto', px: 2, pb: 2, '& iframe': { borderRadius: 3 } }} />
    </Box>
  );
}
