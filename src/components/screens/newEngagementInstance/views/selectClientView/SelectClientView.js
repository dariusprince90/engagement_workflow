import { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { selectCurrentView, selectLookup } from '../../newEngagementInstanceSlice';
import withNewEngagementInstanceViewData from '../withNewEngagementInstanceViewData';

import CollapsibleFormSection from '../../../../common/collapsibleFormSection/CollapsibleFormSection';
import RadioButtonList from '../../components/radioButtonList/RadioButtonList';
import ClientSearch from './components/ClientSearch';
import ExistingClientDetails from './components/ExistingClientDetails';

let SelectClientView = ({ ...propsFromHoc }) => {
  // **********************************************************************
  // * constants

  const { handleInputFieldValueChanged } = propsFromHoc;
  const { formData } = useSelector(selectCurrentView);
  const clientSearchTypes = useSelector((state) => selectLookup(state, 'clientSearchTypes'));

  // **********************************************************************
  // * component vars

  const [clientSearchTypeOptions, setClientSearchTypeOptions] = useState([]);

  // **********************************************************************
  // * side effects

  /**
   * when clientSearchTypes.data changes
   *  - populate clientSearchTypeOptions
   */
  useEffect(
    function populateClientSearchTypeOptions() {
      // if there is no data, the options should be empty
      if (!clientSearchTypes.data.length) {
        setClientSearchTypeOptions([]);
        return;
      }

      const options = clientSearchTypes.data.map((clientSearchType) => {
        return { value: clientSearchType.id, label: clientSearchType.description };
      });

      setClientSearchTypeOptions(options);
    },
    [clientSearchTypes.data]
  );

  // **********************************************************************
  // * render

  return (
    <CollapsibleFormSection title="Select a Client">
      <div className="container-fluid">
        <RadioButtonList
          name="clientSearchTypeId"
          label="To start Engagement Workflow, please select an existing client or an org/contact in CRM"
          selectedValue={formData.clientSearchTypeId}
          options={clientSearchTypeOptions}
          isLoading={clientSearchTypes.isLoading}
          loadingText="Loading options..."
          onChange={handleInputFieldValueChanged}
        />

        <ClientSearch />
        <ExistingClientDetails />
      </div>
    </CollapsibleFormSection>
  );
};

SelectClientView = memo(SelectClientView);
SelectClientView.displayName = 'SelectClientView';

export default withNewEngagementInstanceViewData(SelectClientView);
