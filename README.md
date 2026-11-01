# Rocío & Cristián — sitio del matrimonio

Sitio de una página para el matrimonio del **30 de enero de 2027** en el Fundo Los Cóndores,
San Bernardo. Reconstruye el archivo de diseño (`design-assets/Cristian-Rocio-diseno.pdf`) y usa
los datos reales del documento de contenido (`design-assets/content.pdf`).

## Stack

| Pieza | Para qué |
|---|---|
| **React 19 + TypeScript** | Componentes y contenido tipado (`src/config.ts`) |
| **Material UI 7** (`sx`, tema) | Tipografía, botones, inputs, rejillas y paleta en un solo lugar |
| **CSS plano** (`src/styles/`) | `@font-face`, la textura de papel y la rejilla de la línea de tiempo |
| **Vite 7** | Dev server con HMR y build de producción (recomendación extra) |
| **Framer Motion 12** | Apariciones al hacer scroll, respetando `prefers-reduced-motion` (recomendación extra) |

Las dos recomendaciones añadidas son **Vite** (el diseño no traía build; sin uno no hay TS ni JSX)
y **Framer Motion**, porque el diseño es largo y vertical y una aparición suave por sección lo
sostiene mucho mejor que el scroll en seco.

### Por qué MUI *y* CSS

MUI lleva lo que se repite y lo que tiene estado (tema, tipografía, botones, el input y los estados
de la trivia). El CSS lleva las tres cosas que en `sx` quedarían peor: las `@font-face`, el
`background-image` de papel y la rejilla de tres columnas de la línea de tiempo con su `flip` por
ítem y su colapso a una columna en 760 px.

## Correr el proyecto

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # a dist/
npm run preview    # revisa el build
npm run typecheck
```

## Estructura

```
index.html               ← la portada
solteros/index.html      ← la página «Lista de solteros» (/solteros/)
apps-script/solteros.gs  ← el backend del chat de solteros (corre en Google, no en el sitio)
src/
  config.ts              ← TODO el contenido editable (fechas, lugar, links, trivia, historia)
  theme.ts               ← paleta y tipografía del diseño
  hooks/useFecha.ts       ← fecha larga, 30 . 01 . 27 y la cuenta regresiva
  lib/calendario.ts       ← genera el .ics y el link de Google Calendar
  lib/solteros.ts         ← lee y envía los mensajes del chat de solteros
  styles/                 ← fuentes + papel + rejilla de la línea de tiempo
  components/
    Nav, Hero, Invitacion, Historia, GranDia, Detalles, Rsvp, Trivia, Solteros, Footer
    ui/                   ← Reveal, SectionHeading, PaperCard, Script, Deco, Iconos, ReproductorCancion
```

## Qué cambió respecto al diseño original

El diseño traía placeholders que el documento de contenido ya resuelve, y pedía cosas que el
contenido no contempla. Los cambios:

**Agregado**

- **Invitación** (`#invitacion`): el texto de apertura, entre el hero y la historia.
- **El lugar**, sobre las dos tarjetas de "El gran día": Fundo Los Cóndores y su dirección, porque
  la ceremonia y la fiesta son en el mismo sitio.
- **Detalles** (`#detalles`): estacionamiento (y la recomendación de Uber), alergias y
  restricciones alimentarias, y la mesa de novios Falabella con su código de evento.
- **Confirmar** (`#confirmar`): el formulario de RSVP, la fecha límite del 10 de diciembre y el
  aviso de celebración solo para adultos.
- Dos ítems más en el menú (`Detalles`, `Confirmar`).

**Quitado / cambiado**

- Las dos tarjetas ya **no tienen direcciones distintas**. La de ceremonia muestra las 18:00 con la
  nota de llegada a las 17:30; la de fiesta dice "a continuación, en el mismo fundo, a pasos de la
  parroquia". Los dos botones *Cómo llegar* apuntan al mismo lugar en Google Maps.
- **Vestimenta** pasó de `[Formal · tenida de verano]` a *Formal*, con la petición de reservar el
  blanco para la novia.
- El pie ahora cierra con *"Con mucho cariño, Rocío & Cristián"*, como el documento de contenido.
- La ceremonia civil sigue fuera del sitio: es solo para los más cercanos.

## Qué falta por completar

Todo lo que queda entre `[corchetes]` vive en [src/config.ts](src/config.ts):

| Dónde | Qué falta |
|---|---|
| `HISTORIA` | Años, lugares y datos de los seis hitos de la línea de tiempo |
| `PREGUNTAS` | Las respuestas de la trivia. **`c` es el índice de la correcta (0 = la primera); hoy están todas en 0** |
| `TRIVIA.premio` | Qué se gana quien saque el mejor puntaje |
| `NOVIOS.creditos` | Quién hizo el sitio |
| `CANCION.id` | El id de YouTube de la canción que suena con el botón ♪ del header. **Con `id` vacío el botón no aparece**, así que el sitio nunca queda con un reproductor roto |
| `SOLTEROS.scriptUrl` | La URL `/exec` del Apps Script de la lista de solteros. Mientras esté vacía, la página dice que el chat «se abre muy pronto» |

Las fotos de la línea de tiempo son recuadros grises con su pie. Para ponerlas de verdad, agrega el
campo de imagen a `Capitulo` en `src/config.ts` y reemplaza el `<Foto>` de
[src/components/Historia.tsx](src/components/Historia.tsx).

El nombre de la parroquia no aparece en el documento de contenido —solo que está dentro del fundo,
a pasos de la fiesta—, así que la tarjeta de ceremonia dice "Fundo Los Cóndores". Si la parroquia
tiene nombre propio, va en `MOMENTOS[0].lugar`.

## Guardar los puntajes de la trivia

`src/components/Trivia.tsx` define `alTerminar`, hoy en `null`. Apúntalo a un Google Apps Script
(o cualquier endpoint) y recibirá `{ nombre, puntaje, total, terminado }` al cerrar cada partida.
Mientras siga en `null`, el resultado solo se muestra en pantalla y se le pide al invitado un
pantallazo.

## Fuentes

Cormorant Garamond (400/500/600, normal e italic) y Sacramento, subset latino, self-hosted bajo
SIL Open Font License. Están en `src/assets/fonts/` y Vite les pone hash en el build.

## Vista previa al compartir (Open Graph)

Las etiquetas están en [index.html](index.html) y la imagen es `public/og.jpg` (1200×630),
que Vite copia tal cual a la raíz del build.

Dos cosas a tener en cuenta si la cambias:

- **Las URL de las etiquetas son absolutas y están escritas a mano.** Los scrapers de WhatsApp
  y compañía no resuelven rutas relativas, así que `base: './'` no sirve acá. Si cambia el
  dominio, hay que editarlas en `index.html` (y `SITIO_URL` en `config.ts`).
- **Hay que subir el `?v=` de `og:image`.** Las previews se cachean por mucho tiempo; sin
  cambiar ese número, WhatsApp sigue mostrando la imagen vieja.

El JPEG pesa 90 KB a propósito: sobre ~600 KB WhatsApp no muestra la preview. El PNG original
pesaba 620 KB, justo en el límite.

## Lista de solteros

`/solteros/` es una página aparte (su propio HTML, sin router, para que funcione tal cual en
GitHub Pages) con un chat abierto donde los invitados sin pareja se presentan. Los mensajes se
guardan en una planilla de Google a través de un Apps Script; los pasos para crearlo, una sola vez,
están al principio de [apps-script/solteros.gs](apps-script/solteros.gs). Para moderar, se borra la
fila en la planilla.

## Agregar al calendario

El botón vive bajo la cuenta regresiva y ofrece Google Calendar o un `.ics` para Apple y Outlook.
El evento se define en `EVENTO` ([src/config.ts](src/config.ts)): va de las **17:30 a las 02:00**,
parte a la hora de llegada y no a las 18:00 de la ceremonia para que nadie llegue justo, y los dos
extremos llevan el huso de Chile explícito. La hora de término es un supuesto: el documento de
contenido no dice hasta cuándo va la fiesta.
