module.exports = class NotFound extends Error {
  constructor(message, statusCode = 404) {
    super(message);

    this.statusCode = statusCode;
  }
};