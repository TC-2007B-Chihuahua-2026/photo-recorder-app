import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

const placeholderPhotos = [
  {
    id: 1,
    label: 'Reunión',
    createdAt: '2026-09-27 10:42',
    latitude: '40.4168',
    longitude: '-3.7038',
    color: '#E0E7FF',
    accent: '#4F46E5',
  },
  {
    id: 2,
    label: 'Paisaje',
    createdAt: '2026-09-27 12:15',
    latitude: '41.6529',
    longitude: '-0.8801',
    color: '#DCFCE7',
    accent: '#16A34A',
  },
  {
    id: 3,
    label: 'Café',
    createdAt: '2026-09-27 15:05',
    latitude: '40.4172',
    longitude: '-3.7040',
    color: '#FEF3C7',
    accent: '#D97706',
  },
  {
    id: 4,
    label: 'Archivo',
    createdAt: '2026-09-27 18:35',
    latitude: '39.4699',
    longitude: '-0.3763',
    color: '#F3E8FF',
    accent: '#9333EA',
  },
];

export default function GalleryScreen() {
  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
      <View style={styles.cardSummary}>
        <Text style={styles.summaryText}>4 fotos guardadas</Text>
      </View>

      <View style={styles.grid}>
        {placeholderPhotos.map((photo) => (
          <View key={photo.id} style={styles.photoCard}>
            <View style={[styles.photoPlaceholder, { backgroundColor: photo.color }]}>
              <View style={[styles.photoBadge, { backgroundColor: photo.accent }]} />
            </View>

            <View style={styles.photoInfo}>
              <Text style={styles.photoLabel}>{photo.label}</Text>

              <View style={styles.metaRow}>
                <Text style={styles.metaLabel}>Fecha</Text>
                <Text style={styles.metaValue}>{photo.createdAt}</Text>
              </View>

              <View style={styles.metaRow}>
                <Text style={styles.metaLabel}>Latitud</Text>
                <Text style={styles.metaValue}>{photo.latitude}</Text>
              </View>

              <View style={styles.metaRow}>
                <Text style={styles.metaLabel}>Longitud</Text>
                <Text style={styles.metaValue}>{photo.longitude}</Text>
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
  photoPlaceholder: {
    height: 180,
    justifyContent: 'flex-end',
    padding: 12,
  },
  photoBadge: {
    width: 18,
    height: 18,
    borderRadius: 9,
    opacity: 0.9,
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
  },
});
