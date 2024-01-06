class MongoDuplicateError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
    this.name = 'MongoDuplicateError';
  }
}

export default MongoDuplicateError;
