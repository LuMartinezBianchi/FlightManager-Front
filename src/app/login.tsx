import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAuth } from '@/hooks/use-auth';
import { styles } from '@/styles/auth-styles';

// Iniciar sesion. Es la pantalla que se ve mientras no hay una sesion abierta.
export default function LoginScreen() {
  const { iniciarSesion } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);

  async function entrar() {
    if (!email.trim() || !password) {
      setError('Completá el email y la contraseña');
      return;
    }

    setCargando(true);
    setError(null);
    try {
      await iniciarSesion(email.trim(), password);
      router.replace('/');
    } catch (e) {
      setError((e as Error).message);
      setCargando(false);
    }
  }

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.title}>FlightManager</Text>
      <Text style={styles.subtitle}>Iniciá sesión para ver tus vuelos</Text>

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

      <Text style={styles.label}>Contraseña</Text>
      <TextInput style={styles.input} value={password} onChangeText={setPassword} secureTextEntry autoCapitalize="none" />

      <Pressable style={[styles.primaryButton, cargando && { opacity: 0.5 }]} onPress={entrar} disabled={cargando}>
        <Text style={styles.primaryButtonText}>{cargando ? 'Entrando…' : 'Iniciar sesión'}</Text>
      </Pressable>

      <Pressable style={styles.linkButton} onPress={() => router.push('/registro')}>
        <Text style={styles.linkText}>¿No tenés cuenta? Registrate</Text>
      </Pressable>
    </SafeAreaView>
  );
}
