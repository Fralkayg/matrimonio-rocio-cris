import Box from '@mui/material/Box';
import type { SxProps, Theme } from '@mui/material/styles';
import { colores } from '../../theme';

const TRAZOS = {
  sol: (
    <>
      <circle cx="48" cy="48" r="16" />
      <path d="M48 12v12M48 72v12M12 48h12M72 48h12M22 22l8 8M66 66l8 8M74 22l-8 8M30 66l-8 8" />
    </>
  ),
  rama: (
    <>
      <path d="M10 84C26 60 40 36 60 6" />
      <path d="M22 66c-10-2-16-8-16-16 9 1 15 7 16 16zM30 52c10 0 16-5 18-14-10 0-16 5-18 14zM38 40c-9-3-14-10-13-18 8 2 13 9 13 18zM46 28c9-1 15-7 16-15-9 1-15 7-16 15z" />
    </>
  ),
  ola: <path d="M3 12c6-9 12-9 18 0s12 9 18 0 12-9 18 0 12 9 18 0" />,
  estrella: <path d="M20 3l4.5 11 11.5 1-8.8 7.6 2.8 11.4L20 27.8 10 34l2.8-11.4L4 15l11.5-1z" />,
} as const;

const CAJA = {
  sol: '0 0 96 96',
  rama: '0 0 70 90',
  ola: '0 0 80 20',
  estrella: '0 0 40 40',
} as const;

export type Trazo = keyof typeof TRAZOS;

type Props = {
  trazo: Trazo;
  color: string;
  width: number;
  height: number;
  grosor?: number;
  /** Posición absoluta respecto a la sección contenedora. */
  sx: SxProps<Theme>;
};

/** Garabatos decorativos del diseño. Se ocultan en pantallas angostas (.deco). */
export function Deco({ trazo, color, width, height, grosor = 2.5, sx }: Props) {
  return (
    <Box
      className="deco"
      component="svg"
      aria-hidden="true"
      width={width}
      height={height}
      viewBox={CAJA[trazo]}
      fill="none"
      stroke={color}
      strokeWidth={grosor}
      strokeLinecap="round"
      strokeLinejoin="round"
      sx={{ position: 'absolute', pointerEvents: 'none', ...sx }}
    >
      {TRAZOS[trazo]}
    </Box>
  );
}

/** El corazón relleno, que aparece en el separador y en el hito final. */
export function Corazon({ size = 14, color = colores.marron }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size * (22 / 24)} viewBox="0 0 24 22" aria-hidden="true">
      <path
        d="M12 21S2 14.5 2 7.5A5 5 0 0 1 12 5a5 5 0 0 1 10 2.5C22 14.5 12 21 12 21z"
        fill={color}
      />
    </svg>
  );
}

/** Línea — corazón — línea. */
export function Regla({ ancho = 120 }: { ancho?: number }) {
  return (
    <Box aria-hidden="true" sx={{ display: 'flex', alignItems: 'center', gap: 1.75 }}>
      <Box sx={{ width: ancho, maxWidth: '22vw', height: '1px', bgcolor: colores.regla }} />
      <Corazon />
      <Box sx={{ width: ancho, maxWidth: '22vw', height: '1px', bgcolor: colores.regla }} />
    </Box>
  );
}
