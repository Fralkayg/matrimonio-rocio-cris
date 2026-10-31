# Cristián & Rocío — sitio del matrimonio

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
src/
  config.ts              ← TODO el contenido editable (fechas, lugar, links, trivia, historia)
  theme.ts               ← paleta y tipografía del diseño
  hooks/useFecha.ts       ← fecha larga, 30 . 01 . 27 y la cuenta regresiva
  styles/                 ← fuentes + papel + rejilla de la línea de tiempo
  components/
    Nav, Hero, Invitacion, Historia, GranDia, Detalles, Rsvp, Trivia, Footer
    ui/                   ← Reveal, SectionHeading, PaperCard, Script, Deco, Iconos
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
