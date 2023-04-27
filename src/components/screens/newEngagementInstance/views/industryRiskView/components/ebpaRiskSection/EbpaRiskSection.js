import { memo } from 'react';
import { useSelector } from 'react-redux';

import ATTACHMENT_REFERENCE_TYPES from '../../../../../../../helpers/enums/attachmentReferenceTypes';

import { selectCurrentView } from '../../../../newEngagementInstanceSlice';
import withNewEngagementInstanceViewData from '../../../../views/withNewEngagementInstanceViewData';

import YesNoTbdRadioButtonListOptions from '../../../../../../../helpers/radioButtonListOptions/YesNoTbdRadioButtonListOptions';
import CollapsibleFormSection from '../../../../../../common/collapsibleFormSection/CollapsibleFormSection';
import FormHeader from '../../../../../../common/formHeader/FormHeader';
import RadioButtonList from '../../../../components/radioButtonList/RadioButtonList';
import TextArea from '../../../../components/textArea/TextArea';
import AttachmentsTable from '../../../../components/attachmentsTable/AttachmentsTable';

let EbpaRiskSection = ({ ...propsFromHoc }) => {
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
    <CollapsibleFormSection title="Ebpa Risk">
      <div className="container-fluid">
        <FormHeader
          name="finalApprovalStepFormHeader"
          text="Any question marked as TBD must be replaced with YES/NO at Relationship Partner Final Approval step."
        />
        <FormHeader text="Ebpa Risk" name="ebpaRisk" />
        <RadioButtonList
          horizontalItems
          name="ebpaPlanHasHighLevelOfComplaints"
          label="1. High level of participant complaints?"
          options={YesNoTbdRadioButtonListOptions}
          onChange={handleInputFieldValueChanged}
          selectedValue={formData.ebpaPlanHasHighLevelOfComplaints}
        />
        <TextArea
          name="ebpaPlanHasHighLevelOfComplaintsComments"
          label="If yes, explain:"
          placeholder="Type a value"
          value={formData.ebpaPlanHasHighLevelOfComplaintsComments}
          rows={6}
          onChange={handleInputFieldValueChanged}
        />
        <RadioButtonList
          horizontalItems
          name="ebpaUnderIrsOrDolReviewInPastYear"
          label="2. Investigation or audited by DOL or IRS? Explain any issues that remain open for resolution."
          options={YesNoTbdRadioButtonListOptions}
          onChange={handleInputFieldValueChanged}
          selectedValue={formData.ebpaUnderIrsOrDolReviewInPastYear}
        />
        <TextArea
          name="ebpaUnderIrsOrDolReviewInPastYearComments"
          label="If yes, explain:"
          placeholder="Type a value"
          value={formData.ebpaUnderIrsOrDolReviewInPastYearComments}
          rows={6}
          onChange={handleInputFieldValueChanged}
        />
        <RadioButtonList
          horizontalItems
          name="ebpaAwareOfIntentNotToCorrectComplianceIssues"
          label="3. Does the plan have current compliance issues? Explain including any matters the Sponsor in not planning to correct."
          options={YesNoTbdRadioButtonListOptions}
          onChange={handleInputFieldValueChanged}
          selectedValue={formData.ebpaAwareOfIntentNotToCorrectComplianceIssues}
        />
        <TextArea
          name="ebpaAwareOfIntentNotToCorrectComplianceIssuesComments"
          label="If yes, explain:"
          placeholder="Type a value"
          value={formData.ebpaAwareOfIntentNotToCorrectComplianceIssuesComments}
          rows={6}
          onChange={handleInputFieldValueChanged}
        />
        <RadioButtonList
          horizontalItems
          name="ebpaPastInstancesOfNonComplianceCorrected"
          label="4. Does the plan have past instances of noncompliance?"
          options={YesNoTbdRadioButtonListOptions}
          onChange={handleInputFieldValueChanged}
          selectedValue={formData.ebpaPastInstancesOfNonComplianceCorrected}
        />
        <TextArea
          name="ebpaPastInstancesOfNonComplianceCorrectedComments"
          label="If yes, explain:"
          placeholder="Type a value"
          value={formData.ebpaPastInstancesOfNonComplianceCorrectedComments}
          rows={6}
          onChange={handleInputFieldValueChanged}
        />
        <RadioButtonList
          horizontalItems
          name="ebpaPlanHoldsCompanyStockNotPubliclyTraded"
          label="5. Does the plan hold company stock that is not publicly traded(ESOP)?"
          options={YesNoTbdRadioButtonListOptions}
          onChange={handleInputFieldValueChanged}
          selectedValue={formData.ebpaPlanHoldsCompanyStockNotPubliclyTraded}
        />
        <TextArea
          name="ebpaAppraisalComments"
          label="If yes, explain:"
          placeholder="Type a value"
          value={formData.ebpaAppraisalComments}
          rows={6}
          onChange={handleInputFieldValueChanged}
        />
        <RadioButtonList
          horizontalItems
          name="ebpaIsEsopLeveraged"
          label="6. Is the ESOP leveraged (and fee quote adjusted)?"
          options={YesNoTbdRadioButtonListOptions}
          onChange={handleInputFieldValueChanged}
          selectedValue={formData.ebpaIsEsopLeveraged}
        />
        <TextArea
          name="ebpaIsEsopLeveragedComments"
          label="If yes, explain:"
          placeholder="Type a value"
          value={formData.ebpaIsEsopLeveragedComments}
          rows={6}
          onChange={handleInputFieldValueChanged}
        />
        <RadioButtonList
          horizontalItems
          name="ebpaRecentMergerServiceProviderChangeAudit"
          label="7. Recent Merger, service provider changes or full scope audit?(Fee quote should be adjusted for any of these)"
          options={YesNoTbdRadioButtonListOptions}
          onChange={handleInputFieldValueChanged}
          selectedValue={formData.ebpaRecentMergerServiceProviderChangeAudit}
        />
        <TextArea
          name="ebpaRecentMergerServiceProviderChangeAuditComments"
          label="If yes, explain:"
          placeholder="Type a value"
          value={formData.ebpaRecentMergerServiceProviderChangeAuditComments}
          rows={6}
          onChange={handleInputFieldValueChanged}
        />

        <FormHeader text="Attachments" name="attachmentsFormHeader" />
        <AttachmentsTable attachmentReferenceType={ATTACHMENT_REFERENCE_TYPES.ebpaRisk} />
      </div>
    </CollapsibleFormSection>
  );
};

EbpaRiskSection = memo(EbpaRiskSection);
EbpaRiskSection.displayName = 'EbpaRiskSection';

export default withNewEngagementInstanceViewData(EbpaRiskSection);
