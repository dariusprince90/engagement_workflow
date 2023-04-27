import { memo, useEffect, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { selectCurrentView, selectNewEngagementInstance, selectLookups } from '../../../../newEngagementInstanceSlice';
import withNewEngagementInstanceViewData from '../../../withNewEngagementInstanceViewData';
import YesNoRadioButtonListOptions from '../../../../../../../helpers/radioButtonListOptions/YesNoRadioButtonListOptions';
import CollapsibleFormSection from '../../../../../../common/collapsibleFormSection/CollapsibleFormSection';
import RadioButtonList from '../../../../components/radioButtonList/RadioButtonList';
import SelectBox from '../../../../components/selectBox/SelectBox';
import TextArea from '../../../../components/textArea/TextArea';
import TextBox from '../../../../components/textBox/TextBox';

let EngagementInformationNonAttestSection = ({ ...propsFromHoc }) => {
  // **********************************************************************
  // * constants

  const { handleInputFieldValueChanged } = propsFromHoc;
  const { formData } = useSelector(selectCurrentView);
  const { isNewClient } = useSelector(selectNewEngagementInstance);
  const { months, subjectToSecOrGaoRules } = useSelector(selectLookups);

  // **********************************************************************
  // * component vars

  /**
   * fields which have conditional visibility and whether they are shown
   */
  const showFields = useMemo(
    () => ({
      relatedEntityComments: formData.pmCurrentlyProvidesAttest === true,
      doSituationsApply: isNewClient === false,
      taxColleagueStaffNumber: isNewClient === true,
      taxYearEndMonth: isNewClient === true
    }),
    [formData.pmCurrentlyProvidesAttest, isNewClient]
  );

  const [monthOptions, setMonthOptions] = useState([]);
  const [subjectToSecOrGaoRulesOptions, setSubjectToSecOrGaoRulesOptions] = useState([]);

  const doSituationsApplyLabel = (
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
   * when months.data changes
   *  - populate monthOptions
   */
  useEffect(
    function populateMonthOptions() {
      // if there is no data, the options should be empty
      if (!months.data.length) {
        setMonthOptions([]);
        return;
      }

      const options = months.data.map((month) => {
        return { value: month.id, text: month.displayName };
      });

      setMonthOptions(options);
    },
    [months.data]
  );

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
        {showFields.doSituationsApply && (
          <RadioButtonList
            horizontalItems
            name="doSituationsApply"
            label={doSituationsApplyLabel}
            options={YesNoRadioButtonListOptions}
            selectedValue={formData.doSituationsApply}
            onChange={handleInputFieldValueChanged}
          />
        )}

        <RadioButtonList
          horizontalItems
          name="pmCurrentlyProvidesAttest"
          label="Does Company currently provide attest services for this client or for a related entity? This includes personal financial statements."
          options={YesNoRadioButtonListOptions}
          selectedValue={formData.pmCurrentlyProvidesAttest}
          onChange={handleInputFieldValueChanged}
        />

        {showFields.relatedEntityComments && (
          <TextArea
            name="relatedEntityComments"
            label="If a related entity, identify the related entity or individuals"
            placeholder="Type a value"
            rows={6}
            value={formData.relatedEntityComments}
            onChange={handleInputFieldValueChanged}
          />
        )}

        <RadioButtonList
          horizontalItems
          name="subjectToSecOrGaoRuleId"
          label="Will this client be subject to SEC GAO or other independence rules?"
          options={subjectToSecOrGaoRulesOptions}
          selectedValue={formData.subjectToSecOrGaoRuleId}
          isLoading={subjectToSecOrGaoRules.isLoading}
          loadingText="Loading options..."
          onChange={handleInputFieldValueChanged}
        />

        <RadioButtonList
          horizontalItems
          name="mustComplyWithSecDueToRegulation"
          label="Will this client be a Non SEC registrant that must comply with SEC independence rules due to regulation?"
          options={YesNoRadioButtonListOptions}
          selectedValue={formData.mustComplyWithSecDueToRegulation}
          onChange={handleInputFieldValueChanged}
        />

        <TextBox
          name="relatedAttestPartnerStaffNumber"
          label="Related Attest Partner:"
          placeholder="Start typing to select attest partner."
          value={formData.relatedAttestPartnerStaffNumber}
          onChange={handleInputFieldValueChanged}
        />

        <TextArea
          name="relevantComments"
          label="Please provide any additional explanations/commentary that will assist approvers in understanding the expected fees or the nature of the engagement:"
          placeholder=""
          rows={6}
          value={formData.relevantComments}
          onChange={handleInputFieldValueChanged}
        />

        <RadioButtonList
          horizontalItems
          name="preparedFederalTaxReturnLastYear"
          label="Have we prepared the federal tax return for this client in the last year?"
          options={YesNoRadioButtonListOptions}
          selectedValue={formData.preparedFederalTaxReturnLastYear}
          onChange={handleInputFieldValueChanged}
        />

        {showFields.taxColleagueStaffNumber && (
          <TextBox
            name="taxColleagueStaffNumber"
            label="Please select the Tax Colleague you’re working with:"
            placeholder="Start typing to select a tax colleague"
            value={formData.taxColleagueStaffNumber}
            onChange={handleInputFieldValueChanged}
          />
        )}

        {showFields.taxYearEndMonth && (
          <SelectBox
            name="taxYearEndMonth"
            label="Tax Return Year End:"
            defaultOption="Select Tax Return Year End"
            options={monthOptions}
            isLoading={months.isLoading}
            loadingText="Loading verticals..."
            value={formData.taxYearEndMonth}
            onChange={handleInputFieldValueChanged}
          />
        )}
      </div>
    </CollapsibleFormSection>
  );
};

EngagementInformationNonAttestSection = memo(EngagementInformationNonAttestSection);
EngagementInformationNonAttestSection.displayName = 'EngagementInformationNonAttestSection';

export default withNewEngagementInstanceViewData(EngagementInformationNonAttestSection);
