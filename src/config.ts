/**
 * Único lugar donde se edita el contenido del sitio.
 * Los textos entre [corchetes] son los que todavía faltan por completar.
 */

import anillo from './assets/anillo-a.png';
import fiesta from './assets/fiesta-a.png';
import auto from './assets/auto-c.png';
import comida from './assets/comida-a.png';
import regalos from './assets/regalos-c.png';

/** Día del matrimonio. Alimenta la fecha larga, el 30 . 01 . 27 y los días que faltan. */
export const FECHA_MATRIMONIO = '2027-01-30';

/**
 * Momento exacto en que empieza la ceremonia, para la cuenta regresiva.
 * El huso va explícito (Chile en verano, UTC−3) para que la cuenta sea la misma
 * se mire el sitio desde donde se mire.
 */
export const INICIO_CEREMONIA = '2027-01-30T18:00:00-03:00';

/** Fecha límite para confirmar asistencia. */
export const FECHA_LIMITE_RSVP = '2026-12-10';

export const NOVIOS = {
  titulo: 'Cristián & Rocío',
  firma: 'Rocío & Cristián',
  iniciales: 'C & R',
  creditos: '[sus amigos]',
} as const;

const MAPS_FUNDO =
  'https://www.google.com/maps/search/?api=1&query=Fundo+Los+C%C3%B3ndores+Cam.+Padre+Hurtado+18380+San+Bernardo';

export const LUGAR = {
  nombre: 'Fundo Los Cóndores',
  direccion: 'Cam. Padre Hurtado 18380, San Bernardo, Región Metropolitana',
  maps: MAPS_FUNDO,
} as const;

export type Hito = {
  rotulo: string;
  titulo: string;
  texto: string;
  hora?: string;
  lugar: string;
  nota?: string;
  maps: string;
  imagen: string;
};

/** Las dos tarjetas de "El gran día". Ceremonia y fiesta son en el mismo fundo. */
export const MOMENTOS: Hito[] = [
  {
    rotulo: 'el sí',
    titulo: 'Ceremonia',
    texto: 'Ceremonia religiosa',
    hora: '18:00 h',
    lugar: LUGAR.nombre,
    nota: 'Llegada desde las 17:30 h. La ceremonia comienza a las 18:00 en punto, así que les sugerimos llegar unos 30 minutos antes.',
    maps: MAPS_FUNDO,
    imagen: anillo,
  },
  {
    rotulo: '¡a celebrar!',
    titulo: 'Fiesta',
    texto: 'A continuación',
    lugar: LUGAR.nombre,
    nota: 'En el mismo fundo, a solo pasos de la parroquia. No hay que moverse de lugar.',
    maps: MAPS_FUNDO,
    imagen: fiesta,
  },
];

export const VESTIMENTA = {
  script: '¡prepara tu mejor pinta!',
  titulo: 'Formal',
  detalle: 'Queremos darle un ambiente formal a nuestro matrimonio.',
  /** Se muestra aparte, porque es la única petición concreta. */
  nota: 'Les pedimos reservar el color blanco exclusivamente para la novia.',
} as const;

export const RSVP = {
  formulario: 'https://forms.gle/zzHPbDfa9Wk4y7Nw5',
  limite: '10 de diciembre',
  instruccion: 'Por favor confirmen indicando el nombre de todos los asistentes.',
  soloAdultos: 'Celebración solo para adultos',
} as const;

export const REGALOS = {
  texto:
    'Lo más importante para nosotros es contar con su compañía en este día tan especial. Si además de su presencia desean hacernos un regalo, está habilitado nuestro link de novios Falabella.',
  link: 'https://novios.falabella.com/info-evento/evento?codigoEvento=2106243&ref=search',
  codigo: '2106243',
  imagen: regalos,
} as const;

export type Detalle = {
  id: string;
  imagen: string;
  rotulo: string;
  titulo: string;
  texto: string;
};

export const DETALLES: Detalle[] = [
  {
    id: 'estacionamiento',
    imagen: auto,
    rotulo: 'Estacionamiento',
    titulo: 'Llegar y volver tranquilos',
    texto:
      'El lugar cuenta con estacionamientos disponibles. Pero si vas a tomar, recomendamos venir en Uber: queremos que todos lleguen bien a sus casas.',
  },
  {
    id: 'alergias',
    imagen: comida,
    rotulo: 'Alergias',
    titulo: 'Cuéntanos qué no puedes comer',
    texto:
      'Si tienes alguna alergia, intolerancia o restricción alimentaria, nos ayudaría mucho que nos lo hicieras saber al confirmar tu asistencia. Queremos que disfruten este día sin restricciones.',
  },
];

export type Pregunta = { q: string; o: string[]; c: number };

/** c = índice de la respuesta correcta (0 = primera opción). Reemplazar los [placeholders]. */
export const PREGUNTAS: Pregunta[] = [
  { q: '¿Dónde se conocieron Cristián y Rocío?', o: ['[Lugar A]', '[Lugar B]', '[Lugar C]', '[Lugar D]'], c: 0 },
  { q: '¿En qué año empezaron a pololear?', o: ['[Año A]', '[Año B]', '[Año C]', '[Año D]'], c: 0 },
  { q: '¿Quién dio el primer paso?', o: ['Cristián', 'Rocío', 'Un amigo en común', 'Fue mutuo'], c: 0 },
  { q: '¿Cuál fue su primer viaje juntos?', o: ['[Destino A]', '[Destino B]', '[Destino C]', '[Destino D]'], c: 0 },
  { q: '¿Dónde fue la propuesta de matrimonio?', o: ['[Lugar A]', '[Lugar B]', '[Lugar C]', '[Lugar D]'], c: 0 },
  { q: '¿Cuál es la comida favorita de los dos?', o: ['[Comida A]', '[Comida B]', '[Comida C]', '[Comida D]'], c: 0 },
  { q: '¿Quién es más probable que llegue tarde?', o: ['Cristián', 'Rocío', 'Los dos, siempre', 'Ninguno, son puntuales'], c: 0 },
  { q: '¿Qué serie vieron juntos de principio a fin?', o: ['[Serie A]', '[Serie B]', '[Serie C]', '[Serie D]'], c: 0 },
];

export const TRIVIA = { premio: '[el premio sorpresa]' } as const;

export type Capitulo = { rotulo: string; titulo: string; texto: string; foto: string };

/** Línea de tiempo de "Nuestra historia". El último hito se agrega aparte en el componente. */
export const HISTORIA: Capitulo[] = [
  {
    rotulo: '[AÑO]',
    titulo: '¡Hola!',
    texto:
      'Todo empezó de la forma más inesperada, en [lugar donde se conocieron]. Ninguno de los dos se imaginaba lo que venía.',
    foto: 'Foto · el lugar donde se conocieron',
  },
  {
    rotulo: '[AÑO]',
    titulo: 'La primera cita',
    texto:
      'Fue en [lugar de la primera cita]. Conversaron hasta que [los echaron / cerraron el local] y ya no hubo vuelta atrás.',
    foto: 'Foto · primera salida juntos',
  },
  {
    rotulo: '[MES, AÑO]',
    titulo: 'Pololeando',
    texto:
      'Se hizo oficial. Desde entonces son inseparables y nunca falta [algo que siempre hacen juntos].',
    foto: 'Foto · los primeros meses',
  },
  {
    rotulo: '[AÑO]',
    titulo: 'El primer viaje',
    texto:
      '[Destino]: mochilas, mapas y la primera gran prueba de convivencia. La pasaron con nota máxima.',
    foto: 'Foto · el primer viaje',
  },
  {
    rotulo: '[AÑO]',
    titulo: 'Nuestro hogar',
    texto:
      'Se fueron a vivir juntos a [comuna o ciudad], con [la mascota / las plantas / lo primero que compraron].',
    foto: 'Foto · su casa',
  },
  {
    rotulo: '[AÑO]',
    titulo: 'La gran pregunta',
    texto: 'En [lugar de la propuesta] llegó la pregunta más importante. La respuesta ya la conocen.',
    foto: 'Foto · la propuesta',
  },
];

export const NAV = [
  // { href: '#historia', label: 'Historia' },
  { href: '#fechas', label: 'El gran día' },
  { href: '#detalles', label: 'Detalles' },
  { href: '#confirmar', label: 'Confirmar' },
  // { href: '#trivia', label: 'Trivia' },
] as const;
