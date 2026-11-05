// Llamadas a la API de cuentas: registro, login y logout.
// Registro y login usan fetch normal (todavia no hay sesion). Logout si manda el token.
import { API_URL } from './config';
import { fetchConSesion } from './sesion';

// POST /api/registro: crea la cuenta y devuelve el token de la sesion ya abierta.
export async function registrar(email: string, password: string): Promise<string> {
  const response = await fetch(`${API_URL}/api/registro`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const body = await response.json();

  if (!response.ok) {
    throw new Error(body.error ?? 'No se pudo crear la cuenta');
  }

  return body.token;
}

// POST /api/login: devuelve el token de la sesion.
export async function iniciarSesionApi(email: string, password: string): Promise<string> {
  const response = await fetch(`${API_URL}/api/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const body = await response.json();

  if (!response.ok) {
    throw new Error(body.error ?? 'No se pudo iniciar sesión');
  }

  return body.token;
}

// POST /api/logout: el back borra el token, asi deja de servir.
export async function cerrarSesionApi(): Promise<void> {
  await fetchConSesion(`${API_URL}/api/logout`, { method: 'POST' });
}
