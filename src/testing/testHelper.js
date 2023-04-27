/* istanbul ignore file -- justification: this is a test helper; no testing needed */
/* eslint-disable no-console */

import faker from '@faker-js/faker';

const consoleError = console.error;

const mockConsoleError = () => {
  console.error = jest.fn();
};

const randomBoolean = () => {
  return faker.datatype.number(1) ? true : false;
};

const restoreConsoleError = () => {
  console.error = consoleError;
};

export { mockConsoleError, randomBoolean, restoreConsoleError };
