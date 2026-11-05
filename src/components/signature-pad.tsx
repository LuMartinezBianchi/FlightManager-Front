import { Canvas, ImageFormat, Path, Skia, useCanvasRef } from '@shopify/react-native-skia';
import { useEffect, useMemo, useState } from 'react';
import { PanResponder, Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radius } from '@/constants/theme';

type Point = { x: number; y: number };

type Props = {
  // Firma guardada como PNG en base64 (data URL). Vacia si todavia no se firmo
  value: string;
  onChange: (dataUrl: string) => void;
  // Avisa cuando empieza y termina un trazo, para que la pantalla no haga scroll mientras se firma
  onDrawingChange: (drawing: boolean) => void;
};

// Pad de firma con Skia: el trazo se dibuja en un canvas y al soltar se exporta como PNG
export function SignaturePad({ value, onChange, onDrawingChange }: Props) {
  const canvasRef = useCanvasRef();
  const [strokes, setStrokes] = useState<Point[][]>([]);
  const [drawing, setDrawing] = useState(false);

  useEffect(() => {
    onDrawingChange(drawing);
  }, [drawing, onDrawingChange]);

  // Al soltar el dedo el canvas ya tiene el trazo completo: ahi se exporta la imagen
  useEffect(() => {
    if (drawing || strokes.length === 0) return;
    const image = canvasRef.current?.makeImageSnapshot();
    if (!image) return;
    onChange(`data:image/png;base64,${image.encodeToBase64(ImageFormat.PNG, 100)}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drawing]);

  const panResponder = useMemo(
    () =>
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      // El pad se queda con el toque aunque un contenedor quiera tomarlo para scrollear
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderTerminationRequest: () => false,
      onPanResponderGrant: (event) => {
        setDrawing(true);
        const { locationX, locationY } = event.nativeEvent;
        setStrokes((previous) => [...previous, [{ x: locationX, y: locationY }]]);
      },
      onPanResponderMove: (event) => {
        const { locationX, locationY } = event.nativeEvent;
        setStrokes((previous) => {
          const last = previous[previous.length - 1] ?? [];
          return [...previous.slice(0, -1), [...last, { x: locationX, y: locationY }]];
        });
      },
      onPanResponderRelease: () => setDrawing(false),
      onPanResponderTerminate: () => setDrawing(false),
    }),
    [],
  );

  function clear() {
    setStrokes([]);
    onChange('');
  }

  return (
    <View>
      <View style={styles.pad} {...panResponder.panHandlers}>
        <Canvas ref={canvasRef} style={styles.canvas}>
          {strokes.map((stroke, index) => {
            const builder = Skia.PathBuilder.Make();
            stroke.forEach((point, i) => {
              if (i === 0) builder.moveTo(point.x, point.y);
              else builder.lineTo(point.x, point.y);
            });
            return (
              <Path
                key={index}
                path={builder.build()}
                style="stroke"
                strokeWidth={3}
                strokeCap="round"
                strokeJoin="round"
                color={colors.deep}
              />
            );
          })}
        </Canvas>
        {strokes.length === 0 && <Text style={styles.hint}>{value ? 'Firmado' : 'Firmá acá'}</Text>}
      </View>

      <Pressable style={styles.clear} onPress={clear}>
        <Text style={styles.clearText}>Borrar firma</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  pad: {
    height: 160,
    borderRadius: radius.md,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  canvas: {
    flex: 1,
  },
  hint: {
    position: 'absolute',
    alignSelf: 'center',
    top: '45%',
    color: colors.textFaint,
  },
  clear: {
    alignSelf: 'flex-end',
    marginTop: 6,
  },
  clearText: {
    color: colors.cyan,
    fontSize: 13,
  },
});
