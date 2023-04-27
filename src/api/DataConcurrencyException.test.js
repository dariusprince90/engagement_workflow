import faker from '@faker-js/faker';

import DataConcurrencyException from './DataConcurrencyException';

// **********************************************************************
// * constants

const exceptionData = {
  message: faker.lorem.sentence(),
  response: {
    status: faker.datatype.number(),
    data: {
      title: faker.lorem.sentence(),
      statusText: faker.lorem.sentence(),
      traceId: faker.datatype.uuid()
    }
  }
};

// **********************************************************************
// * mock external dependencies

// **********************************************************************
// * unit tests

describe('DataConcurrencyException', () => {
  it('sets the name of the exception to DataConcurrencyException', () => {
    const actual = new DataConcurrencyException(exceptionData);
    expect(actual.name).toBe('DataConcurrencyException');
  });

  it('correctly maps the exception data properties', () => {
    const actual = new DataConcurrencyException(exceptionData);
    const expectedMessage = DataConcurrencyException.errorMessage;
    expect(actual.message).toBe(expectedMessage);
    expect(actual.responseStatus).toBe(exceptionData.response.status);
    expect(actual.traceId).toBe(exceptionData.response.data.traceId);
  });
});
