import PhotoDAO from '../../../models/dao/PhotoDAO';
import PhotoVO from '../../../models/valueobjects/PhotoVO';

describe('PhotoDAO', () => {
  it('should insert a photo into the photos table and return a PhotoVO with the generated id', async () => {
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
    expect(result).toMatchObject({
      id: 7,
      uri: photo.uri,
      createdAt: photo.createdAt,
      latitude: photo.latitude,
      longitude: photo.longitude,
    });
    expect(result.constructor.name).toBe('PhotoVO');
  });

  it('should retrieve all photos and map them to PhotoVO instances', async () => {
    // GIVEN
    const database = {
      getAllAsync: jest.fn().mockResolvedValue([
        {
          id: 2,
          uri: 'file://photo-2.png',
          createdAt: '2026-09-27T11:00:00.000Z',
          latitude: 28.6353,
          longitude: -106.0889,
        },
        {
          id: 1,
          uri: 'file://photo-1.png',
          createdAt: '2026-09-27T10:00:00.000Z',
          latitude: 28.6329,
          longitude: -106.0691,
        },
      ]),
    };

    const dao = new PhotoDAO(database);

    // WHEN
    const result = await dao.getPhotos();

    // THEN
    expect(database.getAllAsync).toHaveBeenCalledWith('SELECT * FROM photos ORDER BY createdAt DESC');
    expect(result).toHaveLength(2);
    expect(result[0]).toBeInstanceOf(PhotoVO);
    expect(result[0]).toMatchObject({
      id: 2,
      uri: 'file://photo-2.png',
      createdAt: '2026-09-27T11:00:00.000Z',
      latitude: 28.6353,
      longitude: -106.0889,
    });
  });

  it('should retrieve a photo by id or return null when not found', async () => {
    // GIVEN
    const database = {
      getFirstAsync: jest
        .fn()
        .mockResolvedValueOnce({
          id: 7,
          uri: 'file://photo.png',
          createdAt: '2026-09-27T10:00:00.000Z',
          latitude: 28.6353,
          longitude: -106.0889,
        })
        .mockResolvedValueOnce(null),
    };

    const dao = new PhotoDAO(database);

    // WHEN
    const result = await dao.getPhotoById(7);
    const missingResult = await dao.getPhotoById(999);

    // THEN
    expect(database.getFirstAsync).toHaveBeenCalledWith('SELECT * FROM photos WHERE id = ?', 7);
    expect(result).toBeInstanceOf(PhotoVO);
    expect(result).toMatchObject({
      id: 7,
      uri: 'file://photo.png',
      createdAt: '2026-09-27T10:00:00.000Z',
      latitude: 28.6353,
      longitude: -106.0889,
    });
    expect(missingResult).toBeNull();
  });
});
