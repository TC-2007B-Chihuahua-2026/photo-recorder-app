import PhotoDAO from '../dao/PhotoDAO';
import CameraTools from '../tools/CameraTools';
import LocationTools from '../tools/LocationTools';
import PhotoVO from '../valueobjects/PhotoVO';

/**
 * Coordinates photo capture, location retrieval, and persistence for the recorder flow.
 */
class PhotoManager {
  /**
   * Creates a PhotoManager with the required camera, location, and DAO dependencies.
   *
   * @param {CameraTools} [cameraTools=new CameraTools()] - Camera interaction helper.
   * @param {LocationTools} [locationTools=new LocationTools()] - Geolocation helper.
   * @param {PhotoDAO} [photoDAO=new PhotoDAO()] - Storage adapter for photos.
   */
  constructor(
    cameraTools = new CameraTools(),
    locationTools = new LocationTools(),
    photoDAO = new PhotoDAO()
  ) {
    this.cameraTools = cameraTools;
    this.locationTools = locationTools;
    this.photoDAO = photoDAO;
    this.currentPhoto = null;
  }

  /**
   * Verifies that camera permissions are granted, requesting them if needed.
   *
   * @returns {Promise<string>} The resulting permission status.
   */
  async ensureCameraPermission() {
    const status = await this.cameraTools.checkCameraPermission();

    if (status !== 'granted') {
      return this.cameraTools.requestCameraPermission();
    }

    return status;
  }

  /**
   * Verifies that location permissions are granted, requesting them if needed.
   *
   * @returns {Promise<string>} The resulting permission status.
   */
  async ensureLocationPermission() {
    const status = await this.locationTools.checkLocationPermission();

    if (status !== 'granted') {
      return this.locationTools.requestLocationPermission();
    }

    return status;
  }

  /**
   * Captures a photo, reads the current GPS position when permitted, and saves the resulting record.
   *
   * @param {object} cameraRef - Ref object that exposes takePictureAsync.
   * @returns {Promise<PhotoVO|null>} The saved photo value object or null when no photo uri is available.
   * @throws {Error} When the camera ref is missing or invalid.
   */
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

    const capturedPhoto = this.setCurrentPhoto(photo.uri, undefined, latitude, longitude);

    if (this.photoDAO && typeof this.photoDAO.insertPhoto === 'function') {
      const savedPhoto = await this.photoDAO.insertPhoto(capturedPhoto);
      this.currentPhoto = savedPhoto;
      return savedPhoto;
    }

    return capturedPhoto;
  }

  /**
   * Builds a PhotoVO with the supplied capture metadata.
   *
   * @param {string} uri - Local URI of the photo.
   * @param {string} [createdAt=new Date().toISOString()] - Timestamp for the capture.
   * @param {number|null} [latitude=null] - Latitude of the capture.
   * @param {number|null} [longitude=null] - Longitude of the capture.
   * @returns {PhotoVO} The newly created photo value object.
   */
  setCurrentPhoto(uri, createdAt = new Date().toISOString(), latitude = null, longitude = null) {
    this.currentPhoto = new PhotoVO(uri, createdAt, latitude, longitude);
    return this.currentPhoto;
  }

  /**
   * Returns the current photo in memory.
   *
   * @returns {PhotoVO|null} The latest photo record or null when none exists.
   */
  getCurrentPhoto() {
    return this.currentPhoto;
  }

  /**
   * Clears the current saved photo reference.
   *
   * @returns {void}
   */
  clearCurrentPhoto() {
    this.currentPhoto = null;
  }
}

export default PhotoManager;
