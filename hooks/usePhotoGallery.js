import { useCallback, useMemo, useState } from 'react';
import PhotoManager from '../models/managers/PhotoManager';

/**
 * Hook that loads and exposes the photo gallery state from the manager layer.
 *
 * @returns {{
 *   photos: Array<object>,
 *   selectedPhoto: object|null,
 *   isLoading: boolean,
 *   error: string|null,
 *   refreshPhotos: () => Promise<Array<object>>,
 *   loadPhotoById: (id: number) => Promise<object|null>
 * }} The gallery state and data access helpers.
 */
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
