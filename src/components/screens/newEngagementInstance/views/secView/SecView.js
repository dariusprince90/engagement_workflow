import { memo, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { selectCurrentView } from '../../newEngagementInstanceSlice';
import withNewEngagementInstanceViewData from '../withNewEngagementInstanceViewData';

import YesNoRadioButtonListOptions from '../../../../../helpers/radioButtonListOptions/YesNoRadioButtonListOptions';
import CollapsibleFormSection from '../../../../common/collapsibleFormSection/CollapsibleFormSection';
import FormHeader from '../../../../common/formHeader/FormHeader';
import RadioButtonList from '../../components/radioButtonList/RadioButtonList';
import TextArea from '../../components/textArea/TextArea';

let SecView = ({ ...propsFromHoc }) => {
  // **********************************************************************
  // * constants

  const { handleInputFieldValueChanged } = propsFromHoc;
  const { formData } = useSelector(selectCurrentView);

  /**
   * fields which have conditional visibility and whether they are shown
   */
  const showFields = useMemo(
    () => ({
      mattersSubjectToScrutinyOrTestingInOtherServicesComments:
        formData.mattersSubjectToScrutinyOrTestingInOtherServices === true,
      roleInDeterminingAmountsInFinancialReportingComments:
        formData.roleInDeterminingAmountsInFinancialReporting === true,
      roleInCustodyOfAssetsComments: formData.roleInCustodyOfAssets === true,
      abilityToAuthorizeTransactionsComments: formData.abilityToAuthorizeTransactions === true,
      roleInDesignOfFinancialInfoSystemsComments: formData.roleInDesignOfFinancialInfoSystems === true,
      roleInOperatingFinancialSystemsComments: formData.roleInOperatingFinancialSystems === true,
      roleInOperatingDecisionsComments: formData.roleInOperatingDecisions === true,
      roleInManagementFunctionsComments: formData.roleInManagementFunctions === true,
      roleInClientStaffingComments: formData.roleInClientStaffing === true,
      advocateInRegulatoryProceedingsComments: formData.advocateInRegulatoryProceedings === true,
      creationOfMutualInterestComments: formData.creationOfMutualInterest === true,
      taxServicesToPersonInOversightRoleComments: formData.taxServicesToPersonInOversightRole === true
    }),
    [
      formData.abilityToAuthorizeTransactions,
      formData.advocateInRegulatoryProceedings,
      formData.creationOfMutualInterest,
      formData.mattersSubjectToScrutinyOrTestingInOtherServices,
      formData.roleInClientStaffing,
      formData.roleInCustodyOfAssets,
      formData.roleInDesignOfFinancialInfoSystems,
      formData.roleInDeterminingAmountsInFinancialReporting,
      formData.roleInManagementFunctions,
      formData.roleInOperatingDecisions,
      formData.roleInOperatingFinancialSystems,
      formData.taxServicesToPersonInOversightRole
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
        <FormHeader text="SEC: Will the proposed project involve:" />

        <RadioButtonList
          horizontalItems
          name="mattersSubjectToScrutinyOrTestingInOtherServices"
          label="1. Any matters that will be subject to scrutiny or testing in other PM audit or assurance services?"
          options={YesNoRadioButtonListOptions}
          selectedValue={formData.mattersSubjectToScrutinyOrTestingInOtherServices}
          onChange={handleInputFieldValueChanged}
        />

        {showFields.mattersSubjectToScrutinyOrTestingInOtherServicesComments && (
          <TextArea
            name="mattersSubjectToScrutinyOrTestingInOtherServicesComments"
            label="If yes, describe involvement:"
            value={formData.mattersSubjectToScrutinyOrTestingInOtherServicesComments}
            placeholder="Type a value"
            rows={6}
            onChange={handleInputFieldValueChanged}
          />
        )}

        <RadioButtonList
          horizontalItems
          name="roleInDeterminingAmountsInFinancialReporting"
          label="2. Any role in a process for determining amounts used in financial reporting?"
          options={YesNoRadioButtonListOptions}
          selectedValue={formData.roleInDeterminingAmountsInFinancialReporting}
          onChange={handleInputFieldValueChanged}
        />

        {showFields.roleInDeterminingAmountsInFinancialReportingComments && (
          <TextArea
            name="roleInDeterminingAmountsInFinancialReportingComments"
            label="If yes, describe involvement:"
            value={formData.roleInDeterminingAmountsInFinancialReportingComments}
            placeholder="Type a value"
            rows={6}
            onChange={handleInputFieldValueChanged}
          />
        )}

        <RadioButtonList
          horizontalItems
          name="roleInCustodyOfAssets"
          label="3. Any role in custody or control of client assets?"
          options={YesNoRadioButtonListOptions}
          selectedValue={formData.roleInCustodyOfAssets}
          onChange={handleInputFieldValueChanged}
        />

        {showFields.roleInCustodyOfAssetsComments && (
          <TextArea
            name="roleInCustodyOfAssetsComments"
            label="If yes, describe involvement:"
            value={formData.roleInCustodyOfAssetsComments}
            placeholder="Type a value"
            rows={6}
            onChange={handleInputFieldValueChanged}
          />
        )}

        <RadioButtonList
          horizontalItems
          name="abilityToAuthorizeTransactions"
          label={
            '4. Any ability to authorize, approve or consummate transactions or ' +
            'exercise any form of authority on behalf of the client?'
          }
          options={YesNoRadioButtonListOptions}
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
          horizontalItems
          name="roleInDesignOfFinancialInfoSystems"
          label={
            '5. Any role in design or implementation of accounting or financial processes, ' +
            'including financial information systems or internal controls?'
          }
          options={YesNoRadioButtonListOptions}
          selectedValue={formData.roleInDesignOfFinancialInfoSystems}
          onChange={handleInputFieldValueChanged}
        />

        {showFields.roleInDesignOfFinancialInfoSystemsComments && (
          <TextArea
            name="roleInDesignOfFinancialInfoSystemsComments"
            label="If yes, describe involvement:"
            value={formData.roleInDesignOfFinancialInfoSystemsComments}
            placeholder="Type a value"
            rows={6}
            onChange={handleInputFieldValueChanged}
          />
        )}

        <RadioButtonList
          horizontalItems
          name="roleInOperatingFinancialSystems"
          label={
            '6. Any role in monitoring, supervising or operating any client functions, ' +
            'systems or processes, including financial information systems or internal controls?'
          }
          options={YesNoRadioButtonListOptions}
          selectedValue={formData.roleInOperatingFinancialSystems}
          onChange={handleInputFieldValueChanged}
        />

        {showFields.roleInOperatingFinancialSystemsComments && (
          <TextArea
            name="roleInOperatingFinancialSystemsComments"
            label="If yes, describe involvement:"
            value={formData.roleInOperatingFinancialSystemsComments}
            placeholder="Type a value"
            rows={6}
            onChange={handleInputFieldValueChanged}
          />
        )}

        <RadioButtonList
          horizontalItems
          name="roleInOperatingDecisions"
          label="7. Any decision-making role or participation with management in operating decisions?"
          options={YesNoRadioButtonListOptions}
          selectedValue={formData.roleInOperatingDecisions}
          onChange={handleInputFieldValueChanged}
        />

        {showFields.roleInOperatingDecisionsComments && (
          <TextArea
            name="roleInOperatingDecisionsComments"
            label="If yes, describe involvement:"
            value={formData.roleInOperatingDecisionsComments}
            placeholder="Type a value"
            rows={6}
            onChange={handleInputFieldValueChanged}
          />
        )}

        <RadioButtonList
          horizontalItems
          name="roleInManagementFunctions"
          label={
            '8. Any role that could be considered characteristic of a management function, ' +
            'including preparation of financial statements or other information for inclusion in an SEC filing?'
          }
          options={YesNoRadioButtonListOptions}
          selectedValue={formData.roleInManagementFunctions}
          onChange={handleInputFieldValueChanged}
        />

        {showFields.roleInManagementFunctionsComments && (
          <TextArea
            name="roleInManagementFunctionsComments"
            label="If yes, describe involvement:"
            value={formData.roleInManagementFunctionsComments}
            placeholder="Type a value"
            rows={6}
            onChange={handleInputFieldValueChanged}
          />
        )}

        <RadioButtonList
          horizontalItems
          name="roleInClientStaffing"
          label="9. Any activities related to selection, evaluation or development of client employees?"
          options={YesNoRadioButtonListOptions}
          selectedValue={formData.roleInClientStaffing}
          onChange={handleInputFieldValueChanged}
        />

        {showFields.roleInClientStaffingComments && (
          <TextArea
            name="roleInClientStaffingComments"
            label="If yes, describe involvement:"
            value={formData.roleInClientStaffingComments}
            placeholder="Type a value"
            rows={6}
            onChange={handleInputFieldValueChanged}
          />
        )}

        <RadioButtonList
          horizontalItems
          name="advocateInRegulatoryProceedings"
          label={
            '10. Acting in an advocate role on behalf of the client in regulatory proceedings or negotiations or as ' +
            'an expert witness in litigation?'
          }
          options={YesNoRadioButtonListOptions}
          selectedValue={formData.advocateInRegulatoryProceedings}
          onChange={handleInputFieldValueChanged}
        />

        {showFields.advocateInRegulatoryProceedingsComments && (
          <TextArea
            name="advocateInRegulatoryProceedingsComments"
            label="If yes, describe involvement:"
            value={formData.advocateInRegulatoryProceedingsComments}
            placeholder="Type a value"
            rows={6}
            onChange={handleInputFieldValueChanged}
          />
        )}

        <RadioButtonList
          horizontalItems
          name="creationOfMutualInterest"
          label="11. Creation of any form of mutual interest with the client?"
          options={YesNoRadioButtonListOptions}
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
          horizontalItems
          name="taxServicesToPersonInOversightRole"
          label={
            '12. Tax services to a person in a financial oversight role (applicable only when PCAOB auditing ' +
            'standards are followed)?'
          }
          options={YesNoRadioButtonListOptions}
          selectedValue={formData.taxServicesToPersonInOversightRole}
          onChange={handleInputFieldValueChanged}
        />

        {showFields.taxServicesToPersonInOversightRoleComments && (
          <TextArea
            name="taxServicesToPersonInOversightRoleComments"
            label="If yes, describe involvement:"
            value={formData.taxServicesToPersonInOversightRoleComments}
            placeholder="Type a value"
            rows={6}
            onChange={handleInputFieldValueChanged}
          />
        )}

        <TextArea
          name="involvementComparedToSecLimitations"
          label={
            'For each YES answer above, compare our involvement (as described) to the corresponding SEC ' +
            'Limitations. Based on the nature of the non-attest services we will/did provide, our conclusion is:'
          }
          value={formData.involvementComparedToSecLimitations}
          placeholder="Type a value"
          rows={6}
          onChange={handleInputFieldValueChanged}
        />
      </div>
    </CollapsibleFormSection>
  );
};

SecView = memo(SecView);
SecView.displayName = 'SecView';

export default withNewEngagementInstanceViewData(SecView);
