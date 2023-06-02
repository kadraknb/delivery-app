module.exports = class BadRequest extends Error {
  constructor(message, statusCode = 422) {
    super(message);

    this.statusCode = statusCode;
  }
};