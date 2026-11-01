import { SOLTEROS } from '../config';

/** Los mismos topes que aplica apps-script/solteros.gs. */
export const MAX_NOMBRE = 60;
export const MAX_MENSAJE = 500;

export interface Mensaje {
  fecha: string;
  nombre: string;
  mensaje: string;
}

export const chatConectado = Boolean(SOLTEROS.scriptUrl);

export async function listarMensajes(): Promise<Mensaje[]> {
  const res = await fetch(SOLTEROS.scriptUrl);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const datos: { mensajes: Mensaje[] } = await res.json();
  return datos.mensajes;
}

/**
 * Va como text/plain a propósito: con application/json el navegador manda
 * antes un OPTIONS (preflight) que Apps Script no responde, y el POST falla.
 */
export async function enviarMensaje(m: { nombre: string; mensaje: string; sitio: string }) {
  const res = await fetch(SOLTEROS.scriptUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(m),
  });
  const datos: { ok: boolean; error?: string } = await res.json();
  if (!datos.ok) throw new Error(datos.error ?? 'error');
}
