class ApiGeneralException {
  name = 'ApiGeneralException';
  message;
  responseStatus;
  traceId;

  constructor({ message, response }) {
    this.message = response?.data?.title || response?.data?.statusText || response.statusText || message;
    this.responseStatus = response?.status;
    this.traceId = response?.data?.traceId;
  }

  getExceptionData() {
    return {
      message: this.message,
      responseStatus: this.responseStatus,
      traceId: this.traceId
    };
  }
}

export default ApiGeneralException;
