class PhotoDAO {
  constructor(database) {
    this.database = database;
  }

  async insertPhoto(photo) {
    if (!this.database || typeof this.database.runAsync !== 'function') {
      throw new Error('Database connection is required for PhotoDAO.insertPhoto.');
    }

    return this.database.runAsync(
      'INSERT INTO photos (uri, createdAt, latitude, longitude) VALUES (?, ?, ?, ?)',
      photo.uri,
      photo.createdAt,
      photo.latitude,
      photo.longitude
    );
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
