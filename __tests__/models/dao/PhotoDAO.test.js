import PhotoDAO from '../../../models/dao/PhotoDAO';

describe('PhotoDAO', () => {
  it('should insert a photo into the photos table', async () => {
    // GIVEN
    const database = {
      runAsync: jest.fn().mockResolvedValue({ lastInsertRowId: 7, changes: 1 }),
    };

    const photo = {
      uri: 'file://photo.png',
      createdAt: '2026-09-27T10:00:00.000Z',
      latitude: 28.6353,
      longitude: -106.0889,
    };

    const dao = new PhotoDAO(database);

    // WHEN
    const result = await dao.insertPhoto(photo);

    // THEN
    expect(database.runAsync).toHaveBeenCalledWith(
      'INSERT INTO photos (uri, createdAt, latitude, longitude) VALUES (?, ?, ?, ?)',
      photo.uri,
      photo.createdAt,
      photo.latitude,
      photo.longitude
    );
    expect(result).toEqual({ lastInsertRowId: 7, changes: 1 });
  });

  it('should mark pending methods as not implemented yet', () => {
    // GIVEN
    const dao = new PhotoDAO({ runAsync: jest.fn() });

    // WHEN
    const getPhotosCall = () => dao.getPhotos();
    const deletePhotoCall = () => dao.deletePhoto(1);

    // THEN
    expect(getPhotosCall).toThrow('PhotoDAO.getPhotos is not implemented yet.');
    expect(deletePhotoCall).toThrow('PhotoDAO.deletePhoto is not implemented yet.');
  });
});
