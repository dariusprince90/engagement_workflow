import sideBarSlice, { collapse, expand, forceToggle, selectSideBarState } from './sideBarSlice';

// **********************************************************************
// * constants

// **********************************************************************
// * functions

// **********************************************************************
// * mock external dependencies

// **********************************************************************
// * unit tests

describe('sideBarSlice', () => {
  describe('actions', () => {
    describe('collapse', () => {
      it('updates state when isExpanded is true and lockExpanded is false', () => {
        // * ARRANGE
        const mockInitialState = { isExpanded: true, lockExpanded: false };
        const modifiedState = { isExpanded: false, lockExpanded: false };

        // * ACT
        const actual = sideBarSlice(mockInitialState, collapse(false));

        // * ASSERT
        expect(actual).toEqual(modifiedState);
      });

      it('updates state when isExpanded is true and payload is true', () => {
        // * ARRANGE
        const mockInitialState = { isExpanded: true, lockExpanded: true };
        const modifiedState = { isExpanded: false, lockExpanded: false };

        // * ACT
        const actual = sideBarSlice(mockInitialState, collapse(true));

        // * ASSERT
        expect(actual).toEqual(modifiedState);
      });

      it('does not update state when isExpanded is false, lockExpanded is true and payload is false', () => {
        // * ARRANGE
        const mockInitialState = { isExpanded: false, lockExpanded: true };

        // * ACT
        const actual = sideBarSlice(mockInitialState, collapse(false));

        // * ASSERT
        expect(actual).toEqual(mockInitialState);
      });

      it('does not update state when isExpanded is false', () => {
        // * ARRANGE
        const mockInitialState = { isExpanded: false, lockExpanded: true };

        // * ACT
        const actual = sideBarSlice(mockInitialState, collapse(true));

        // * ASSERT
        expect(actual).toEqual(mockInitialState);
      });
    });

    describe('expand', () => {
      it('updates lockExpanded when it is false', () => {
        // * ARRANGE
        const mockInitialState = { isExpanded: false, lockExpanded: false };
        const modifiedState = { isExpanded: true, lockExpanded: true };

        // * ACT
        const actual = sideBarSlice(mockInitialState, expand(true));

        // * ASSERT
        expect(actual).toEqual(modifiedState);
      });

      it('does not update lockExpanded when it is true', () => {
        // * ARRANGE
        const mockInitialState = { isExpanded: false, lockExpanded: true };
        const modifiedState = { isExpanded: true, lockExpanded: true };

        // * ACT
        const actual = sideBarSlice(mockInitialState, expand(false));

        // * ASSERT
        expect(actual).toEqual(modifiedState);
      });
    });

    describe('forceToggle', () => {
      it('disables both flags when both are true', () => {
        // * ARRANGE
        const mockInitialState = { isExpanded: true, lockExpanded: true };
        const modifiedState = { isExpanded: false, lockExpanded: false };

        // * ACT
        const actual = sideBarSlice(mockInitialState, forceToggle());

        // * ASSERT
        expect(actual).toEqual(modifiedState);
      });

      it('enables both flags when isExpanded is true', () => {
        // * ARRANGE
        const mockInitialState = { isExpanded: true, lockExpanded: false };
        const modifiedState = { isExpanded: true, lockExpanded: true };

        // * ACT
        const actual = sideBarSlice(mockInitialState, forceToggle());

        // * ASSERT
        expect(actual).toEqual(modifiedState);
      });

      it('does not update state when lockExpanded is true', () => {
        // * ARRANGE
        const mockInitialState = { isExpanded: false, lockExpanded: true };
        const modifiedState = { isExpanded: false, lockExpanded: true };

        // * ACT
        const actual = sideBarSlice(mockInitialState, forceToggle());

        // * ASSERT
        expect(actual).toEqual(modifiedState);
      });
    });
  });

  describe('selectors', () => {
    describe('selectSideBarState', () => {
      it('returns sideBar from state', () => {
        // * ARRANGE
        const mockState = { sideBar: { isExpanded: false, lockExpanded: false } };

        // * ACT
        const actual = selectSideBarState(mockState);

        // * ASSERT
        expect(actual).toEqual(mockState.sideBar);
      });
    });
  });
});
