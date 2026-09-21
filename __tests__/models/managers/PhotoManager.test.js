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

  it('should capture a photo and attach the current location', async () => {
    // GIVEN
    const cameraRef = { takePictureAsync: jest.fn() };
    mockCameraTools.takePhoto.mockResolvedValue({ uri: 'file:///mocked-photo.jpg' });
    mockLocationTools.checkLocationPermission.mockResolvedValue('granted');
    mockLocationTools.getCurrentLocation.mockResolvedValue({ latitude: 28.632995, longitude: -106.069099 });
    const photoManager = new PhotoManager(mockCameraTools, mockLocationTools);

    // WHEN
    const currentPhoto = await photoManager.capturePhoto(cameraRef);

    // THEN
    expect(currentPhoto.uri).toBe('file:///mocked-photo.jpg');
    expect(currentPhoto.latitude).toBe(28.632995);
    expect(currentPhoto.longitude).toBe(-106.069099);
    expect(photoManager.getCurrentPhoto()).toBe(currentPhoto);
    expect(mockCameraTools.takePhoto).toHaveBeenCalledWith(cameraRef);
    expect(mockLocationTools.getCurrentLocation).toHaveBeenCalledTimes(1);
  });
});
