/* eslint-disable react/prop-types */

import ReactDOM from 'react-dom';
import * as reactRedux from 'react-redux';
import { fireEvent, render, screen } from '@testing-library/react';
import faker from '@faker-js/faker';

import newEngagementInstanceSlice from '../newEngagementInstanceSlice';
import withNewEngagementInstanceViewData from './withNewEngagementInstanceViewData';

// **********************************************************************
// * constants

const testIds = {
  handleAutoCompleteDataClearedTrigger: 'handle-auto-complete-data-cleared-trigger',
  handleAutoCompleteItemResetTrigger: 'handle-auto-complete-item-reset-trigger',
  handleAutoCompleteItemSelectedTrigger: 'handle-auto-complete-item-selected-trigger',
  handleAutoCompleteSearchTrigger: 'handle-auto-complete-search-trigger',
  handleCheckBoxValueChangedTrigger: 'handle-check-box-value-changed-trigger',
  handleDatePickerValueChangedTrigger: 'handle-date-picker-value-changed-trigger',
  handleInputFieldValueChangedTrigger: 'handle-input-field-value-changed-trigger',
  handleMultiSelectValueChangedTrigger: 'handle-multi-select-value-changed-trigger'
};

const mockDispatch = jest.fn();

// **********************************************************************
// * functions

const getComponentToRender = (props) => {
  const component = getFakeComponent();
  const WrappedFakeComponent = withNewEngagementInstanceViewData(component);
  return <WrappedFakeComponent {...props} />;
};

const getFakeComponent = () => {
  const FakeComponent = ({ eventData, ...propsFromHoc }) => {
    const {
      handleAutoCompleteDataCleared,
      handleAutoCompleteItemReset,
      handleAutoCompleteItemSelected,
      handleAutoCompleteSearch,
      handleCheckBoxValueChanged,
      handleDatePickerValueChanged,
      handleInputFieldValueChanged,
      handleMultiSelectValueChanged
    } = propsFromHoc;

    return (
      <div>
        {/* trigger for handleAutoCompleteDataCleared */}
        <button
          data-testid={testIds.handleAutoCompleteDataClearedTrigger}
          onClick={() => handleAutoCompleteDataCleared(eventData.sourcePropertyNames)}
        />
        {/* trigger for handleAutoCompleteItemReset */}
        <button
          data-testid={testIds.handleAutoCompleteItemResetTrigger}
          onClick={() => handleAutoCompleteItemReset(eventData.sourcePropertyNames)}
        />
        {/* trigger for handleAutoCompleteItemSelected */}
        <button
          data-testid={testIds.handleAutoCompleteItemSelectedTrigger}
          onClick={() => handleAutoCompleteItemSelected(eventData.selectedItem, eventData.sourcePropertyNames)}
        />
        {/* trigger for handleAutoCompleteSearch */}
        <button
          data-testid={testIds.handleAutoCompleteSearchTrigger}
          onClick={() =>
            handleAutoCompleteSearch(eventData.event, eventData.sourcePropertyNames, eventData.searchMethod)
          }
        />
        {/* trigger for handleCheckBoxValueChanged */}
        <button
          data-testid={testIds.handleCheckBoxValueChangedTrigger}
          onClick={() => handleCheckBoxValueChanged(eventData.event)}
        />
        {/* trigger for handleDatePickerValueChanged */}
        <button
          data-testid={testIds.handleDatePickerValueChangedTrigger}
          onClick={() => handleDatePickerValueChanged(eventData.event)}
        />
        {/* trigger for handleInputFieldValueChanged */}
        <button
          data-testid={testIds.handleInputFieldValueChangedTrigger}
          onClick={() => handleInputFieldValueChanged(eventData.event)}
        />
        {/* trigger for handleMultiSelectValueChanged */}
        <button
          data-testid={testIds.handleMultiSelectValueChangedTrigger}
          onClick={() => handleMultiSelectValueChanged(eventData.selectedValues, eventData.sourcePropertyNames)}
        />
      </div>
    );
  };

  return FakeComponent;
};

function randomizeStringCase(str) {
  let newStr = '';

  for (let i = 0; i < str.length; i++) {
    if (Math.random() > 0.5) {
      newStr += str.charAt(i).toUpperCase();
    } else {
      newStr += str.charAt(i).toLowerCase();
    }
  }

  return newStr;
}

// **********************************************************************
// * mock external dependencies

jest.mock('react-redux', () => {
  return {
    useSelector: (callback) => callback(),
    useDispatch: jest.fn()
  };
});

jest.mock('../newEngagementInstanceSlice', () => {
  return {
    lookupItemDataCleared: jest.fn(),
    selectCurrentViewId: jest.fn(),
    viewFormDataChanged: jest.fn()
  };
});

// **********************************************************************
// * unit tests

describe('withNewEngagementInstanceViewData', () => {
  // **********************************************************************
  // * setup

  beforeEach(() => {
    reactRedux.useDispatch.mockReturnValue(mockDispatch);
  });

  // **********************************************************************
  // * tear-down

  // **********************************************************************
  // * execution

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(getComponentToRender(), div);
  });

  it('has proper display name when wrapped component has a display name', () => {
    const FakeComponent = () => <div></div>;
    FakeComponent.displayName = faker.random.alpha(10);
    const expectedDisplayName = `WithNeiFormData(${FakeComponent.displayName})`;
    const actual = withNewEngagementInstanceViewData(FakeComponent);
    expect(actual.displayName).toBe(expectedDisplayName);
  });

  it('has proper display name when wrapped component has a name, but no display name', () => {
    const FakeComponent = () => <div></div>;
    const expectedDisplayName = `WithNeiFormData(${FakeComponent.name})`;
    const actual = withNewEngagementInstanceViewData(FakeComponent);
    expect(actual.displayName).toBe(expectedDisplayName);
  });

  it('has proper display name when wrapped component has no name nor display name', () => {
    const fakeComponent = faker.random.alphaNumeric(10);
    const expectedDisplayName = 'WithNeiFormData(Component)';
    const actual = withNewEngagementInstanceViewData(fakeComponent);
    expect(actual.displayName).toBe(expectedDisplayName);
  });

  describe('functional', () => {
    it('dispatches viewFormDataChanged when the handleAutoCompleteDataCleared event is triggered', () => {
      // * ARRANGE
      const viewId = faker.random.alphaNumeric(10);
      const sourcePropertyNames = { matches: faker.random.alphaNumeric(10) };
      const sliceMethodResults = faker.random.alphaNumeric(10);
      const eventData = { sourcePropertyNames };
      const expectedPayload = { viewId, lookupName: sourcePropertyNames.matches };
      newEngagementInstanceSlice.selectCurrentViewId.mockReturnValue(viewId);
      newEngagementInstanceSlice.lookupItemDataCleared.mockReturnValue(sliceMethodResults);

      // * ACT
      render(getComponentToRender({ eventData }));
      fireEvent.click(screen.getByTestId(testIds.handleAutoCompleteDataClearedTrigger));

      // * ASSERT
      expect(newEngagementInstanceSlice.lookupItemDataCleared).toHaveBeenCalledTimes(1);
      expect(newEngagementInstanceSlice.lookupItemDataCleared).toHaveBeenCalledWith(expectedPayload);
      expect(mockDispatch).toHaveBeenCalledWith(sliceMethodResults);
    });

    it('dispatches viewFormDataChanged when the handleAutoCompleteItemReset event is triggered', () => {
      // * ARRANGE
      const viewId = faker.random.alphaNumeric(10);
      const sourcePropertyNames = { value: faker.random.alphaNumeric(10), displayName: faker.random.alphaNumeric(10) };
      const formData = { [sourcePropertyNames.value]: '', [sourcePropertyNames.displayName]: '' };
      const sliceMethodResults = faker.random.alphaNumeric(10);
      const eventData = { sourcePropertyNames };
      const expectedPayload = { viewId, formData };
      newEngagementInstanceSlice.selectCurrentViewId.mockReturnValue(viewId);
      newEngagementInstanceSlice.viewFormDataChanged.mockReturnValue(sliceMethodResults);

      // * ACT
      render(getComponentToRender({ eventData }));
      fireEvent.click(screen.getByTestId(testIds.handleAutoCompleteItemResetTrigger));

      // * ASSERT
      expect(newEngagementInstanceSlice.viewFormDataChanged).toHaveBeenCalledTimes(1);
      expect(newEngagementInstanceSlice.viewFormDataChanged).toHaveBeenCalledWith(expectedPayload);
      expect(mockDispatch).toHaveBeenCalledWith(sliceMethodResults);
    });

    it('dispatches viewFormDataChanged when the handleAutoCompleteItemSelected event is triggered', () => {
      // * ARRANGE
      const viewId = faker.random.alphaNumeric(10);
      const selectedItem = { id: faker.random.alphaNumeric(10), displayName: faker.random.alphaNumeric(10) };
      const sourcePropertyNames = { value: faker.random.alphaNumeric(10), displayName: faker.random.alphaNumeric(10) };
      const formData = {
        [sourcePropertyNames.value]: selectedItem.id,
        [sourcePropertyNames.displayName]: selectedItem.displayName
      };
      const sliceMethodResults = faker.random.alphaNumeric(10);
      const eventData = { selectedItem, sourcePropertyNames };
      const expectedPayload = { viewId, formData };
      newEngagementInstanceSlice.selectCurrentViewId.mockReturnValue(viewId);
      newEngagementInstanceSlice.viewFormDataChanged.mockReturnValue(sliceMethodResults);

      // * ACT
      render(getComponentToRender({ eventData }));
      fireEvent.click(screen.getByTestId(testIds.handleAutoCompleteItemSelectedTrigger));

      // * ASSERT
      expect(newEngagementInstanceSlice.viewFormDataChanged).toHaveBeenCalledTimes(1);
      expect(newEngagementInstanceSlice.viewFormDataChanged).toHaveBeenCalledWith(expectedPayload);
      expect(mockDispatch).toHaveBeenCalledWith(sliceMethodResults);
    });

    it('dispatches searchMethod when the handleAutoCompleteSearch event is triggered', () => {
      // * ARRANGE
      const viewId = faker.random.alphaNumeric(10);
      const event = { searchQuery: faker.random.alphaNumeric(10) };
      const sourcePropertyNames = { matches: faker.random.alphaNumeric(10) };
      const searchMethod = jest.fn();
      const sliceMethodResults = faker.random.alphaNumeric(10);
      const eventData = { event, sourcePropertyNames, searchMethod };
      const expectedPayload = { viewId, lookupName: sourcePropertyNames.matches, searchQuery: event.searchQuery };
      newEngagementInstanceSlice.selectCurrentViewId.mockReturnValue(viewId);
      searchMethod.mockReturnValue(sliceMethodResults);

      // * ACT
      render(getComponentToRender({ eventData }));
      fireEvent.click(screen.getByTestId(testIds.handleAutoCompleteSearchTrigger));

      // * ASSERT
      expect(searchMethod).toHaveBeenCalledTimes(1);
      expect(searchMethod).toHaveBeenCalledWith(expectedPayload);
      expect(mockDispatch).toHaveBeenCalledWith(sliceMethodResults);
    });

    it('dispatches viewFormDataChanged when the handleCheckBoxValueChanged event is triggered', () => {
      // * ARRANGE
      const viewId = faker.random.alphaNumeric(10);
      const event = { target: { name: faker.random.alphaNumeric(10), checked: faker.datatype.boolean() } };
      const formData = { [event.target.name]: event.target.checked };
      const sliceMethodResults = faker.random.alphaNumeric(10);
      const eventData = { event };
      const expectedPayload = { viewId, formData };
      newEngagementInstanceSlice.selectCurrentViewId.mockReturnValue(viewId);
      newEngagementInstanceSlice.viewFormDataChanged.mockReturnValue(sliceMethodResults);

      // * ACT
      render(getComponentToRender({ eventData }));
      fireEvent.click(screen.getByTestId(testIds.handleCheckBoxValueChangedTrigger));

      // * ASSERT
      expect(newEngagementInstanceSlice.viewFormDataChanged).toHaveBeenCalledTimes(1);
      expect(newEngagementInstanceSlice.viewFormDataChanged).toHaveBeenCalledWith(expectedPayload);
      expect(mockDispatch).toHaveBeenCalledWith(sliceMethodResults);
    });

    describe('handleDatePickerValueChanged', () => {
      it('dispatches viewFormDataChanged with correct args when triggered and date has a value', () => {
        // * ARRANGE
        const viewId = faker.random.alphaNumeric(10);
        const date = faker.date.recent();
        const event = { target: { name: faker.random.alphaNumeric(10), value: date } };
        const formData = { [event.target.name]: event.target.value.toISOString() };
        const sliceMethodResults = faker.random.alphaNumeric(10);
        const eventData = { event };
        const expectedPayload = { viewId, formData };
        newEngagementInstanceSlice.selectCurrentViewId.mockReturnValue(viewId);
        newEngagementInstanceSlice.viewFormDataChanged.mockReturnValue(sliceMethodResults);

        // * ACT
        render(getComponentToRender({ eventData }));
        fireEvent.click(screen.getByTestId(testIds.handleDatePickerValueChangedTrigger));

        // * ASSERT
        expect(newEngagementInstanceSlice.viewFormDataChanged).toHaveBeenCalledTimes(1);
        expect(newEngagementInstanceSlice.viewFormDataChanged).toHaveBeenCalledWith(expectedPayload);
        expect(mockDispatch).toHaveBeenCalledWith(sliceMethodResults);
      });

      it('dispatches viewFormDataChanged with correct args when triggered and date has no value', () => {
        // * ARRANGE
        const viewId = faker.random.alphaNumeric(10);
        const date = null;
        const event = { target: { name: faker.random.alphaNumeric(10), value: date } };
        const formData = { [event.target.name]: null };
        const sliceMethodResults = faker.random.alphaNumeric(10);
        const eventData = { event };
        const expectedPayload = { viewId, formData };
        newEngagementInstanceSlice.selectCurrentViewId.mockReturnValue(viewId);
        newEngagementInstanceSlice.viewFormDataChanged.mockReturnValue(sliceMethodResults);

        // * ACT
        render(getComponentToRender({ eventData }));
        fireEvent.click(screen.getByTestId(testIds.handleDatePickerValueChangedTrigger));

        // * ASSERT
        expect(newEngagementInstanceSlice.viewFormDataChanged).toHaveBeenCalledTimes(1);
        expect(newEngagementInstanceSlice.viewFormDataChanged).toHaveBeenCalledWith(expectedPayload);
        expect(mockDispatch).toHaveBeenCalledWith(sliceMethodResults);
      });
    });

    describe('handleInputFieldValueChanged', () => {
      // **********************************************************************
      // * setup

      const createTestCasesForStringConversionTest = () => {
        const cases = [];

        // create 5 random "true" and "false" values to check using random casing on the strings
        // e.g. TruE, faLSe, trUe, FALSe, etc.
        for (let i = 0; i < 5; i++) {
          cases.push({ valueString: randomizeStringCase('true'), expectedValue: true });
          cases.push({ valueString: randomizeStringCase('false'), expectedValue: false });
        }

        return cases;
      };

      // **********************************************************************
      // * tear-down

      // **********************************************************************
      // * execution

      it('dispatches viewFormDataChanged when triggered', () => {
        // * ARRANGE
        const viewId = faker.random.alphaNumeric(10);
        const event = { target: { name: faker.random.alphaNumeric(10), value: faker.random.alphaNumeric(10) } };
        const formData = { [event.target.name]: event.target.value };
        const sliceMethodResults = faker.random.alphaNumeric(10);
        const eventData = { event };
        const expectedPayload = { viewId, formData };
        newEngagementInstanceSlice.selectCurrentViewId.mockReturnValue(viewId);
        newEngagementInstanceSlice.viewFormDataChanged.mockReturnValue(sliceMethodResults);

        // * ACT
        render(getComponentToRender({ eventData }));
        fireEvent.click(screen.getByTestId(testIds.handleInputFieldValueChangedTrigger));

        // * ASSERT
        expect(newEngagementInstanceSlice.viewFormDataChanged).toHaveBeenCalledTimes(1);
        expect(newEngagementInstanceSlice.viewFormDataChanged).toHaveBeenCalledWith(expectedPayload);
        expect(mockDispatch).toHaveBeenCalledWith(sliceMethodResults);
      });

      it.each(createTestCasesForStringConversionTest())(
        'converts the string value of "$valueString" to the boolean $expectedValue for the updated form data',
        ({ valueString, expectedValue }) => {
          // * ARRANGE
          const viewId = faker.random.alphaNumeric(10);
          const event = { target: { name: faker.random.alphaNumeric(10), value: valueString } };
          const formData = { [event.target.name]: expectedValue };
          const eventData = { event };
          const expectedPayload = { viewId, formData };
          newEngagementInstanceSlice.selectCurrentViewId.mockReturnValue(viewId);

          // * ACT
          render(getComponentToRender({ eventData }));
          fireEvent.click(screen.getByTestId(testIds.handleInputFieldValueChangedTrigger));

          // * ASSERT
          expect(newEngagementInstanceSlice.viewFormDataChanged).toHaveBeenCalledWith(expectedPayload);
        }
      );
    });

    it('dispatches viewFormDataChanged when the handleMultiSelectValueChanged event is triggered', () => {
      // * ARRANGE
      const viewId = faker.random.alphaNumeric(10);
      const sourcePropertyNames = {
        value: faker.random.alphaNumeric(10),
        selectedItems: faker.random.alphaNumeric(10)
      };
      const itemCount = faker.datatype.number({ min: 0, max: 20 });
      const selectedValues = [...Array(itemCount).keys()].map(() => ({ value: faker.random.alphaNumeric(10) }));
      const selectedValuesJoined = selectedValues.map((item) => item.value).join(',');
      const formData = {
        [sourcePropertyNames.value]: selectedValuesJoined,
        [sourcePropertyNames.selectedItems]: selectedValues
      };
      const sliceMethodResults = faker.random.alphaNumeric(10);
      const eventData = { selectedValues, sourcePropertyNames };
      const expectedPayload = { viewId, formData };
      newEngagementInstanceSlice.selectCurrentViewId.mockReturnValue(viewId);
      newEngagementInstanceSlice.viewFormDataChanged.mockReturnValue(sliceMethodResults);

      // * ACT
      render(getComponentToRender({ eventData }));
      fireEvent.click(screen.getByTestId(testIds.handleMultiSelectValueChangedTrigger));

      // * ASSERT
      expect(newEngagementInstanceSlice.viewFormDataChanged).toHaveBeenCalledTimes(1);
      expect(newEngagementInstanceSlice.viewFormDataChanged).toHaveBeenCalledWith(expectedPayload);
      expect(mockDispatch).toHaveBeenCalledWith(sliceMethodResults);
    });
  });
});
