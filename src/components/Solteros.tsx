import { useCallback, useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import Link from '@mui/material/Link';
import OutlinedInput from '@mui/material/OutlinedInput';
import Typography from '@mui/material/Typography';
import InstagramIcon from '@mui/icons-material/Instagram';
import { colores } from '../theme';
import { SOLTEROS } from '../config';
import {
  MAX_MENSAJE,
  MAX_NOMBRE,
  chatConectado,
  enviarMensaje,
  listarMensajes,
  urlInstagram,
  usuarioInstagram,
  type Mensaje,
} from '../lib/solteros';
import { PaperCard } from './ui/PaperCard';
import { SectionHeading } from './ui/SectionHeading';

/** Se recuerdan nombre e Instagram para no pedirlos en cada mensaje y para marcar los propios. */
const CLAVE_NOMBRE = 'solteros:nombre';
const CLAVE_INSTAGRAM = 'solteros:instagram';

function leer(clave: string): string {
  try {
    return localStorage.getItem(clave) ?? '';
  } catch {
    return '';
  }
}

function guardar(clave: string, valor: string) {
  try {
    localStorage.setItem(clave, valor);
  } catch {
    // Modo privado o almacenamiento bloqueado: solo se pierde la comodidad.
  }
}

const formatoFecha = new Intl.DateTimeFormat('es-CL', {
  day: 'numeric',
  month: 'short',
  hour: '2-digit',
  minute: '2-digit',
});

const rotuloCampo = {
  fontSize: 14,
  fontWeight: 600,
  letterSpacing: '0.3em',
  textTransform: 'uppercase',
  color: colores.apagado,
} as const;

/**
 * Lista de solteros: un chat abierto donde los invitados que vienen sin pareja
 * se presentan. Los mensajes viven en una planilla de Google (ver
 * apps-script/solteros.gs) y se refrescan solos mientras la página está abierta.
 */
export function Solteros() {
  const [mensajes, setMensajes] = useState<Mensaje[] | null>(null);
  const [errorCarga, setErrorCarga] = useState(false);
  const [nombre, setNombre] = useState(() => leer(CLAVE_NOMBRE));
  const [instagram, setInstagram] = useState(() => leer(CLAVE_INSTAGRAM));
  const [texto, setTexto] = useState('');
  const [trampa, setTrampa] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [errorEnvio, setErrorEnvio] = useState(false);
  const lista = useRef<HTMLDivElement>(null);

  const cargar = useCallback(async () => {
    try {
      setMensajes(await listarMensajes());
      setErrorCarga(false);
    } catch {
      setErrorCarga(true);
    }
  }, []);

  useEffect(() => {
    if (!chatConectado) return;
    cargar();
    // Solo se pregunta mientras la pestaña está a la vista.
    const id = window.setInterval(() => {
      if (document.visibilityState === 'visible') cargar();
    }, SOLTEROS.refrescoMs);
    return () => window.clearInterval(id);
  }, [cargar]);

  // Como en cualquier chat, la lista queda abajo, en lo último.
  useEffect(() => {
    const el = lista.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [mensajes?.length]);

  async function enviar(e: FormEvent) {
    e.preventDefault();
    const n = nombre.trim();
    const m = texto.trim();
    const ig = usuarioInstagram(instagram);
    if (!n || !m || ig === null || enviando) return;

    setEnviando(true);
    setErrorEnvio(false);
    try {
      await enviarMensaje({
        nombre: n,
        mensaje: m,
        instagram: ig,
        sitio: trampa,
      });
      guardar(CLAVE_NOMBRE, n);
      guardar(CLAVE_INSTAGRAM, ig);
      setInstagram(ig);
      setTexto('');
      // Se muestra de inmediato; la próxima carga trae la versión guardada.
      setMensajes((prev) => [
        ...(prev ?? []),
        {
          fecha: new Date().toISOString(),
          nombre: n,
          mensaje: m,
          instagram: ig,
        },
      ]);
      cargar();
    } catch {
      setErrorEnvio(true);
    } finally {
      setEnviando(false);
    }
  }

  const propio = leer(CLAVE_NOMBRE).trim().toLowerCase();
  const instagramInvalido = usuarioInstagram(instagram) === null;

  return (
    <Box component="section" id="solteros">
      <Box
        sx={{
          maxWidth: 760,
          mx: 'auto',
          px: 3,
          pt: { xs: 7, md: 11 },
          pb: { xs: 9, md: 13 },
        }}
      >
        <SectionHeading
          rotulo="Lista de solteros"
          titulo="¿Vienes sin pareja?"
          script="aquí se arma la mesa más entretenida"
        />
        <Typography
          variant="body1"
          sx={{ mt: 3, mb: 5, textAlign: 'center', color: colores.texto }}
        >
          Preséntate: cuéntanos quién eres, de dónde nos conoces y algo que no se pueda saber por
          Instagram. Todos los invitados pueden leer lo que escribas acá… y quién sabe.
        </Typography>

        {!chatConectado ? (
          <PaperCard sx={{ textAlign: 'center' }}>
            <Typography sx={{ fontStyle: 'italic', color: colores.texto }}>
              El chat se abre muy pronto. ¡Vuelve en unos días!
            </Typography>
          </PaperCard>
        ) : (
          <PaperCard sx={{ p: 0 }}>
            <Box
              ref={lista}
              role="log"
              aria-live="polite"
              aria-label="Mensajes de la lista de solteros"
              sx={{
                height: { xs: 420, sm: 480 },
                overflowY: 'auto',
                p: { xs: 2, sm: 3 },
                display: 'flex',
                flexDirection: 'column',
                gap: 1.5,
                borderBottom: `1px solid ${colores.borde}`,
              }}
            >
              {mensajes === null && !errorCarga && (
                <Typography
                  sx={{
                    m: 'auto',
                    fontStyle: 'italic',
                    color: colores.apagado,
                  }}
                >
                  Cargando mensajes…
                </Typography>
              )}
              {errorCarga && mensajes === null && (
                <Typography
                  sx={{
                    m: 'auto',
                    fontStyle: 'italic',
                    color: colores.apagado,
                  }}
                >
                  No pudimos cargar los mensajes. Prueba recargando la página.
                </Typography>
              )}
              {mensajes?.length === 0 && (
                <Typography
                  sx={{
                    m: 'auto',
                    fontStyle: 'italic',
                    color: colores.apagado,
                  }}
                >
                  Todavía no hay nadie. ¡Rompe el hielo!
                </Typography>
              )}
              {mensajes?.map((m, i) => {
                const mio = propio !== '' && m.nombre.trim().toLowerCase() === propio;
                return (
                  <Box
                    key={`${m.fecha}-${i}`}
                    sx={{
                      alignSelf: mio ? 'flex-end' : 'flex-start',
                      maxWidth: '85%',
                      px: 2,
                      py: 1.25,
                      borderRadius: mio ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                      background: mio ? colores.correcto : '#FFFFFF',
                      border: `1px solid ${colores.borde}`,
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        gap: 1.5,
                        alignItems: 'baseline',
                        flexWrap: 'wrap',
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: 16,
                          fontWeight: 600,
                          color: colores.verdeOscuro,
                        }}
                      >
                        {m.nombre}
                      </Typography>
                      <Typography sx={{ fontSize: 13, color: colores.apagado }}>
                        {formatoFecha.format(new Date(m.fecha))}
                      </Typography>
                    </Box>
                    {m.instagram && (
                      <Link
                        href={urlInstagram(m.instagram)}
                        target="_blank"
                        rel="noopener noreferrer"
                        underline="hover"
                        aria-label={`Seguir a ${m.nombre} en Instagram (@${m.instagram})`}
                        sx={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 0.5,
                          mb: 0.25,
                          fontSize: 15,
                          color: colores.coral,
                        }}
                      >
                        <InstagramIcon sx={{ fontSize: 18 }} />@{m.instagram}
                      </Link>
                    )}
                    <Typography
                      sx={{
                        fontSize: 18,
                        lineHeight: 1.45,
                        color: colores.tinta,
                        whiteSpace: 'pre-wrap',
                        overflowWrap: 'anywhere',
                      }}
                    >
                      {m.mensaje}
                    </Typography>
                  </Box>
                );
              })}
            </Box>

            <Box
              component="form"
              onSubmit={enviar}
              sx={{
                p: { xs: 2, sm: 3 },
                display: 'flex',
                flexDirection: 'column',
                gap: 1.5,
              }}
            >
              <Typography component="label" htmlFor="solteros-nombre" sx={rotuloCampo}>
                Tu nombre
              </Typography>
              <OutlinedInput
                id="solteros-nombre"
                autoComplete="name"
                placeholder="Ej: Primo Joaquín"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                inputProps={{ maxLength: MAX_NOMBRE }}
              />
              <Typography
                component="label"
                htmlFor="solteros-instagram"
                sx={{ ...rotuloCampo, mt: 1 }}
              >
                Tu Instagram{' '}
                <Box
                  component="span"
                  sx={{
                    letterSpacing: '0.1em',
                    textTransform: 'none',
                    fontWeight: 400,
                    fontStyle: 'italic',
                  }}
                >
                  (opcional, para que te sigan)
                </Box>
              </Typography>
              <OutlinedInput
                id="solteros-instagram"
                autoComplete="off"
                autoCapitalize="none"
                spellCheck={false}
                placeholder="usuario"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                // Si pegaron el link del perfil, al salir del campo queda solo el usuario.
                onBlur={() => setInstagram((v) => usuarioInstagram(v) ?? v)}
                sx={{ '& input': { pl: 0.5 } }}
                error={instagramInvalido}
                inputProps={{
                  maxLength: 80,
                  'aria-describedby': 'solteros-instagram-ayuda',
                }}
                startAdornment={
                  <InputAdornment position="start" sx={{ color: colores.apagado, mr: 0 }}>
                    <InstagramIcon sx={{ mr: 0.5 }} />@
                  </InputAdornment>
                }
              />
              {instagramInvalido && (
                <Typography
                  id="solteros-instagram-ayuda"
                  variant="body2"
                  sx={{ color: colores.coral, fontStyle: 'italic' }}
                >
                  Eso no parece un usuario de Instagram: solo letras, números, puntos y guiones
                  bajos.
                </Typography>
              )}
              <Typography
                component="label"
                htmlFor="solteros-mensaje"
                sx={{ ...rotuloCampo, mt: 1 }}
              >
                Tu mensaje
              </Typography>
              <OutlinedInput
                id="solteros-mensaje"
                multiline
                minRows={3}
                placeholder="Hola, soy…"
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
                inputProps={{ maxLength: MAX_MENSAJE }}
                sx={{ py: 1.5, '& textarea': { minHeight: 0, px: 0.25 } }}
              />
              {/* Campo trampa para bots: fuera de la pantalla y fuera del tab. */}
              <Box
                component="input"
                name="sitio"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden
                value={trampa}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setTrampa(e.target.value)}
                sx={{
                  position: 'absolute',
                  left: -9999,
                  width: 1,
                  height: 1,
                  opacity: 0,
                }}
              />
              <Box
                sx={{
                  mt: 1,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 2,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    fontStyle: 'italic',
                    color: errorEnvio ? colores.coral : colores.texto,
                  }}
                >
                  {errorEnvio
                    ? 'No se pudo enviar. Revisa tu conexión e inténtalo de nuevo.'
                    : `${texto.length}/${MAX_MENSAJE}`}
                </Typography>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={enviando || !nombre.trim() || !texto.trim() || instagramInvalido}
                >
                  {enviando ? 'Enviando…' : 'Enviar'}
                </Button>
              </Box>
            </Box>
          </PaperCard>
        )}
      </Box>
    </Box>
  );
}
