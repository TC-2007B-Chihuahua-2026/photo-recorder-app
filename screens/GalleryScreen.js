import React, { useEffect } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import usePhotoGallery from '../hooks/usePhotoGallery';

export default function GalleryScreen() {
  const { photos, isLoading, error, refreshPhotos } = usePhotoGallery();

  useEffect(() => {
    refreshPhotos();
  }, [refreshPhotos]);

  const formatDate = (value) => {
    if (!value) {
      return 'No disponible';
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return value;
    }

    return date.toLocaleString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
      <View style={styles.cardSummary}>
        <Text style={styles.summaryText}>
          {isLoading ? 'Cargando fotos...' : `${photos.length} fotos guardadas`}
        </Text>
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {!isLoading && photos.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No hay fotos guardadas todavía.</Text>
        </View>
      ) : null}

      <View style={styles.grid}>
        {photos.map((photo) => (
          <View key={photo.id ?? photo.uri} style={styles.photoCard}>
            {photo.uri ? (
              <Image source={{ uri: photo.uri }} style={styles.photoImage} />
            ) : (
              <View style={styles.photoPlaceholder} />
            )}

            <View style={styles.photoInfo}>
              <Text style={styles.photoLabel}>Foto {photo.id ?? 'nueva'}</Text>

              <View style={styles.metaRow}>
                <Text style={styles.metaLabel}>Fecha</Text>
                <Text style={styles.metaValue}>{formatDate(photo.createdAt)}</Text>
              </View>

              <View style={styles.metaRow}>
                <Text style={styles.metaLabel}>Latitud</Text>
                <Text style={styles.metaValue}>{photo.latitude ?? 'No disponible'}</Text>
              </View>

              <View style={styles.metaRow}>
                <Text style={styles.metaLabel}>Longitud</Text>
                <Text style={styles.metaValue}>{photo.longitude ?? 'No disponible'}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 32,
  },
  cardSummary: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 18,
  },
  summaryText: {
    color: '#374151',
    fontSize: 15,
    fontWeight: '600',
  },
  errorText: {
    color: '#B91C1C',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 12,
  },
  emptyState: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 14,
    padding: 18,
    marginBottom: 18,
  },
  emptyText: {
    color: '#6B7280',
    fontSize: 14,
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  photoCard: {
    width: '48%',
    marginBottom: 18,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    overflow: 'hidden',
  },
  photoImage: {
    width: '100%',
    height: 180,
    backgroundColor: '#E5E7EB',
  },
  photoPlaceholder: {
    height: 180,
    backgroundColor: '#E5E7EB',
  },
  photoInfo: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  photoLabel: {
    color: '#1F2937',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 10,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  metaLabel: {
    color: '#6B7280',
    fontSize: 11,
    fontWeight: '600',
  },
  metaValue: {
    color: '#111827',
    fontSize: 11,
    fontWeight: '600',
    flexShrink: 1,
    textAlign: 'right',
    marginLeft: 8,
  },
});
