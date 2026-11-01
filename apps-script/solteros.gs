/**
 * Lista de solteros: guarda y entrega los mensajes del chat de /solteros/
 * en una planilla de Google. Corre en Google Apps Script, no en el sitio.
 *
 * Cómo conectarlo (se hace una sola vez):
 *  1. Crea una planilla en https://sheets.new y ponle nombre («Lista de solteros»).
 *  2. Extensiones › Apps Script. Borra lo que haya, pega este archivo completo y guarda.
 *  3. Implementar › Nueva implementación › tipo «Aplicación web».
 *     Ejecutar como: «Yo». Quién tiene acceso: «Cualquier persona». Implementar y autorizar.
 *  4. Copia la URL que termina en /exec y pégala en SOLTEROS.scriptUrl (src/config.ts).
 *
 * Los mensajes quedan en la hoja «Mensajes». Para borrar uno, borra su fila.
 * El Instagram es opcional y se guarda solo el usuario, sin @ ni link.
 * Si cambias este código: Implementar › Gestionar implementaciones › editar (lápiz)
 * › Versión: «Nueva versión». La URL se mantiene.
 */

const HOJA = 'Mensajes';
const MAX_NOMBRE = 60;
const MAX_MENSAJE = 500;
/** Los usuarios de Instagram: hasta 30 letras, números, puntos y guiones bajos. */
const INSTAGRAM = /^[A-Za-z0-9._]{1,30}$/;
/** Cuántos mensajes (los más recientes) devuelve el chat. */
const MAX_LISTA = 300;

function hoja_() {
  const libro = SpreadsheetApp.getActiveSpreadsheet();
  let hoja = libro.getSheetByName(HOJA);
  if (!hoja) {
    hoja = libro.insertSheet(HOJA);
    hoja.appendRow(['Fecha', 'Nombre', 'Mensaje', 'Instagram']);
    hoja.setFrozenRows(1);
  }
  // Hojas creadas antes de que existiera la columna Instagram.
  if (hoja.getRange(1, 4).getValue() === '') hoja.getRange(1, 4).setValue('Instagram');
  return hoja;
}

function json_(datos) {
  return ContentService.createTextOutput(JSON.stringify(datos)).setMimeType(
    ContentService.MimeType.JSON,
  );
}

/** Una celda que empieza con = + - @ la planilla la tomaría como fórmula. */
function sinFormula_(texto) {
  return /^[=+\-@]/.test(texto) ? "'" + texto : texto;
}

function doGet() {
  const hoja = hoja_();
  const ultima = hoja.getLastRow();
  if (ultima < 2) return json_({ mensajes: [] });

  const desde = Math.max(2, ultima - MAX_LISTA + 1);
  const filas = hoja.getRange(desde, 1, ultima - desde + 1, 4).getValues();

  return json_({
    mensajes: filas
      .filter((f) => f[1] && f[2])
      .map((f) => ({
        fecha: new Date(f[0]).toISOString(),
        nombre: String(f[1]),
        mensaje: String(f[2]),
        instagram: String(f[3] || ''),
      })),
  });
}

function doPost(e) {
  let datos;
  try {
    datos = JSON.parse(e.postData.contents);
  } catch (_) {
    return json_({ ok: false, error: 'formato' });
  }

  // Campo trampa: invisible para personas, los bots lo llenan.
  if (datos.sitio) return json_({ ok: true });

  const nombre = String(datos.nombre || '').trim().slice(0, MAX_NOMBRE);
  const mensaje = String(datos.mensaje || '').trim().slice(0, MAX_MENSAJE);
  if (!nombre || !mensaje) return json_({ ok: false, error: 'vacio' });
  const instagram = String(datos.instagram || '').trim();
  if (instagram && !INSTAGRAM.test(instagram)) return json_({ ok: false, error: 'instagram' });

  const candado = LockService.getScriptLock();
  candado.waitLock(10000);
  try {
    hoja_().appendRow([new Date(), sinFormula_(nombre), sinFormula_(mensaje), instagram]);
  } finally {
    candado.releaseLock();
  }
  return json_({ ok: true });
}
