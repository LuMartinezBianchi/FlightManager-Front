import * as Location from 'expo-location';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, Polyline, type LatLng } from 'react-native-maps';

export type Airport = {
  iata: string;
  name: string;
  latitude: number;
  longitude: number;
};

type Props = {
  airport: Airport;
};

export function FlightMap({ airport }: Props) {
  const mapRef = useRef<MapView>(null);
  const [userPos, setUserPos] = useState<LatLng | null>(null);
  const [permissionDenied, setPermissionDenied] = useState(false);

  // Pide permiso y obtiene la posición actual una vez
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
        // Sin ubicación disponible: se muestra solo el aeropuerto
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  // Encuadra usuario + aeropuerto cuando ya tenemos la posición del usuario
  useEffect(() => {
    if (!userPos) return;
    mapRef.current?.fitToCoordinates(
      [userPos, { latitude: airport.latitude, longitude: airport.longitude }],
      {
        edgePadding: { top: 60, right: 60, bottom: 60, left: 60 },
        animated: true,
      }
    );
  }, [userPos, airport.latitude, airport.longitude]);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: airport.latitude,
          longitude: airport.longitude,
          latitudeDelta: 0.15,
          longitudeDelta: 0.15,
        }}
        showsUserLocation
      >
        <Marker
          coordinate={{ latitude: airport.latitude, longitude: airport.longitude }}
          title={airport.name}
          description={airport.iata}
        />
        {userPos && (
          <Polyline
            coordinates={[
              userPos,
              { latitude: airport.latitude, longitude: airport.longitude },
            ]}
            strokeWidth={2}
            strokeColor="#4da3ff"
            lineDashPattern={[8, 6]}
          />
        )}
      </MapView>

      {permissionDenied && (
        <View style={styles.notice}>
          <Text style={styles.noticeText}>
            Sin permiso de ubicación: se muestra solo el aeropuerto
          </Text>
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
