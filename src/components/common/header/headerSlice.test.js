import headerSlice, { pageTitleChanged, selectPageTitle, pageSubtitleChanged, selectPageSubtitle } from './headerSlice';
import faker from '@faker-js/faker';

// **********************************************************************
// * constants

const initialState = {
  pageTitle: faker.datatype.string(),
  pageSubtitle: faker.datatype.string()
};

// **********************************************************************
// * mock external dependencies

// **********************************************************************
// * unit tests

describe('headerSlice', () => {
  describe('actions', () => {
    it('updates pageTitle when pageTitleChanged is dispatched', () => {
      // * ARRANGE
      const payload = faker.datatype.string();
      const expectedState = { ...initialState, pageTitle: payload };

      // * ACT
      const actualState = headerSlice(initialState, pageTitleChanged(payload));

      // * ASSERT
      expect(actualState).toEqual(expectedState);
    });

    it('updates pageSubtitle when pageSubtitleChanged is dispatched', () => {
      // * ARRANGE
      const payload = faker.datatype.string();
      const expectedState = { ...initialState, pageSubtitle: payload };

      // * ACT
      const actualState = headerSlice(initialState, pageSubtitleChanged(payload));

      // * ASSERT
      expect(actualState).toEqual(expectedState);
    });
  });

  describe('selectors', () => {
    it('returns pageTitle when the selectPageTitle selector is invoked', () => {
      const expectedValue = initialState.pageTitle;
      const reduxState = { pageHeader: { ...initialState } };
      const actualValue = selectPageTitle(reduxState);
      expect(actualValue).toBe(expectedValue);
    });

    it('returns pageSubtitle when the selectPageSubtitle selector is invoked', () => {
      const expectedValue = initialState.pageSubtitle;
      const reduxState = { pageHeader: { ...initialState } };
      const actualValue = selectPageSubtitle(reduxState);
      expect(actualValue).toBe(expectedValue);
    });
  });
});
