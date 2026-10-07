// Todos los estilos de la app leen de aca, asi que cambiar un color o un
// espaciado se hace en un unico lugar

export const colors = {
  // Fondos
  deep: '#0B0F1C',
  panel: '#121728',
  card: '#182036',
  card2: '#1D2540',
  border: '#262F4A',

  // Texto
  text: '#F4F6FB',
  textDim: '#A7B0C8',
  textFaint: '#5E6A88',

  // Acentos de estado
  cyan: '#3FC7F4', // vuelo
  amber: '#F3A73E', // guardia
  green: '#3ED598', // libre
  red: '#F26D6F', // alerta

  // Fondos suaves para chips e iconos (15% de opacidad)
  cyanSoft: 'rgba(63, 199, 244, 0.15)',
  amberSoft: 'rgba(243, 167, 62, 0.15)',
  greenSoft: 'rgba(62, 213, 152, 0.15)',
  redSoft: 'rgba(242, 109, 111, 0.15)',

  // Texto sobre un fondo de acento (ej: boton cyan)
  onAccent: '#0B0F1C',
};

export const spacing = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24 };

export const radius = { sm: 8, md: 12, lg: 16, xl: 20, round: 999 };

export const fontSize = { xs: 10, sm: 12, md: 14, lg: 16, xl: 20, xxl: 26 };

// Tonos de estado, para componentes que cambian de color según el caso (Chip, NOTAM, etc.)
export type Tone = 'cyan' | 'amber' | 'green' | 'red';

export const tones: { [key in Tone]: { color: string; soft: string } } = {
  cyan: { color: colors.cyan, soft: colors.cyanSoft },
  amber: { color: colors.amber, soft: colors.amberSoft },
  green: { color: colors.green, soft: colors.greenSoft },
  red: { color: colors.red, soft: colors.redSoft },
};

// Tiempos de las animaciones (en milisegundos) y desplazamientos.
export const animation = {
  duration: 400,
  stagger: 120,
  slideOffset: 12,
  mapLoop: 4000,
  barDuration: 250,
  barSlide: 80,
};
