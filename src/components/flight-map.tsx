import * as Location from 'expo-location';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, Polyline, type LatLng } from 'react-native-maps';

// Los datos del aeropuerto vienen de la API; este componente solo los dibuja
export type Airport = {
  iata: string;
  name: string;
  latitude: number;
  longitude: number;
};

type Props = {
  origin: Airport;
  destination: Airport;
};

export function FlightMap({ origin, destination }: Props) {
  const mapRef = useRef<MapView>(null);
  const [userPos, setUserPos] = useState<LatLng | null>(null);
  const [permissionDenied, setPermissionDenied] = useState(false);

  // La ubicación del celular solo existe en el dispositivo: se pide acá
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          if (!cancelled) setPermissionDenied(true);
          return;
        }
        const pos = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });
        if (!cancelled) {
          setUserPos({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          });
        }
      } catch {
        // Sin ubicación disponible: se muestra solo la ruta
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  // Encuadra origen, destino y usuario (si hay ubicación)
  useEffect(() => {
    const points = [
      { latitude: origin.latitude, longitude: origin.longitude },
      { latitude: destination.latitude, longitude: destination.longitude },
      ...(userPos ? [userPos] : []),
    ];
    mapRef.current?.fitToCoordinates(points, {
      edgePadding: { top: 60, right: 60, bottom: 60, left: 60 },
      animated: true,
    });
  }, [userPos, origin.latitude, origin.longitude, destination.latitude, destination.longitude]);

  const originCoord = { latitude: origin.latitude, longitude: origin.longitude };
  const destinationCoord = { latitude: destination.latitude, longitude: destination.longitude };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          ...originCoord,
          latitudeDelta: 0.5,
          longitudeDelta: 0.5,
        }}
        showsUserLocation
      >
        <Marker coordinate={originCoord} title={origin.name} description={origin.iata} />
        <Marker coordinate={destinationCoord} title={destination.name} description={destination.iata} />

        {/* Ruta del vuelo: sale de los datos de la API */}
        <Polyline coordinates={[originCoord, destinationCoord]} strokeWidth={3} strokeColor="#4da3ff" />

        {/* Línea punteada desde el usuario hasta el origen, si hay ubicación */}
        {userPos && (
          <Polyline
            coordinates={[userPos, originCoord]}
            strokeWidth={2}
            strokeColor="#4da3ff"
            lineDashPattern={[8, 6]}
          />
        )}
      </MapView>

      {permissionDenied && (
        <View style={styles.notice}>
          <Text style={styles.noticeText}>Sin permiso de ubicación: se muestra solo la ruta</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 240,
    borderRadius: 12,
    overflow: 'hidden',
  },
  map: {
    flex: 1,
  },
  notice: {
    position: 'absolute',
    left: 8,
    right: 8,
    bottom: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.65)',
  },
  noticeText: {
    color: '#ffffff',
    fontSize: 12,
    textAlign: 'center',
  },
});
