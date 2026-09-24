import PhotoManager from '../../../models/managers/PhotoManager';

const mockCameraTools = {
  takePhoto: jest.fn(),
};

describe('PhotoManager', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a PhotoVO when a photo uri is set', () => {
    // GIVEN
    const photoManager = new PhotoManager();

    // WHEN
    const photo = photoManager.setCurrentPhoto('file:///photo.jpg');

    // THEN
    expect(photo.uri).toBe('file:///photo.jpg');
    expect(photoManager.getCurrentPhoto()).toBe(photo);
  });

  it('should allow clearing the current photo state', () => {
    // GIVEN
    const photoManager = new PhotoManager();
    photoManager.setCurrentPhoto('file:///photo.jpg');

    // WHEN
    photoManager.clearCurrentPhoto();

    // THEN
    expect(photoManager.getCurrentPhoto()).toBeNull();
  });

  it('should use the mocked CameraTools result to build the current photo state', async () => {
    // GIVEN
    const photoManager = new PhotoManager();
    mockCameraTools.takePhoto.mockResolvedValue({ uri: 'file:///mocked-photo.jpg' });

    // WHEN
    const photoResult = await mockCameraTools.takePhoto({ takePictureAsync: jest.fn() });
    const currentPhoto = photoManager.setCurrentPhoto(photoResult.uri);

    // THEN
    expect(currentPhoto.uri).toBe('file:///mocked-photo.jpg');
    expect(photoManager.getCurrentPhoto()).toBe(currentPhoto);
    expect(mockCameraTools.takePhoto).toHaveBeenCalledTimes(1);
  });
});
