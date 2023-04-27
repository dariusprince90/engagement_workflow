import { memo, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { selectCurrentView } from '../../../../newEngagementInstanceSlice';
import withNewEngagementInstanceViewData from '../../../withNewEngagementInstanceViewData';
import YesNoRadioButtonListOptions from '../../../../../../../helpers/radioButtonListOptions/YesNoRadioButtonListOptions';
import CollapsibleFormSection from '../../../../../../common/collapsibleFormSection/CollapsibleFormSection';
import FormHeader from '../../../../../../common/formHeader/FormHeader';
import FormText from '../../../../components/formText/FormText';
import RadioButtonList from '../../../../components/radioButtonList/RadioButtonList';
import TextArea from '../../../../components/textArea/TextArea';

let PredecessorInformationSection = ({ ...propsFromHoc }) => {
  // **********************************************************************
  // * constants

  const { handleInputFieldValueChanged } = propsFromHoc;

  const { formData } = useSelector(selectCurrentView);

  // **********************************************************************
  // * component vars

  /**
   * fields which have conditional visibility and whether they are shown
   */
  const showFields = useMemo(
    () => ({
      predecessorInfoExperiencedDisagreementsComments:
        formData.predecessorInfoExperiencedDisagreementsWithConditions === true ||
        formData.predecessorInfoExperiencedDisagreementsWithReport === true ||
        formData.predecessorInfoExperiencedDisagreementsWithNature === true ||
        formData.predecessorInfoExperiencedDisagreementsWithAccounting === true,
      predecessorInfoHadDisagreementsWithFeesComments: formData.predecessorInfoHadDisagreementsWithFees === true,
      predecessorInfoMattersDoSuggestClientLacksEthicsComments:
        formData.predecessorInfoMattersDoSuggestClientLacksEthics === true,
      predecessorInfoMattersDoIndicateFraudComments: formData.predecessorInfoMattersDoIndicateFraud === true,
      predecessorInfoHasIssuedCommunicationsComments: formData.predecessorInfoHasIssuedCommunications === true,
      predecessorInfoHasRefusedReviewComments: formData.predecessorInfoHasRefusedReview === true,
      predecessorInfoDidIndicateResponseWasLimitedComments:
        formData.predecessorInfoDidIndicateResponseWasLimited === true
    }),
    [
      formData.predecessorInfoExperiencedDisagreementsWithConditions,
      formData.predecessorInfoExperiencedDisagreementsWithReport,
      formData.predecessorInfoExperiencedDisagreementsWithNature,
      formData.predecessorInfoExperiencedDisagreementsWithAccounting,
      formData.predecessorInfoHadDisagreementsWithFees,
      formData.predecessorInfoMattersDoSuggestClientLacksEthics,
      formData.predecessorInfoMattersDoIndicateFraud,
      formData.predecessorInfoHasIssuedCommunications,
      formData.predecessorInfoHasRefusedReview,
      formData.predecessorInfoDidIndicateResponseWasLimited
    ]
  );

  // **********************************************************************
  // * functions

  // **********************************************************************
  // * side effects

  // **********************************************************************
  // * render

  return (
    <CollapsibleFormSection title="Predecessor Information">
      <div className="container-fluid">
        <FormHeader text="Predecessor Assessment - Required for Audit Engagements" />

        <FormText isLabel>1. Did the Predecessor accountant experience any disagreement with the client</FormText>

        <RadioButtonList
          horizontalItems
          name="predecessorInfoExperiencedDisagreementsWithAccounting"
          label="a. Accounting matters?"
          options={YesNoRadioButtonListOptions}
          selectedValue={formData.predecessorInfoExperiencedDisagreementsWithAccounting}
          onChange={handleInputFieldValueChanged}
        />

        <RadioButtonList
          horizontalItems
          name="predecessorInfoExperiencedDisagreementsWithNature"
          label="b. The nature and scope of the accountant's procedures?"
          options={YesNoRadioButtonListOptions}
          selectedValue={formData.predecessorInfoExperiencedDisagreementsWithNature}
          onChange={handleInputFieldValueChanged}
        />

        <RadioButtonList
          horizontalItems
          name="predecessorInfoExperiencedDisagreementsWithReport"
          label="c. The accountant's report?"
          options={YesNoRadioButtonListOptions}
          selectedValue={formData.predecessorInfoExperiencedDisagreementsWithReport}
          onChange={handleInputFieldValueChanged}
        />

        <RadioButtonList
          horizontalItems
          name="predecessorInfoExperiencedDisagreementsWithConditions"
          label="d. Reportable conditions or other internal control matters?"
          options={YesNoRadioButtonListOptions}
          selectedValue={formData.predecessorInfoExperiencedDisagreementsWithConditions}
          onChange={handleInputFieldValueChanged}
        />

        {showFields.predecessorInfoExperiencedDisagreementsComments && (
          <TextArea
            name="predecessorInfoExperiencedDisagreementsComments"
            label="If any of the above answered as 'yes'  the describe the nature of disagreements and how it was resolved"
            placeholder="Type a value"
            value={formData.predecessorInfoExperiencedDisagreementsComments}
            rows={6}
            onChange={handleInputFieldValueChanged}
          />
        )}

        <RadioButtonList
          horizontalItems
          name="predecessorInfoHadDisagreementsWithFees"
          label="2. Did the predecessor accountant have any disagreements with regards to fees or disputes involving payment?"
          options={YesNoRadioButtonListOptions}
          selectedValue={formData.predecessorInfoHadDisagreementsWithFees}
          onChange={handleInputFieldValueChanged}
        />

        {showFields.predecessorInfoHadDisagreementsWithFeesComments && (
          <TextArea
            name="predecessorInfoHadDisagreementsWithFeesComments"
            label="If yes, describe"
            placeholder="Type a value"
            value={formData.predecessorInfoHadDisagreementsWithFeesComments}
            rows={6}
            onChange={handleInputFieldValueChanged}
          />
        )}

        <RadioButtonList
          horizontalItems
          name="predecessorInfoMattersDoSuggestClientLacksEthics"
          label={
            '3. Did the predecessor accountant identify any matters that suggest the client ' +
            'lacks ethics or integrity in financial reporting or business conduct? '
          }
          options={YesNoRadioButtonListOptions}
          selectedValue={formData.predecessorInfoMattersDoSuggestClientLacksEthics}
          onChange={handleInputFieldValueChanged}
        />

        {showFields.predecessorInfoMattersDoSuggestClientLacksEthicsComments && (
          <TextArea
            name="predecessorInfoMattersDoSuggestClientLacksEthicsComments"
            label="If yes, describe"
            placeholder="Type a value"
            value={formData.predecessorInfoMattersDoSuggestClientLacksEthicsComments}
            rows={6}
            onChange={handleInputFieldValueChanged}
          />
        )}

        <RadioButtonList
          horizontalItems
          name="predecessorInfoMattersDoIndicateFraud"
          label="4. Did the predecessor accountant identify any matters indicating potential fraud or illegal acts?"
          options={YesNoRadioButtonListOptions}
          selectedValue={formData.predecessorInfoMattersDoIndicateFraud}
          onChange={handleInputFieldValueChanged}
        />

        {showFields.predecessorInfoMattersDoIndicateFraudComments && (
          <TextArea
            name="predecessorInfoMattersDoIndicateFraudComments"
            label="If yes, describe"
            placeholder="Type a value"
            value={formData.predecessorInfoMattersDoIndicateFraudComments}
            rows={6}
            onChange={handleInputFieldValueChanged}
          />
        )}

        <RadioButtonList
          horizontalItems
          name="predecessorInfoHasIssuedCommunications"
          label={
            '5. Has the predecessor accountant issued any communications to the client ' +
            'regarding fraud, illegal act or matters related to internal controls? '
          }
          options={YesNoRadioButtonListOptions}
          selectedValue={formData.predecessorInfoHasIssuedCommunications}
          onChange={handleInputFieldValueChanged}
        />

        {showFields.predecessorInfoHasIssuedCommunicationsComments && (
          <TextArea
            name="predecessorInfoHasIssuedCommunicationsComments"
            label="If yes, describe"
            placeholder="Type a value"
            value={formData.predecessorInfoHasIssuedCommunicationsComments}
            rows={6}
            onChange={handleInputFieldValueChanged}
          />
        )}

        <RadioButtonList
          horizontalItems
          name="predecessorInfoHasRefusedReview"
          label="6. Has the predecessor accountant refused to allow us to review work papers?"
          options={YesNoRadioButtonListOptions}
          selectedValue={formData.predecessorInfoHasRefusedReview}
          onChange={handleInputFieldValueChanged}
        />

        {showFields.predecessorInfoHasRefusedReviewComments && (
          <TextArea
            name="predecessorInfoHasRefusedReviewComments"
            label="If yes, describe"
            placeholder="Type a value"
            value={formData.predecessorInfoHasRefusedReviewComments}
            rows={6}
            onChange={handleInputFieldValueChanged}
          />
        )}

        <TextArea
          name="predecessorInfoUnderstoodReasonForEngagingComments"
          label="7. What is the predecessor accountant's understanding of the reason for engaging a new firm?"
          placeholder="Type a value"
          value={formData.predecessorInfoUnderstoodReasonForEngagingComments}
          rows={6}
          onChange={handleInputFieldValueChanged}
        />

        <TextArea
          name="predecessorInfoStatedReasonForEngagingComments"
          label="8. What is the potential client's stated reason for engaging a new firm?"
          placeholder="Type a value"
          value={formData.predecessorInfoStatedReasonForEngagingComments}
          rows={6}
          onChange={handleInputFieldValueChanged}
        />

        <RadioButtonList
          horizontalItems
          name="predecessorInfoDidIndicateResponseWasLimited"
          label="9. Did the predecessor accountant indicate that their response to our inquiries was limited in anyway?"
          options={YesNoRadioButtonListOptions}
          selectedValue={formData.predecessorInfoDidIndicateResponseWasLimited}
          onChange={handleInputFieldValueChanged}
        />

        {showFields.predecessorInfoDidIndicateResponseWasLimitedComments && (
          <TextArea
            name="predecessorInfoDidIndicateResponseWasLimitedComments"
            label="If yes, describe"
            placeholder="Type a value"
            value={formData.predecessorInfoDidIndicateResponseWasLimitedComments}
            rows={6}
            onChange={handleInputFieldValueChanged}
          />
        )}
      </div>
    </CollapsibleFormSection>
  );
};

PredecessorInformationSection = memo(PredecessorInformationSection);
PredecessorInformationSection.displayName = 'PredecessorInformationSection';

export default withNewEngagementInstanceViewData(PredecessorInformationSection);
