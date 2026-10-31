import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { colores } from '../theme';
import { NAV, NOVIOS } from '../config';

export function Nav() {
  const [izq, der] = NOVIOS.iniciales.split('&').map((s) => s.trim());

  return (
    <Box
      component="header"
      className="paper"
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 10,
        borderBottom: `1px solid ${colores.borde}`,
      }}
    >
      <Box
        component="nav"
        sx={{
          maxWidth: 1200,
          mx: 'auto',
          px: 3,
          py: 1.25,
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '8px 24px',
        }}
      >
        <Link
          href="#inicio"
          underline="none"
          sx={{
            fontSize: 26,
            fontWeight: 500,
            letterSpacing: '0.12em',
            color: colores.apagado,
            py: 1,
            '&:hover': { color: colores.marron },
          }}
        >
          {izq} <Box component="span" sx={{ fontStyle: 'italic' }}>&amp;</Box> {der}
        </Link>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: { xs: '0 16px', sm: '0 28px' },
            fontSize: { xs: 13, sm: 14 },
            fontWeight: 600,
            letterSpacing: { xs: '0.14em', sm: '0.22em' },
            textTransform: 'uppercase',
          }}
        >
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              underline="none"
              sx={{
                color: colores.apagado,
                py: 1.75,
                '&:hover': { color: colores.verdeOscuro },
              }}
            >
              {item.label}
            </Link>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
