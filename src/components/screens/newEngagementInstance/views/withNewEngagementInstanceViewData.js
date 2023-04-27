import { memo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  lookupItemDataCleared,
  selectCurrentViewId,
  viewFormDataChanged
} from '../../newEngagementInstance/newEngagementInstanceSlice';

const withNewEngagementInstanceViewData = (ComponentToWrap) => {
  // **********************************************************************
  // * helper functions for the hoc

  /**
   * Gets the display name of a given component.
   * @param {object} Component - The component for which to get the display name.
   * @returns The display name of the wrapped component.
   */
  const getDisplayName = (Component) => Component.displayName || Component.name || 'Component';

  // **********************************************************************
  // * higher order component definition

  let WithNewEngagementInstanceViewData = (props) => {
    // **********************************************************************
    // * constants

    const dispatch = useDispatch();
    const viewId = useSelector(selectCurrentViewId);

    // **********************************************************************
    // * component vars

    // **********************************************************************
    // * functions

    /**
     * Handler for an AutoComplete's onClearData event.
     */
    const handleAutoCompleteDataCleared = useCallback(
      (sourcePropertyNames) => {
        const lookupName = sourcePropertyNames.matches;
        const payload = { viewId, lookupName };
        dispatch(lookupItemDataCleared(payload));
      },
      [dispatch, viewId]
    );

    /**
     * Handler for an AutoComplete's onResetItem event.
     */
    const handleAutoCompleteItemReset = useCallback(
      (sourcePropertyNames) => {
        const { value, displayName } = sourcePropertyNames;
        const updatedFormData = { [value]: '', [displayName]: '' };
        const payload = { viewId, formData: updatedFormData };
        dispatch(viewFormDataChanged(payload));
      },
      [dispatch, viewId]
    );

    /**
     * Handler for an AutoComplete's onSelect event.
     */
    const handleAutoCompleteItemSelected = useCallback(
      (selectedItem, sourcePropertyNames) => {
        const { id, displayName } = selectedItem;
        const { value, displayName: displayNameProp } = sourcePropertyNames;
        const updatedFormData = { [value]: id, [displayNameProp]: displayName };
        const payload = { viewId, formData: updatedFormData };
        dispatch(viewFormDataChanged(payload));
      },
      [dispatch, viewId]
    );

    /**
     * Handler for an AutoComplete's onSearch event.
     */
    const handleAutoCompleteSearch = useCallback(
      (event, sourcePropertyNames, searchMethod) => {
        const { searchQuery } = event;
        const lookupName = sourcePropertyNames.matches;
        const payload = { viewId, lookupName, searchQuery };
        dispatch(searchMethod(payload));
      },
      [dispatch, viewId]
    );

    /**
     * Handler for a CheckBox's onChange event.
     */
    const handleCheckBoxValueChanged = useCallback(
      (event) => {
        const { name, checked } = event.target;
        const updatedFormData = { [name]: checked };
        const payload = { viewId, formData: updatedFormData };
        dispatch(viewFormDataChanged(payload));
      },
      [dispatch, viewId]
    );

    /**
     * Handler for a DatePicker's onChange event.
     */
    const handleDatePickerValueChanged = useCallback(
      (event) => {
        const { name, value } = event.target;
        const newValue = value?.toISOString() ?? null;
        const updatedFormData = { [name]: newValue };
        const payload = { viewId, formData: updatedFormData };
        dispatch(viewFormDataChanged(payload));
      },
      [dispatch, viewId]
    );

    /**
     * Handler for a generic input's onChange event.
     * @summary Can be used with:
     * - RadioButtonList
     * - SelectBox
     * - TextBox
     * - TextArea
     */
    const handleInputFieldValueChanged = useCallback(
      (event) => {
        const { name, value } = event.target;

        // if the value comes through as a boolean-as-string, convert to boolean
        // otherwise leave the value untouched
        const newValue = value.toLowerCase() === 'true' || (value.toLowerCase() === 'false' ? false : value);

        const updatedFormData = { [name]: newValue };
        const payload = { viewId, formData: updatedFormData };
        dispatch(viewFormDataChanged(payload));
      },
      [dispatch, viewId]
    );

    /**
     * Handler for a MultiSelect's onChange event.
     */
    const handleMultiSelectValueChanged = useCallback(
      (selectedValues, sourcePropertyNames) => {
        const { value, selectedItems } = sourcePropertyNames;
        const selectedValuesJoined = selectedValues.map((item) => item.value).join(',');
        const updatedFormData = { [value]: selectedValuesJoined, [selectedItems]: selectedValues };
        const payload = { viewId, formData: updatedFormData };
        dispatch(viewFormDataChanged(payload));
      },
      [dispatch, viewId]
    );

    // **********************************************************************
    // * side effects

    // **********************************************************************
    // * render

    const injectedProps = {
      handleAutoCompleteDataCleared,
      handleAutoCompleteItemReset,
      handleAutoCompleteItemSelected,
      handleAutoCompleteSearch,
      handleCheckBoxValueChanged,
      handleDatePickerValueChanged,
      handleInputFieldValueChanged,
      handleMultiSelectValueChanged
    };

    return <ComponentToWrap {...props} {...injectedProps} />;
  };

  WithNewEngagementInstanceViewData = memo(WithNewEngagementInstanceViewData);
  WithNewEngagementInstanceViewData.displayName = `WithNeiFormData(${getDisplayName(ComponentToWrap)})`;

  return WithNewEngagementInstanceViewData;
};

export default withNewEngagementInstanceViewData;
