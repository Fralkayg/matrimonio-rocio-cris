import { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import { colores } from '../theme';
import { NAV, NOVIOS } from '../config';
import { IconoCerrar, IconoMenu } from './ui/Iconos';
import { BotonCancion, ReproductorCancion, hayReproductor, useCancion } from './ui/ReproductorCancion';

type Props = {
  /**
   * Ruta a la portada desde la página actual: '' en la portada, '../' en
   * /solteros/. Así los links a las secciones sirven desde cualquier página.
   */
  raiz?: string;
};

/** Debajo de este ancho los links no caben en una fila y pasan al menú ☰. */
const DESKTOP = 'lg';

export function Nav({ raiz = '' }: Props) {
  const [izq, der] = NOVIOS.iniciales.split('&').map((s) => s.trim());
  const cancion = useCancion();
  const [menu, setMenu] = useState(false);

  const links = [
    ...NAV.map((item) => ({ href: `${raiz}${item.href}`, label: item.label })),
    { href: `${raiz || './'}solteros/`, label: 'Solteros' },
  ];

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
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 3,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Link
            href={`${raiz}#inicio`}
            underline="none"
            sx={{
              fontSize: 26,
              fontWeight: 500,
              letterSpacing: '0.12em',
              whiteSpace: 'nowrap',
              color: colores.apagado,
              py: 1,
              '&:hover': { color: colores.marron },
            }}
          >
            {izq} <Box component="span" sx={{ fontStyle: 'italic' }}>&amp;</Box> {der}
          </Link>
          {hayReproductor && <BotonCancion sonando={cancion.sonando} onClick={cancion.alternar} />}
        </Box>

        <Box
          sx={{
            display: { xs: 'none', [DESKTOP]: 'flex' },
            gap: '0 22px',
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
          }}
        >
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              underline="none"
              sx={{
                color: colores.apagado,
                py: 1.75,
                whiteSpace: 'nowrap',
                '&:hover': { color: colores.verdeOscuro },
              }}
            >
              {item.label}
            </Link>
          ))}
        </Box>

        <IconButton
          onClick={() => setMenu(true)}
          aria-label="Abrir menú"
          aria-expanded={menu}
          sx={{ display: { [DESKTOP]: 'none' }, color: colores.apagado, mr: -1 }}
        >
          <IconoMenu />
        </IconButton>
      </Box>

      {hayReproductor && <ReproductorCancion contenedor={cancion.contenedor} visible={cancion.visible} />}

      <Drawer
        anchor="right"
        open={menu}
        onClose={() => setMenu(false)}
        slotProps={{ paper: { className: 'paper', sx: { width: 'min(320px, 85vw)', px: 4, py: 2 } } }}
      >
        <IconButton
          onClick={() => setMenu(false)}
          aria-label="Cerrar menú"
          sx={{ alignSelf: 'flex-end', color: colores.apagado, mr: -1.5 }}
        >
          <IconoCerrar />
        </IconButton>
        <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0, mt: 2 }}>
          {links.map((item) => (
            <Box component="li" key={item.href} sx={{ borderBottom: `1px solid ${colores.borde}` }}>
              <Link
                href={item.href}
                onClick={() => setMenu(false)}
                underline="none"
                sx={{
                  display: 'block',
                  py: 2,
                  fontSize: 15,
                  fontWeight: 600,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: colores.apagado,
                  '&:hover': { color: colores.verdeOscuro },
                }}
              >
                {item.label}
              </Link>
            </Box>
          ))}
        </Box>
      </Drawer>
    </Box>
  );
}
