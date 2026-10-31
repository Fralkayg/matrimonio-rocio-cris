import Typography from '@mui/material/Typography';
import type { TypographyProps } from '@mui/material/Typography';
import { colores, cursiva } from '../../theme';

type Props = TypographyProps & { size?: number | string };

/** El trazo coral manuscrito (Sacramento) que acompaña a cada título. */
export function Script({ size = 40, sx, ...rest }: Props) {
  return (
    <Typography
      component="p"
      sx={{
        m: 0,
        fontFamily: cursiva,
        fontSize: size,
        lineHeight: 1.1,
        color: colores.coral,
        ...sx,
      }}
      {...rest}
    />
  );
}
