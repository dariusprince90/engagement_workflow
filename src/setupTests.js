// jest-dom adds custom jest matchers for asserting on DOM nodes
// this allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import faker from '@faker-js/faker';
import * as matchers from 'jest-extended';

expect.extend(matchers);

process.env.REACT_APP__APP_INSIGHTS_CONNECTION_STRING = faker.random.word();
