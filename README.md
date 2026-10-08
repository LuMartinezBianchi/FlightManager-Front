# FlightManager
App movil de agenda y bitácora digital de vuelos para pilotos - Trabajo integrador para Programación de Aplicaciones Móviles (UCA 2026)

## Cómo correrla

**Requisitos:** Node.js instalado y, en el teléfono, la app **Expo Go** (Android o iOS).

1. Instalar las dependencias (una sola vez):

   ```bash
   npm install
   ```

2. Iniciar el servidor de desarrollo:

   ```bash
   npx expo start
   ```

3. Abrir la app:
   - **En el teléfono:** escanear el código QR de la terminal con Expo Go (Android) o con la cámara (iOS). El teléfono y la computadora tienen que estar en la misma red Wi-Fi.
   - **En el navegador:** presionar `w` en la terminal.
   - **En un emulador:** presionar `a` (Android) o `i` (iOS, solo en Mac).

Si el teléfono no se conecta por la red, usar `npx expo start --tunnel`.


## Comandos útiles
| `npx expo start -c` | Iniciar limpiando la caché, si algo se ve raro |


## Estructura

- `src/app/`: las pantallas. Cada archivo es una ruta; `(tabs)/` tiene las 4 tabs.
- `src/styles/`: un archivo de estilos por pantalla (`<pantalla>-styles.ts`).
- `src/data/`: los datos (hardcodeados) de ejemplo (vuelos, calendario, libro de vuelo).
- `src/constants/theme.ts`: colores, espaciados y tamaños de texto.

