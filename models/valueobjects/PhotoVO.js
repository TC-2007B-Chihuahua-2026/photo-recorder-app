/**
 * Represents a captured photo entry with its local URI, timestamp, and optional GPS coordinates.
 */
class PhotoVO {
  /**
   * Creates a validated photo value object.
   *
   * @param {string} uri - The local URI of the captured photo.
   * @param {string} [createdAt=new Date().toISOString()] - ISO timestamp for the photo capture.
   * @param {number|null} [latitude=null] - Latitude value if available.
   * @param {number|null} [longitude=null] - Longitude value if available.
   * @throws {Error} If the URI, timestamp, or coordinate values are invalid.
   */
  constructor(uri, createdAt = new Date().toISOString(), latitude = null, longitude = null) {
    this.uri = uri;
    this.createdAt = createdAt;
    this.latitude = latitude;
    this.longitude = longitude;

    this.validate();
  }

  /**
   * Validates the photo payload and ensures the coordinate pair is consistent.
   *
   * @returns {void}
   * @throws {Error} When required fields are missing or coordinates are outside valid ranges.
   */
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
