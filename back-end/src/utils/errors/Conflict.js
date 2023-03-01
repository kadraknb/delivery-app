module.exports = class Conflict extends Error {
  constructor(message, statusCode = 409) {
    super(message);

    this.statusCode = statusCode;
  }
};