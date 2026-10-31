import Box from '@mui/material/Box';
import { colores } from '../../theme';

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
