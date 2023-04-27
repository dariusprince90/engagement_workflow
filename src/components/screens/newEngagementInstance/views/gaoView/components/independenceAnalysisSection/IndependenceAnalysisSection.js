import { memo, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { selectCurrentView, selectNewEngagementInstance } from '../../../../newEngagementInstanceSlice';
import withNewEngagementInstanceViewData from '../../../withNewEngagementInstanceViewData';
import YesNoRadioButtonListOptions from '../../../../../../../helpers/radioButtonListOptions/YesNoRadioButtonListOptions';
import CollapsibleFormSection from '../../../../../../common/collapsibleFormSection/CollapsibleFormSection';
import TextArea from '../../../../components/textArea/TextArea';
import RadioButtonList from '../../../../components/radioButtonList/RadioButtonList';
import FormHeader from '../../../../../../common/formHeader/FormHeader';
import FormText from '../../../../components/formText/FormText';

let IndependenceAnalysisSection = ({ ...propsFromHoc }) => {
  // **********************************************************************
  // * constants

  const { handleInputFieldValueChanged } = propsFromHoc;

  const { formData } = useSelector(selectCurrentView);

  const { isAttest } = useSelector(selectNewEngagementInstance);

  // **********************************************************************
  // * component vars

  /**
   * fields which have conditional visibility and whether they are shown
   */
  const showFields = useMemo(
    () => ({
      descriptionOfNonAttestServices: isAttest === false,
      roleInCreatingSourceDocumentsForTransactionsComments:
        formData.roleInCreatingSourceDocumentsForTransactions === true,
      roleInCreatingGeneralLedgerComments: formData.roleInCreatingGeneralLedger === true,
      roleInAppraisalValuationComments: formData.roleInAppraisalValuation === true,
      roleInCustodyOrControlOfClientAssetsComments: formData.roleInCustodyOrControlOfClientAssets === true,
      abilityToAuthorizeTransactionsComments: formData.abilityToAuthorizeTransactions === true,
      roleInTransactionMonitoringOrControlComments: formData.roleInTransactionMonitoringOrControl === true,
      roleInOngoingComplianceOrQualityControlComments: formData.roleInOngoingComplianceOrQualityControl === true,
      roleInDesigningClientAccountingFunctionsComments: formData.roleInDesigningClientAccountingFunctions === true,
      roleInDesigningClientInfoSystemsComments: formData.roleInDesigningClientInfoSystems === true,
      roleInDecisionMakingOrOperationsComments: formData.roleInDecisionMakingOrOperations === true,
      roleAsPromoterOfClientFinancingTransactionsComments:
        formData.roleAsPromoterOfClientFinancingTransactions === true,
      creationOfMutualInterestComments: formData.creationOfMutualInterest === true,
      roleInForensicAccountingInSupportOfLitigationComments:
        formData.roleInForensicAccountingInSupportOfLitigation === true,
      significantThreatToIndependence: isAttest === false,
      significantThreatToIndependenceComments: isAttest === false && formData.significantThreatToIndependence === true,
      significantThreatToIndependenceSafeguards: isAttest === false,
      safeguardsAdequatelyAddressThreats: isAttest === false
    }),
    [
      formData.roleInCreatingSourceDocumentsForTransactions,
      formData.roleInCreatingGeneralLedger,
      formData.roleInAppraisalValuation,
      formData.roleInCustodyOrControlOfClientAssets,
      formData.abilityToAuthorizeTransactions,
      formData.roleInTransactionMonitoringOrControl,
      formData.roleInOngoingComplianceOrQualityControl,
      formData.roleInDesigningClientAccountingFunctions,
      formData.roleInDesigningClientInfoSystems,
      formData.roleInDecisionMakingOrOperations,
      formData.roleAsPromoterOfClientFinancingTransactions,
      formData.creationOfMutualInterest,
      formData.roleInForensicAccountingInSupportOfLitigation,
      formData.significantThreatToIndependence,
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
        <FormText applyEmphasis>
          The questions below are designed to identify any potential threats to independence that could be created by
          the proposed non attest service(s) listed above. Click on the "?" for additional guidance as to what services
          are permitted or prohibited. If multiple non attest services are being proposed, consider the potential impact
          of each service when answering the questions and identify the specific non attest service when describing PM's
          involvement for any question answered yes.
        </FormText>

        {showFields.descriptionOfNonAttestServices && (
          <TextArea
            name="descriptionOfNonAttestServices"
            label={
              'Describe in detail the Non Attest services to be provided, Including any reports or other deliverables ' +
              "that will be provided and the Client's anticipated use and distribution of the deliverables"
            }
            value={formData.descriptionOfNonAttestServices}
            placeholder="Type a value"
            rows={6}
            onChange={handleInputFieldValueChanged}
          />
        )}

        <FormHeader text="GAO: Will the proposed project involve:" />

        <RadioButtonList
          name="roleInCreatingSourceDocumentsForTransactions"
          label="1. Any role in creating or preparing source documents for transactions?"
          options={YesNoRadioButtonListOptions}
          horizontalItems
          selectedValue={formData.roleInCreatingSourceDocumentsForTransactions}
          onChange={handleInputFieldValueChanged}
        />

        {showFields.roleInCreatingSourceDocumentsForTransactionsComments && (
          <TextArea
            name="roleInCreatingSourceDocumentsForTransactionsComments"
            label="If yes, describe involvement:"
            value={formData.roleInCreatingSourceDocumentsForTransactionsComments}
            placeholder="Type a value"
            rows={6}
            onChange={handleInputFieldValueChanged}
          />
        )}

        <RadioButtonList
          name="roleInCreatingGeneralLedger"
          label={
            '2. Any role in creating or maintaining general ledger or subsidiary general ledger records or their ' +
            'equivalents, preparing journal entries or reconciliations.'
          }
          options={YesNoRadioButtonListOptions}
          horizontalItems
          selectedValue={formData.roleInCreatingGeneralLedger}
          onChange={handleInputFieldValueChanged}
        />

        {showFields.roleInCreatingGeneralLedgerComments && (
          <TextArea
            name="roleInCreatingGeneralLedgerComments"
            label="If yes, describe involvement:"
            value={formData.roleInCreatingGeneralLedgerComments}
            placeholder="Type a value"
            rows={6}
            onChange={handleInputFieldValueChanged}
          />
        )}

        <RadioButtonList
          name="roleInAppraisalValuation"
          label={
            '3. Any role in appraisal valuation or otherwise in determining any material amounts for financial ' +
            'reporting purposes?'
          }
          options={YesNoRadioButtonListOptions}
          horizontalItems
          selectedValue={formData.roleInAppraisalValuation}
          onChange={handleInputFieldValueChanged}
        />

        {showFields.roleInAppraisalValuationComments && (
          <TextArea
            name="roleInAppraisalValuationComments"
            label="If yes, describe involvement:"
            value={formData.roleInAppraisalValuationComments}
            placeholder="Type a value"
            rows={6}
            onChange={handleInputFieldValueChanged}
          />
        )}

        <RadioButtonList
          name="roleInCustodyOrControlOfClientAssets"
          label="4. Any role in custody or control of client assets?"
          options={YesNoRadioButtonListOptions}
          horizontalItems
          selectedValue={formData.roleInCustodyOrControlOfClientAssets}
          onChange={handleInputFieldValueChanged}
        />

        {showFields.roleInCustodyOrControlOfClientAssetsComments && (
          <TextArea
            name="roleInCustodyOrControlOfClientAssetsComments"
            label="If yes, describe involvement:"
            value={formData.roleInCustodyOrControlOfClientAssetsComments}
            placeholder="Type a value"
            rows={6}
            onChange={handleInputFieldValueChanged}
          />
        )}

        <RadioButtonList
          name="abilityToAuthorizeTransactions"
          label={
            '5. Any ability to authorize, approve or consummate transactions or exercise any form of authority on ' +
            'behalf of the client?'
          }
          options={YesNoRadioButtonListOptions}
          horizontalItems
          selectedValue={formData.abilityToAuthorizeTransactions}
          onChange={handleInputFieldValueChanged}
        />

        {showFields.abilityToAuthorizeTransactionsComments && (
          <TextArea
            name="abilityToAuthorizeTransactionsComments"
            label="If yes, describe involvement:"
            value={formData.abilityToAuthorizeTransactionsComments}
            placeholder="Type a value"
            rows={6}
            onChange={handleInputFieldValueChanged}
          />
        )}

        <RadioButtonList
          name="roleInTransactionMonitoringOrControl"
          label={
            '6. Any role in monitoring or control activities that affect the execution of transactions or ' +
            'ensure that transactions are properly executed?'
          }
          options={YesNoRadioButtonListOptions}
          horizontalItems
          selectedValue={formData.roleInTransactionMonitoringOrControl}
          onChange={handleInputFieldValueChanged}
        />

        {showFields.roleInTransactionMonitoringOrControlComments && (
          <TextArea
            name="roleInTransactionMonitoringOrControlComments"
            label="If yes, describe involvement:"
            value={formData.roleInTransactionMonitoringOrControlComments}
            placeholder="Type a value"
            rows={6}
            onChange={handleInputFieldValueChanged}
          />
        )}

        <RadioButtonList
          name="roleInOngoingComplianceOrQualityControl"
          label={
            '7. Any role in connection with operating or production processes that would be equivalent to an ' +
            'ongoing compliance or quality control function?'
          }
          options={YesNoRadioButtonListOptions}
          horizontalItems
          selectedValue={formData.roleInOngoingComplianceOrQualityControl}
          onChange={handleInputFieldValueChanged}
        />

        {showFields.roleInOngoingComplianceOrQualityControlComments && (
          <TextArea
            name="roleInOngoingComplianceOrQualityControlComments"
            label="If yes, describe involvement:"
            value={formData.roleInOngoingComplianceOrQualityControlComments}
            placeholder="Type a value"
            rows={6}
            onChange={handleInputFieldValueChanged}
          />
        )}

        <RadioButtonList
          name="roleInDesigningClientAccountingFunctions"
          label={
            '8. Any role in designing, installing, supervising, operating, modifying, or monitoring any client ' +
            'accounting or financial functions, systems or processes, including financial information systems or ' +
            'internal controls?'
          }
          options={YesNoRadioButtonListOptions}
          horizontalItems
          selectedValue={formData.roleInDesigningClientAccountingFunctions}
          onChange={handleInputFieldValueChanged}
        />

        {showFields.roleInDesigningClientAccountingFunctionsComments && (
          <TextArea
            name="roleInDesigningClientAccountingFunctionsComments"
            label="If yes, describe involvement:"
            value={formData.roleInDesigningClientAccountingFunctionsComments}
            placeholder="Type a value"
            rows={6}
            onChange={handleInputFieldValueChanged}
          />
        )}

        <RadioButtonList
          name="roleInDesigningClientInfoSystems"
          label={
            '9. Any role in designing, supervising, operating, modifying, or monitoring of general information ' +
            'technology systems that significantly impact the subject matter of the attest services?'
          }
          options={YesNoRadioButtonListOptions}
          horizontalItems
          selectedValue={formData.roleInDesigningClientInfoSystems}
          onChange={handleInputFieldValueChanged}
        />

        {showFields.roleInDesigningClientInfoSystemsComments && (
          <TextArea
            name="roleInDesigningClientInfoSystemsComments"
            label="If yes, describe involvement:"
            value={formData.roleInDesigningClientInfoSystemsComments}
            placeholder="Type a value"
            rows={6}
            onChange={handleInputFieldValueChanged}
          />
        )}

        <RadioButtonList
          name="roleInDecisionMakingOrOperations"
          label={
            '10. Any decision-making role or participation with management in operating decisions? (We cannot perform ' +
            'management functions and maintain independence).'
          }
          options={YesNoRadioButtonListOptions}
          horizontalItems
          selectedValue={formData.roleInDecisionMakingOrOperations}
          onChange={handleInputFieldValueChanged}
        />

        {showFields.roleInDecisionMakingOrOperationsComments && (
          <TextArea
            name="roleInDecisionMakingOrOperationsComments"
            label="If yes, describe involvement:"
            value={formData.roleInDecisionMakingOrOperationsComments}
            placeholder="Type a value"
            rows={6}
            onChange={handleInputFieldValueChanged}
          />
        )}

        <RadioButtonList
          name="roleAsPromoterOfClientFinancingTransactions"
          label={
            '11. Any role as a promoter, underwriter, or broker of client financing transactions, including ' +
            'bank loans, equity or debt offerings?'
          }
          options={YesNoRadioButtonListOptions}
          horizontalItems
          selectedValue={formData.roleAsPromoterOfClientFinancingTransactions}
          onChange={handleInputFieldValueChanged}
        />

        {showFields.roleAsPromoterOfClientFinancingTransactionsComments && (
          <TextArea
            name="roleAsPromoterOfClientFinancingTransactionsComments"
            label="If yes, describe involvement:"
            value={formData.roleAsPromoterOfClientFinancingTransactionsComments}
            placeholder="Type a value"
            rows={6}
            onChange={handleInputFieldValueChanged}
          />
        )}

        <RadioButtonList
          name="creationOfMutualInterest"
          label="12. Creation of any form of mutual interest with the client?"
          options={YesNoRadioButtonListOptions}
          horizontalItems
          selectedValue={formData.creationOfMutualInterest}
          onChange={handleInputFieldValueChanged}
        />

        {showFields.creationOfMutualInterestComments && (
          <TextArea
            name="creationOfMutualInterestComments"
            label="If yes, describe involvement:"
            value={formData.creationOfMutualInterestComments}
            placeholder="Type a value"
            rows={6}
            onChange={handleInputFieldValueChanged}
          />
        )}

        <RadioButtonList
          name="roleInForensicAccountingInSupportOfLitigation"
          label="13. Any role in providing forensic accounting services in connection with known or potential litigation?"
          options={YesNoRadioButtonListOptions}
          horizontalItems
          selectedValue={formData.roleInForensicAccountingInSupportOfLitigation}
          onChange={handleInputFieldValueChanged}
        />

        {showFields.roleInForensicAccountingInSupportOfLitigationComments && (
          <TextArea
            name="roleInForensicAccountingInSupportOfLitigationComments"
            label="If yes, describe involvement:"
            value={formData.roleInForensicAccountingInSupportOfLitigationComments}
            placeholder="Type a value"
            rows={6}
            onChange={handleInputFieldValueChanged}
          />
        )}

        <TextArea
          name="descriptionOfClientSkillsAndExperience"
          label={
            '14. To maintain our independence, an individual(s) at the client must have the skills, knowledge and ' +
            'experience (SKE) that allows them to effectively oversee and evaluate the services. Document the ' +
            'conclusion and the basis for our conclusion as to whether the client has sufficient SKE. (The client does ' +
            'not have to be able to perform the services, but only be able to oversee the performance of the services ' +
            'and understand and evaluate the results.)'
          }
          value={formData.descriptionOfClientSkillsAndExperience}
          placeholder="Type a value"
          rows={6}
          onChange={handleInputFieldValueChanged}
        />

        {showFields.significantThreatToIndependence && (
          <RadioButtonList
            name="significantThreatToIndependence"
            label={
              <>
                15. Based on the nature of the proposed non-attest services and the client's ability to oversee and
                evaluate the services provided, will providing the non-attest services create a significant threat to
                independence?
                <br />
                Threats would include:
                <ul>
                  <li>management participation threat</li>
                  <li>self review threat (auditing balances or amounts that we computed)</li>
                  <li>advocacy threat - actively promoting a client position</li>
                </ul>
              </>
            }
            options={YesNoRadioButtonListOptions}
            horizontalItems
            selectedValue={formData.significantThreatToIndependence}
            onChange={handleInputFieldValueChanged}
          />
        )}

        {showFields.significantThreatToIndependenceComments && (
          <TextArea
            name="significantThreatToIndependenceComments"
            label="15a. If yes. Document the significant threat to independence"
            value={formData.significantThreatToIndependenceComments}
            placeholder="Type a value"
            rows={6}
            onChange={handleInputFieldValueChanged}
          />
        )}

        {showFields.significantThreatToIndependenceSafeguards && (
          <TextArea
            name="significantThreatToIndependenceSafeguards"
            label={
              <>
                15b. Describe safeguards that will be implemented to eliminate or reduce the threat to independence to
                an acceptable level.
                <br />
                Safeguards could include:
                <ul>
                  <li>services reviewed by someone not on the audit engagement team</li>
                  <li>discussion of independence issue with those charged with governance</li>
                </ul>
              </>
            }
            value={formData.significantThreatToIndependenceSafeguards}
            placeholder="Type a value"
            rows={6}
            onChange={handleInputFieldValueChanged}
          />
        )}

        {showFields.safeguardsAdequatelyAddressThreats && (
          <RadioButtonList
            name="safeguardsAdequatelyAddressThreats"
            label="15c. Conclusion: Do the safeguards adequately address the threats to independence?"
            options={YesNoRadioButtonListOptions}
            horizontalItems
            selectedValue={formData.safeguardsAdequatelyAddressThreats}
            onChange={handleInputFieldValueChanged}
          />
        )}
      </div>
    </CollapsibleFormSection>
  );
};

IndependenceAnalysisSection = memo(IndependenceAnalysisSection);
IndependenceAnalysisSection.displayName = 'IndependenceAnalysisSection';

export default withNewEngagementInstanceViewData(IndependenceAnalysisSection);
