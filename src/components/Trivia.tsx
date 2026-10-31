import { useMemo, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import Typography from '@mui/material/Typography';
import { colores } from '../theme';
import { PREGUNTAS, TRIVIA } from '../config';
import { PaperCard } from './ui/PaperCard';
import { Reveal } from './ui/Reveal';
import { Script } from './ui/Script';
import { SectionHeading } from './ui/SectionHeading';
import { Deco } from './ui/Deco';

const LETRAS = ['A', 'B', 'C', 'D'];
const COLORES_OPCION = ['#F4E3AE', '#F6D3C7', '#D9E4F0', '#E1E7D5'];
const TOTAL = PREGUNTAS.length;

type Paso = 'intro' | 'pregunta' | 'fin';

export type Resultado = { nombre: string; puntaje: number; total: number; terminado: string };

/**
 * Opcional: apuntar a un Google Apps Script (o cualquier endpoint) para registrar
 * los resultados. Mientras sea `null`, el resultado solo se muestra en pantalla.
 */
const alTerminar: ((r: Resultado) => void) | null = null;

function veredicto(puntaje: number, total: number): string {
  if (puntaje === total) return '¡perfecto!';
  if (puntaje >= total * 0.75) return 'casi parte de la familia';
  if (puntaje >= total * 0.5) return '¡nada mal!';
  return '¡hay que salir más con ellos!';
}

const pad = (n: number) => String(n).padStart(2, '0');

export function Trivia() {
  const [paso, setPaso] = useState<Paso>('intro');
  const [nombre, setNombre] = useState('');
  const [indice, setIndice] = useState(0);
  const [puntaje, setPuntaje] = useState(0);
  const [elegida, setElegida] = useState<number | null>(null);
  const [terminadoEn, setTerminadoEn] = useState('');
  const tituloPregunta = useRef<HTMLHeadingElement>(null);
  const botonSiguiente = useRef<HTMLButtonElement>(null);

  const pregunta = PREGUNTAS[indice];
  const respondida = elegida !== null;
  const ultima = indice >= TOTAL - 1;
  const listo = nombre.trim() !== '';

  const intro = useMemo(
    () => (
      <>
        {TOTAL} preguntas sobre los novios. Quien saque más respuestas correctas se lleva{' '}
        <Box component="strong" sx={{ fontWeight: 600, color: colores.tinta }}>
          {TRIVIA.premio}
        </Box>{' '}
        el día del matrimonio.
      </>
    ),
    [],
  );

  function empezar() {
    if (!listo) return;
    setIndice(0);
    setPuntaje(0);
    setElegida(null);
    setPaso('pregunta');
    requestAnimationFrame(() => tituloPregunta.current?.focus());
  }

  function responder(opcion: number) {
    if (respondida) return;
    setElegida(opcion);
    if (opcion === pregunta.c) setPuntaje((p) => p + 1);
    requestAnimationFrame(() => botonSiguiente.current?.focus());
  }

  function siguiente() {
    if (!ultima) {
      setIndice((i) => i + 1);
      setElegida(null);
      requestAnimationFrame(() => tituloPregunta.current?.focus());
      return;
    }

    const ahora = new Date();
    setTerminadoEn(
      `${ahora.toLocaleDateString('es-CL')} ${pad(ahora.getHours())}:${pad(ahora.getMinutes())}`,
    );
    setPaso('fin');
    alTerminar?.({
      nombre: nombre.trim(),
      puntaje,
      total: TOTAL,
      terminado: ahora.toISOString(),
    });
  }

  function reiniciar() {
    setNombre('');
    setIndice(0);
    setPuntaje(0);
    setElegida(null);
    setPaso('intro');
  }

  return (
    <Box component="section" id="trivia" sx={{ position: 'relative', overflow: 'hidden' }}>
      <Deco trazo="estrella" color={colores.coral} width={40} height={40} sx={{ top: 96, left: '9%' }} />
      <Deco trazo="ola" color={colores.azul} width={80} height={20} grosor={3} sx={{ top: 140, right: '10%' }} />
      <Deco trazo="rama" color={colores.salvia} width={70} height={90} sx={{ bottom: 120, left: '7%' }} />
      <Deco trazo="sol" color={colores.oro} width={60} height={60} grosor={4} sx={{ bottom: 160, right: '9%' }} />

      <Box
        sx={{
          position: 'relative',
          maxWidth: 820,
          mx: 'auto',
          px: 3,
          pt: { xs: 9, md: 14 },
          pb: { xs: 10, md: 16 },
          display: 'flex',
          flexDirection: 'column',
          gap: 5,
        }}
      >
        <Box>
          <SectionHeading rotulo="Trivia" titulo="¿Cuánto nos conoces?" />
          <Reveal>
            <Typography
              variant="body1"
              sx={{ mt: 1.25, mx: 'auto', maxWidth: 560, textAlign: 'center', color: colores.texto }}
            >
              {intro}
            </Typography>
          </Reveal>
        </Box>

        {paso === 'intro' && (
          <Reveal>
            <PaperCard sx={{ display: 'flex', flexDirection: 'column', gap: 2.25, p: { xs: 3, sm: 5 } }}>
              <Typography
                component="label"
                htmlFor="nombre-jugador"
                sx={{
                  fontSize: 14,
                  fontWeight: 600,
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  color: colores.apagado,
                }}
              >
                Tu nombre
              </Typography>
              <OutlinedInput
                id="nombre-jugador"
                autoComplete="name"
                placeholder="Ej: Tía Carmen"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') empezar();
                }}
              />
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 2,
                }}
              >
                <Typography variant="body2" sx={{ fontStyle: 'italic', color: colores.texto }}>
                  Una oportunidad por persona. ¡Sin buscar en Instagram!
                </Typography>
                <Button variant="contained" disabled={!listo} onClick={empezar}>
                  Empezar
                </Button>
              </Box>
            </PaperCard>
          </Reveal>
        )}

        {paso === 'pregunta' && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3.5 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: 14,
                  fontWeight: 600,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: colores.apagado,
                }}
              >
                <span>
                  Pregunta {indice + 1} de {TOTAL}
                </span>
                <span>
                  {puntaje} {puntaje === 1 ? 'correcta' : 'correctas'}
                </span>
              </Box>
              <Box sx={{ display: 'flex', gap: 0.75 }} aria-hidden="true">
                {PREGUNTAS.map((_, k) => (
                  <Box
                    key={k}
                    sx={{
                      height: 3,
                      flex: '1 1 0',
                      borderRadius: 1,
                      bgcolor:
                        k < indice ? colores.verdeClaro : k === indice ? colores.oro : '#E6DFD3',
                    }}
                  />
                ))}
              </Box>
            </Box>

            <Typography
              ref={tituloPregunta}
              variant="h3"
              tabIndex={-1}
              sx={{ fontSize: 'clamp(28px, 4.5vw, 44px)', lineHeight: 1.15, outline: 'none' }}
            >
              {pregunta.q}
            </Typography>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: 'minmax(0,1fr)', sm: 'repeat(2, minmax(0,1fr))' },
                gap: 1.5,
              }}
            >
              {pregunta.o.map((texto, k) => {
                const correcta = respondida && k === pregunta.c;
                const fallo = respondida && k === elegida && k !== pregunta.c;
                const apagada = respondida && !correcta && !fallo;

                return (
                  <Button
                    key={texto}
                    onClick={() => responder(k)}
                    disabled={apagada}
                    disableRipple={respondida}
                    sx={{
                      fontFamily: 'inherit',
                      fontSize: 20,
                      fontWeight: 400,
                      textTransform: 'none',
                      letterSpacing: 0,
                      justifyContent: 'flex-start',
                      textAlign: 'left',
                      minHeight: 64,
                      p: '14px 18px',
                      borderRadius: 1,
                      border: '1px solid',
                      borderColor: correcta
                        ? colores.verdeClaro
                        : fallo
                          ? colores.coral
                          : colores.bordeFuerte,
                      bgcolor: correcta
                        ? colores.correcto
                        : fallo
                          ? colores.incorrecto
                          : 'rgba(255,255,255,0.65)',
                      color: colores.tinta,
                      textDecoration: fallo ? 'line-through' : 'none',
                      '&.Mui-disabled': { opacity: 0.45, color: colores.tinta },
                      '&:hover': {
                        bgcolor: correcta
                          ? colores.correcto
                          : fallo
                            ? colores.incorrecto
                            : 'rgba(255,255,255,0.65)',
                        borderColor: respondida ? undefined : colores.marron,
                      },
                    }}
                  >
                    <Box
                      component="span"
                      sx={{
                        flex: '0 0 auto',
                        width: 32,
                        height: 32,
                        mr: 1.75,
                        borderRadius: '50%',
                        bgcolor: COLORES_OPCION[k],
                        color: colores.tinta,
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 16,
                        fontWeight: 600,
                      }}
                    >
                      {LETRAS[k]}
                    </Box>
                    {texto}
                  </Button>
                );
              })}
            </Box>

            {respondida && (
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 2,
                  pt: 1,
                }}
              >
                <Typography role="status" sx={{ fontSize: 22, fontStyle: 'italic' }}>
                  {elegida === pregunta.c
                    ? '¡Correcto!'
                    : `Casi… la respuesta era: ${pregunta.o[pregunta.c]}`}
                </Typography>
                <Button ref={botonSiguiente} variant="contained" onClick={siguiente}>
                  {ultima ? 'Ver resultado' : 'Siguiente'}
                </Button>
              </Box>
            )}
          </Box>
        )}

        {paso === 'fin' && (
          <PaperCard
            sx={{
              borderTop: `4px solid ${colores.oro}`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              gap: 1.75,
            }}
          >
            <Typography
              sx={{
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: colores.apagado,
              }}
            >
              Resultado de {nombre.trim()}
            </Typography>
            <Typography sx={{ fontSize: { xs: 84, sm: 112 }, lineHeight: 0.9 }}>
              {puntaje}
              <Box component="span" sx={{ fontSize: 52, color: colores.marron }}>
                /{TOTAL}
              </Box>
            </Typography>
            <Script size={44}>{veredicto(puntaje, TOTAL)}</Script>
            <Typography variant="body2" sx={{ maxWidth: 480, color: colores.texto }}>
              Saca un pantallazo y muéstraselo a los novios el día del matrimonio. El mejor puntaje
              se lleva el premio; si hay empate, gana quien lo haya terminado primero.
            </Typography>
            <Typography
              sx={{ fontSize: 15, fontWeight: 600, letterSpacing: '0.12em', color: colores.apagado }}
            >
              Completado: {terminadoEn}
            </Typography>
            <Button variant="outlined" onClick={reiniciar} sx={{ mt: 1.5 }}>
              Volver a empezar
            </Button>
          </PaperCard>
        )}
      </Box>
    </Box>
  );
}
