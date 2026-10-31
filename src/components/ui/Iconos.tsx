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

export const IconoAuto = ({ size = 26 }: Props) => (
  <svg {...base(size)}>
    <path d="M3 13l2-6h14l2 6" />
    <path d="M2 13h20v5H2z" />
    <circle cx="6.5" cy="18.5" r="1.8" />
    <circle cx="17.5" cy="18.5" r="1.8" />
  </svg>
);

export const IconoRegalo = ({ size = 26 }: Props) => (
  <svg {...base(size)}>
    <path d="M3 9h18v12H3z" />
    <path d="M3 9h18M12 9v12" />
    <path d="M12 9S9.5 3 7 4.5 9 9 12 9zM12 9s2.5-6 5-4.5S15 9 12 9z" />
  </svg>
);

export const IconoPlato = ({ size = 26 }: Props) => (
  <svg {...base(size)}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="4.5" />
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
