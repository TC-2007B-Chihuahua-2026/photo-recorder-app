import { Camera } from 'expo-camera';

class CameraTools {
  constructor() {
    this.permissionStatus = null;
    this.lastPhoto = null;
  }

  async checkCameraPermission() {
    const { status } = await Camera.getCameraPermissionsAsync();
    this.permissionStatus = status;
    return status;
  }

  async requestCameraPermission() {
    const { status } = await Camera.requestCameraPermissionsAsync();
    this.permissionStatus = status;
    return status;
  }

  async takePhoto(cameraRef) {
    if (!cameraRef || typeof cameraRef.takePictureAsync !== 'function') {
      throw new Error('Camera ref is required');
    }

    const photo = await cameraRef.takePictureAsync();
    this.lastPhoto = photo?.uri ?? null;
    return photo;
  }
}

export default CameraTools;
