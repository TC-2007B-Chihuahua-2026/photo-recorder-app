import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import CameraTools from '../models/tools/CameraTools';
import LocationTools from '../models/tools/LocationTools';
import PhotoManager from '../models/managers/PhotoManager';

export default function usePhotoRecorder() {
  const cameraTools = useMemo(() => new CameraTools(), []);
  const locationTools = useMemo(() => new LocationTools(), []);
  const photoManager = useMemo(() => new PhotoManager(), []);
  const cameraRef = useRef(null);

  const [permissionStatus, setPermissionStatus] = useState(null);
  const [photoUri, setPhotoUri] = useState(null);
  const [photoCoordinates, setPhotoCoordinates] = useState({ latitude: null, longitude: null });

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

    let latitude = null;
    let longitude = null;

    const locationStatus = await locationTools.checkLocationPermission();

    if (locationStatus === 'granted') {
      const currentLocation = await locationTools.getCurrentLocation();
      latitude = currentLocation?.latitude ?? null;
      longitude = currentLocation?.longitude ?? null;
    } else if (locationStatus !== 'denied') {
      const requestedStatus = await locationTools.requestLocationPermission();

      if (requestedStatus === 'granted') {
        const currentLocation = await locationTools.getCurrentLocation();
        latitude = currentLocation?.latitude ?? null;
        longitude = currentLocation?.longitude ?? null;
      }
    }

    const savedPhoto = photoManager.setCurrentPhoto(photo.uri, undefined, latitude, longitude);
    setPhotoUri(savedPhoto.uri);
    setPhotoCoordinates({
      latitude: savedPhoto.latitude,
      longitude: savedPhoto.longitude,
    });
    return savedPhoto;
  }, [cameraRef, cameraTools, locationTools, photoManager]);

  return {
    cameraRef,
    permissionStatus,
    photoUri,
    photoCoordinates,
    takePhoto,
  };
}
