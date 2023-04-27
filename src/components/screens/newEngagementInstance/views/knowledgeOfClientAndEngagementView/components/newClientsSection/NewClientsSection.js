import { memo } from 'react';
import { useSelector } from 'react-redux';

import ATTACHMENT_REFERENCE_TYPES from '../../../../../../../helpers/enums/attachmentReferenceTypes';

import { selectCurrentView } from '../../../../newEngagementInstanceSlice';
import withNewEngagementInstanceViewData from '../../../withNewEngagementInstanceViewData';

import YesNoRadioButtonListOptions from '../../../../../../../helpers/radioButtonListOptions/YesNoRadioButtonListOptions';
import YesNoNotYetAvailableRadioButtonListOptions from '../../../../../../../helpers/radioButtonListOptions/YesNoNotYetAvailableRadioButtonListOptions';
import CollapsibleFormSection from '../../../../../../common/collapsibleFormSection/CollapsibleFormSection';
import FormHeader from '../../../../../../common/formHeader/FormHeader';
import FormText from '../../../../components/formText/FormText';
import RadioButtonList from '../../../../components/radioButtonList/RadioButtonList';
import TextArea from '../../../../components/textArea/TextArea';
import AttachmentsTable from '../../../../components/attachmentsTable/AttachmentsTable';

let NewClientsSection = ({ ...propsFromHoc }) => {
  // **********************************************************************
  // * constants

  const { handleInputFieldValueChanged } = propsFromHoc;
  const { formData } = useSelector(selectCurrentView);

  // **********************************************************************
  // * component vars

  // **********************************************************************
  // * functions

  // **********************************************************************
  // * side effects

  // **********************************************************************
  // * render

  return (
    <CollapsibleFormSection title="New Clients">
      <div className="container-fluid">
        <RadioButtonList
          horizontalItems
          name="isBackgroundCheckOptional"
          label={
            'Would you like an optional background check to be conducted? This is required for financial statement ' +
            'audit of a SEC registrant with a 10-k filing requirement.'
          }
          options={YesNoRadioButtonListOptions}
          selectedValue={formData.isBackgroundCheckOptional}
          onChange={handleInputFieldValueChanged}
        />

        <RadioButtonList
          horizontalItems
          name="otherAccountantsPreviouslyWorked"
          label="Did other accountants previously work with this (potential) client?"
          options={YesNoRadioButtonListOptions}
          selectedValue={formData.otherAccountantsPreviouslyWorked}
          onChange={handleInputFieldValueChanged}
        />

        <RadioButtonList
          horizontalItems
          name="financialStatementsExist"
          label="Do financial statements exist for this client?"
          options={YesNoNotYetAvailableRadioButtonListOptions}
          selectedValue={formData.financialStatementsExist}
          onChange={handleInputFieldValueChanged}
        />

        <FormText applyEmphasis>
          If Yes, Attach client's financial statements (most recent annual and interim statements). For SEC audit
          engagements, attach the most recent 10-K (or 11-K), 10-Q and proxy. Also attach recent 8K's that may be
          relevant to acceptance decision. If they exist, attach communications regarding accounting, audit, or internal
          matters from prior accountants (management letters, reportable conditions letter, etc.).
        </FormText>

        <FormText applyEmphasis>If no, respond to the following questions:</FormText>

        <TextArea
          name="explanationForNoFinancialStatements"
          label="Please explain why no financial statements are available?"
          value={formData.explanationForNoFinancialStatements}
          placeholder="Type a value"
          rows={6}
          onChange={handleInputFieldValueChanged}
        />

        <TextArea
          name="explanationOfTotalAssetsForClient"
          label="What are total assets for the proposed client?"
          value={formData.explanationOfTotalAssetsForClient}
          placeholder="Type a value"
          rows={6}
          onChange={handleInputFieldValueChanged}
        />

        <TextArea
          name="explanationOfTotalEquityForClient"
          label="What is total equity for the proposed client?"
          value={formData.explanationOfTotalEquityForClient}
          placeholder="Type a value"
          rows={6}
          onChange={handleInputFieldValueChanged}
        />

        <TextArea
          name="explanationOfPast2YearsRevenue"
          label="What was revenue for the past 2 years?"
          value={formData.explanationOfPast2YearsRevenue}
          placeholder="Type a value"
          rows={6}
          onChange={handleInputFieldValueChanged}
        />

        <TextArea
          name="explanationOfPast2YearsIncome"
          label="What was income for the past 2  years?"
          value={formData.explanationOfPast2YearsIncome}
          placeholder="Type a value"
          rows={6}
          onChange={handleInputFieldValueChanged}
        />

        <FormText applyEmphasis>
          For larger, more complex clients or potential clients that have apparent risks/results/attributes that would
          create questions about acceptance, attach a memo that describes your assessment of critical client acceptance
          factors. Identify relevant factors approvers should consider in making acceptance decisions.
        </FormText>

        <FormHeader name="attachmentsFormHeader" text="Attachments" />
        <AttachmentsTable attachmentReferenceType={ATTACHMENT_REFERENCE_TYPES.knowledgeOfNewClient} />
      </div>
    </CollapsibleFormSection>
  );
};

NewClientsSection = memo(NewClientsSection);
NewClientsSection.displayName = 'NewClientsSection';

export default withNewEngagementInstanceViewData(NewClientsSection);
