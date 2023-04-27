/* eslint-disable react/prop-types */
import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import { render, fireEvent, screen, within } from '@testing-library/react';
import faker from '@faker-js/faker';

import MultiSelect from './MultiSelect';

// **********************************************************************
// * constants

const testIds = {
  formGroup: 'form-group',
  multiSelectInput: 'multi-select-input',
  multiSelectInputSelectEvent: 'multi-select-input-select',
  multiSelectInputRemoveEvent: 'multi-select-input-remove'
};

const defaultProps = {
  name: faker.random.alphaNumeric(10),
  label: faker.random.alphaNumeric(10),
  placeholder: faker.random.alphaNumeric(10),
  isLoading: faker.datatype.boolean(),
  showCheckbox: faker.datatype.boolean(),
  disabled: faker.datatype.boolean(),
  isRow: faker.datatype.boolean(),
  options: [{ value: faker.datatype.number(), label: faker.random.alphaNumeric(10) }],
  selectedItems: [{ value: faker.datatype.number(), label: faker.random.alphaNumeric(10) }],
  sourcePropertyNames: {
    value: faker.random.alphaNumeric(10),
    selectedItems: faker.random.alphaNumeric(10)
  },
  onChange: jest.fn()
};

const mockSearchBoxRef = {
  current: {
    searchBox: {
      current: {
        classList: document.createElement('div').classList
      }
    }
  }
};

// **********************************************************************
// * functions

const getComponentToRender = (props) => {
  return <MultiSelect {...props} />;
};

// **********************************************************************
// * mock external dependencies

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useRef: jest.fn()
}));

jest.mock('../../../../common/formGroup/FormGroup', () => {
  return {
    __esModule: true,
    default: ({ name, label, isRow, children }) => {
      const props = { name, label, isRow, children };
      return <fake-form-group data-testid={testIds.formGroup} {...props} />;
    }
  };
});

jest.mock('multiselect-react-dropdown', () => {
  const React = jest.requireActual('react');
  const mockMultiSelectInput = React.forwardRef(
    (
      {
        name,
        placeholder,
        loading,
        showCheckbox,
        disable,
        options,
        selectedValues,
        avoidHighlightFirstOption,
        displayValue,
        onSelect,
        onRemove
      },
      _
    ) => {
      const props = {
        name,
        placeholder,
        loading,
        showCheckbox,
        disable,
        options,
        selectedValues,
        avoidHighlightFirstOption,
        displayValue
      };
      return (
        <fake-multiselect-react-dropdown data-testid={testIds.multiSelectInput} {...props}>
          <button data-testid={testIds.multiSelectInputSelectEvent} onClick={() => onSelect(selectedValues)} />
          <button data-testid={testIds.multiSelectInputRemoveEvent} onClick={() => onRemove(selectedValues)} />
        </fake-multiselect-react-dropdown>
      );
    }
  );

  return {
    __esModule: true,
    Multiselect: mockMultiSelectInput
  };
});

describe('MultiSelect', () => {
  beforeAll(() => {
    jest.spyOn(React, 'useRef');
  });

  beforeEach(() => {
    useRef.mockReturnValue(mockSearchBoxRef);
  });

  afterAll(() => {
    useRef.mockClear();
  });

  describe('rendering', () => {
    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(getComponentToRender(defaultProps), div);
    });

    describe('FormGroup', () => {
      it('has correct label prop', () => {
        const label = faker.random.alphaNumeric(10);
        const props = { ...defaultProps, label };
        render(getComponentToRender(props));
        expect(screen.getByTestId(testIds.formGroup)).toHaveAttribute('label', label);
      });

      it('has correct name prop', () => {
        const name = faker.random.alphaNumeric(10);
        const props = { ...defaultProps, name };
        render(getComponentToRender(props));
        expect(screen.getByTestId(testIds.formGroup)).toHaveAttribute('name', name);
      });

      it('has correct isRow prop', () => {
        const isRow = faker.datatype.boolean();
        const props = { ...defaultProps, isRow };
        render(getComponentToRender(props));
        expect(screen.getByTestId(testIds.formGroup)).toHaveAttribute('isRow', isRow.toString());
      });
    });

    describe('MultiSelectInput', () => {
      it('renders inside the FormGroup', () => {
        render(getComponentToRender(defaultProps));
        const formGroup = screen.getByTestId(testIds.formGroup);
        expect(within(formGroup).getByTestId(testIds.multiSelectInput)).toBeInTheDocument();
      });

      it('has correct loading prop', () => {
        const isLoading = faker.datatype.boolean();
        render(getComponentToRender({ ...defaultProps, isLoading }));
        const multiselectDropDown = screen.getByTestId(testIds.multiSelectInput);
        expect(multiselectDropDown.getAttribute('loading')).toEqual(isLoading.toString());
      });

      it('has correct options prop', () => {
        const options = [{ value: faker.datatype.number(), label: faker.random.alphaNumeric(10) }];
        const props = { ...defaultProps, options };
        render(getComponentToRender(props));
        expect(screen.getByTestId(testIds.multiSelectInput)).toHaveAttribute('options', options.toString());
      });

      it('has correct placeholder prop', () => {
        const placeholder = faker.random.alphaNumeric(10);
        const props = { ...defaultProps, placeholder };
        render(getComponentToRender(props));
        const multiselectDropDown = screen.getByTestId(testIds.multiSelectInput);
        expect(multiselectDropDown.getAttribute('placeholder')).toEqual(placeholder);
      });

      it('has correct name prop', () => {
        const name = faker.random.alphaNumeric(10);
        const props = { ...defaultProps, name };
        render(getComponentToRender(props));
        const multiselectDropDown = screen.getByTestId(testIds.multiSelectInput);
        expect(multiselectDropDown.getAttribute('name')).toEqual(name);
      });

      it('has correct showCheckbox prop', () => {
        const showCheckbox = faker.datatype.boolean();
        render(getComponentToRender({ ...defaultProps, showCheckbox }));
        const multiselectDropDown = screen.getByTestId(testIds.multiSelectInput);
        expect(multiselectDropDown.getAttribute('showCheckbox')).toEqual(showCheckbox.toString());
      });

      it('has correct selectedValues prop when isLoading is false', () => {
        const selectedItems = [
          { value: faker.datatype.number(), label: faker.random.alphaNumeric(10) },
          { value: faker.datatype.number(), label: faker.random.alphaNumeric(10) }
        ];
        const props = { ...defaultProps, isLoading: false, selectedItems };
        render(getComponentToRender(props));
        expect(screen.getByTestId(testIds.multiSelectInput)).toHaveAttribute(
          'selectedValues',
          selectedItems.toString()
        );
      });

      it('has correct selectedValues prop when isLoading is true', () => {
        const selectedItems = [];
        const props = { ...defaultProps, isLoading: true, selectedItems };
        render(getComponentToRender(props));
        expect(screen.getByTestId(testIds.multiSelectInput)).toHaveAttribute(
          'selectedValues',
          selectedItems.toString()
        );
      });

      it('has correct disable prop', () => {
        const disabled = faker.datatype.boolean();
        render(getComponentToRender({ ...defaultProps, disabled }));
        const multiselectDropDown = screen.getByTestId(testIds.multiSelectInput);
        expect(multiselectDropDown.getAttribute('disable')).toEqual(disabled.toString());
      });

      it('has correct avoidHighlightFirstOption prop', () => {
        const expected = true.toString();
        render(getComponentToRender(defaultProps));
        const multiselectDropDown = screen.getByTestId(testIds.multiSelectInput);
        expect(multiselectDropDown.getAttribute('avoidHighlightFirstOption')).toEqual(expected);
      });

      it('has correct displayValue prop', () => {
        const expected = 'label';
        render(getComponentToRender(defaultProps));
        const multiselectDropDown = screen.getByTestId(testIds.multiSelectInput);
        expect(multiselectDropDown.getAttribute('displayValue')).toEqual(expected);
      });
    });
  });

  describe('functional', () => {
    it('should add form-control class to searchBox class list', () => {
      render(getComponentToRender(defaultProps));
      expect(mockSearchBoxRef.current.searchBox.current.classList.contains('form-control')).toBeTruthy();
    });

    it('invokes onChange with correct selected items when multiSelectInput onSelect event is triggered and isLoading is false', function () {
      const onChange = jest.fn();
      const isLoading = false;
      const selectedItems = [{ value: faker.datatype.number(), label: faker.random.alphaNumeric(10) }];
      const props = { ...defaultProps, isLoading, selectedItems, onChange };
      render(getComponentToRender(props));
      fireEvent.click(screen.getByTestId(testIds.multiSelectInputSelectEvent), selectedItems);
      expect(onChange).toHaveBeenCalledWith(selectedItems, defaultProps.sourcePropertyNames);
    });

    it('invokes onChange with correct selected items when multiSelectInput onSelect event is triggered and isLoading is true', function () {
      const onChange = jest.fn();
      const isLoading = true;
      const selectedItems = [];
      const props = { ...defaultProps, isLoading, onChange };
      render(getComponentToRender(props));
      fireEvent.click(screen.getByTestId(testIds.multiSelectInputSelectEvent), selectedItems);
      expect(onChange).toHaveBeenCalledWith(selectedItems, defaultProps.sourcePropertyNames);
    });

    it('invokes onChange with correct selected items when multiSelectInput onRemove event is triggered and isLoading is false', () => {
      const onChange = jest.fn();
      const isLoading = false;
      const selectedItems = [{ value: faker.datatype.number(), label: faker.random.alphaNumeric(10) }];
      const props = { ...defaultProps, isLoading, selectedItems, onChange };
      render(getComponentToRender(props));
      fireEvent.click(screen.getByTestId(testIds.multiSelectInputRemoveEvent), selectedItems);
      expect(onChange).toHaveBeenCalledWith(selectedItems, defaultProps.sourcePropertyNames);
    });

    it('invokes onChange  with correct selected items when multiSelectInput onRemove event is triggered and isLoading is true', () => {
      const onChange = jest.fn();
      const isLoading = true;
      const selectedItems = [];
      const props = { ...defaultProps, isLoading, onChange };
      render(getComponentToRender(props));
      fireEvent.click(screen.getByTestId(testIds.multiSelectInputRemoveEvent), selectedItems);
      expect(onChange).toHaveBeenCalledWith(selectedItems, defaultProps.sourcePropertyNames);
    });
  });
});
