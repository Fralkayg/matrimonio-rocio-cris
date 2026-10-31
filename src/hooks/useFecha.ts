import { useMemo } from 'react';
import { FECHA_MATRIMONIO } from '../config';

const pad = (n: number) => String(n).padStart(2, '0');
const capitalizar = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export type Fecha = {
  /** `30 . 01 . 27` */
  corta: string;
  /** `Sábado, 30 de enero de 2027` */
  larga: string;
  /** `Faltan 92 días` */
  cuenta: string;
  dias: number;
};

/** Deriva del día del matrimonio los tres formatos que usa el diseño. */
export function useFecha(iso: string = FECHA_MATRIMONIO): Fecha {
  return useMemo(() => {
    // Mediodía en ambos lados, para que el cambio de hora no mueva la cuenta de días.
    const boda = new Date(`${iso}T12:00:00`);
    const hoy = new Date();
    hoy.setHours(12, 0, 0, 0);
    const dias = Math.round((boda.getTime() - hoy.getTime()) / 86_400_000);

    let cuenta = `Faltan ${dias} días`;
    if (dias === 1) cuenta = 'Falta 1 día';
    if (dias === 0) cuenta = '¡Hoy es el día!';
    if (dias < 0) cuenta = '¡Ya nos casamos!';

    return {
      corta: `${pad(boda.getDate())} . ${pad(boda.getMonth() + 1)} . ${String(boda.getFullYear()).slice(-2)}`,
      larga: capitalizar(
        boda.toLocaleDateString('es-CL', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        }),
      ),
      cuenta,
      dias,
    };
  }, [iso]);
}
