import { EVENTO, SITIO_URL } from '../config';

/** `2027-01-30T17:30:00-03:00` → `20270130T203000Z`. */
function aUtc(iso: string): string {
  return new Date(iso).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
}

/** En un campo TEXT de iCalendar hay que escapar `\`, `;`, `,` y los saltos de línea. */
function escapar(texto: string): string {
  return texto
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\r?\n/g, '\\n');
}

/**
 * RFC 5545 pide líneas de 75 octetos como máximo; las que siguen van con un
 * espacio al principio. Se cuenta en bytes porque los acentos ocupan dos.
 */
function plegar(linea: string): string {
  const bytes = new TextEncoder().encode(linea);
  if (bytes.length <= 75) return linea;

  const partes: string[] = [];
  let actual = '';
  let largo = 0;

  for (const char of linea) {
    const ancho = new TextEncoder().encode(char).length;
    // 74 dentro de cada línea: el espacio inicial de la continuación cuenta.
    if (largo + ancho > (partes.length === 0 ? 75 : 74)) {
      partes.push(actual);
      actual = '';
      largo = 0;
    }
    actual += char;
    largo += ancho;
  }
  partes.push(actual);

  return partes.map((p, i) => (i === 0 ? p : ` ${p}`)).join('\r\n');
}

/** El archivo .ics que entienden Apple Calendar, Outlook y el resto. */
export function construirIcs(): string {
  const lineas = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Rocio y Cristian//Matrimonio//ES',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:matrimonio-rocio-cristian-${aUtc(EVENTO.inicio)}@fralkayg.github.io`,
    `DTSTAMP:${aUtc(new Date().toISOString())}`,
    `DTSTART:${aUtc(EVENTO.inicio)}`,
    `DTEND:${aUtc(EVENTO.fin)}`,
    `SUMMARY:${escapar(EVENTO.titulo)}`,
    `LOCATION:${escapar(EVENTO.lugar)}`,
    `DESCRIPTION:${escapar(`${EVENTO.descripcion}\n\n${SITIO_URL}`)}`,
    `URL:${SITIO_URL}`,
    'STATUS:CONFIRMED',
    'TRANSP:OPAQUE',
    'BEGIN:VALARM',
    'TRIGGER:-P1D',
    'ACTION:DISPLAY',
    `DESCRIPTION:${escapar(`¡Mañana es el gran día! ${EVENTO.titulo}`)}`,
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ];

  // iCalendar exige CRLF, no solo \n.
  return lineas.map(plegar).join('\r\n') + '\r\n';
}

/** El enlace que abre Google Calendar con el evento ya cargado. */
export function urlGoogleCalendar(): string {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: EVENTO.titulo,
    details: `${EVENTO.descripcion}\n\n${SITIO_URL}`,
    location: EVENTO.lugar,
  });
  // `dates` va fuera del URLSearchParams: su barra separadora no debe escaparse.
  const fechas = `${aUtc(EVENTO.inicio)}/${aUtc(EVENTO.fin)}`;
  return `https://calendar.google.com/calendar/render?${params.toString()}&dates=${fechas}`;
}

/** Baja el .ics como archivo. Se revoca el object URL para no filtrar memoria. */
export function descargarIcs(nombre = 'matrimonio-rocio-cristian.ics'): void {
  const blob = new Blob([construirIcs()], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = nombre;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
