import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function PhotoRecorderScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Photo Recorder</Text>
      <Text style={styles.description}>
        Captura una foto y registra su ubicación.
      </Text>

      <Pressable style={styles.button} onPress={() => {}}>
        <Text style={styles.buttonText}>Tomar foto</Text>
      </Pressable>

      <View style={styles.previewContainer}>
        <Text style={styles.previewText}>Foto tomada aparecerá aquí</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#4B5563',
    marginBottom: 24,
    lineHeight: 22,
  },
  button: {
    backgroundColor: '#5005F2',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  previewContainer: {
    flex: 1,
    marginTop: 28,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  previewText: {
    color: '#6B7280',
    fontSize: 16,
    textAlign: 'center',
  },
});
