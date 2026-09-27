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
  async getPhotos() {
    const database = this.database || Database.getInstance();

    if (!database || typeof database.getAllAsync !== 'function') {
      throw new Error('Database connection is required for PhotoDAO.getPhotos.');
    }

    const rows = await database.getAllAsync('SELECT * FROM photos ORDER BY createdAt DESC');

    return rows.map((row) => {
      const photo = new PhotoVO(row.uri, row.createdAt, row.latitude, row.longitude);
      photo.id = row.id;
      return photo;
    });
  }

  /**
   * Retrieves a photo by its identifier.
   *
   * @param {number} id - The primary key of the photo record.
   * @returns {Promise<PhotoVO|null>} The matching photo or null when no record is found.
   */
  async getPhotoById(id) {
    const database = this.database || Database.getInstance();

    if (!database || typeof database.getFirstAsync !== 'function') {
      throw new Error('Database connection is required for PhotoDAO.getPhotoById.');
    }

    const row = await database.getFirstAsync('SELECT * FROM photos WHERE id = ?', id);

    if (!row) {
      return null;
    }

    const photo = new PhotoVO(row.uri, row.createdAt, row.latitude, row.longitude);
    photo.id = row.id;
    return photo;
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
