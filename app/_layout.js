import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Slot, useRouter } from 'expo-router';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function RootLayout() {
  const [menuVisible, setMenuVisible] = useState(false);
  const router = useRouter();

  const navigateTo = (path) => {
    setMenuVisible(false);
    router.push(path);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Photo Recorder</Text>
          <Pressable
            accessibilityLabel="Abrir menú"
            style={styles.menuButton}
            onPress={() => setMenuVisible((value) => !value)}
          >
            <Text style={styles.menuButtonText}>☰</Text>
          </Pressable>
        </View>

        <View style={styles.content}>
          <Slot />
        </View>

        {menuVisible && (
          <View style={styles.menuOverlay} pointerEvents="box-none">
            <Pressable style={styles.backdrop} onPress={() => setMenuVisible(false)} />
            <View style={styles.menuCard}>
              <Text style={styles.menuTitle}>Menú</Text>
              <Pressable style={styles.menuItem} onPress={() => navigateTo('/gallery')}>
                <Text style={styles.menuItemText}>Galería</Text>
              </Pressable>
              <Pressable style={styles.menuItem} onPress={() => navigateTo('/')}>
                <Text style={styles.menuItemText}>Inicio</Text>
              </Pressable>
            </View>
          </View>
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#5005F2',
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
  },
  menuButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuButtonText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
    lineHeight: 22,
  },
  content: {
    flex: 1,
  },
  menuOverlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    backgroundColor: 'rgba(17, 24, 39, 0.15)',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  menuCard: {
    marginTop: 68,
    marginRight: 16,
    width: 200,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 14,
    elevation: 8,
  },
  menuTitle: {
    color: '#111827',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 10,
    marginTop: 4,
  },
  menuItemText: {
    color: '#1F2937',
    fontSize: 16,
    fontWeight: '600',
  },
});
