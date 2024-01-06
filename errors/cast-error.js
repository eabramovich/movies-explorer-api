class CastError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

export default CastError;
