import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import CameraTools from '../models/tools/CameraTools';
import PhotoManager from '../models/managers/PhotoManager';

export default function usePhotoRecorder() {
  const cameraTools = useMemo(() => new CameraTools(), []);
  const photoManager = useMemo(() => new PhotoManager(), []);
  const cameraRef = useRef(null);

  const [permissionStatus, setPermissionStatus] = useState(null);
  const [photoUri, setPhotoUri] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const initializePermission = async () => {
      const status = await cameraTools.checkCameraPermission();

      if (!isMounted) {
        return;
      }

      setPermissionStatus(status);

      if (status !== 'granted') {
        const requestedStatus = await cameraTools.requestCameraPermission();
        if (isMounted) {
          setPermissionStatus(requestedStatus);
        }
      }
    };

    initializePermission();

    return () => {
      isMounted = false;
    };
  }, [cameraTools]);

  const takePhoto = useCallback(async () => {
    if (!cameraRef.current) {
      return null;
    }

    const photo = await cameraTools.takePhoto(cameraRef.current);

    if (!photo?.uri) {
      return null;
    }

    const savedPhoto = photoManager.setCurrentPhoto(photo.uri);
    setPhotoUri(savedPhoto.uri);
    return savedPhoto;
  }, [cameraRef, cameraTools, photoManager]);

  return {
    cameraRef,
    permissionStatus,
    photoUri,
    takePhoto,
  };
}
