import PhotoVO from '../valueobjects/PhotoVO';

class PhotoManager {
  constructor() {
    this.currentPhoto = null;
  }

  setCurrentPhoto(uri, createdAt = new Date().toISOString()) {
    this.currentPhoto = new PhotoVO(uri, createdAt);
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
