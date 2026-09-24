import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { CameraView } from 'expo-camera';
import usePhotoRecorder from '../hooks/usePhotoRecorder';

export default function PhotoRecorderScreen() {
  const { cameraRef, permissionStatus, photoUri, photoCoordinates, takePhoto } = usePhotoRecorder();

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Photo Recorder</Text>
        <Text style={styles.description}>
          Captura una foto y registra su ubicación.
        </Text>

        <View style={styles.cameraContainer}>
          {permissionStatus === 'granted' ? (
            <CameraView ref={cameraRef} style={styles.camera} facing="back" />
          ) : (
            <View style={styles.cameraPlaceholder}>
              <Text style={styles.previewText}>
                {permissionStatus === 'denied'
                  ? 'Se necesitan permisos de cámara.'
                  : 'Solicitando permisos de cámara...'}
              </Text>
            </View>
          )}
        </View>

        <Pressable style={styles.button} onPress={takePhoto}>
          <Text style={styles.buttonText}>Tomar foto</Text>
        </Pressable>

        <View style={styles.previewContainer}>
          {photoUri ? (
            <View style={styles.previewContent}>
              <Image source={{ uri: photoUri }} style={styles.previewImage} />
              <View style={styles.locationContainer}>
                <Text style={styles.locationLabel}>Ubicación</Text>
                <Text style={styles.locationText}>
                  Latitud: {photoCoordinates.latitude ?? 'No disponible'}
                </Text>
                <Text style={styles.locationText}>
                  Longitud: {photoCoordinates.longitude ?? 'No disponible'}
                </Text>
              </View>
            </View>
          ) : (
            <Text style={styles.previewText}>Foto tomada aparecerá aquí</Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 32,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
  cameraContainer: {
    height: 240,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
    backgroundColor: '#111827',
  },
  camera: {
    flex: 1,
  },
  cameraPlaceholder: {
    flex: 1,
    backgroundColor: '#111827',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
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
    padding: 16,
  },
  previewContent: {
    flex: 1,
    width: '100%',
  },
  previewText: {
    color: '#6B7280',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 12,
  },
  previewImage: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    marginBottom: 12,
  },
  locationContainer: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  locationLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 6,
  },
  locationText: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 2,
  },
});
