import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { colores } from '../../theme';
import { useCuentaRegresiva } from '../../hooks/useCuentaRegresiva';

/** Plural sin la "(s)" entre paréntesis. */
const plural = (n: number, uno: string, varios: string) => (n === 1 ? uno : varios);

function Unidad({ valor, etiqueta }: { valor: number; etiqueta: string }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 0.5,
        minWidth: { xs: 56, sm: 76 },
      }}
    >
      <Typography
        sx={{
          fontSize: { xs: 32, sm: 44 },
          fontWeight: 400,
          lineHeight: 1,
          // Tabular, para que los números no bailen al cambiar.
          fontVariantNumeric: 'tabular-nums',
          color: colores.marron,
        }}
      >
        {String(valor).padStart(2, '0')}
      </Typography>
      <Typography
        sx={{
          fontSize: { xs: 11, sm: 12 },
          fontWeight: 600,
          letterSpacing: '0.26em',
          textTransform: 'uppercase',
          color: colores.apagado,
        }}
      >
        {etiqueta}
      </Typography>
    </Box>
  );
}

function Separador() {
  return (
    <Box
      aria-hidden="true"
      sx={{ width: '1px', alignSelf: 'stretch', mb: 2.5, bgcolor: colores.regla }}
    />
  );
}

/**
 * Cuenta regresiva viva bajo la fecha del hero. Se aísla en su propio componente
 * para que el tic de cada segundo no vuelva a renderizar todo el hero.
 */
export function CuentaRegresiva() {
  const { dias, horas, minutos, terminado } = useCuentaRegresiva();

  if (terminado) {
    return (
      <Typography
        sx={{
          fontSize: { xs: 16, sm: 18 },
          fontWeight: 600,
          letterSpacing: '0.24em',
          textTransform: 'uppercase',
          color: colores.verdeClaro,
        }}
      >
        ¡Ya nos casamos!
      </Typography>
    );
  }

  const resumen = `Faltan ${dias} ${plural(dias, 'día', 'días')}, ${horas} ${plural(
    horas,
    'hora',
    'horas',
  )} y ${minutos} ${plural(minutos, 'minuto', 'minutos')}.`;

  return (
    <Box role="timer" aria-label={resumen}>
      {/* Los números cambian cada segundo: se esconden del lector de pantalla,
          que recibe el resumen de arriba una sola vez. */}
      <Box
        aria-hidden="true"
        sx={{ display: 'flex', alignItems: 'stretch', gap: { xs: 1.5, sm: 2.5 } }}
      >
        <Unidad valor={dias} etiqueta={plural(dias, 'día', 'días')} />
        <Separador />
        <Unidad valor={horas} etiqueta={plural(horas, 'hora', 'horas')} />
        <Separador />
        <Unidad valor={minutos} etiqueta={plural(minutos, 'minuto', 'minutos')} />
      </Box>
    </Box>
  );
}
