import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { colores } from '../../theme';
import { Script } from './Script';
import { Reveal } from './Reveal';

type Props = {
  /** Rótulo pequeño en mayúsculas. */
  rotulo: string;
  /** Título grande en cursiva. */
  titulo: string;
  /** Línea manuscrita opcional bajo el título. */
  script?: string;
  mb?: number;
};

export function SectionHeading({ rotulo, titulo, script, mb = 0 }: Props) {
  return (
    <Reveal>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: 1.25,
          mb,
        }}
      >
        <Typography variant="overline" sx={{ color: colores.apagado }}>
          {rotulo}
        </Typography>
        <Typography variant="h2" sx={{ fontSize: 'clamp(42px, 7vw, 80px)' }}>
          {titulo}
        </Typography>
        {script && <Script sx={{ mt: 0.75 }}>{script}</Script>}
      </Box>
    </Reveal>
  );
}
