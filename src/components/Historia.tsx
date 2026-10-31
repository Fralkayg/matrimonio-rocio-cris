import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { colores } from '../theme';
import { HISTORIA } from '../config';
import { useFecha } from '../hooks/useFecha';
import { Corazon } from './ui/Deco';
import { IconoFoto } from './ui/Iconos';
import { Reveal } from './ui/Reveal';
import { SectionHeading } from './ui/SectionHeading';

/** Hueco gris donde irá cada foto. */
function Foto({ pie }: { pie: string }) {
  return (
    <Box
      sx={{
        aspectRatio: '4 / 3',
        background: 'rgba(120,100,70,0.06)',
        border: '1px solid #E2DBCF',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1.25,
        color: colores.apagado,
        fontSize: 17,
        fontStyle: 'italic',
        textAlign: 'center',
        px: 2,
      }}
    >
      <IconoFoto />
      {pie}
    </Box>
  );
}

/** El círculo numerado sobre la línea vertical. */
function Punto({ children, final = false }: { children?: ReactNode; final?: boolean }) {
  return (
    <Box className="tl-dot">
      <Box
        className={final ? undefined : 'paper'}
        sx={{
          width: final ? 48 : 40,
          height: final ? 48 : 40,
          borderRadius: '50%',
          border: final ? 'none' : `1px solid ${colores.marron}`,
          bgcolor: final ? colores.marron : undefined,
          color: final ? '#FFFFFF' : colores.apagado,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 17,
          fontWeight: 600,
          boxShadow: `0 0 0 10px ${colores.papel}`,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

type TextoProps = { rotulo: ReactNode; titulo: string; children: ReactNode };

function Texto({ rotulo, titulo, children }: TextoProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
      <Typography
        sx={{
          m: 0,
          fontSize: 15,
          fontWeight: 600,
          letterSpacing: '0.3em',
          color: colores.verdeClaro,
        }}
      >
        {rotulo}
      </Typography>
      <Typography variant="h3" sx={{ fontSize: { xs: 36, sm: 46 } }}>
        {titulo}
      </Typography>
      <Typography variant="body1" sx={{ color: colores.texto }}>
        {children}
      </Typography>
    </Box>
  );
}

export function Historia() {
  const fecha = useFecha();

  return (
    <Box
      component="section"
      id="historia"
      sx={{ maxWidth: 1160, mx: 'auto', px: 3, pt: { xs: 9, md: 12 }, pb: { xs: 10, md: 16 } }}
    >
      <SectionHeading
        rotulo="Sobre nosotros"
        titulo="Nuestra historia"
        script="cómo empezó todo"
        mb={12}
      />

      <Box className="tl-wrap">
        <Box className="tl-line" aria-hidden="true" />

        {HISTORIA.map((cap, i) => (
          <Box
            key={cap.titulo}
            component="article"
            className={`tl-item${i % 2 === 1 ? ' flip' : ''}`}
          >
            <Reveal className="tl-text">
              <Texto rotulo={cap.rotulo} titulo={cap.titulo}>
                {cap.texto}
              </Texto>
            </Reveal>
            <Punto>{i + 1}</Punto>
            <Reveal className="tl-photo" delay={0.1}>
              <Foto pie={cap.foto} />
            </Reveal>
          </Box>
        ))}

        {/* Último hito: el matrimonio mismo. */}
        <Box
          component="article"
          className={`tl-item${HISTORIA.length % 2 === 1 ? ' flip' : ''}`}
        >
          <Reveal className="tl-text">
            <Texto rotulo={fecha.corta} titulo="¡Nos casamos!">
              El próximo capítulo lo escribimos con ustedes.{' '}
              <Link href="#fechas" sx={{ fontWeight: 600 }}>
                Ver los detalles del día
              </Link>
            </Texto>
          </Reveal>
          <Punto final>
            <Corazon size={18} color="currentColor" />
          </Punto>
          <Reveal className="tl-photo" delay={0.1}>
            <Foto pie="Foto · sesión de novios" />
          </Reveal>
        </Box>
      </Box>
    </Box>
  );
}
