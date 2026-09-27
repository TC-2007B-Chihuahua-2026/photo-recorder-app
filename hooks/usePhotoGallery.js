import { useCallback, useMemo, useState } from 'react';
import PhotoManager from '../models/managers/PhotoManager';

export default function usePhotoGallery() {
  const photoManager = useMemo(() => new PhotoManager(), []);

  const [photos, setPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const refreshPhotos = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const savedPhotos = await photoManager.getPhotos();
      setPhotos(savedPhotos);
      return savedPhotos;
    } catch (err) {
      setError(err?.message || 'No se pudieron cargar las fotos.');
      return [];
    } finally {
      setIsLoading(false);
    }
  }, [photoManager]);

  const loadPhotoById = useCallback(async (id) => {
    setIsLoading(true);
    setError(null);

    try {
      const photo = await photoManager.getPhotoById(id);
      setSelectedPhoto(photo);
      return photo;
    } catch (err) {
      setError(err?.message || 'No se pudo cargar la foto.');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [photoManager]);

  return {
    photos,
    selectedPhoto,
    isLoading,
    error,
    refreshPhotos,
    loadPhotoById,
  };
}
