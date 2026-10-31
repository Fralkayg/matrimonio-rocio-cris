import { useEffect, useState } from 'react';
import { INICIO_CEREMONIA } from '../config';

export type Restante = {
  dias: number;
  horas: number;
  minutos: number;
  segundos: number;
  /** `true` cuando la fecha ya pasó. */
  terminado: boolean;
};

const CERO: Restante = { dias: 0, horas: 0, minutos: 0, segundos: 0, terminado: true };

function calcular(objetivo: number): Restante {
  const falta = objetivo - Date.now();
  if (falta <= 0) return CERO;

  const total = Math.floor(falta / 1000);
  return {
    dias: Math.floor(total / 86_400),
    horas: Math.floor((total % 86_400) / 3600),
    minutos: Math.floor((total % 3600) / 60),
    segundos: total % 60,
    terminado: false,
  };
}

/**
 * Cuenta regresiva viva hasta el inicio de la ceremonia. El objetivo lleva el
 * huso de Chile explícito, así que da lo mismo desde dónde se mire el sitio.
 */
export function useCuentaRegresiva(iso: string = INICIO_CEREMONIA): Restante {
  const objetivo = new Date(iso).getTime();
  const [restante, setRestante] = useState(() => calcular(objetivo));

  useEffect(() => {
    if (restante.terminado) return;

    const id = setInterval(() => {
      const siguiente = calcular(objetivo);
      setRestante(siguiente);
      if (siguiente.terminado) clearInterval(id);
    }, 1000);

    return () => clearInterval(id);
  }, [objetivo, restante.terminado]);

  return restante;
}
