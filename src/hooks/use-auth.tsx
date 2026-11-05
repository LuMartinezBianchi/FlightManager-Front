import * as SecureStore from 'expo-secure-store';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

import { cerrarSesionApi, iniciarSesionApi, registrar } from '@/api/auth';
import { setAlVencer, setToken } from '@/api/sesion';


const CLAVE_TOKEN = 'token';

type Auth = {
  token: string | null;
  // true mientras se busca el token guardado al abrir la app
  cargando: boolean;
  iniciarSesion: (email: string, password: string) => Promise<void>;
  registrarse: (email: string, password: string) => Promise<void>;
  cerrarSesion: () => Promise<void>;
};

const AuthContext = createContext<Auth | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setTokenEstado] = useState<string | null>(null);
  const [cargando, setCargando] = useState(true);

  // El token vive en 3 lugares: la memoria de api/sesion (para mandarlo en cada pedido),
  // el estado (para que la pantalla cambie) y SecureStore (para la proxima vez que se abra la app).
  async function guardarToken(nuevo: string | null) {
    setToken(nuevo);
    setTokenEstado(nuevo);
    try {
      if (nuevo) await SecureStore.setItemAsync(CLAVE_TOKEN, nuevo);
      else await SecureStore.deleteItemAsync(CLAVE_TOKEN);
    } catch {
      // Si no se pudo guardar, la sesion igual funciona hasta que se cierre la app.
    }
  }

  // Al abrir la app: recupera el token guardado. Si ya no sirve, el primer pedido da 401 y se vuelve al login.
  useEffect(() => {
    SecureStore.getItemAsync(CLAVE_TOKEN)
      .then((guardado) => {
        setToken(guardado);
        setTokenEstado(guardado);
      })
      .catch(() => {})
      .finally(() => setCargando(false));

    // Cuando el back responde 401 en cualquier pedido: se borra la sesion y la app vuelve al login.
    setAlVencer(() => {
      guardarToken(null);
    });
  }, []);

  async function iniciarSesion(email: string, password: string) {
    await guardarToken(await iniciarSesionApi(email, password));
  }

  async function registrarse(email: string, password: string) {
    await guardarToken(await registrar(email, password));
  }

  async function cerrarSesion() {
    try {
      await cerrarSesionApi();
    } catch {
      // Sin conexion: igual se cierra la sesion en el celular.
    }
    await guardarToken(null);
  }

  return (
    <AuthContext.Provider value={{ token, cargando, iniciarSesion, registrarse, cerrarSesion }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const auth = useContext(AuthContext);
  if (!auth) throw new Error('useAuth tiene que usarse dentro de <AuthProvider>');
  return auth;
}
