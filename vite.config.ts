import { fileURLToPath } from 'node:url';
import { defineConfig, runnerImport, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

interface ModuloCalendario {
  ARCHIVO_ICS: string;
  construirIcs: () => string;
}

/**
 * Publica el .ics como archivo estático junto al sitio. Se arma con el mismo
 * código del navegador (src/lib/calendario.ts) para que no haya dos fuentes.
 */
function eventoIcs(): Plugin {
  const cargar = async () =>
    (
      await runnerImport<ModuloCalendario>(
        fileURLToPath(new URL('./src/lib/calendario.ts', import.meta.url)),
        { configFile: false },
      )
    ).module;

  return {
    name: 'evento-ics',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.split('?')[0].endsWith('.ics')) return next();
        const { ARCHIVO_ICS, construirIcs } = await cargar();
        if (req.url.split('?')[0] !== `/${ARCHIVO_ICS}`) return next();
        res.setHeader('Content-Type', 'text/calendar; charset=utf-8');
        res.end(construirIcs());
      });
    },
    async generateBundle() {
      const { ARCHIVO_ICS, construirIcs } = await cargar();
      this.emitFile({ type: 'asset', fileName: ARCHIVO_ICS, source: construirIcs() });
    },
  };
}

export default defineConfig({
  plugins: [react(), eventoIcs()],
  base: './',
});
