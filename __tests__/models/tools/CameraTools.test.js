import CameraTools from '../../../models/tools/CameraTools';
import { Camera } from 'expo-camera';

jest.mock('expo-camera', () => ({
  Camera: {
    getCameraPermissionsAsync: jest.fn(),
    requestCameraPermissionsAsync: jest.fn(),
  },
}));

describe('CameraTools', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return granted when the camera permission is granted', async () => {
    // GIVEN
    Camera.getCameraPermissionsAsync.mockResolvedValue({ status: 'granted' });
    const cameraTools = new CameraTools();

    // WHEN
    const result = await cameraTools.checkCameraPermission();

    // THEN
    expect(result).toBe('granted');
    expect(Camera.getCameraPermissionsAsync).toHaveBeenCalledTimes(1);
  });

  it('should return denied when the camera permission is denied', async () => {
    // GIVEN
    Camera.getCameraPermissionsAsync.mockResolvedValue({ status: 'denied' });
    const cameraTools = new CameraTools();

    // WHEN
    const result = await cameraTools.checkCameraPermission();

    // THEN
    expect(result).toBe('denied');
    expect(Camera.getCameraPermissionsAsync).toHaveBeenCalledTimes(1);
  });

  it('should return undetermined when the camera permission is still unknown', async () => {
    // GIVEN
    Camera.getCameraPermissionsAsync.mockResolvedValue({ status: 'undetermined' });
    const cameraTools = new CameraTools();

    // WHEN
    const result = await cameraTools.checkCameraPermission();

    // THEN
    expect(result).toBe('undetermined');
    expect(Camera.getCameraPermissionsAsync).toHaveBeenCalledTimes(1);
  });

  it('should request camera permission and return granted when permission is accepted', async () => {
    // GIVEN
    Camera.requestCameraPermissionsAsync.mockResolvedValue({ status: 'granted' });
    const cameraTools = new CameraTools();

    // WHEN
    const result = await cameraTools.requestCameraPermission();

    // THEN
    expect(result).toBe('granted');
    expect(cameraTools.permissionStatus).toBe('granted');
    expect(Camera.requestCameraPermissionsAsync).toHaveBeenCalledTimes(1);
  });

  it('should take a photo and return the photo uri', async () => {
    // GIVEN
    const cameraRef = {
      takePictureAsync: jest.fn().mockResolvedValue({ uri: 'file:///photo.jpg' }),
    };
    const cameraTools = new CameraTools();

    // WHEN
    const result = await cameraTools.takePhoto(cameraRef);

    // THEN
    expect(result.uri).toBe('file:///photo.jpg');
    expect(cameraTools.lastPhoto).toBe('file:///photo.jpg');
    expect(cameraRef.takePictureAsync).toHaveBeenCalledTimes(1);
  });
});
