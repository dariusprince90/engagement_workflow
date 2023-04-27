import { getUserRoles } from './msalHelpers';

// **********************************************************************
// * constants

// **********************************************************************
// * mock external dependencies

// **********************************************************************
// * unit tests

describe('msalHelpers', () => {
  describe('getUserRoles', () => {
    it('returns an empty object for userRoles', () => {
      const userRoles = getUserRoles();
      expect(userRoles).toEqual({});
    });
  });
});
