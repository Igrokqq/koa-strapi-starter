/**
 * @exports
 * @extends Error
 */
class ConflictException extends Error {
  /**
   * @constructor
   * @param {object} message
   */
  constructor(message) {
    super();
    this.message = message;
    this.name = 'E_CONFLICT';
  }
}

module.exports = ConflictException;
