import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { motion, useReducedMotion } from 'framer-motion';
import { colores } from '../theme';
import { NOVIOS } from '../config';
import { useFecha } from '../hooks/useFecha';
import { Regla } from './ui/Deco';
import { IconoFlecha } from './ui/Iconos';
import { Script } from './ui/Script';
import { CuentaRegresiva } from './ui/CuentaRegresiva';
import ilustracion from '../assets/save-the-date.png';

export function Hero() {
  const fecha = useFecha();
  const quieto = useReducedMotion();

  const entrada = (delay: number) =>
    quieto
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <Box component="section" id="inicio">
      <Box
        sx={{
          maxWidth: 1200,
          mx: 'auto',
          px: 3,
          pt: 9,
          pb: 11,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: 2.5,
        }}
      >
        <motion.div {...entrada(0)}>
          <Typography
            variant="overline"
            sx={{ fontSize: 18, letterSpacing: '0.4em', color: colores.apagado }}
          >
            Nos casamos
          </Typography>
        </motion.div>

        <motion.div {...entrada(0.1)} style={{ width: '100%', maxWidth: 440 }}>
          <Box
            component="img"
            className="paper-img"
            src={ilustracion}
            alt="Ilustración en acuarela de Cristián y Rocío mirándose y sonriendo"
            sx={{ my: -1 }}
          />
        </motion.div>

        <motion.div {...entrada(0.2)}>
          <Typography
            variant="h1"
            sx={{ fontSize: 'clamp(30px, 5vw, 56px)', color: colores.marron }}
          >
            {NOVIOS.titulo}
          </Typography>
        </motion.div>

        <motion.div {...entrada(0.3)}>
          <Regla />
        </motion.div>

        <motion.div {...entrada(0.35)}>
          <Typography
            sx={{
              m: 0,
              fontSize: { xs: 24, sm: 30 },
              fontWeight: 500,
              letterSpacing: '0.3em',
              color: colores.marron,
            }}
          >
            {fecha.corta}
          </Typography>
        </motion.div>

        <motion.div {...entrada(0.42)}>
          <CuentaRegresiva />
        </motion.div>

        <motion.div {...entrada(0.5)}>
          <Script size={44} sx={{ mt: 1 }}>
            ¡nos vemos ahí!
          </Script>
        </motion.div>

        <Link
          href="#invitacion"
          underline="none"
          sx={{
            mt: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1,
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: colores.apagado,
            p: 1,
            '&:hover': { color: colores.verdeOscuro },
          }}
        >
          Desliza
          <IconoFlecha />
        </Link>
      </Box>
    </Box>
  );
}
