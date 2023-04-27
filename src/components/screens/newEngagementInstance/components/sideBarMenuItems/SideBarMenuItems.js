import { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { viewChanged, selectCurrentViewId, selectJobSideBarMenuItemDetails } from '../../newEngagementInstanceSlice';
import MenuItem from '../../../../common/sideBar/menuItems/MenuItem';
import NEI_VIEWS from '../../../../../helpers/enums/newEngagementInstanceViews';

let SideBarMenuItems = () => {
  // **********************************************************************
  // * constants

  const dispatch = useDispatch();
  const currentViewId = useSelector(selectCurrentViewId);
  const jobMenuItemDetails = useSelector(selectJobSideBarMenuItemDetails);

  // **********************************************************************
  // * component vars

  // **********************************************************************
  // * functions

  const handleMenuItemClick = useCallback(
    (viewId) => {
      dispatch(viewChanged(viewId));
    },
    [dispatch]
  );

  /**
   * Creates the menu items for each of the jobs.
   */
  const createJobSetupMenuItems = useCallback(() => {
    const items = jobMenuItemDetails?.map((jobMenuItem) => (
      <MenuItem
        key={jobMenuItem.viewId}
        label={jobMenuItem.label}
        useLabelAsTitle
        icon="fa-solid fa-briefcase"
        isActive={currentViewId === jobMenuItem.viewId}
        onClick={() => handleMenuItemClick(jobMenuItem.viewId)}
      />
    ));

    return items;
  }, [currentViewId, handleMenuItemClick, jobMenuItemDetails]);

  // **********************************************************************
  // * side effects

  // **********************************************************************
  // * render

  return (
    <>
      <MenuItem
        label={NEI_VIEWS.selectClient.displayName}
        icon="fa-solid fa-user-group"
        isActive={NEI_VIEWS.selectClient.viewId === currentViewId}
        onClick={useCallback(() => handleMenuItemClick(NEI_VIEWS.selectClient.viewId), [handleMenuItemClick])}
      />

      <MenuItem
        label={NEI_VIEWS.natureOfService.displayName}
        icon="fa-solid fa-hand-holding-seedling"
        isActive={NEI_VIEWS.natureOfService.viewId === currentViewId}
        onClick={useCallback(() => handleMenuItemClick(NEI_VIEWS.natureOfService.viewId), [handleMenuItemClick])}
      />

      <MenuItem
        label={NEI_VIEWS.engagementInformation.displayName}
        icon="fa-solid fa-handshake"
        isActive={NEI_VIEWS.engagementInformation.viewId === currentViewId}
        onClick={useCallback(() => handleMenuItemClick(NEI_VIEWS.engagementInformation.viewId), [handleMenuItemClick])}
      />

      <MenuItem
        label={NEI_VIEWS.clientInformation.displayName}
        icon="fa-solid fa-folder-user"
        isActive={NEI_VIEWS.clientInformation.viewId === currentViewId}
        onClick={useCallback(() => handleMenuItemClick(NEI_VIEWS.clientInformation.viewId), [handleMenuItemClick])}
      />

      <MenuItem
        label={NEI_VIEWS.clientContactDetails.displayName}
        icon="fa-solid fa-id-card"
        isActive={NEI_VIEWS.clientContactDetails.viewId === currentViewId}
        onClick={useCallback(() => handleMenuItemClick(NEI_VIEWS.clientContactDetails.viewId), [handleMenuItemClick])}
      />

      <MenuItem
        label={NEI_VIEWS.clientContacts.displayName}
        icon="fa-solid fa-people-group"
        isActive={NEI_VIEWS.clientContacts.viewId === currentViewId}
        onClick={useCallback(() => handleMenuItemClick(NEI_VIEWS.clientContacts.viewId), [handleMenuItemClick])}
      />

      <MenuItem
        label={NEI_VIEWS.additionalInformation.displayName}
        icon="fa-solid fa-file-user"
        isActive={NEI_VIEWS.additionalInformation.viewId === currentViewId}
        onClick={useCallback(() => handleMenuItemClick(NEI_VIEWS.additionalInformation.viewId), [handleMenuItemClick])}
      />

      <MenuItem
        label={NEI_VIEWS.knowledgeOfClient.displayName}
        icon="fa-solid fa-thought-bubble"
        isActive={NEI_VIEWS.knowledgeOfClient.viewId === currentViewId}
        onClick={useCallback(() => handleMenuItemClick(NEI_VIEWS.knowledgeOfClient.viewId), [handleMenuItemClick])}
      />

      <MenuItem
        label={NEI_VIEWS.riskAssessment.displayName}
        icon="fa-solid fa-shield-exclamation"
        isActive={NEI_VIEWS.riskAssessment.viewId === currentViewId}
        onClick={useCallback(() => handleMenuItemClick(NEI_VIEWS.riskAssessment.viewId), [handleMenuItemClick])}
      />

      <MenuItem
        label={NEI_VIEWS.industryRisk.displayName}
        icon="fa-solid fa-building-shield"
        isActive={NEI_VIEWS.industryRisk.viewId === currentViewId}
        onClick={useCallback(() => handleMenuItemClick(NEI_VIEWS.industryRisk.viewId), [handleMenuItemClick])}
      />

      <MenuItem
        label={NEI_VIEWS.supplementalRisk.displayName}
        icon="fa-solid fa-shield-plus"
        isActive={NEI_VIEWS.supplementalRisk.viewId === currentViewId}
        onClick={useCallback(() => handleMenuItemClick(NEI_VIEWS.supplementalRisk.viewId), [handleMenuItemClick])}
      />

      <MenuItem
        label={NEI_VIEWS.taxRisk.displayName}
        icon="fa-solid fa-shield-minus"
        isActive={NEI_VIEWS.taxRisk.viewId === currentViewId}
        onClick={useCallback(() => handleMenuItemClick(NEI_VIEWS.taxRisk.viewId), [handleMenuItemClick])}
      />

      <MenuItem
        label={NEI_VIEWS.aicpa.displayName}
        icon="fa-solid fa-book-section"
        isActive={NEI_VIEWS.aicpa.viewId === currentViewId}
        onClick={useCallback(() => handleMenuItemClick(NEI_VIEWS.aicpa.viewId), [handleMenuItemClick])}
      />

      <MenuItem
        label={NEI_VIEWS.gao.displayName}
        icon="fa-solid fa-comment-arrow-up-right"
        isActive={NEI_VIEWS.gao.viewId === currentViewId}
        onClick={useCallback(() => handleMenuItemClick(NEI_VIEWS.gao.viewId), [handleMenuItemClick])}
      />

      <MenuItem
        label={NEI_VIEWS.sec.displayName}
        icon="fa-solid fa-chart-line-up"
        isActive={NEI_VIEWS.sec.viewId === currentViewId}
        onClick={useCallback(() => handleMenuItemClick(NEI_VIEWS.sec.viewId), [handleMenuItemClick])}
      />

      <MenuItem
        label={NEI_VIEWS.finalApproval.displayName}
        icon="fa-solid fa-person-circle-check"
        isActive={NEI_VIEWS.finalApproval.viewId === currentViewId}
        onClick={useCallback(() => handleMenuItemClick(NEI_VIEWS.finalApproval.viewId), [handleMenuItemClick])}
      />

      {createJobSetupMenuItems()}

      <MenuItem
        label={NEI_VIEWS.billingScheduleSummary.displayName}
        icon="fa-solid fa-file-invoice-dollar"
        isActive={NEI_VIEWS.billingScheduleSummary.viewId === currentViewId}
        onClick={useCallback(() => handleMenuItemClick(NEI_VIEWS.billingScheduleSummary.viewId), [handleMenuItemClick])}
      />

      <MenuItem
        label={NEI_VIEWS.workflowComments.displayName}
        icon="fa-solid fa-message-lines"
        isActive={NEI_VIEWS.workflowComments.viewId === currentViewId}
        onClick={useCallback(() => handleMenuItemClick(NEI_VIEWS.workflowComments.viewId), [handleMenuItemClick])}
      />

      <MenuItem
        label={NEI_VIEWS.workflowHistory.displayName}
        icon="fa-solid fa-timeline-arrow"
        isActive={NEI_VIEWS.workflowHistory.viewId === currentViewId}
        onClick={useCallback(() => handleMenuItemClick(NEI_VIEWS.workflowHistory.viewId), [handleMenuItemClick])}
      />
    </>
  );
};

SideBarMenuItems = memo(SideBarMenuItems);

export default SideBarMenuItems;
