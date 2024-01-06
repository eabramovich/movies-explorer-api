class NotAuthenticateError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
    this.name = 'NotAuthenticateError';
  }
}

export default NotAuthenticateError;
