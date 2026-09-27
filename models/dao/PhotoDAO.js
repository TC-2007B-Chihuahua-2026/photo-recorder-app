import Database from '../database/Database';
import PhotoVO from '../valueobjects/PhotoVO';

/**
 * Data access object responsible for persisting and retrieving photo records in SQLite.
 */
class PhotoDAO {
  /**
   * Creates a PhotoDAO instance.
   *
   * @param {object|null} [database=null] - Optional SQLite database instance.
   */
  constructor(database = null) {
    this.database = database;
  }

  /**
   * Inserts a photo record into the database and returns the persisted value object.
   *
   * @param {PhotoVO} photo - Photo value object to persist.
   * @returns {Promise<PhotoVO>} The saved photo including the generated database id.
   * @throws {Error} If the database connection is unavailable.
   */
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

  /**
   * Retrieves all saved photos.
   *
   * @returns {Promise<PhotoVO[]>} A list of photo value objects.
   * @throws {Error} This method is not implemented yet.
   */
  getPhotos() {
    throw new Error('PhotoDAO.getPhotos is not implemented yet.');
  }

  /**
   * Retrieves a photo by its identifier.
   *
   * @returns {Promise<PhotoVO|null>} The matching photo or null when no record is found.
   * @throws {Error} This method is not implemented yet.
   */
  getPhotoById() {
    throw new Error('PhotoDAO.getPhotoById is not implemented yet.');
  }

  /**
   * Deletes a photo by its identifier.
   *
   * @returns {Promise<boolean>} True when deletion succeeds.
   * @throws {Error} This method is not implemented yet.
   */
  deletePhoto() {
    throw new Error('PhotoDAO.deletePhoto is not implemented yet.');
  }
}

export default PhotoDAO;
