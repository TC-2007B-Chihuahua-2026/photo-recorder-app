import Database from '../database/Database';
import PhotoVO from '../valueobjects/PhotoVO';

class PhotoDAO {
  constructor(database = null) {
    this.database = database;
  }

  async insertPhoto(photo) {
    const database = this.database || Database.getInstance();

    if (!database || typeof database.runAsync !== 'function') {
      throw new Error('Database connection is required for PhotoDAO.insertPhoto.');
    }

    const result = await database.runAsync(
      'INSERT INTO photos (uri, createdAt, latitude, longitude) VALUES (?, ?, ?, ?)',
      photo.uri,
      photo.createdAt,
      photo.latitude,
      photo.longitude
    );

    const persistedPhoto = new PhotoVO(
      photo.uri,
      photo.createdAt,
      photo.latitude,
      photo.longitude
    );

    persistedPhoto.id = result.lastInsertRowId;
    return persistedPhoto;
  }

  getPhotos() {
    throw new Error('PhotoDAO.getPhotos is not implemented yet.');
  }

  getPhotoById() {
    throw new Error('PhotoDAO.getPhotoById is not implemented yet.');
  }

  deletePhoto() {
    throw new Error('PhotoDAO.deletePhoto is not implemented yet.');
  }
}

export default PhotoDAO;
