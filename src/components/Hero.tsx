import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { motion, useReducedMotion } from 'framer-motion';
import { colores } from '../theme';
import { NOVIOS } from '../config';
import { useFecha } from '../hooks/useFecha';
import { Deco, Regla } from './ui/Deco';
import { IconoFlecha } from './ui/Iconos';
import { Script } from './ui/Script';
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
    <Box component="section" id="inicio" sx={{ position: 'relative', overflow: 'hidden' }}>
      <Deco trazo="sol" color={colores.oro} width={96} height={96} grosor={3} sx={{ top: 64, left: '8%' }} />
      <Deco trazo="rama" color={colores.salvia} width={70} height={90} sx={{ top: 120, right: '9%' }} />
      <Deco trazo="ola" color={colores.azul} width={80} height={20} grosor={3} sx={{ bottom: 180, left: '10%' }} />
      <Deco trazo="estrella" color={colores.coral} width={40} height={40} sx={{ bottom: 230, right: '12%' }} />

      <Box
        sx={{
          position: 'relative',
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

        <motion.div {...entrada(0.45)}>
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
