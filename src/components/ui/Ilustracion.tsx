import Box from '@mui/material/Box';
import type { SxProps, Theme } from '@mui/material/styles';

type Props = {
  src: string;
  /** Ancho máximo en píxeles. La altura sale sola. */
  ancho: number;
  /**
   * Solo para las pocas ilustraciones que aportan algo que el texto no dice.
   * Por omisión van como decorativas, porque el título de al lado ya las nombra.
   */
  alt?: string;
  sx?: SxProps<Theme>;
};

/**
 * Acuarela sobre el papel.
 *
 * A diferencia del dibujo del hero, estos PNG vienen con el borde difuminado en
 * alfa, así que se apoyan solos sobre la textura. No llevan el `multiply` ni la
 * máscara radial de `paper-img`: ahí los apaga, y al de regalos lo borraba
 * entero.
 */
export function Ilustracion({ src, ancho, alt = '', sx }: Props) {
  return (
    <Box sx={{ width: '100%', maxWidth: ancho, ...sx }}>
      <Box
        component="img"
        src={src}
        alt={alt}
        aria-hidden={alt === '' ? true : undefined}
        decoding="async"
        sx={{ display: 'block', width: '100%', height: 'auto' }}
      />
    </Box>
  );
}
