import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import PhotoManager from '../models/managers/PhotoManager';

export default function usePhotoRecorder() {
  const photoManager = useMemo(() => new PhotoManager(), []);
  const cameraRef = useRef(null);

  const [permissionStatus, setPermissionStatus] = useState(null);
  const [photoUri, setPhotoUri] = useState(null);
  const [photoCoordinates, setPhotoCoordinates] = useState({ latitude: null, longitude: null });

  useEffect(() => {
    let isMounted = true;

    const initializePermission = async () => {
      const status = await photoManager.ensureCameraPermission();

      if (!isMounted) {
        return;
      }

      setPermissionStatus(status);
    };

    initializePermission();

    return () => {
      isMounted = false;
    };
  }, [photoManager]);

  const takePhoto = useCallback(async () => {
    if (!cameraRef.current) {
      return null;
    }

    const savedPhoto = await photoManager.capturePhoto(cameraRef.current);

    if (!savedPhoto?.uri) {
      return null;
    }

    setPhotoUri(savedPhoto.uri);
    setPhotoCoordinates({
      latitude: savedPhoto.latitude,
      longitude: savedPhoto.longitude,
    });

    return savedPhoto;
  }, [cameraRef, photoManager]);

  return {
    cameraRef,
    permissionStatus,
    photoUri,
    photoCoordinates,
    takePhoto,
  };
}
