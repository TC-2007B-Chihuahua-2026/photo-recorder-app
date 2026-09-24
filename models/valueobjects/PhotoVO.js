class PhotoVO {
  constructor(uri, createdAt = new Date().toISOString(), latitude = null, longitude = null) {
    this.uri = uri;
    this.createdAt = createdAt;
    this.latitude = latitude;
    this.longitude = longitude;

    this.validate();
  }

  validate() {
    if (typeof this.uri !== 'string' || this.uri.trim() === '') {
      throw new Error('Photo uri is required.');
    }

    if (typeof this.createdAt !== 'string' || this.createdAt.trim() === '') {
      throw new Error('Photo createdAt is required.');
    }

    const hasLatitude = this.latitude !== null && this.latitude !== undefined;
    const hasLongitude = this.longitude !== null && this.longitude !== undefined;

    if (hasLatitude !== hasLongitude) {
      throw new Error('Latitude and longitude must be provided together.');
    }

    if (hasLatitude) {
      if (!Number.isFinite(this.latitude) || this.latitude < -90 || this.latitude > 90) {
        throw new Error('Latitude must be a number between -90 and 90.');
      }

      if (!Number.isFinite(this.longitude) || this.longitude < -180 || this.longitude > 180) {
        throw new Error('Longitude must be a number between -180 and 180.');
      }
    }
  }
}

export default PhotoVO;
