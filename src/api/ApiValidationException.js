import ApiGeneralException from './ApiGeneralException';

class ApiValidationException extends ApiGeneralException {
  errors;

  constructor({ message, response }) {
    super({ message, response });
    this.name = 'ApiValidationException';
    this.errors = response?.data?.errors;
  }

  getExceptionData() {
    return {
      message: this.message,
      errors: this.errors,
      responseStatus: this.responseStatus,
      traceId: this.traceId
    };
  }
}

export default ApiValidationException;
