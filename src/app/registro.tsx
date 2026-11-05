import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAuth } from '@/hooks/use-auth';
import { styles } from '@/styles/auth-styles';

// Crear cuenta. Al registrarse la sesion queda abierta y se entra directo a la app.
export default function RegistroScreen() {
  const { registrarse } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repetida, setRepetida] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);

  async function crearCuenta() {
    if (!email.trim() || !password) {
      setError('Completá el email y la contraseña');
      return;
    }
    if (password.length < 8) {
      setError('La contraseña tiene que tener al menos 8 caracteres');
      return;
    }
    if (password !== repetida) {
      setError('Las contraseñas no coinciden');
      return;
    }

    setCargando(true);
    setError(null);
    try {
      await registrarse(email.trim(), password);
      router.replace('/');
    } catch (e) {
      setError((e as Error).message);
      setCargando(false);
    }
  }

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.title}>Crear cuenta</Text>
      <Text style={styles.subtitle}>Tus vuelos y tu libro quedan guardados solo para vos</Text>

      {error && (
        <View style={styles.error}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="piloto@mail.com"
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
      />

      <Text style={styles.label}>Contraseña (mínimo 8 caracteres)</Text>
      <TextInput style={styles.input} value={password} onChangeText={setPassword} secureTextEntry autoCapitalize="none" />

      <Text style={styles.label}>Repetir contraseña</Text>
      <TextInput style={styles.input} value={repetida} onChangeText={setRepetida} secureTextEntry autoCapitalize="none" />

      <Pressable style={[styles.primaryButton, cargando && { opacity: 0.5 }]} onPress={crearCuenta} disabled={cargando}>
        <Text style={styles.primaryButtonText}>{cargando ? 'Creando…' : 'Crear cuenta'}</Text>
      </Pressable>

      <Pressable style={styles.linkButton} onPress={() => router.back()}>
        <Text style={styles.linkText}>Ya tengo cuenta</Text>
      </Pressable>
    </SafeAreaView>
  );
}
