import * as Location from 'expo-location';

class LocationTools {
  constructor() {
    this.permissionStatus = null;
    this.lastLocation = null;
  }

  async checkLocationPermission() {
    const { status } = await Location.getForegroundPermissionsAsync();
    this.permissionStatus = status;
    return status;
  }

  async requestLocationPermission() {
    const { status } = await Location.requestForegroundPermissionsAsync();
    this.permissionStatus = status;
    return status;
  }

  async getCurrentLocation() {
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });

    this.lastLocation = location?.coords ?? null;
    return this.lastLocation;
  }
}

export default LocationTools;
