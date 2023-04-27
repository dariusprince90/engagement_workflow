import { memo, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { selectCurrentView } from '../../../../newEngagementInstanceSlice';
import { tempThunk } from '../../../../newEngagementInstanceThunks';

import withNewEngagementInstanceViewData from '../../../withNewEngagementInstanceViewData';
import CollapsibleFormSection from '../../../../../../common/collapsibleFormSection/CollapsibleFormSection';
import FormHeader from '../../../../../../common/formHeader/FormHeader';
import FormText from '../../../../components/formText/FormText';
import RadioButtonList from '../../../../components/radioButtonList/RadioButtonList';
import TextArea from '../../../../components/textArea/TextArea';
import TextBox from '../../../../components/textBox/TextBox';
import YesNoRadioButtonListOptions from '../../../../../../../helpers/radioButtonListOptions/YesNoRadioButtonListOptions';
import AutoComplete from '../../../../components/autoComplete/AutoComplete';

const propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

let SecSupplementalRiskSection = ({ id, title, ...propsFromHoc }) => {
  // **********************************************************************
  // * constants

  const {
    handleAutoCompleteDataCleared,
    handleAutoCompleteItemReset,
    handleAutoCompleteItemSelected,
    handleAutoCompleteSearch,
    handleInputFieldValueChanged
  } = propsFromHoc;

  const { formData, lookups } = useSelector(selectCurrentView);

  // **********************************************************************
  // * component vars

  /**
   * fields which have conditional visibility and whether they are shown
   */
  const showFields = useMemo(
    () => ({
      secQuestionAboutAbilityToProvideServiceComments: formData.secQuestionAboutAbilityToProvideService === true
    }),
    [formData.secQuestionAboutAbilityToProvideService]
  );

  /**
   * setup the property names for the secAssuranceEngagementPartner AutoComplete
   */
  const secAssuranceEngagementPartnerSourcePropertyNames = useMemo(() => {
    return {
      matches: 'secAssuranceEngagementPartners',
      value: 'secAssuranceEngagementPartnerStaffNumber',
      displayName: 'secAssuranceEngagementPartnerDisplayName'
    };
  }, []);

  /**
   * create the "selected" object for the secAssuranceEngagementPartner AutoComplete
   */
  const selectedSecAssuranceEngagementPartner = useMemo(() => {
    return {
      id: formData.secAssuranceEngagementPartnerStaffNumber,
      displayName: formData.secAssuranceEngagementPartnerDisplayName
    };
  }, [formData.secAssuranceEngagementPartnerDisplayName, formData.secAssuranceEngagementPartnerStaffNumber]);

  /**
   * setup the property names for the secAssuranceManager AutoComplete
   */
  const secAssuranceManagerSourcePropertyNames = useMemo(() => {
    return {
      matches: 'secAssuranceManagers',
      value: 'secAssuranceManagerStaffNumber',
      displayName: 'secAssuranceManagerDisplayName'
    };
  }, []);

  /**
   * create the "selected" object for the secAssuranceManager AutoComplete
   */
  const selectedSecAssuranceManager = useMemo(() => {
    return {
      id: formData.secAssuranceManagerStaffNumber,
      displayName: formData.secAssuranceManagerDisplayName
    };
  }, [formData.secAssuranceManagerDisplayName, formData.secAssuranceManagerStaffNumber]);

  // **********************************************************************
  // * functions

  /**
   * Handler for the secAssuranceEngagementPartner AutoComplete.
   * @summary This is used in between the AutoComplete and the HOC handleAutoCompleteSearch method so that the
   * search method/thunk from the slice can be passed in.
   */
  const handleSecAssuranceEngagementPartnerSearch = useCallback(
    (event, sourcePropertyNames) => {
      // ! once a thunk exists to search engagement partners, replace tempThunk with the method to be called
      // ! replace the searchMethod arg with the thunk
      // * e.g. handleAutoCompleteSearch(event, sourcePropertyNames, searchSecAssuranceEngagementPartners);
      handleAutoCompleteSearch(event, sourcePropertyNames, tempThunk);
    },
    [handleAutoCompleteSearch]
  );

  /**
   * Handler for the secAssuranceManager AutoComplete.
   * @summary This is used in between the AutoComplete and the HOC handleAutoCompleteSearch method so that the
   * search method/thunk from the slice can be passed in.
   */
  const handleSecAssuranceManagerSearch = useCallback(
    (event, sourcePropertyNames) => {
      // ! once a thunk exists to search managers, replace tempThunk with the method to be called
      // ! replace the searchMethod arg with the thunk
      // * e.g. handleAutoCompleteSearch(event, sourcePropertyNames, searchSecAssuranceManagers);
      handleAutoCompleteSearch(event, sourcePropertyNames, tempThunk);
    },
    [handleAutoCompleteSearch]
  );

  // **********************************************************************
  // * side effects

  // **********************************************************************
  // * render

  return (
    <CollapsibleFormSection id={id} title={title}>
      <div className="container-fluid">
        <FormText isLabel>SEC Attest Risk</FormText>

        <RadioButtonList
          horizontalItems
          name="secAttachmentsMayImpactAcceptance"
          label={
            '1. Do the items attached on the engagement risk tab as financial statements include the 10-K, ' +
            '10-Q, and proxy statement, as well as any recent 8-K issued that may impact our acceptance ' +
            'decision? Note: You will not be able to proceed in the workflow until all applicable reports ' +
            'have been attached.'
          }
          options={YesNoRadioButtonListOptions}
          selectedValue={formData.secAttachmentsMayImpactAcceptance}
          onChange={handleInputFieldValueChanged}
        />

        <FormText isLabel>
          2. Based on the most recent information contained in the filings referenced above or information available
          from Yahoo Finance, please complete the following:
        </FormText>

        <TextBox
          name="secMarketCapitalization"
          label="Market capitalization:"
          placeholder="Type a numeric value"
          value={formData.secMarketCapitalization}
          onChange={handleInputFieldValueChanged}
        />

        <TextBox
          name="secMarketPrices"
          label="Market prices, last 4 quarters:"
          placeholder="Type a numeric value"
          value={formData.secMarketPrices}
          onChange={handleInputFieldValueChanged}
        />

        <TextBox
          name="secInsidersPercentage"
          label="Insiders percentage of ownership:"
          placeholder="Type a numeric value"
          value={formData.secInsidersPercentage}
          onChange={handleInputFieldValueChanged}
        />

        <FormText isLabel>Last year's fees</FormText>

        <TextBox
          name="secLastYearsAuditFees"
          label="Audit:"
          placeholder="Type a numeric value"
          value={formData.secLastYearsAuditFees}
          onChange={handleInputFieldValueChanged}
        />

        <TextBox
          name="secLastYearsOtherServicesFees"
          label="Other services:"
          placeholder="Type a numeric value"
          value={formData.secLastYearsOtherServicesFees}
          onChange={handleInputFieldValueChanged}
        />

        <TextArea
          name="secEvaluationOfDiscussionNotesAboutOfficers"
          label={
            '3. If the officers are not well known by the by the attorneys, underwriters, or Company personnel, ' +
            'consult with SEC Services Group Leader regarding potential additional means of inquiring. Note results ' +
            'of discussion:'
          }
          placeholder="Type a value"
          rows={6}
          value={formData.secEvaluationOfDiscussionNotesAboutOfficers}
          onChange={handleInputFieldValueChanged}
        />

        <AutoComplete
          name="secAssuranceEngagementPartnerStaffNumber"
          label="4. Assurance Engagement Partner:"
          placeholder="Type a value"
          selectedItem={selectedSecAssuranceEngagementPartner}
          matches={lookups.secAssuranceEngagementPartners}
          sourcePropertyNames={secAssuranceEngagementPartnerSourcePropertyNames}
          onClearData={handleAutoCompleteDataCleared}
          onResetItem={handleAutoCompleteItemReset}
          onSearch={handleSecAssuranceEngagementPartnerSearch}
          onSelect={handleAutoCompleteItemSelected}
        />

        <TextArea
          name="secEvaluationOfAssuranceEngagementPartnerPublicCompanyAuditExperience"
          label="1. Public Company Audit experience"
          placeholder="Type a value"
          rows={6}
          value={formData.secEvaluationOfAssuranceEngagementPartnerPublicCompanyAuditExperience}
          onChange={handleInputFieldValueChanged}
        />

        <TextArea
          name="secEvaluationOfAssuranceEngagementPartnerExpertiseInClientIndustry"
          label="2. Expertise in client industry"
          placeholder="Type a value"
          rows={6}
          value={formData.secEvaluationOfAssuranceEngagementPartnerExpertiseInClientIndustry}
          onChange={handleInputFieldValueChanged}
        />

        <AutoComplete
          name="secAssuranceManagerStaffNumber"
          label="Choose Assurance Manager:"
          placeholder="Type a value"
          selectedItem={selectedSecAssuranceManager}
          matches={lookups.secAssuranceManagers}
          sourcePropertyNames={secAssuranceManagerSourcePropertyNames}
          onClearData={handleAutoCompleteDataCleared}
          onResetItem={handleAutoCompleteItemReset}
          onSearch={handleSecAssuranceManagerSearch}
          onSelect={handleAutoCompleteItemSelected}
        />

        <TextArea
          name="secEvaluationOfAssuranceManagerPublicCompanyAuditExperience"
          label="1. Public Company Audit experience"
          placeholder="Type a value"
          rows={6}
          value={formData.secEvaluationOfAssuranceManagerPublicCompanyAuditExperience}
          onChange={handleInputFieldValueChanged}
        />

        <TextArea
          name="secEvaluationOfAssuranceManagerExpertiseInClientIndustry"
          label="2. Expertise in client industry"
          placeholder="Type a value"
          rows={6}
          value={formData.secEvaluationOfAssuranceManagerExpertiseInClientIndustry}
          onChange={handleInputFieldValueChanged}
        />

        <FormText applyEmphasis>
          Note: The following answers are required before leaving the Final Relationship Partner Approval step.
        </FormText>

        <FormText isLabel>5. Identify SEC legal counsel:</FormText>

        <TextArea
          name="secEvaluationOfLegalCounselsFirm"
          label="a. Firm:"
          placeholder="Type a value"
          rows={6}
          value={formData.secEvaluationOfLegalCounselsFirm}
          onChange={handleInputFieldValueChanged}
        />

        <TextArea
          name="secEvaluationOfLegalCounselsPrimaryAttorney"
          label="b. Primary Attorney:"
          placeholder="Type a value"
          rows={6}
          value={formData.secEvaluationOfLegalCounselsPrimaryAttorney}
          onChange={handleInputFieldValueChanged}
        />

        <TextArea
          name="secEvaluationOfCounselsExperience"
          label="c. If SEC counsel is unfamiliar to us, ascertain and describe counsel’s SEC experience and expertise:"
          placeholder="Type a value"
          rows={6}
          value={formData.secEvaluationOfCounselsExperience}
          onChange={handleInputFieldValueChanged}
        />

        <TextArea
          name="secEvaluationOfNatureOfCapitalRaise"
          label={
            '6. If the financial statements are being prepared for use in capital-raising activities (debt or equity), ' +
            'describe in detail the nature, size and timing of the capital raise, including registered or ' +
            'unregistered securities:'
          }
          placeholder="Type a value"
          rows={6}
          value={formData.secEvaluationOfNatureOfCapitalRaise}
          onChange={handleInputFieldValueChanged}
        />

        <TextArea
          name="secEvaluationOfQualityAssessment"
          label={
            '7. Based on meetings with the potential client and other inquiries, provide an assessment of the ' +
            'quality and experience of its accounting personnel, including relevant SEC experience. Comments:'
          }
          placeholder="Type a value"
          rows={6}
          value={formData.secEvaluationOfQualityAssessment}
          onChange={handleInputFieldValueChanged}
        />

        <TextArea
          name="secEvaluationOfClientsReputation"
          label={
            "8. Discuss the potential client with its securities attorney and attempt to determine the client's " +
            'reputation and character, and whether the attorney has a good working relationship with the ' +
            "client. Inquire as to the client's attitude toward full and complete disclosure in regulatory filings. " +
            'Note results of discussion:'
          }
          placeholder="Type a value"
          rows={6}
          value={formData.secEvaluationOfClientsReputation}
          onChange={handleInputFieldValueChanged}
        />

        <FormHeader text="GENERAL CONCLUSION" />

        <RadioButtonList
          horizontalItems
          name="secQuestionAboutAbilityToProvideService"
          label={
            '9. Given the nature of the client, its industry, its operating results, geographic locations, and our ' +
            'ability to staff this engagement, including the relative urgency of the project, is there any question ' +
            'about our ability to adequately service this engagement?'
          }
          options={YesNoRadioButtonListOptions}
          selectedValue={formData.secQuestionAboutAbilityToProvideService}
          onChange={handleInputFieldValueChanged}
        />

        {showFields.secQuestionAboutAbilityToProvideServiceComments && (
          <TextArea
            name="secQuestionAboutAbilityToProvideServiceComments"
            label="If yes, please comment:"
            placeholder="Type a value"
            rows={6}
            value={formData.secQuestionAboutAbilityToProvideServiceComments}
            onChange={handleInputFieldValueChanged}
          />
        )}

        <TextArea
          name="secUnderstandingOfSecIssuesComments"
          label={
            'Explanation/Commentary that will assist approvers in understanding SEC issues relevant to acceptance ' +
            'of this engagement:'
          }
          placeholder="Type a value"
          rows={6}
          value={formData.secUnderstandingOfSecIssuesComments}
          onChange={handleInputFieldValueChanged}
        />
      </div>
    </CollapsibleFormSection>
  );
};

SecSupplementalRiskSection = memo(SecSupplementalRiskSection);
SecSupplementalRiskSection.propTypes = propTypes;
SecSupplementalRiskSection.displayName = 'SecSupplementalRiskSection';

export default withNewEngagementInstanceViewData(SecSupplementalRiskSection);
