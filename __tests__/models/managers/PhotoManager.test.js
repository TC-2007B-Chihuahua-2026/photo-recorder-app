import PhotoManager from '../../../models/managers/PhotoManager';

const mockCameraTools = {
  checkCameraPermission: jest.fn(),
  requestCameraPermission: jest.fn(),
  takePhoto: jest.fn(),
};

const mockLocationTools = {
  checkLocationPermission: jest.fn(),
  requestLocationPermission: jest.fn(),
  getCurrentLocation: jest.fn(),
};

const mockPhotoDAO = {
  insertPhoto: jest.fn(),
  getPhotos: jest.fn(),
  getPhotoById: jest.fn(),
};

describe('PhotoManager', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a PhotoVO when a photo uri is set', () => {
    // GIVEN
    const photoManager = new PhotoManager(mockCameraTools, mockLocationTools);

    // WHEN
    const photo = photoManager.setCurrentPhoto('file:///photo.jpg');

    // THEN
    expect(photo.uri).toBe('file:///photo.jpg');
    expect(photoManager.getCurrentPhoto()).toBe(photo);
  });

  it('should allow clearing the current photo state', () => {
    // GIVEN
    const photoManager = new PhotoManager(mockCameraTools, mockLocationTools);
    photoManager.setCurrentPhoto('file:///photo.jpg');

    // WHEN
    photoManager.clearCurrentPhoto();

    // THEN
    expect(photoManager.getCurrentPhoto()).toBeNull();
  });

  it('should save latitude and longitude when they are provided', () => {
    // GIVEN
    const photoManager = new PhotoManager(mockCameraTools, mockLocationTools);

    // WHEN
    const photo = photoManager.setCurrentPhoto('file:///photo.jpg', undefined, 28.632995, -106.069099);

    // THEN
    expect(photo.latitude).toBe(28.632995);
    expect(photo.longitude).toBe(-106.069099);
    expect(photoManager.getCurrentPhoto()).toBe(photo);
  });

  it('should request the camera permission when it has not been granted', async () => {
    // GIVEN
    mockCameraTools.checkCameraPermission.mockResolvedValue('denied');
    mockCameraTools.requestCameraPermission.mockResolvedValue('granted');
    const photoManager = new PhotoManager(mockCameraTools, mockLocationTools);

    // WHEN
    const status = await photoManager.ensureCameraPermission();

    // THEN
    expect(status).toBe('granted');
    expect(mockCameraTools.requestCameraPermission).toHaveBeenCalledTimes(1);
  });

  it('should retrieve all photos from the DAO', async () => {
    // GIVEN
    const savedPhotos = [
      {
        id: 2,
        uri: 'file:///photo-2.jpg',
        createdAt: '2026-09-27T11:00:00.000Z',
        latitude: 28.6353,
        longitude: -106.0889,
      },
      {
        id: 1,
        uri: 'file:///photo-1.jpg',
        createdAt: '2026-09-27T10:00:00.000Z',
        latitude: 28.6329,
        longitude: -106.0691,
      },
    ];
    mockPhotoDAO.getPhotos.mockResolvedValue(savedPhotos);
    const photoManager = new PhotoManager(mockCameraTools, mockLocationTools, mockPhotoDAO);

    // WHEN
    const photos = await photoManager.getPhotos();

    // THEN
    expect(mockPhotoDAO.getPhotos).toHaveBeenCalledTimes(1);
    expect(photos).toEqual(savedPhotos);
  });

  it('should retrieve a photo by id from the DAO', async () => {
    // GIVEN
    const savedPhoto = {
      id: 2,
      uri: 'file:///photo-2.jpg',
      createdAt: '2026-09-27T11:00:00.000Z',
      latitude: 28.6353,
      longitude: -106.0889,
    };
    mockPhotoDAO.getPhotoById.mockResolvedValue(savedPhoto);
    const photoManager = new PhotoManager(mockCameraTools, mockLocationTools, mockPhotoDAO);

    // WHEN
    const photo = await photoManager.getPhotoById(2);

    // THEN
    expect(mockPhotoDAO.getPhotoById).toHaveBeenCalledWith(2);
    expect(photo).toEqual(savedPhoto);
  });

  it('should capture a photo and persist it with the generated id inside capturePhoto', async () => {
    // GIVEN
    const cameraRef = { takePictureAsync: jest.fn() };
    mockCameraTools.takePhoto.mockResolvedValue({ uri: 'file:///mocked-photo.jpg' });
    mockLocationTools.checkLocationPermission.mockResolvedValue('granted');
    mockLocationTools.getCurrentLocation.mockResolvedValue({ latitude: 28.632995, longitude: -106.069099 });
    mockPhotoDAO.insertPhoto.mockResolvedValue({
      id: 42,
      uri: 'file:///mocked-photo.jpg',
      createdAt: expect.any(String),
      latitude: 28.632995,
      longitude: -106.069099,
    });
    const photoManager = new PhotoManager(mockCameraTools, mockLocationTools, mockPhotoDAO);

    // WHEN
    const currentPhoto = await photoManager.capturePhoto(cameraRef);

    // THEN
    expect(mockPhotoDAO.insertPhoto).toHaveBeenCalledTimes(1);
    expect(currentPhoto.id).toBe(42);
    expect(currentPhoto.uri).toBe('file:///mocked-photo.jpg');
    expect(currentPhoto.latitude).toBe(28.632995);
    expect(currentPhoto.longitude).toBe(-106.069099);
    expect(photoManager.getCurrentPhoto()).toBe(currentPhoto);
    expect(mockCameraTools.takePhoto).toHaveBeenCalledWith(cameraRef);
    expect(mockLocationTools.getCurrentLocation).toHaveBeenCalledTimes(1);
  });
});
