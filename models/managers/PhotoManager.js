import CameraTools from '../tools/CameraTools';
import LocationTools from '../tools/LocationTools';
import PhotoVO from '../valueobjects/PhotoVO';

class PhotoManager {
  constructor(cameraTools = new CameraTools(), locationTools = new LocationTools()) {
    this.cameraTools = cameraTools;
    this.locationTools = locationTools;
    this.currentPhoto = null;
  }

  async ensureCameraPermission() {
    const status = await this.cameraTools.checkCameraPermission();

    if (status !== 'granted') {
      return this.cameraTools.requestCameraPermission();
    }

    return status;
  }

  async ensureLocationPermission() {
    const status = await this.locationTools.checkLocationPermission();

    if (status !== 'granted') {
      return this.locationTools.requestLocationPermission();
    }

    return status;
  }

  async capturePhoto(cameraRef) {
    if (!cameraRef || typeof cameraRef.takePictureAsync !== 'function') {
      throw new Error('Camera ref is required');
    }

    const photo = await this.cameraTools.takePhoto(cameraRef);

    if (!photo?.uri) {
      return null;
    }

    let latitude = null;
    let longitude = null;

    const locationStatus = await this.ensureLocationPermission();

    if (locationStatus === 'granted') {
      const currentLocation = await this.locationTools.getCurrentLocation();
      latitude = currentLocation?.latitude ?? null;
      longitude = currentLocation?.longitude ?? null;
    }

    const savedPhoto = this.setCurrentPhoto(photo.uri, undefined, latitude, longitude);
    return savedPhoto;
  }

  setCurrentPhoto(uri, createdAt = new Date().toISOString(), latitude = null, longitude = null) {
    this.currentPhoto = new PhotoVO(uri, createdAt, latitude, longitude);
    return this.currentPhoto;
  }

  getCurrentPhoto() {
    return this.currentPhoto;
  }

  clearCurrentPhoto() {
    this.currentPhoto = null;
  }
}

export default PhotoManager;
