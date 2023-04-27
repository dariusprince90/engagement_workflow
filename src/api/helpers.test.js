import faker from '@faker-js/faker';

import errorLoggingHelper from '../appInsights/errorLoggingHelper';
import ApiGeneralException from './ApiGeneralException';
import ApiValidationException from './ApiValidationException';
import DataConcurrencyException from './DataConcurrencyException';
import { handleApiError } from './helpers';

// **********************************************************************
// * constants

const getDefaultError = () => {
  return {
    response: {
      status: faker.random.words(),
      data: {
        title: faker.random.words()
      }
    },
    toJSON: jest.fn()
  };
};

// **********************************************************************
// * mock external dependencies

jest.mock('../appInsights/errorLoggingHelper', () => {
  return {
    logApiError: jest.fn()
  };
});

jest.mock('./ApiGeneralException');
jest.mock('./ApiValidationException');
jest.mock('./DataConcurrencyException');

// **********************************************************************
// * unit tests

describe('api helpers', () => {
  // **********************************************************************
  // * setup

  beforeAll(() => {
    jest.spyOn(errorLoggingHelper, 'logApiError');
  });

  // **********************************************************************
  // * tear-down

  afterEach(() => {
    errorLoggingHelper.logApiError.mockClear();
    DataConcurrencyException.mockClear();
  });

  describe('handleApiError', () => {
    it('logs the error via errorLoggingHelper', () => {
      const error = getDefaultError();
      expect(() => handleApiError(error)).toThrow();
      expect(errorLoggingHelper.logApiError).toHaveBeenCalledWith(error);
    });

    it('throws an ApiGeneralException by default', () => {
      const error = getDefaultError();
      expect(() => handleApiError(error)).toThrow();
      expect(ApiGeneralException).toHaveBeenCalledWith(error);
    });

    it('throws a DataConcurrencyException when the error response status is 412', () => {
      const error = getDefaultError();
      error.response.status = 412;
      expect(() => handleApiError(error)).toThrow();
      expect(DataConcurrencyException).toHaveBeenCalledWith(error);
    });

    it('throws an ApiValidationException when the error response data title is "One or more validation errors occurred."', () => {
      const error = getDefaultError();
      error.response.data.title = 'One or more validation errors occurred.';
      expect(() => handleApiError(error)).toThrow();
      expect(ApiValidationException).toHaveBeenCalledWith(error);
    });
  });
});
