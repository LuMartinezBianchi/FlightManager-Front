import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Modal, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors } from '@/constants/theme';
import { common } from '@/styles/common';
import { profile as styles } from '@/styles/profile';

type Profile = {
  name: string;
  role: string;
  aircraft: string;
  license: string;
  fileNumber: string;
};

// Datos hardcodeados por ahora.
const stats = [
  { value: '4.820', label: 'HS. TOTALES' },
  { value: '42:10', label: 'ESTE MES' },
  { value: '186', label: 'VUELOS / AÑO' },
];

const userFields: { key: keyof Profile; label: string }[] = [
  { key: 'name', label: 'Nombre' },
  { key: 'role', label: 'Cargo' },
  { key: 'aircraft', label: 'Avión' },
  { key: 'license', label: 'Licencia' },
  { key: 'fileNumber', label: 'Legajo' },
];

// Pantalla 4: Perfil.
export default function ProfileScreen() {
  const [profile, setProfile] = useState<Profile>({
    name: 'Martín Fernández',
    role: 'Capitán',
    aircraft: 'Boeing 737',
    license: 'ATPL N.º 48213',
    fileNumber: '0092',
  });
  const [editing, setEditing] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (
    <SafeAreaView style={common.screen} edges={['top']}>
      <ScrollView contentContainerStyle={common.content}>
        {/* Info del usuario */}
        <View style={styles.userInfo}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={48} color={colors.textFaint} />
          </View>
          <Text style={common.title}>{profile.name}</Text>
          <Text style={styles.role}>
            {profile.role} · {profile.aircraft}
          </Text>
          <Text style={styles.faint}>
            Licencia {profile.license} · Legajo {profile.fileNumber}
          </Text>

          <Pressable
            style={({ pressed }) => [styles.editButton, pressed && common.pressed]}
            onPress={() => setEditing(true)}
          >
            <Ionicons name="pencil" size={16} color={colors.text} />
            <Text style={styles.editText}>Editar perfil</Text>
          </Pressable>
        </View>

        <View style={styles.stats}>
          {stats.map((stat) => (
            <View key={stat.label} style={[common.card, styles.stat]}>
              <Text style={common.title}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        <Text style={[common.title, styles.sectionTitle]}>Cuenta</Text>

        <Pressable style={[common.card, styles.row]} onPress={() => setNotifications(!notifications)}>
          <View style={[styles.rowIcon, notifications && styles.rowIconOn]}>
            <Ionicons name="notifications" size={18} color={notifications ? colors.onAccent : colors.textFaint} />
          </View>
          <Text style={styles.rowLabel}>Notificaciones</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [common.card, styles.row, pressed && common.pressed]}
          onPress={() => router.push('/profile/add-flight')}
        >
          <View style={styles.rowIcon}>
            <Ionicons name="add-circle-outline" size={18} color={colors.cyan} />
          </View>
          <Text style={styles.rowLabel}>Agregar vuelos</Text>
          <Ionicons name="chevron-forward" size={18} color={colors.text} />
        </Pressable>

        <Pressable
          style={({ pressed }) => [common.card, styles.row, pressed && common.pressed]}
          onPress={() => router.push('/profile/edit-flights')}
        >
          <View style={styles.rowIcon}>
            <Ionicons name="create-outline" size={18} color={colors.cyan} />
          </View>
          <Text style={styles.rowLabel}>Modificar vuelos</Text>
          <Ionicons name="chevron-forward" size={18} color={colors.text} />
        </Pressable>

        <Pressable style={({ pressed }) => [common.card, styles.row, pressed && common.pressed]}>
          <View style={styles.rowIcon}>
            <Ionicons name="document-text-outline" size={18} color={colors.cyan} />
          </View>
          <Text style={styles.rowLabel}>Documentos y licencias</Text>
          <Ionicons name="chevron-forward" size={18} color={colors.text} />
        </Pressable>

        <Modal
          visible={editing}
          animationType="slide"
          presentationStyle="pageSheet"
          onRequestClose={() => setEditing(false)}
        >
          <View style={[common.screen, styles.modal]}>
            <View style={common.header}>
              <Text style={common.title}>Editar perfil</Text>
              <Pressable onPress={() => setEditing(false)}>
                <Text style={styles.save}>Listo</Text>
              </Pressable>
            </View>

            {userFields.map((field) => (
              <View key={field.key}>
                <Text style={styles.inputLabel}>{field.label}</Text>
                <TextInput
                  style={styles.input}
                  value={profile[field.key]}
                  onChangeText={(text) => setProfile({ ...profile, [field.key]: text })}
                />
              </View>
            ))}
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}
