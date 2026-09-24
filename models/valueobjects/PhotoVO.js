class PhotoVO {
  constructor(uri, createdAt = new Date().toISOString()) {
    this.uri = uri;
    this.createdAt = createdAt;

    this.validate();
  }

  validate() {
    if (typeof this.uri !== 'string' || this.uri.trim() === '') {
      throw new Error('Photo uri is required.');
    }

    if (typeof this.createdAt !== 'string' || this.createdAt.trim() === '') {
      throw new Error('Photo createdAt is required.');
    }
  }
}

export default PhotoVO;
