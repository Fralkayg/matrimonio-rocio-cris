/** Iconos de línea, al mismo grosor que los garabatos del diseño. */

type Props = { size?: number };

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
});

export const IconoFoto = ({ size = 26 }: Props) => (
  <svg {...base(size)}>
    <rect x="3" y="5" width="18" height="14" rx="1" />
    <circle cx="9" cy="10" r="2" />
    <path d="M21 16l-5-5-9 8" />
  </svg>
);

export const IconoFlecha = ({ size = 16 }: Props) => (
  <svg
    width={size}
    height={size * (28 / 16)}
    viewBox="0 0 20 32"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M10 2v27" />
    <path d="M4 23l6 6 6-6" />
  </svg>
);
