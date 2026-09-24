import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import PhotoRecorderScreen from './screens/PhotoRecorderScreen';

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
        <Text style={styles.headerTitle}>Photo Recorder</Text>
        <PhotoRecorderScreen />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    backgroundColor: '#5005F2',
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
});
