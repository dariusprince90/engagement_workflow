import faker from '@faker-js/faker';

import ApiValidationException from './ApiValidationException';

// **********************************************************************
// * constants

const exceptionData = {
  message: faker.lorem.sentence(),
  response: {
    status: faker.datatype.number(),
    data: {
      title: faker.lorem.sentence(),
      statusText: faker.lorem.sentence(),
      traceId: faker.datatype.uuid(),
      errors: faker.datatype.array()
    }
  }
};

// **********************************************************************
// * mock external dependencies

// **********************************************************************
// * unit tests

describe('ApiValidationException', () => {
  it('sets the name of the exception to ApiValidationException', () => {
    const actual = new ApiValidationException(exceptionData);
    expect(actual.name).toBe('ApiValidationException');
  });

  it('correctly maps the exception data properties', () => {
    const actual = new ApiValidationException(exceptionData);
    expect(actual.message).toBe(exceptionData.response.data.title);
    expect(actual.errors).toBe(exceptionData.response.data.errors);
    expect(actual.responseStatus).toBe(exceptionData.response.status);
    expect(actual.traceId).toBe(exceptionData.response.data.traceId);
  });

  describe('getExceptionData', () => {
    it('returns all of the class properties', () => {
      const exception = new ApiValidationException(exceptionData);
      const actual = exception.getExceptionData();
      expect(actual.message).toBe(exceptionData.response.data.title);
      expect(actual.responseStatus).toBe(exceptionData.response.status);
      expect(actual.traceId).toBe(exceptionData.response.data.traceId);
      expect(actual.errors).toBe(exceptionData.response.data.errors);
    });
  });
});
