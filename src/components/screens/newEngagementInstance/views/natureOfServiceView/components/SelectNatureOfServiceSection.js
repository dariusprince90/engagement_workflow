import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import INPUT_GROUP_ADD_ON_TYPES from '../../../../../../helpers/enums/inputGroupAddOnTypes';
import {
  selectDisallowedJobHierarchyIds,
  selectLookups,
  selectNewEngagementInstance
} from '../../../newEngagementInstanceSlice';
import { createJobInfoResponse } from '../../../newEngagementInstanceThunks';

import CollapsibleFormSection from '../../../../../common/collapsibleFormSection/CollapsibleFormSection';
import SelectBox from '../../../components/selectBox/SelectBox';

let SelectNatureOfServiceSection = () => {
  // **********************************************************************
  // * constants

  const dispatch = useDispatch();
  const { jobHierarchies, natureOfServiceJobHierarchyMaps } = useSelector(selectLookups);
  const disallowedJobHierarchyIds = useSelector(selectDisallowedJobHierarchyIds);
  const { newEngagementInstanceId } = useSelector(selectNewEngagementInstance);

  // **********************************************************************
  // * component vars

  const [jobHierarchyOptions, setJobHierarchyOptions] = useState([]);
  const [jobHierarchyId, setJobHierarchyId] = useState('');
  const [addButtonDisabled, setAddButtonDisabled] = useState(true);

  // *** input add-ons ***
  const jobHierarchyIdInputAddOns = useMemo(() => {
    const handleAddNatureOfServiceButtonClick = async () => {
      const natureOfServiceId = natureOfServiceJobHierarchyMaps.data.find(
        (n) => n.jobHierarchyId === parseInt(jobHierarchyId)
      ).natureOfServiceId;

      const data = { newEngagementInstanceId, jobHierarchyId: parseInt(jobHierarchyId), natureOfServiceId };
      await dispatch(createJobInfoResponse(data));
      setJobHierarchyId('');
    };

    return [
      {
        addOnType: INPUT_GROUP_ADD_ON_TYPES.button,
        text: 'Add',
        buttonClass: 'btn btn-primary',
        onClick: handleAddNatureOfServiceButtonClick,
        disabled: addButtonDisabled
      }
    ];
  }, [addButtonDisabled, dispatch, natureOfServiceJobHierarchyMaps.data, newEngagementInstanceId, jobHierarchyId]);

  // **********************************************************************
  // * functions

  /**
   * when the job hierarchy id is changed
   * - set the selected job hierarchy id
   */
  const handleJobHierarchyIdChanged = useCallback((event) => {
    setJobHierarchyId(event.target.value);
  }, []);

  // **********************************************************************
  // * side effects

  /**
   * when jobHierarchies.data or disallowedJobHierarchyIds changes
   *  - populate jobHierarchyOptions
   */
  useEffect(
    function populateJobHierarchyOptions() {
      // get the initial/base list of job hierarchy ids allowed within NEW
      // this base list comes from the job hierarchy ids contained within natureOfServiceJobHierarchyMaps
      const baseJobHierarchyIds = natureOfServiceJobHierarchyMaps.data.map((n) => n.jobHierarchyId);

      // get base list of job hierarchies
      // all job hierarchies whose id is in the base job hierarchy id list
      let jobHierarchyList = jobHierarchies.data.filter(jh => baseJobHierarchyIds.includes(jh.id));

      // if there are any disallowed job hierarchy ids, then filter those ids out of the list
      if (disallowedJobHierarchyIds.length > 0) {
        jobHierarchyList = jobHierarchyList.filter((jh) => !disallowedJobHierarchyIds.includes(jh.id));
      }

      // create the options from the job hierarchy list
      const options = jobHierarchyList.map((jobHierarchy) => {
        return { value: jobHierarchy.id, text: jobHierarchy.level4Name };
      });

      setJobHierarchyOptions(options);
    },
    [disallowedJobHierarchyIds, jobHierarchies.data, natureOfServiceJobHierarchyMaps.data]
  );

  /**
   * when selectedJobHierarchy changes, toggle the state of the add button
   * - when selectedJobHierarchy has a value, the add button is not disabled
   * - when selectedJobHierarchy has no value, the add button is disabled
   */
  useEffect(
    function toggleAddButtonState() {
      const disabled = !jobHierarchyId;
      setAddButtonDisabled(disabled);
    },
    [jobHierarchyId]
  );

  // **********************************************************************
  // * render

  return (
    <CollapsibleFormSection title="Nature Of Service(s)">
      <div className="container">
        <SelectBox
          name="jobHierarchyId"
          label="Job Types"
          value={jobHierarchyId}
          defaultOption="Select a job type..."
          options={jobHierarchyOptions}
          isLoading={jobHierarchies.isLoading}
          loadingText="Loading job types..."
          appendAddOns={jobHierarchyIdInputAddOns}
          onChange={handleJobHierarchyIdChanged}
        />
      </div>
    </CollapsibleFormSection>
  );
};

SelectNatureOfServiceSection = memo(SelectNatureOfServiceSection);

export default SelectNatureOfServiceSection;
