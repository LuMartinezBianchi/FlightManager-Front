#!/usr/bin/env node

/**
 * Genera archivos .xlsx de prueba para el flujo de "Agregar vuelos desde
 * .xlsx". Los mismos 12 vuelos (10 validos + 2 con error) se escriben en
 * 3 formatos distintos, para probar las 3 formas en que puede venir una
 * fecha/hora y un encabezado distinto.
 */

const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

const outDir = path.join(process.cwd(), 'samples');
fs.mkdirSync(outDir, { recursive: true });

// [numero, fecha(dd,mm,yyyy), origen, destino, salida(hh,mm), llegada(hh,mm), avion]
const FLIGHTS = [
  ['AR1204', [24, 8, 2026], 'EZE', 'COR', [7, 15], [9, 5], 'Boeing 737-800'],
  ['AR1207', [24, 8, 2026], 'COR', 'MDZ', [10, 10], [11, 35], 'Boeing 737-800'],
  ['AR1210', [24, 8, 2026], 'MDZ', 'EZE', [12, 40], [14, 30], 'Boeing 737-800'],
  ['AR1672', [26, 8, 2026], 'AEP', 'BRC', [8, 15], [10, 35], 'Boeing 737 MAX 8'],
  ['AR1675', [27, 8, 2026], 'BRC', 'AEP', [9, 0], [11, 10], 'Boeing 737 MAX 8'],
  ['AR1300', [28, 8, 2026], 'AEP', 'IGR', [7, 30], [9, 45], 'Boeing 737-800'],
  ['AR1301', [28, 8, 2026], 'IGR', 'AEP', [10, 30], [12, 45], 'Boeing 737-800'],
  ['AR1450', [29, 8, 2026], 'AEP', 'USH', [6, 50], [10, 40], 'Boeing 737 MAX 8'],
  ['AR1451', [29, 8, 2026], 'USH', 'AEP', [11, 40], [15, 30], 'Boeing 737 MAX 8'],
  ['AR1500', [30, 8, 2026], 'COR', 'EZE', [18, 0], [19, 20], 'Boeing 737-800'],
  // Con error: 31 de febrero no existe.
  ['AR1673', [31, 2, 2026], 'BRC', 'AEP', [11, 30], [13, 40], 'Boeing 737 MAX 8'],
  // Con error: falta destino.
  ['AR1801', [25, 8, 2026], 'EZE', '', [9, 0], [10, 40], 'Boeing 737-800'],
];

const MONTHS_ES = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

function pad2(n) {
  return n < 10 ? `0${n}` : `${n}`;
}

function excelSerial(day, month, year, hours, minutes) {
  const epoch = Date.UTC(1899, 11, 30);
  const ms = Date.UTC(year, month - 1, day);
  const days = (ms - epoch) / 86400000;
  const fraction = hours !== undefined ? (hours * 60 + minutes) / 1440 : 0;
  return days + fraction;
}

function writeWorkbook(filename, headers, rows) {
  const sheet = XLSX.utils.aoa_to_sheet([headers, ...rows]);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, sheet, 'Vuelos');
  XLSX.writeFile(workbook, path.join(outDir, filename));
  console.log(`Generado ${path.join('samples', filename)}`);
}

// 1. vuelos_agosto.xlsx: encabezados normales, fechas como Date de verdad.
const normalHeaders = ['N.º de vuelo', 'Fecha', 'Origen', 'Destino', 'Salida', 'Llegada', 'Avión'];
const normalRows = FLIGHTS.map(([number, [d, m, y], from, to, dep, arr, aircraft]) => [
  number,
  // El 31/02 no existe: lo dejamos como texto para que el parser lo detecte como invalido.
  m === 2 && d > 28 ? `${pad2(d)}/${pad2(m)}/${y}` : new Date(y, m - 1, d),
  from,
  to,
  `${pad2(dep[0])}:${pad2(dep[1])}`,
  `${pad2(arr[0])}:${pad2(arr[1])}`,
  aircraft,
]);
writeWorkbook('vuelos_agosto.xlsx', normalHeaders, normalRows);

// 2. vuelos_agosto_serial.xlsx: mismos vuelos, fechas y horas como numero serial de Excel.
const serialRows = FLIGHTS.map(([number, [d, m, y], from, to, dep, arr, aircraft]) => [
  number,
  m === 2 && d > 28 ? `${pad2(d)}/${pad2(m)}/${y}` : excelSerial(d, m, y),
  from,
  to,
  excelSerial(d, m, y, dep[0], dep[1]) - excelSerial(d, m, y),
  excelSerial(d, m, y, arr[0], arr[1]) - excelSerial(d, m, y),
  aircraft,
]);
writeWorkbook('vuelos_agosto_serial.xlsx', normalHeaders, serialRows);

// 3. vuelos_agosto_headers.xlsx: mismos vuelos, encabezados en otro formato y fecha "dd-Mon-yyyy".
const altHeaders = ['Nro Vuelo', 'Fecha', 'Origen', 'Destino', 'Hora salida', 'Hora llegada', 'Aeronave'];
const altRows = FLIGHTS.map(([number, [d, m, y], from, to, dep, arr, aircraft]) => [
  number,
  `${pad2(d)}-${MONTHS_ES[m - 1]}-${y}`,
  from,
  to,
  `${pad2(dep[0])}:${pad2(dep[1])}`,
  `${pad2(arr[0])}:${pad2(arr[1])}`,
  aircraft,
]);
writeWorkbook('vuelos_agosto_headers.xlsx', altHeaders, altRows);
