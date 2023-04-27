import { memo, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import ATTACHMENT_REFERENCE_TYPES from '../../../../../../../helpers/enums/attachmentReferenceTypes';

import { selectCurrentView, selectNewEngagementInstance, selectLookups } from '../../../../newEngagementInstanceSlice';
import withNewEngagementInstanceViewData from '../../../withNewEngagementInstanceViewData';

import YesNoRadioButtonListOptions from '../../../../../../../helpers/radioButtonListOptions/YesNoRadioButtonListOptions';
import CollapsibleFormSection from '../../../../../../common/collapsibleFormSection/CollapsibleFormSection';
import FormHeader from '../../../../../../common/formHeader/FormHeader';
import FormText from '../../../../components/formText/FormText';
import TextBox from '../../../../components/textBox/TextBox';
import RadioButtonList from '../../../../components/radioButtonList/RadioButtonList';
import AttachmentsTable from '../../../../components/attachmentsTable/AttachmentsTable';

let EngagementInformationAttestSection = ({ ...propsFromHoc }) => {
  // **********************************************************************
  // * constants

  const { handleInputFieldValueChanged } = propsFromHoc;
  const { formData } = useSelector(selectCurrentView);
  const { isNewClient } = useSelector(selectNewEngagementInstance);
  const { subjectToSecOrGaoRules } = useSelector(selectLookups);

  // **********************************************************************
  // * component vars

  /**
   * fields which have conditional visibility and whether they are shown
   */
  const showFields = useMemo(
    () => ({
      instructionsFormHeader: isNewClient === true,
      tickerSymbol: formData.isNewClientSecRegistrant === true,
      doSituationsApplyInstructionsFormText: isNewClient === true,
      engagementIncludesAuditOfEmployeeBenefitPlan: formData.engagementIncludesAuditOfSecFilings === true,
      auditedFinancialStatementsIncludedIn11KLabel: isNewClient === false,
      prospectiveFinancialStatementsToBeIssuedInstructionsFormText:
        formData.prospectiveFinancialStatementsToBeIssued === true
    }),
    [
      formData.isNewClientSecRegistrant,
      formData.engagementIncludesAuditOfSecFilings,
      formData.prospectiveFinancialStatementsToBeIssued,
      isNewClient
    ]
  );
  const [subjectToSecOrGaoRulesOptions, setSubjectToSecOrGaoRulesOptions] = useState([]);

  const auditedFinancialStatementsIncludedIn11KLabel = (
    <div>
      Do any of these situations apply?
      <ul>
        <li>A previous client returning to the firm</li>
        <li>An upgrade to a higher Attest service (e.g. Review to Audit, EBPA only to Audit of Sponsor, etc.)</li>
        <li>Performing first time Attest services for an existing NonAttest client</li>
        <li>Engagement to compile or examine a forecast or projection</li>
      </ul>
    </div>
  );

  // **********************************************************************
  // * functions

  // **********************************************************************
  // * side effects

  /**
   * when lookups.subjectToSecOrGaoRules.data changes
   *  - populate subjectToSecOrGaoRulesOptions
   */
  useEffect(
    function populateSecGaoOptions() {
      // if there is no data, the options should be empty
      if (!subjectToSecOrGaoRules.data.length) {
        setSubjectToSecOrGaoRulesOptions([]);
        return;
      }

      const options = subjectToSecOrGaoRules.data.map((rule) => {
        return { value: rule.id, label: rule.displayName };
      });

      setSubjectToSecOrGaoRulesOptions(options);
    },
    [subjectToSecOrGaoRules.data]
  );

  // **********************************************************************
  // * render

  return (
    <CollapsibleFormSection title="Engagement Information">
      <div className="container-fluid">
        {showFields.instructionsFormHeader && (
          <FormHeader
            name="instructionsFormHeader"
            text="CHECKING YES REQUIRES THE ATTACHMENT OF SUPPORTING FINANCIAL STATEMENT OR INPUT OF OTHER INFORMATION"
          />
        )}

        <RadioButtonList
          horizontalItems
          name="isNewClientSecRegistrant"
          label="Is the prospective client an SEC registrant for which we will be performing attest services?"
          options={YesNoRadioButtonListOptions}
          selectedValue={formData.isNewClientSecRegistrant}
          onChange={handleInputFieldValueChanged}
        />

        {showFields.tickerSymbol && (
          <TextBox
            name="tickerSymbol"
            label="If yes, Enter the ticker symbol:"
            placeholder="Type a value"
            value={formData.tickerSymbol}
            onChange={handleInputFieldValueChanged}
          />
        )}

        <RadioButtonList
          horizontalItems
          name="doSituationsApply"
          label="Will our engagement include the audit of the taxpayer's financial statements filed with the SEC?"
          options={YesNoRadioButtonListOptions}
          selectedValue={formData.doSituationsApply}
          onChange={handleInputFieldValueChanged}
        />

        {showFields.doSituationsApplyInstructionsFormText && (
          <FormText applyEmphasis name="doSituationsApplyInstructionsFormText">
            Note: If this answer is yes, the SEC supplemental section must be completed.
          </FormText>
        )}

        <RadioButtonList
          horizontalItems
          name="engagementIncludesAuditOfSecFilings"
          label="Will our engagement include an audit of the taxpayer's employee benefit plan?"
          options={YesNoRadioButtonListOptions}
          selectedValue={formData.engagementIncludesAuditOfSecFilings}
          onChange={handleInputFieldValueChanged}
        />

        {showFields.engagementIncludesAuditOfEmployeeBenefitPlan && (
          <RadioButtonList
            horizontalItems
            name="engagementIncludesAuditOfEmployeeBenefitPlan"
            label="Will those audited plan financial statements be included in a Form 11-K filing with the SEC?"
            options={YesNoRadioButtonListOptions}
            selectedValue={formData.engagementIncludesAuditOfEmployeeBenefitPlan}
            onChange={handleInputFieldValueChanged}
          />
        )}

        {showFields.auditedFinancialStatementsIncludedIn11KLabel && (
          <RadioButtonList
            horizontalItems
            name="auditedFinancialStatementsIncludedIn11K"
            label={auditedFinancialStatementsIncludedIn11KLabel}
            options={YesNoRadioButtonListOptions}
            selectedValue={formData.auditedFinancialStatementsIncludedIn11K}
            onChange={handleInputFieldValueChanged}
          />
        )}

        <RadioButtonList
          horizontalItems
          name="subjectToSecOrGaoRuleId"
          label="Will this client be subject to SEC, GAO or other independence rules?"
          options={subjectToSecOrGaoRulesOptions}
          selectedValue={formData.subjectToSecOrGaoRuleId}
          isLoading={subjectToSecOrGaoRules.isLoading}
          loadingText="Loading options..."
          onChange={handleInputFieldValueChanged}
        />

        <RadioButtonList
          horizontalItems
          name="engagementIncludesAuditOfFinancialInstitution"
          label="Does the engagement include an audit of a financial institution? If yes, the financial services supplemental information must be completed."
          options={YesNoRadioButtonListOptions}
          selectedValue={formData.engagementIncludesAuditOfFinancialInstitution}
          onChange={handleInputFieldValueChanged}
        />

        <RadioButtonList
          horizontalItems
          name="prospectiveFinancialStatementsToBeIssued"
          label="Are Prospective Financial Statements (forecasts or projections) to be issued?"
          options={YesNoRadioButtonListOptions}
          selectedValue={formData.prospectiveFinancialStatementsToBeIssued}
          onChange={handleInputFieldValueChanged}
        />

        {showFields.prospectiveFinancialStatementsToBeIssuedInstructionsFormText && (
          <FormText applyEmphasis name="prospectiveFinancialStatementsToBeIssuedInstructionsFormText">
            If yes, the prospective financial statements supplemental information must be completed.
          </FormText>
        )}

        <RadioButtonList
          horizontalItems
          name="performedPreviousTaxWork"
          label="Have we prepared the federal tax return for this client in the last year?"
          options={YesNoRadioButtonListOptions}
          selectedValue={formData.performedPreviousTaxWork}
          onChange={handleInputFieldValueChanged}
        />

        <FormHeader name="attachmentsFormHeader" text="Attachments" />
        <AttachmentsTable attachmentReferenceType={ATTACHMENT_REFERENCE_TYPES.attestEngagementInformation} />
      </div>
    </CollapsibleFormSection>
  );
};

EngagementInformationAttestSection = memo(EngagementInformationAttestSection);
EngagementInformationAttestSection.displayName = 'EngagementInformationAttestSection';

export default withNewEngagementInstanceViewData(EngagementInformationAttestSection);
