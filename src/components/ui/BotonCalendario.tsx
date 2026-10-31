import { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { colores } from '../../theme';
import { descargarIcs, urlGoogleCalendar } from '../../lib/calendario';

/**
 * Un solo botón con menú: dos botones sueltos («Google» y «.ics») obligarían al
 * invitado a saber cuál le toca.
 */
export function BotonCalendario() {
  const [ancla, setAncla] = useState<HTMLElement | null>(null);
  const abierto = Boolean(ancla);

  function google() {
    window.open(urlGoogleCalendar(), '_blank', 'noopener,noreferrer');
    setAncla(null);
  }

  function ics() {
    descargarIcs();
    setAncla(null);
  }

  return (
    <>
      <Button
        variant="outlined"
        onClick={(e) => setAncla(e.currentTarget)}
        aria-haspopup="menu"
        aria-expanded={abierto || undefined}
      >
        Agregar al calendario
      </Button>

      <Menu
        anchorEl={ancla}
        open={abierto}
        onClose={() => setAncla(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        slotProps={{
          paper: {
            className: 'paper',
            sx: {
              mt: 1,
              borderRadius: 0,
              border: `1px solid ${colores.borde}`,
              boxShadow: '0 8px 28px rgba(63,56,50,0.10)',
            },
          },
        }}
      >
        <MenuItem onClick={google} sx={{ fontSize: 19, py: 1.25, px: 3 }}>
          Google Calendar
        </MenuItem>
        <MenuItem onClick={ics} sx={{ fontSize: 19, py: 1.25, px: 3 }}>
          Apple u Outlook (.ics)
        </MenuItem>
      </Menu>
    </>
  );
}
