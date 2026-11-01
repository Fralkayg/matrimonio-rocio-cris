import { useEffect, useRef, useState, type RefObject } from 'react';
import Box from '@mui/material/Box';
import { colores } from '../../theme';
import { CANCION } from '../../config';

/** Tamaño del reproductor cuando se despliega (16:9). */
const ANCHO = 320;
const ALTO = 180;

/**
 * Si al tocar ♪ la canción no arranca en este plazo, el navegador bloqueó el
 * play (puede pasar en Safari de iPhone) y se muestra el video para tocarlo ahí.
 */
const ESPERA_MS = 2500;

export const hayReproductor = Boolean(CANCION.id);

/** Lo mínimo que se usa del IFrame Player API de YouTube. */
interface Reproductor {
  playVideo: () => void;
  pauseVideo: () => void;
  destroy: () => void;
}
interface YT {
  Player: new (
    el: HTMLElement,
    opciones: {
      host: string;
      videoId: string;
      width: number;
      height: number;
      playerVars: Record<string, string | number>;
      events: {
        onReady: (e: { target: Reproductor }) => void;
        onStateChange: (e: { data: number }) => void;
      };
    },
  ) => Reproductor;
  PlayerState: { PLAYING: number };
}
declare global {
  interface Window {
    YT?: YT;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let apiPromesa: Promise<YT> | null = null;

/** El script se pide una sola vez aunque React monte el componente dos veces. */
function cargarApi(): Promise<YT> {
  apiPromesa ??= new Promise((resolve) => {
    window.onYouTubeIframeAPIReady = () => resolve(window.YT!);
    const script = document.createElement('script');
    script.src = 'https://www.youtube.com/iframe_api';
    script.async = true;
    document.body.appendChild(script);
  });
  return apiPromesa;
}

/**
 * El reproductor de YouTube se carga oculto al abrir la página, para que el
 * botón ♪ pueda darle play al instante: si se cargara recién al tocar, el
 * navegador ya no contaría el toque como permiso para sonar.
 */
export function useCancion() {
  const contenedor = useRef<HTMLDivElement>(null);
  const reproductor = useRef<Reproductor | null>(null);
  const espera = useRef<number>(undefined);
  const [sonando, setSonando] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const host = contenedor.current;
    if (!hayReproductor || !host) return;

    // YouTube reemplaza el nodo que recibe por su iframe; se le da uno propio
    // para no tocar nodos que maneja React.
    const nodo = document.createElement('div');
    host.appendChild(nodo);
    let vigente = true;

    cargarApi().then((yt) => {
      if (!vigente) return;
      const r = new yt.Player(nodo, {
        host: 'https://www.youtube-nocookie.com',
        videoId: CANCION.id,
        width: ANCHO,
        height: ALTO,
        // `loop` solo funciona si la playlist es el mismo video.
        playerVars: { playsinline: 1, loop: 1, playlist: CANCION.id, rel: 0 },
        events: {
          onReady: () => {
            if (vigente) reproductor.current = r;
          },
          onStateChange: ({ data }) => {
            const suena = data === yt.PlayerState.PLAYING;
            setSonando(suena);
            if (suena) {
              window.clearTimeout(espera.current);
              setVisible(false);
            }
          },
        },
      });
    });

    return () => {
      vigente = false;
      window.clearTimeout(espera.current);
      reproductor.current?.destroy();
      reproductor.current = null;
      host.replaceChildren();
    };
  }, []);

  function alternar() {
    const r = reproductor.current;
    if (!r) return setVisible((v) => !v);
    if (sonando) return r.pauseVideo();
    r.playVideo();
    window.clearTimeout(espera.current);
    espera.current = window.setTimeout(() => setVisible(true), ESPERA_MS);
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
      aria-label={
        sonando
          ? `Pausar «${CANCION.titulo}»`
          : `Escuchar nuestra canción: «${CANCION.titulo}» de ${CANCION.artista}`
      }
      title={`${CANCION.titulo} · ${CANCION.artista}`}
      sx={{
        ml: 1.5,
        width: 36,
        height: 36,
        flexShrink: 0,
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
      <Box
        ref={contenedor}
        sx={{ display: 'flex', justifyContent: 'center', pb: 2, '& iframe': { borderRadius: 2 } }}
      />
    </Box>
  );
}
