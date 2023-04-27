import { memo } from 'react';

import CollapsibleFormSection from '../../../../../../common/collapsibleFormSection/CollapsibleFormSection';
import TextBox from '../../../../components/textBox/TextBox';
import PhoneNumber from '../../../../components/phoneNumber/PhoneNumber';

let ClientCommunicationInfoSection = () => {
  // **********************************************************************
  // * constants

  // **********************************************************************
  // * component vars

  // **********************************************************************
  // * functions

  // **********************************************************************
  // * side effects

  // **********************************************************************
  // * render

  return (
    <CollapsibleFormSection title="Client Communication Information">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <PhoneNumber
              name="workPhoneNumber"
              label="Work:"
              countryHierarchyReferenceId=""
              phoneNumber=""
              isPrimary={false}
              onChange={() => {}}
            />

            <PhoneNumber
              name="faxPhoneNumber"
              label="Fax:"
              countryHierarchyReferenceId=""
              phoneNumber=""
              isPrimary={false}
              onChange={() => {}}
            />
          </div>
          <div className="col-md-6">
            <PhoneNumber
              name="mobilePhoneNumber"
              label="Mobile:"
              countryHierarchyReferenceId=""
              phoneNumber=""
              isPrimary={false}
              onChange={() => {}}
            />

            <TextBox name="emailAddress" label="Email:" value="" placeholder="Type a value" onChange={() => {}} />
          </div>
        </div>
      </div>
    </CollapsibleFormSection>
  );
};

ClientCommunicationInfoSection = memo(ClientCommunicationInfoSection);
ClientCommunicationInfoSection.displayName = 'ClientCommunicationInfoSection';

export default ClientCommunicationInfoSection;
