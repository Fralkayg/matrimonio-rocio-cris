import { createTheme } from '@mui/material/styles';

/** Paleta tomada del archivo de diseño. */
export const colores = {
  tinta: '#3F3832',
  texto: '#5A5048',
  apagado: '#75665A',
  marron: '#8B7B6E',
  papel: '#FCFBF9',
  borde: '#E6DFD3',
  bordeFuerte: '#D9D0C3',
  regla: '#B5A898',
  verde: '#5F6E50',
  verdeOscuro: '#3F4A34',
  verdeClaro: '#6F7F5E',
  coral: '#E07A5F',
  oro: '#E3BE55',
  azul: '#7D9BBF',
  salvia: '#8FA27A',
  correcto: '#E4E9D8',
  incorrecto: '#F8E1D8',
} as const;

const serif = "'Cormorant Garamond', Georgia, 'Times New Roman', serif";
export const cursiva = "Sacramento, 'Brush Script MT', cursive";

export const theme = createTheme({
  cssVariables: true,
  palette: {
    mode: 'light',
    primary: { main: colores.verde, dark: colores.verdeOscuro, contrastText: '#FFFFFF' },
    secondary: { main: colores.coral },
    background: { default: colores.papel, paper: colores.papel },
    text: { primary: colores.tinta, secondary: colores.texto },
    divider: colores.borde,
  },
  shape: { borderRadius: 4 },
  typography: {
    fontFamily: serif,
    // Títulos de sección: cursiva fina y grande, como en el diseño.
    h1: { fontWeight: 500, lineHeight: 1.15, letterSpacing: '0.22em', textTransform: 'uppercase' },
    h2: { fontWeight: 400, fontStyle: 'italic', lineHeight: 1 },
    h3: { fontWeight: 400, lineHeight: 1.05 },
    body1: { fontSize: 21, lineHeight: 1.55 },
    body2: { fontSize: 19, lineHeight: 1.55 },
    // Rótulos espaciados en mayúscula.
    overline: {
      fontSize: 15,
      fontWeight: 600,
      letterSpacing: '0.4em',
      textTransform: 'uppercase',
      lineHeight: 1.6,
    },
    button: {
      fontWeight: 600,
      fontSize: 15,
      letterSpacing: '0.2em',
      textTransform: 'uppercase',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: { scrollBehavior: 'smooth' },
        'section[id]': { scrollMarginTop: 72 },
        '*': { boxSizing: 'border-box' },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          minHeight: 52,
          padding: '0 28px',
          borderRadius: 999,
          gap: 10,
        },
        outlined: { borderColor: colores.verde },
      },
    },
    MuiPaper: {
      defaultProps: { elevation: 0 },
      styleOverrides: { root: { backgroundImage: 'none' } },
    },
    MuiLink: {
      defaultProps: { underline: 'hover' },
      styleOverrides: { root: { color: colores.verde, '&:hover': { color: colores.verdeOscuro } } },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: { backgroundColor: '#FFFFFF' },
        input: { fontSize: 22, minHeight: 56, padding: '0 18px' },
        notchedOutline: { borderColor: colores.bordeFuerte },
      },
    },
  },
});
