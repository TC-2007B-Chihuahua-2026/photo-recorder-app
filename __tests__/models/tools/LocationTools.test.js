import * as Location from 'expo-location';
import LocationTools from '../../../models/tools/LocationTools';

jest.mock('expo-location', () => ({
  getForegroundPermissionsAsync: jest.fn(),
  requestForegroundPermissionsAsync: jest.fn(),
  getCurrentPositionAsync: jest.fn(),
  Accuracy: {
    High: 6,
  },
}), { virtual: true });

describe('LocationTools', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return granted when the foreground location permission is granted', async () => {
    // GIVEN
    Location.getForegroundPermissionsAsync.mockResolvedValue({ status: 'granted' });
    const locationTools = new LocationTools();

    // WHEN
    const result = await locationTools.checkLocationPermission();

    // THEN
    expect(result).toBe('granted');
    expect(Location.getForegroundPermissionsAsync).toHaveBeenCalledTimes(1);
  });

  it('should request foreground location permission and return granted when accepted', async () => {
    // GIVEN
    Location.requestForegroundPermissionsAsync.mockResolvedValue({ status: 'granted' });
    const locationTools = new LocationTools();

    // WHEN
    const result = await locationTools.requestLocationPermission();

    // THEN
    expect(result).toBe('granted');
    expect(locationTools.permissionStatus).toBe('granted');
    expect(Location.requestForegroundPermissionsAsync).toHaveBeenCalledTimes(1);
  });

  it('should get the current location and keep the last coordinates', async () => {
    // GIVEN
    const coords = {
      latitude: 28.632995,
      longitude: -106.069099,
      accuracy: 10,
    };
    Location.getCurrentPositionAsync.mockResolvedValue({ coords });
    const locationTools = new LocationTools();

    // WHEN
    const result = await locationTools.getCurrentLocation();

    // THEN
    expect(result).toEqual(coords);
    expect(locationTools.lastLocation).toEqual(coords);
    expect(Location.getCurrentPositionAsync).toHaveBeenCalledWith({ accuracy: Location.Accuracy.High });
  });

  it('should return denied when the foreground location permission is denied', async () => {
    // GIVEN
    Location.getForegroundPermissionsAsync.mockResolvedValue({ status: 'denied' });
    const locationTools = new LocationTools();

    // WHEN
    const result = await locationTools.checkLocationPermission();

    // THEN
    expect(result).toBe('denied');
    expect(Location.getForegroundPermissionsAsync).toHaveBeenCalledTimes(1);
  });
});
