export class ServiceError extends Error {
  private static readonly NOT_FOUND: string = 'NOT_FOUND';
  private static readonly VALIDATION_FAILED: string = 'VALIDATION_FAILED';
  private static readonly UNAUTHORIZED: string = 'UNAUTHORIZED';
  private static readonly FORBIDDEN: string = 'FORBIDDEN';
  private details: {};
  name: string;
  code: string;

  constructor(code, message, details = {}) {
    super(message);
    this.code = code;
    this.details = details;
    this.name = 'ServiceError';
  }

  static notFound(message, details) {
    return new ServiceError(this.NOT_FOUND, message, details);
  }

  static validationFailed(message, details) {
    return new ServiceError(this.VALIDATION_FAILED, message, details);
  }

  static unauthorized(message, details) {
    return new ServiceError(this.UNAUTHORIZED, message, details);
  }

  static forbidden(message, details) {
    return new ServiceError(this.FORBIDDEN, message, details);
  }

  get isNotFound() {
    return this.code === ServiceError.NOT_FOUND;
  }

  get isValidationFailed() {
    return this.code === ServiceError.VALIDATION_FAILED;
  }

  get isUnauthorized() {
    return this.code === ServiceError.UNAUTHORIZED;
  }

  get isForbidden() {
    return this.code === ServiceError.FORBIDDEN;
  }
}