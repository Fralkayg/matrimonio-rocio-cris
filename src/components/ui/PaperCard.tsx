import Paper from '@mui/material/Paper';
import type { PaperProps } from '@mui/material/Paper';
import { colores } from '../../theme';

/** Tarjeta sobre la textura de papel, con el borde fino del diseño. */
export function PaperCard({ sx, className, ...rest }: PaperProps) {
  return (
    <Paper
      className={['paper', className].filter(Boolean).join(' ')}
      sx={{
        border: `1px solid ${colores.borde}`,
        borderRadius: 0,
        p: { xs: 3.5, sm: '48px 40px' },
        ...sx,
      }}
      {...rest}
    />
  );
}
