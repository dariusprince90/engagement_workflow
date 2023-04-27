import ApiGeneralException from './ApiGeneralException';

class DataConcurrencyException extends ApiGeneralException {
  static errorMessage =
    'The data has been updated since you last retrieved it. Please reload the data and try your action again.';

  constructor({ message, response }) {
    super({ message, response });
    this.name = 'DataConcurrencyException';
    this.message = DataConcurrencyException.errorMessage;
  }
}

export default DataConcurrencyException;
