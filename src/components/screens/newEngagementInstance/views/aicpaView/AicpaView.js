import { memo, useMemo } from 'react';
import { useSelector } from 'react-redux';

import {
  selectCurrentView,
  selectNewEngagementInstance
} from '../../../newEngagementInstance/newEngagementInstanceSlice';
import withNewEngagementInstanceViewData from '../withNewEngagementInstanceViewData';
import CollapsibleFormSection from '../../../../common/collapsibleFormSection/CollapsibleFormSection';
import TextBox from '../../components/textBox/TextBox';
import TextArea from '../../components/textArea/TextArea';
import FormHeader from '../../../../common/formHeader/FormHeader';
import FormText from '../../components/formText/FormText';
import RadioButtonList from '../../components/radioButtonList/RadioButtonList';
import YesNoRadioButtonListOptions from '../../../../../helpers/radioButtonListOptions/YesNoRadioButtonListOptions';
import WillWillNotRadioButtonListOptions from '../../../../../helpers/radioButtonListOptions/WillWillNotRadioButtonListOptions';

let AicpaView = ({ ...propsFromHoc }) => {
  // ***********************************************************************
  // * constants

  const { handleInputFieldValueChanged } = propsFromHoc;
  const { formData } = useSelector(selectCurrentView);
  const { isAttest, isNewClient } = useSelector(selectNewEngagementInstance);

  // **********************************************************************
  // * component vars

  /**
   * fields which have conditional visibility and whether they are shown
   */
  const showFields = useMemo(
    () => ({
      roleInCreatingSourceDocumentsForTransactionsComments:
        formData.roleInCreatingSourceDocumentsForTransactions === true,
      roleInAppraisalValuationComments: formData.roleInAppraisalValuation === true,
      roleInCustodyOfClientAssetsComments: formData.roleInCustodyOfClientAssets === true,
      abilityToAuthorizeTransactionsOnBehalfComments: formData.abilityToAuthorizeTransactionsOnBehalf === true,
      roleInMonitoringAffectingExecutionOfTransactionsComments:
        formData.roleInMonitoringAffectingExecutionOfTransactions === true,
      roleInOngoingComplianceOrQualityControlComments: formData.roleInOngoingComplianceOrQualityControl === true,
      roleInDesigningFinancialInfoSystemsOrControlsComments:
        formData.roleInDesigningFinancialInfoSystemsOrControls === true,
      roleInDesignOfSignificantModificationsToInfoSystemsComments:
        formData.roleInDesignOfSignificantModificationsToInfoSystems === true,
      roleInDecisionMakingOrOperationsComments: formData.roleInDecisionMakingOrOperations === true,
      roleAsPromoterOfClientFinancingTransactionsComments:
        formData.roleAsPromoterOfClientFinancingTransactions === true,
      creationOfMutualInterestWithClientComments: formData.creationOfMutualInterestWithClient === true,
      creationOfMutualInterestWithClientInstructionsFormText: formData.creationOfMutualInterestWithClient === true,
      instructionFormText:
        (isNewClient === true && isAttest === true) ||
        (isNewClient === true && isAttest === false) ||
        (isNewClient === false && isAttest === true)
    }),
    [
      formData.roleInCreatingSourceDocumentsForTransactions,
      formData.roleInAppraisalValuation,
      formData.roleInCustodyOfClientAssets,
      formData.abilityToAuthorizeTransactionsOnBehalf,
      formData.roleInMonitoringAffectingExecutionOfTransactions,
      formData.roleInOngoingComplianceOrQualityControl,
      formData.roleInDesigningFinancialInfoSystemsOrControls,
      formData.roleInDesignOfSignificantModificationsToInfoSystems,
      formData.roleInDecisionMakingOrOperations,
      formData.roleAsPromoterOfClientFinancingTransactions,
      formData.creationOfMutualInterestWithClient,
      isNewClient,
      isAttest
    ]
  );

  // **********************************************************************
  // * functions

  // **********************************************************************
  // * side effects

  // **********************************************************************
  // * render

  return (
    <CollapsibleFormSection title="Independence Analysis">
      <div className="container-fluid">
        {showFields.instructionFormText && (
          <FormText applyEmphasis name="instructionFormText">
            The questions below are designed to identify any potential threats to independence that could be created by
            the proposed non attest service(s) listed above. Click on the "?" for additional guidance as to what
            services are permitted or prohibited. If multiple non attest services are being proposed, consider the
            impact of each service when answering the questions and identify the specific non attest service when
            describing PM's involvement for any question answered yes. Questions below related to the following jobs:
          </FormText>
        )}

        <FormHeader text="AICPA: Will the proposed project involve:" />

        <RadioButtonList
          horizontalItems
          name="roleInCreatingSourceDocumentsForTransactions"
          label="1. Any role in creating or preparing source documents for transactions?"
          options={YesNoRadioButtonListOptions}
          selectedValue={formData.roleInCreatingSourceDocumentsForTransactions}
          onChange={handleInputFieldValueChanged}
        />

        {showFields.roleInCreatingSourceDocumentsForTransactionsComments && (
          <TextArea
            name="roleInCreatingSourceDocumentsForTransactionsComments"
            label="If yes, describe PM involvement:"
            placeholder="Type a value"
            rows={6}
            value={formData.roleInCreatingSourceDocumentsForTransactionsComments}
            onChange={handleInputFieldValueChanged}
          />
        )}

        <RadioButtonList
          horizontalItems
          name="roleInAppraisalValuation"
          label={
            '2. Any role in appraisal valuation or otherwise determining material amounts ' +
            'for financial reporting purposes that involve a significant degree of subjectivity?'
          }
          options={YesNoRadioButtonListOptions}
          selectedValue={formData.roleInAppraisalValuation}
          onChange={handleInputFieldValueChanged}
        />

        {showFields.roleInAppraisalValuationComments && (
          <TextArea
            name="roleInAppraisalValuationComments"
            label="If yes, describe PM involvement:"
            placeholder="Type a value"
            rows={6}
            value={formData.roleInAppraisalValuationComments}
            onChange={handleInputFieldValueChanged}
          />
        )}

        <RadioButtonList
          horizontalItems
          name="roleInCustodyOfClientAssets"
          label="3. Any role in custody or control of client assets?"
          options={YesNoRadioButtonListOptions}
          selectedValue={formData.roleInCustodyOfClientAssets}
          onChange={handleInputFieldValueChanged}
        />

        {showFields.roleInCustodyOfClientAssetsComments && (
          <TextArea
            name="roleInCustodyOfClientAssetsComments"
            label="If yes, describe PM involvement:"
            placeholder="Type a value"
            rows={6}
            value={formData.roleInCustodyOfClientAssetsComments}
            onChange={handleInputFieldValueChanged}
          />
        )}

        <RadioButtonList
          horizontalItems
          name="abilityToAuthorizeTransactionsOnBehalf"
          label={
            '4. Any ability to authorize, approve or consummate transactions or exercise any form of authority on ' +
            'behalf of the client?'
          }
          options={YesNoRadioButtonListOptions}
          selectedValue={formData.abilityToAuthorizeTransactionsOnBehalf}
          onChange={handleInputFieldValueChanged}
        />

        {showFields.abilityToAuthorizeTransactionsOnBehalfComments && (
          <TextArea
            name="abilityToAuthorizeTransactionsOnBehalfComments"
            label="If yes, describe PM involvement:"
            placeholder="Type a value"
            rows={6}
            value={formData.abilityToAuthorizeTransactionsOnBehalfComments}
            onChange={handleInputFieldValueChanged}
          />
        )}

        <RadioButtonList
          horizontalItems
          name="roleInMonitoringAffectingExecutionOfTransactions"
          label={
            '5. Any role in monitoring or control activities that affect the execution of transactions or ' +
            'ensure that transactions are properly executed?'
          }
          options={YesNoRadioButtonListOptions}
          selectedValue={formData.roleInMonitoringAffectingExecutionOfTransactions}
          onChange={handleInputFieldValueChanged}
        />

        {showFields.roleInMonitoringAffectingExecutionOfTransactionsComments && (
          <TextArea
            name="roleInMonitoringAffectingExecutionOfTransactionsComments"
            label="If yes, describe PM involvement:"
            placeholder="Type a value"
            rows={6}
            value={formData.roleInMonitoringAffectingExecutionOfTransactionsComments}
            onChange={handleInputFieldValueChanged}
          />
        )}

        <RadioButtonList
          horizontalItems
          name="roleInOngoingComplianceOrQualityControl"
          label={
            '6. Any role in connection with operating or production processes ' +
            'that would be equivalent to an ongoing compliance or quality control function?'
          }
          options={YesNoRadioButtonListOptions}
          selectedValue={formData.roleInOngoingComplianceOrQualityControl}
          onChange={handleInputFieldValueChanged}
        />

        {showFields.roleInOngoingComplianceOrQualityControlComments && (
          <TextArea
            name="roleInOngoingComplianceOrQualityControlComments"
            label="If yes, describe PM involvement:"
            placeholder="Type a value"
            rows={6}
            value={formData.roleInOngoingComplianceOrQualityControlComments}
            onChange={handleInputFieldValueChanged}
          />
        )}

        <RadioButtonList
          horizontalItems
          name="roleInDesigningFinancialInfoSystemsOrControls"
          label={
            '7. Any role in designing, installing, supervising, operating, modifying, ' +
            'or monitoring any client accounting or financial functions, systems or ' +
            'processes, including financial information systems or internal controls?'
          }
          options={YesNoRadioButtonListOptions}
          selectedValue={formData.roleInDesigningFinancialInfoSystemsOrControls}
          onChange={handleInputFieldValueChanged}
        />

        {showFields.roleInDesigningFinancialInfoSystemsOrControlsComments && (
          <TextArea
            name="roleInDesigningFinancialInfoSystemsOrControlsComments"
            label="If yes, describe PM involvement:"
            placeholder="Type a value"
            rows={6}
            value={formData.roleInDesigningFinancialInfoSystemsOrControlsComments}
            onChange={handleInputFieldValueChanged}
          />
        )}

        <RadioButtonList
          horizontalItems
          name="roleInDesignOfSignificantModificationsToInfoSystems"
          label={
            '8. Any role in design, development or installation other than insignificant modifications of financial ' +
            'information systems?'
          }
          options={YesNoRadioButtonListOptions}
          selectedValue={formData.roleInDesignOfSignificantModificationsToInfoSystems}
          onChange={handleInputFieldValueChanged}
        />

        {showFields.roleInDesignOfSignificantModificationsToInfoSystemsComments && (
          <TextArea
            name="roleInDesignOfSignificantModificationsToInfoSystemsComments"
            label="If yes, describe PM involvement:"
            placeholder="Type a value"
            rows={6}
            value={formData.roleInDesignOfSignificantModificationsToInfoSystemsComments}
            onChange={handleInputFieldValueChanged}
          />
        )}

        <RadioButtonList
          horizontalItems
          name="roleInDecisionMakingOrOperations"
          label="9. Any decision-making role or participation with management in operating decisions?"
          options={YesNoRadioButtonListOptions}
          selectedValue={formData.roleInDecisionMakingOrOperations}
          onChange={handleInputFieldValueChanged}
        />

        {showFields.roleInDecisionMakingOrOperationsComments && (
          <TextArea
            name="roleInDecisionMakingOrOperationsComments"
            label="If yes, describe PM involvement:"
            placeholder="Type a value"
            rows={6}
            value={formData.roleInDecisionMakingOrOperationsComments}
            onChange={handleInputFieldValueChanged}
          />
        )}

        <RadioButtonList
          horizontalItems
          name="roleAsPromoterOfClientFinancingTransactions"
          label="10. Any role as a promoter of client financing transactions, including bank loans, equity or debt offerings?"
          options={YesNoRadioButtonListOptions}
          selectedValue={formData.roleAsPromoterOfClientFinancingTransactions}
          onChange={handleInputFieldValueChanged}
        />

        {showFields.roleAsPromoterOfClientFinancingTransactionsComments && (
          <TextArea
            name="roleAsPromoterOfClientFinancingTransactionsComments"
            label="If yes, describe PM involvement:"
            placeholder="Type a value"
            rows={6}
            value={formData.roleAsPromoterOfClientFinancingTransactionsComments}
            onChange={handleInputFieldValueChanged}
          />
        )}

        <RadioButtonList
          horizontalItems
          name="creationOfMutualInterestWithClient"
          label="11. Creation of any form of mutual interest with the client?"
          options={YesNoRadioButtonListOptions}
          selectedValue={formData.creationOfMutualInterestWithClient}
          onChange={handleInputFieldValueChanged}
        />

        {showFields.creationOfMutualInterestWithClientComments && (
          <TextArea
            name="creationOfMutualInterestWithClientComments"
            label="If yes, describe PM involvement:"
            placeholder="Type a value"
            rows={6}
            value={formData.creationOfMutualInterestWithClientComments}
            onChange={handleInputFieldValueChanged}
          />
        )}

        {showFields.creationOfMutualInterestWithClientInstructionsFormText && (
          <FormText applyEmphasis name="creationOfMutualInterestWithClientInstructionsFormText">
            For each YES answer above, compare our involvement (as described) to the corresponding AICPA Limitations.
            Based on the nature of the non-attest services we will be providing, our conclusion is:
          </FormText>
        )}

        <RadioButtonList
          horizontalItems
          name="engagementImpairsIndependence"
          label="The proposed engagement(s) Will, Will Not impair our independence."
          options={WillWillNotRadioButtonListOptions}
          selectedValue={formData.engagementImpairsIndependence}
          onChange={handleInputFieldValueChanged}
        />

        <TextBox
          name="engagementImpairsIndependenceComments"
          label="Basis for conclusion:"
          placeholder="Type a value"
          value={formData.engagementImpairsIndependenceComments}
          onChange={handleInputFieldValueChanged}
        />
      </div>
    </CollapsibleFormSection>
  );
};

AicpaView = memo(AicpaView);
AicpaView.displayName = 'AicpaView';

export default withNewEngagementInstanceViewData(AicpaView);
