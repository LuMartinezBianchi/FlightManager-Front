// La sesion del lado de la app: guarda el token en memoria y se lo agrega a cada pedido.
// Lo usan las llamadas que necesitan sesion (vuelos, programacion, libro y mapa).
// Aeropuertos, meteo, registro y login NO lo usan: el back los deja abiertos.

let token: string | null = null;
let alVencer: (() => void) | null = null;

// Lo llama el AuthProvider (hooks/use-auth.tsx) al iniciar o cerrar sesion.
export function setToken(nuevo: string | null) {
  token = nuevo;
}

// El AuthProvider deja aca lo que hay que hacer cuando el back dice "tu sesion ya no sirve".
export function setAlVencer(funcion: (() => void) | null) {
  alVencer = funcion;
}

// Igual que fetch, pero manda el token en el header Authorization (asi el back sabe de que piloto es el pedido).
// Si el back responde 401 (token borrado, sesion cerrada en otro lado...), avisa para volver al login.
export async function fetchConSesion(url: string, options: RequestInit & { headers?: Record<string, string> } = {}) {
  const response = await fetch(url, {
    ...options,
    headers: { ...options.headers, Authorization: `Bearer ${token}` },
  });

  if (response.status === 401) alVencer?.();

  return response;
}
