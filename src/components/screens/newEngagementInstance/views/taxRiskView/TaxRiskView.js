import { memo, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { selectCurrentView } from '../../../newEngagementInstance/newEngagementInstanceSlice';
import withNewEngagementInstanceViewData from '../../views/withNewEngagementInstanceViewData';

import YesNoRadioButtonListOptions from '../../../../../helpers/radioButtonListOptions/YesNoRadioButtonListOptions';
import YesNoNaRadioButtonListOptions from '../../../../../helpers/radioButtonListOptions/YesNoNaRadioButtonListOptions';
import RiskRatingRadioButtonListOptions from '../../../../../helpers/radioButtonListOptions/RiskRatingRadioButtonListOptions';

import CollapsibleFormSection from '../../../../common/collapsibleFormSection/CollapsibleFormSection';
import FormText from '../../components/formText/FormText';
import RadioButtonList from '../../components/radioButtonList/RadioButtonList';
import TextArea from '../../components/textArea/TextArea';
import TextBox from '../../components/textBox/TextBox';

let TaxRiskView = ({ ...propsFromHoc }) => {
  // **********************************************************************
  // * constants

  /**
   * value which represents N/A as a string
   */
  const NA_VALUE = 'N/A';

  const { handleInputFieldValueChanged } = propsFromHoc;
  const { formData } = useSelector(selectCurrentView);

  // **********************************************************************
  // * component vars

  /**
   * fields which have conditional visibility and whether they are shown
   */
  const showFields = useMemo(
    () => ({
      internationalTaxTeamMember: formData.internationallyActive === true,
      requiresExpertiseOutsideOfCoreTeamComments: formData.requiresExpertiseOutsideOfCoreTeam === true,
      significantAuditAdjustmentsInstructionsFormText: formData.significantAuditAdjustments === true,
      auditAdjustmentsIssueResolved: formData.significantAuditAdjustments === true,
      auditAdjustmentsImplicationsForCurrentYear: formData.significantAuditAdjustments === true,
      engagedInTaxLitigationInstructionsFormText: formData.engagedInTaxLitigation === true,
      taxLitigationIssueResolved: formData.engagedInTaxLitigation === true,
      taxLitigationImplicationsForCurrentYear: formData.engagedInTaxLitigation === true,
      auditAdjustmentsImplicationsForCurrentYearComments:
        formData.auditAdjustmentsImplicationsForCurrentYear === true && formData.significantAuditAdjustments === true,
      taxLitigationImplicationsForCurrentYearComments:
        formData.taxLitigationImplicationsForCurrentYear === true && formData.engagedInTaxLitigation === true,
      hasUncertainTaxPositionsComments: formData.hasUncertainTaxPositions === true,
      managementIntegrityConcernsComments: formData.managementIntegrityConcerns === true,
      reviewedPriorYearReturnComments: formData.reviewedPriorYearReturn === NA_VALUE
    }),
    [
      formData.internationallyActive,
      formData.requiresExpertiseOutsideOfCoreTeam,
      formData.significantAuditAdjustments,
      formData.engagedInTaxLitigation,
      formData.auditAdjustmentsImplicationsForCurrentYear,
      formData.taxLitigationImplicationsForCurrentYear,
      formData.hasUncertainTaxPositions,
      formData.managementIntegrityConcerns,
      formData.reviewedPriorYearReturn
    ]
  );

  // **********************************************************************
  // * functions

  // **********************************************************************
  // * side effects

  // **********************************************************************
  // * render

  return (
    <CollapsibleFormSection title="Tax Risk">
      <div className="container-fluid">
        <RadioButtonList
          horizontalItems
          name="internationallyActive"
          label="1. Is the Taxpayer Internationally active or is Internationally activity imminent?"
          options={YesNoRadioButtonListOptions}
          selectedValue={formData.internationallyActive}
          onChange={handleInputFieldValueChanged}
        />

        {showFields.internationalTaxTeamMember && (
          <TextBox
            name="internationalTaxTeamMember"
            label={
              'If yes, Name the member of the international tax team with whom you have consulted regarding ' +
              'this opportunity'
            }
            value={formData.internationalTaxTeamMember}
            placeholder="Type a value"
            onChange={handleInputFieldValueChanged}
          />
        )}

        <RadioButtonList
          horizontalItems
          name="requiresExpertiseOutsideOfCoreTeam"
          label={
            '2. Does the engagement require tax expertise outside of the core engagement team? Example include cost ' +
            'segregation, research and development, international, multi state, IRS controversy, etc.'
          }
          options={YesNoRadioButtonListOptions}
          selectedValue={formData.requiresExpertiseOutsideOfCoreTeam}
          onChange={handleInputFieldValueChanged}
        />

        {showFields.requiresExpertiseOutsideOfCoreTeamComments && (
          <TextArea
            name="requiresExpertiseOutsideOfCoreTeamComments"
            label="If yes, please explain:"
            value={formData.requiresExpertiseOutsideOfCoreTeamComments}
            placeholder="Type a value"
            rows={6}
            onChange={handleInputFieldValueChanged}
          />
        )}

        <RadioButtonList
          horizontalItems
          name="significantAuditAdjustments"
          label="3. Has the Taxpayer had significant audit adjustments - Federal or State?"
          options={YesNoRadioButtonListOptions}
          selectedValue={formData.significantAuditAdjustments}
          onChange={handleInputFieldValueChanged}
        />

        {showFields.significantAuditAdjustmentsInstructionsFormText && (
          <FormText applyEmphasis name="significantAuditAdjustmentsInstructionsFormText">
            If yes the following list of questions are to be completed
          </FormText>
        )}

        {showFields.auditAdjustmentsIssueResolved && (
          <RadioButtonList
            horizontalItems
            name="auditAdjustmentsIssueResolved"
            label="Is the issue(s) resolved?"
            options={YesNoRadioButtonListOptions}
            selectedValue={formData.auditAdjustmentsIssueResolved}
            onChange={handleInputFieldValueChanged}
          />
        )}

        {showFields.auditAdjustmentsImplicationsForCurrentYear && (
          <RadioButtonList
            horizontalItems
            name="auditAdjustmentsImplicationsForCurrentYear"
            label="Are there implication on the current year?"
            options={YesNoRadioButtonListOptions}
            selectedValue={formData.auditAdjustmentsImplicationsForCurrentYear}
            onChange={handleInputFieldValueChanged}
          />
        )}

        {showFields.auditAdjustmentsImplicationsForCurrentYearComments && (
          <TextArea
            name="auditAdjustmentsImplicationsForCurrentYearComments"
            label="If yes, please explain:"
            value={formData.auditAdjustmentsImplicationsForCurrentYearComments}
            placeholder="Type a value"
            rows={6}
            onChange={handleInputFieldValueChanged}
          />
        )}

        <RadioButtonList
          horizontalItems
          name="engagedInTaxLitigation"
          label="4. Has the taxpayer been engaged in tax litigation?"
          options={YesNoRadioButtonListOptions}
          selectedValue={formData.engagedInTaxLitigation}
          onChange={handleInputFieldValueChanged}
        />

        {showFields.engagedInTaxLitigationInstructionsFormText && (
          <FormText applyEmphasis name="engagedInTaxLitigationInstructionsFormText">
            If yes the following list of questions are to be completed
          </FormText>
        )}

        {showFields.taxLitigationIssueResolved && (
          <RadioButtonList
            horizontalItems
            name="taxLitigationIssueResolved"
            label="Is the issue(s) resolved?"
            options={YesNoRadioButtonListOptions}
            selectedValue={formData.taxLitigationIssueResolved}
            onChange={handleInputFieldValueChanged}
          />
        )}

        {showFields.taxLitigationImplicationsForCurrentYear && (
          <RadioButtonList
            horizontalItems
            name="taxLitigationImplicationsForCurrentYear"
            label="Are there implication on the current year?"
            options={YesNoRadioButtonListOptions}
            selectedValue={formData.taxLitigationImplicationsForCurrentYear}
            onChange={handleInputFieldValueChanged}
          />
        )}

        {showFields.taxLitigationImplicationsForCurrentYearComments && (
          <TextArea
            name="taxLitigationImplicationsForCurrentYearComments"
            label="If yes, please explain:"
            placeholder="Type a value"
            value={formData.taxLitigationImplicationsForCurrentYearComments}
            rows={6}
            onChange={handleInputFieldValueChanged}
          />
        )}

        <RadioButtonList
          horizontalItems
          name="hasUncertainTaxPositions"
          label="5. Does the Taxpayer have uncertain tax positions?"
          options={YesNoRadioButtonListOptions}
          selectedValue={formData.hasUncertainTaxPositions}
          onChange={handleInputFieldValueChanged}
        />

        {showFields.hasUncertainTaxPositionsComments && (
          <TextArea
            name="hasUncertainTaxPositionsComments"
            label="If yes, please explain:"
            value={formData.hasUncertainTaxPositionsComments}
            placeholder="Type a value"
            rows={6}
            onChange={handleInputFieldValueChanged}
          />
        )}

        <RadioButtonList
          horizontalItems
          name="managementIntegrityConcerns"
          label="6. Do we have any concerns about the integrity of management in the tax area?"
          options={YesNoRadioButtonListOptions}
          selectedValue={formData.managementIntegrityConcerns}
          onChange={handleInputFieldValueChanged}
        />

        {showFields.managementIntegrityConcernsComments && (
          <TextArea
            name="managementIntegrityConcernsComments"
            label="If yes, please explain:"
            value={formData.managementIntegrityConcernsComments}
            placeholder="Type a value"
            rows={6}
            onChange={handleInputFieldValueChanged}
          />
        )}

        <RadioButtonList
          horizontalItems
          name="involvesPreparation"
          label="7. Will engagement involve preparation of tax returns?"
          options={YesNoRadioButtonListOptions}
          selectedValue={formData.involvesPreparation}
          onChange={handleInputFieldValueChanged}
        />

        <RadioButtonList
          horizontalItems
          name="reviewedPriorYearReturn"
          label={
            '8. Have we reviewed the prior year tax return and have we communicated with the taxpayer/entity ' +
            'that we are required to review 3 years of prior year returns in total before completing the current ' +
            'year return?'
          }
          options={YesNoNaRadioButtonListOptions}
          selectedValue={formData.reviewedPriorYearReturn}
          onChange={handleInputFieldValueChanged}
        />

        {showFields.reviewedPriorYearReturnComments && (
          <TextArea
            name="reviewedPriorYearReturnComments"
            label=""
            value={formData.reviewedPriorYearReturnComments}
            placeholder="Type a value"
            rows={6}
            onChange={handleInputFieldValueChanged}
          />
        )}

        <RadioButtonList
          horizontalItems
          name="preliminaryRiskRating"
          label={
            '9. Based on your knowledge what is the preliminary risk rating of this engagement for tax purposes? ' +
            '(A=Lowest Risk, D=Highest Risk)'
          }
          options={RiskRatingRadioButtonListOptions}
          selectedValue={formData.preliminaryRiskRating}
          onChange={handleInputFieldValueChanged}
        />
      </div>
    </CollapsibleFormSection>
  );
};

TaxRiskView = memo(TaxRiskView);
TaxRiskView.displayName = 'TaxRiskView';

export default withNewEngagementInstanceViewData(TaxRiskView);
