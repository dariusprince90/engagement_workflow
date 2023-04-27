import faker from '@faker-js/faker';

import ApiGeneralException from './ApiGeneralException';

// **********************************************************************
// * constants

const defaultExceptionData = {
  message: faker.lorem.sentence(),
  response: {
    status: faker.datatype.number(),
    statusText: faker.lorem.sentence(),
    data: {
      title: faker.lorem.sentence(),
      statusText: faker.lorem.sentence(),
      traceId: faker.datatype.uuid()
    }
  }
};

const getDefaultExceptionData = () => JSON.parse(JSON.stringify(defaultExceptionData));

// **********************************************************************
// * mock external dependencies

// **********************************************************************
// * unit tests

describe('ApiGeneralException', () => {
  it('sets the name of the exception to ApiGeneralException', () => {
    const actual = new ApiGeneralException(getDefaultExceptionData());
    expect(actual.name).toBe('ApiGeneralException');
  });

  it('correctly maps the exception data properties', () => {
    const actual = new ApiGeneralException(getDefaultExceptionData());
    expect(actual.message).toBe(defaultExceptionData.response.data.title);
    expect(actual.responseStatus).toBe(defaultExceptionData.response.status);
    expect(actual.traceId).toBe(defaultExceptionData.response.data.traceId);
  });

  it('sets the message to the response data title when it has a value', () => {
    let exceptionData = { ...getDefaultExceptionData() };
    exceptionData.response.data.title = faker.lorem.sentence();
    const actual = new ApiGeneralException(exceptionData);
    expect(actual.message).toBe(exceptionData.response.data.title);
  });

  it('sets the message to the response data status text when it has a value and title has no value', () => {
    let exceptionData = { ...getDefaultExceptionData() };
    exceptionData.response.data.title = null;
    exceptionData.response.data.statusText = faker.lorem.sentence();
    const actual = new ApiGeneralException(exceptionData);
    expect(actual.message).toBe(exceptionData.response.data.statusText);
  });

  it('sets the message to the response status text when it has a value and response data has no value', () => {
    let exceptionData = { ...getDefaultExceptionData() };
    exceptionData.response.data = null;
    exceptionData.response.statusText = faker.lorem.sentence();
    const actual = new ApiGeneralException(exceptionData);
    expect(actual.message).toBe(exceptionData.response.statusText);
  });

  it('sets the message to the message param when response data title, response data status text and response status text have no value', () => {
    let exceptionData = { ...getDefaultExceptionData() };
    exceptionData.response.data.title = null;
    exceptionData.response.data.statusText = null;
    exceptionData.response.statusText = null;
    exceptionData.message = faker.lorem.sentence();
    const actual = new ApiGeneralException(exceptionData);
    expect(actual.message).toBe(exceptionData.message);
  });

  describe('getExceptionData', () => {
    it('returns all of the class properties', () => {
      const exception = new ApiGeneralException(getDefaultExceptionData());
      const actual = exception.getExceptionData();
      expect(actual.message).toBe(defaultExceptionData.response.data.title);
      expect(actual.responseStatus).toBe(defaultExceptionData.response.status);
      expect(actual.traceId).toBe(defaultExceptionData.response.data.traceId);
    });
  });
});
