import { MUROS, type MuroId } from '../config';

/** Los mismos topes que aplica apps-script/muros.gs. */
export const MAX_NOMBRE = 60;
export const MAX_MENSAJE = 500;

export interface Mensaje {
  fecha: string;
  nombre: string;
  mensaje: string;
  /** Solo el usuario, sin @. Vacío si no lo dejó. */
  instagram?: string;
}

/**
 * Acepta lo que la gente suele pegar («@usuario», «usuario» o el link del
 * perfil) y devuelve solo el usuario. `null` si no parece un usuario válido.
 */
export function usuarioInstagram(texto: string): string | null {
  const limpio = texto
    .trim()
    .replace(/^(https?:\/\/)?(www\.)?instagram\.com\//i, '')
    .replace(/^@/, '')
    .replace(/[/?#].*$/, '');
  if (limpio === '') return '';
  return /^[A-Za-z0-9._]{1,30}$/.test(limpio) ? limpio : null;
}

export const urlInstagram = (usuario: string) => `https://www.instagram.com/${usuario}/`;

export const chatConectado = Boolean(MUROS.scriptUrl);

export async function listarMensajes(muro: MuroId): Promise<Mensaje[]> {
  const res = await fetch(`${MUROS.scriptUrl}?muro=${muro}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const datos: { mensajes: Mensaje[] } = await res.json();
  return datos.mensajes;
}

/**
 * Va como text/plain a propósito: con application/json el navegador manda
 * antes un OPTIONS (preflight) que Apps Script no responde, y el POST falla.
 */
export async function enviarMensaje(m: {
  muro: MuroId;
  nombre: string;
  mensaje: string;
  instagram: string;
  sitio: string;
}) {
  const res = await fetch(MUROS.scriptUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(m),
  });
  const datos: { ok: boolean; error?: string } = await res.json();
  if (!datos.ok) throw new Error(datos.error ?? 'error');
}
