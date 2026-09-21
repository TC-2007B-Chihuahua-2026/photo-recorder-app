import PhotoVO from '../valueobjects/PhotoVO';

class PhotoManager {
  constructor() {
    this.currentPhoto = null;
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
