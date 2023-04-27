import ReactDOM from 'react-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import faker from '@faker-js/faker';

import NEI_VIEWS from '../../../../../helpers/enums/newEngagementInstanceViews';
import * as newEngagementInstanceSlice from '../../newEngagementInstanceSlice';
import SideBarMenuItems from './SideBarMenuItems';

// **********************************************************************
// * constants

const fakeCurrentViewId = faker.datatype.number();

const fakeJobMenuItemDetails = [];

// **********************************************************************
// * functions

const getComponentToRender = () => {
  return <SideBarMenuItems />;
};

// **********************************************************************
// * mocking external dependencies

jest.mock('react-redux', () => {
  return {
    useDispatch: () => jest.fn(),
    useSelector: (callback) => callback()
  };
});

jest.mock('../../newEngagementInstanceSlice', () => {
  return {
    viewChanged: jest.fn(),
    selectCurrentViewId: jest.fn(),
    selectJobSideBarMenuItemDetails: jest.fn()
  };
});

jest.mock('../../../../common/sideBar/menuItems/MenuItem', () => ({
  __esModule: true,
  default: ({ label, useLabelAsTitle, icon, isActive, onClick }) => {
    const props = { label, useLabelAsTitle, icon, isActive, onClick };
    return <fake-menu-item {...props} data-testid={props.label} role="menuitem" />;
  }
}));

// **********************************************************************
// * unit tests

describe('SideBarMenuItems', () => {
  // **********************************************************************
  // * setup

  beforeEach(() => {
    newEngagementInstanceSlice.selectCurrentViewId.mockReturnValue(fakeCurrentViewId);
    newEngagementInstanceSlice.selectJobSideBarMenuItemDetails.mockReturnValue(fakeJobMenuItemDetails);
  });

  // **********************************************************************
  // * tear-down

  // **********************************************************************
  // * execution

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(getComponentToRender(), div);
  });

  it('has correct order of menu items', () => {
    render(getComponentToRender());
    const menuItems = screen.getAllByRole('menuitem');
    expect(menuItems.length).toBe(Object.keys(NEI_VIEWS).length);
    expect(menuItems[0]).toHaveAttribute('label', NEI_VIEWS.selectClient.displayName);
    expect(menuItems[1]).toHaveAttribute('label', NEI_VIEWS.natureOfService.displayName);
    expect(menuItems[2]).toHaveAttribute('label', NEI_VIEWS.engagementInformation.displayName);
    expect(menuItems[3]).toHaveAttribute('label', NEI_VIEWS.clientInformation.displayName);
    expect(menuItems[4]).toHaveAttribute('label', NEI_VIEWS.clientContactDetails.displayName);
    expect(menuItems[5]).toHaveAttribute('label', NEI_VIEWS.clientContacts.displayName);
    expect(menuItems[6]).toHaveAttribute('label', NEI_VIEWS.additionalInformation.displayName);
    expect(menuItems[7]).toHaveAttribute('label', NEI_VIEWS.knowledgeOfClient.displayName);
    expect(menuItems[8]).toHaveAttribute('label', NEI_VIEWS.riskAssessment.displayName);
    expect(menuItems[9]).toHaveAttribute('label', NEI_VIEWS.industryRisk.displayName);
    expect(menuItems[10]).toHaveAttribute('label', NEI_VIEWS.supplementalRisk.displayName);
    expect(menuItems[11]).toHaveAttribute('label', NEI_VIEWS.taxRisk.displayName);
    expect(menuItems[12]).toHaveAttribute('label', NEI_VIEWS.aicpa.displayName);
    expect(menuItems[13]).toHaveAttribute('label', NEI_VIEWS.gao.displayName);
    expect(menuItems[14]).toHaveAttribute('label', NEI_VIEWS.sec.displayName);
    expect(menuItems[15]).toHaveAttribute('label', NEI_VIEWS.finalApproval.displayName);
    expect(menuItems[16]).toHaveAttribute('label', NEI_VIEWS.billingScheduleSummary.displayName);
    expect(menuItems[17]).toHaveAttribute('label', NEI_VIEWS.workflowComments.displayName);
    expect(menuItems[18]).toHaveAttribute('label', NEI_VIEWS.workflowHistory.displayName);
  });

  describe('selectClient menu item', () => {
    it('always renders', () => {
      const testId = NEI_VIEWS.selectClient.displayName;
      render(getComponentToRender());
      expect(screen.getByTestId(testId)).toBeInTheDocument();
    });

    it('has correct label prop', () => {
      const testId = NEI_VIEWS.selectClient.displayName;
      const expectedLabel = NEI_VIEWS.selectClient.displayName;
      render(getComponentToRender());
      expect(screen.getByTestId(testId)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct icon prop', () => {
      const testId = NEI_VIEWS.selectClient.displayName;
      const expectedIcon = 'fa-solid fa-user-group';
      render(getComponentToRender());
      expect(screen.getByTestId(testId)).toHaveAttribute('icon', expectedIcon);
    });

    it('sets isActive to false when currentViewId does not match the menu item view id', () => {
      const testId = NEI_VIEWS.selectClient.displayName;
      const currentViewId = faker.random.alphaNumeric(10);
      const expectedIsActive = false;
      newEngagementInstanceSlice.selectCurrentViewId.mockReturnValue(currentViewId);
      render(getComponentToRender());
      expect(screen.getByTestId(testId)).toHaveAttribute('isActive', expectedIsActive.toString());
    });

    it('sets isActive to true when currentViewId matches the menu item view id', () => {
      const testId = NEI_VIEWS.selectClient.displayName;
      const currentViewId = NEI_VIEWS.selectClient.viewId;
      const expectedIsActive = true;
      newEngagementInstanceSlice.selectCurrentViewId.mockReturnValue(currentViewId);
      render(getComponentToRender());
      expect(screen.getByTestId(testId)).toHaveAttribute('isActive', expectedIsActive.toString());
    });

    describe('functional', () => {
      it('invokes viewChanged with correct view id when clicked', () => {
        const testId = NEI_VIEWS.selectClient.displayName;
        const currentViewId = NEI_VIEWS.selectClient.viewId;
        render(getComponentToRender());
        fireEvent.click(screen.getByTestId(testId));
        expect(newEngagementInstanceSlice.viewChanged).toHaveBeenCalledTimes(1);
        expect(newEngagementInstanceSlice.viewChanged).toHaveBeenCalledWith(currentViewId);
      });
    });
  });

  describe('natureOfService menu item', () => {
    it('always renders', () => {
      const testId = NEI_VIEWS.natureOfService.displayName;
      render(getComponentToRender());
      expect(screen.getByTestId(testId)).toBeInTheDocument();
    });

    it('has correct label prop', () => {
      const testId = NEI_VIEWS.natureOfService.displayName;
      const expectedLabel = NEI_VIEWS.natureOfService.displayName;
      render(getComponentToRender());
      expect(screen.getByTestId(testId)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct icon prop', () => {
      const testId = NEI_VIEWS.natureOfService.displayName;
      const expectedIcon = 'fa-solid fa-hand-holding-seedling';
      render(getComponentToRender());
      expect(screen.getByTestId(testId)).toHaveAttribute('icon', expectedIcon);
    });

    it('sets isActive to false when currentViewId does not match the menu item view id', () => {
      const testId = NEI_VIEWS.natureOfService.displayName;
      const currentViewId = faker.random.alphaNumeric(10);
      const expectedIsActive = false;
      newEngagementInstanceSlice.selectCurrentViewId.mockReturnValue(currentViewId);
      render(getComponentToRender());
      expect(screen.getByTestId(testId)).toHaveAttribute('isActive', expectedIsActive.toString());
    });

    it('sets isActive to true when currentViewId matches the menu item view id', () => {
      const testId = NEI_VIEWS.natureOfService.displayName;
      const currentViewId = NEI_VIEWS.natureOfService.viewId;
      const expectedIsActive = true;
      newEngagementInstanceSlice.selectCurrentViewId.mockReturnValue(currentViewId);
      render(getComponentToRender());
      expect(screen.getByTestId(testId)).toHaveAttribute('isActive', expectedIsActive.toString());
    });

    describe('functional', () => {
      it('invokes viewChanged with correct view id when clicked', () => {
        const testId = NEI_VIEWS.natureOfService.displayName;
        const currentViewId = NEI_VIEWS.natureOfService.viewId;
        render(getComponentToRender());
        fireEvent.click(screen.getByTestId(testId));
        expect(newEngagementInstanceSlice.viewChanged).toHaveBeenCalledTimes(1);
        expect(newEngagementInstanceSlice.viewChanged).toHaveBeenCalledWith(currentViewId);
      });
    });
  });

  describe('engagementInformation menu item', () => {
    it('always renders', () => {
      const testId = NEI_VIEWS.engagementInformation.displayName;
      render(getComponentToRender());
      expect(screen.getByTestId(testId)).toBeInTheDocument();
    });

    it('has correct label prop', () => {
      const testId = NEI_VIEWS.engagementInformation.displayName;
      const expectedLabel = NEI_VIEWS.engagementInformation.displayName;
      render(getComponentToRender());
      expect(screen.getByTestId(testId)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct icon prop', () => {
      const testId = NEI_VIEWS.engagementInformation.displayName;
      const expectedIcon = 'fa-solid fa-handshake';
      render(getComponentToRender());
      expect(screen.getByTestId(testId)).toHaveAttribute('icon', expectedIcon);
    });

    it('sets isActive to false when currentViewId does not match the menu item view id', () => {
      const testId = NEI_VIEWS.engagementInformation.displayName;
      const currentViewId = faker.random.alphaNumeric(10);
      const expectedIsActive = false;
      newEngagementInstanceSlice.selectCurrentViewId.mockReturnValue(currentViewId);
      render(getComponentToRender());
      expect(screen.getByTestId(testId)).toHaveAttribute('isActive', expectedIsActive.toString());
    });

    it('sets isActive to true when currentViewId matches the menu item view id', () => {
      const testId = NEI_VIEWS.engagementInformation.displayName;
      const currentViewId = NEI_VIEWS.engagementInformation.viewId;
      const expectedIsActive = true;
      newEngagementInstanceSlice.selectCurrentViewId.mockReturnValue(currentViewId);
      render(getComponentToRender());
      expect(screen.getByTestId(testId)).toHaveAttribute('isActive', expectedIsActive.toString());
    });

    describe('functional', () => {
      it('invokes viewChanged with correct view id when clicked', () => {
        const testId = NEI_VIEWS.engagementInformation.displayName;
        const currentViewId = NEI_VIEWS.engagementInformation.viewId;
        render(getComponentToRender());
        fireEvent.click(screen.getByTestId(testId));
        expect(newEngagementInstanceSlice.viewChanged).toHaveBeenCalledTimes(1);
        expect(newEngagementInstanceSlice.viewChanged).toHaveBeenCalledWith(currentViewId);
      });
    });
  });

  describe('clientInformation menu item', () => {
    it('always renders', () => {
      const testId = NEI_VIEWS.clientInformation.displayName;
      render(getComponentToRender());
      expect(screen.getByTestId(testId)).toBeInTheDocument();
    });

    it('has correct label prop', () => {
      const testId = NEI_VIEWS.clientInformation.displayName;
      const expectedLabel = NEI_VIEWS.clientInformation.displayName;
      render(getComponentToRender());
      expect(screen.getByTestId(testId)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct icon prop', () => {
      const testId = NEI_VIEWS.clientInformation.displayName;
      const expectedIcon = 'fa-solid fa-folder-user';
      render(getComponentToRender());
      expect(screen.getByTestId(testId)).toHaveAttribute('icon', expectedIcon);
    });

    it('sets isActive to false when currentViewId does not match the menu item view id', () => {
      const testId = NEI_VIEWS.clientInformation.displayName;
      const currentViewId = faker.random.alphaNumeric(10);
      const expectedIsActive = false;
      newEngagementInstanceSlice.selectCurrentViewId.mockReturnValue(currentViewId);
      render(getComponentToRender());
      expect(screen.getByTestId(testId)).toHaveAttribute('isActive', expectedIsActive.toString());
    });

    it('sets isActive to true when currentViewId matches the menu item view id', () => {
      const testId = NEI_VIEWS.clientInformation.displayName;
      const currentViewId = NEI_VIEWS.clientInformation.viewId;
      const expectedIsActive = true;
      newEngagementInstanceSlice.selectCurrentViewId.mockReturnValue(currentViewId);
      render(getComponentToRender());
      expect(screen.getByTestId(testId)).toHaveAttribute('isActive', expectedIsActive.toString());
    });

    describe('functional', () => {
      it('invokes viewChanged with correct view id when clicked', () => {
        const testId = NEI_VIEWS.clientInformation.displayName;
        const currentViewId = NEI_VIEWS.clientInformation.viewId;
        render(getComponentToRender());
        fireEvent.click(screen.getByTestId(testId));
        expect(newEngagementInstanceSlice.viewChanged).toHaveBeenCalledTimes(1);
        expect(newEngagementInstanceSlice.viewChanged).toHaveBeenCalledWith(currentViewId);
      });
    });
  });

  describe('clientContactDetails menu item', () => {
    it('always renders', () => {
      const testId = NEI_VIEWS.clientContactDetails.displayName;
      render(getComponentToRender());
      expect(screen.getByTestId(testId)).toBeInTheDocument();
    });

    it('has correct label prop', () => {
      const testId = NEI_VIEWS.clientContactDetails.displayName;
      const expectedLabel = NEI_VIEWS.clientContactDetails.displayName;
      render(getComponentToRender());
      expect(screen.getByTestId(testId)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct icon prop', () => {
      const testId = NEI_VIEWS.clientContactDetails.displayName;
      const expectedIcon = 'fa-solid fa-id-card';
      render(getComponentToRender());
      expect(screen.getByTestId(testId)).toHaveAttribute('icon', expectedIcon);
    });

    it('sets isActive to false when currentViewId does not match the menu item view id', () => {
      const testId = NEI_VIEWS.clientContactDetails.displayName;
      const currentViewId = faker.random.alphaNumeric(10);
      const expectedIsActive = false;
      newEngagementInstanceSlice.selectCurrentViewId.mockReturnValue(currentViewId);
      render(getComponentToRender());
      expect(screen.getByTestId(testId)).toHaveAttribute('isActive', expectedIsActive.toString());
    });

    it('sets isActive to true when currentViewId matches the menu item view id', () => {
      const testId = NEI_VIEWS.clientContactDetails.displayName;
      const currentViewId = NEI_VIEWS.clientContactDetails.viewId;
      const expectedIsActive = true;
      newEngagementInstanceSlice.selectCurrentViewId.mockReturnValue(currentViewId);
      render(getComponentToRender());
      expect(screen.getByTestId(testId)).toHaveAttribute('isActive', expectedIsActive.toString());
    });

    describe('functional', () => {
      it('invokes viewChanged with correct view id when clicked', () => {
        const testId = NEI_VIEWS.clientContactDetails.displayName;
        const currentViewId = NEI_VIEWS.clientContactDetails.viewId;
        render(getComponentToRender());
        fireEvent.click(screen.getByTestId(testId));
        expect(newEngagementInstanceSlice.viewChanged).toHaveBeenCalledTimes(1);
        expect(newEngagementInstanceSlice.viewChanged).toHaveBeenCalledWith(currentViewId);
      });
    });
  });

  describe('clientContacts menu item', () => {
    it('always renders', () => {
      const testId = NEI_VIEWS.clientContacts.displayName;
      render(getComponentToRender());
      expect(screen.getByTestId(testId)).toBeInTheDocument();
    });

    it('has correct label prop', () => {
      const testId = NEI_VIEWS.clientContacts.displayName;
      const expectedLabel = NEI_VIEWS.clientContacts.displayName;
      render(getComponentToRender());
      expect(screen.getByTestId(testId)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct icon prop', () => {
      const testId = NEI_VIEWS.clientContacts.displayName;
      const expectedIcon = 'fa-solid fa-people-group';
      render(getComponentToRender());
      expect(screen.getByTestId(testId)).toHaveAttribute('icon', expectedIcon);
    });

    it('sets isActive to false when currentViewId does not match the menu item view id', () => {
      const testId = NEI_VIEWS.clientContacts.displayName;
      const currentViewId = faker.random.alphaNumeric(10);
      const expectedIsActive = false;
      newEngagementInstanceSlice.selectCurrentViewId.mockReturnValue(currentViewId);
      render(getComponentToRender());
      expect(screen.getByTestId(testId)).toHaveAttribute('isActive', expectedIsActive.toString());
    });

    it('sets isActive to true when currentViewId matches the menu item view id', () => {
      const testId = NEI_VIEWS.clientContacts.displayName;
      const currentViewId = NEI_VIEWS.clientContacts.viewId;
      const expectedIsActive = true;
      newEngagementInstanceSlice.selectCurrentViewId.mockReturnValue(currentViewId);
      render(getComponentToRender());
      expect(screen.getByTestId(testId)).toHaveAttribute('isActive', expectedIsActive.toString());
    });

    describe('functional', () => {
      it('invokes viewChanged with correct view id when clicked', () => {
        const testId = NEI_VIEWS.clientContacts.displayName;
        const currentViewId = NEI_VIEWS.clientContacts.viewId;
        render(getComponentToRender());
        fireEvent.click(screen.getByTestId(testId));
        expect(newEngagementInstanceSlice.viewChanged).toHaveBeenCalledTimes(1);
        expect(newEngagementInstanceSlice.viewChanged).toHaveBeenCalledWith(currentViewId);
      });
    });
  });

  describe('additionalInformation menu item', () => {
    it('always renders', () => {
      const testId = NEI_VIEWS.additionalInformation.displayName;
      render(getComponentToRender());
      expect(screen.getByTestId(testId)).toBeInTheDocument();
    });

    it('has correct label prop', () => {
      const testId = NEI_VIEWS.additionalInformation.displayName;
      const expectedLabel = NEI_VIEWS.additionalInformation.displayName;
      render(getComponentToRender());
      expect(screen.getByTestId(testId)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct icon prop', () => {
      const testId = NEI_VIEWS.additionalInformation.displayName;
      const expectedIcon = 'fa-solid fa-file-user';
      render(getComponentToRender());
      expect(screen.getByTestId(testId)).toHaveAttribute('icon', expectedIcon);
    });

    it('sets isActive to false when currentViewId does not match the menu item view id', () => {
      const testId = NEI_VIEWS.additionalInformation.displayName;
      const currentViewId = faker.random.alphaNumeric(10);
      const expectedIsActive = false;
      newEngagementInstanceSlice.selectCurrentViewId.mockReturnValue(currentViewId);
      render(getComponentToRender());
      expect(screen.getByTestId(testId)).toHaveAttribute('isActive', expectedIsActive.toString());
    });

    it('sets isActive to true when currentViewId matches the menu item view id', () => {
      const testId = NEI_VIEWS.additionalInformation.displayName;
      const currentViewId = NEI_VIEWS.additionalInformation.viewId;
      const expectedIsActive = true;
      newEngagementInstanceSlice.selectCurrentViewId.mockReturnValue(currentViewId);
      render(getComponentToRender());
      expect(screen.getByTestId(testId)).toHaveAttribute('isActive', expectedIsActive.toString());
    });

    describe('functional', () => {
      it('invokes viewChanged with correct view id when clicked', () => {
        const testId = NEI_VIEWS.additionalInformation.displayName;
        const currentViewId = NEI_VIEWS.additionalInformation.viewId;
        render(getComponentToRender());
        fireEvent.click(screen.getByTestId(testId));
        expect(newEngagementInstanceSlice.viewChanged).toHaveBeenCalledTimes(1);
        expect(newEngagementInstanceSlice.viewChanged).toHaveBeenCalledWith(currentViewId);
      });
    });
  });

  describe('knowledgeOfClient menu item', () => {
    it('always renders', () => {
      const testId = NEI_VIEWS.knowledgeOfClient.displayName;
      render(getComponentToRender());
      expect(screen.getByTestId(testId)).toBeInTheDocument();
    });

    it('has correct label prop', () => {
      const testId = NEI_VIEWS.knowledgeOfClient.displayName;
      const expectedLabel = NEI_VIEWS.knowledgeOfClient.displayName;
      render(getComponentToRender());
      expect(screen.getByTestId(testId)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct icon prop', () => {
      const testId = NEI_VIEWS.knowledgeOfClient.displayName;
      const expectedIcon = 'fa-solid fa-thought-bubble';
      render(getComponentToRender());
      expect(screen.getByTestId(testId)).toHaveAttribute('icon', expectedIcon);
    });

    it('sets isActive to false when currentViewId does not match the menu item view id', () => {
      const testId = NEI_VIEWS.knowledgeOfClient.displayName;
      const currentViewId = faker.random.alphaNumeric(10);
      const expectedIsActive = false;
      newEngagementInstanceSlice.selectCurrentViewId.mockReturnValue(currentViewId);
      render(getComponentToRender());
      expect(screen.getByTestId(testId)).toHaveAttribute('isActive', expectedIsActive.toString());
    });

    it('sets isActive to true when currentViewId matches the menu item view id', () => {
      const testId = NEI_VIEWS.knowledgeOfClient.displayName;
      const currentViewId = NEI_VIEWS.knowledgeOfClient.viewId;
      const expectedIsActive = true;
      newEngagementInstanceSlice.selectCurrentViewId.mockReturnValue(currentViewId);
      render(getComponentToRender());
      expect(screen.getByTestId(testId)).toHaveAttribute('isActive', expectedIsActive.toString());
    });

    describe('functional', () => {
      it('invokes viewChanged with correct view id when clicked', () => {
        const testId = NEI_VIEWS.knowledgeOfClient.displayName;
        const currentViewId = NEI_VIEWS.knowledgeOfClient.viewId;
        render(getComponentToRender());
        fireEvent.click(screen.getByTestId(testId));
        expect(newEngagementInstanceSlice.viewChanged).toHaveBeenCalledTimes(1);
        expect(newEngagementInstanceSlice.viewChanged).toHaveBeenCalledWith(currentViewId);
      });
    });
  });

  describe('aicpa menu item', () => {
    it('always renders', () => {
      const testId = NEI_VIEWS.aicpa.displayName;
      render(getComponentToRender());
      expect(screen.getByTestId(testId)).toBeInTheDocument();
    });

    it('has correct label prop', () => {
      const testId = NEI_VIEWS.aicpa.displayName;
      const expectedLabel = NEI_VIEWS.aicpa.displayName;
      render(getComponentToRender());
      expect(screen.getByTestId(testId)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct icon prop', () => {
      const testId = NEI_VIEWS.aicpa.displayName;
      const expectedIcon = 'fa-solid fa-book-section';
      render(getComponentToRender());
      expect(screen.getByTestId(testId)).toHaveAttribute('icon', expectedIcon);
    });

    it('sets isActive to false when currentViewId does not match the menu item view id', () => {
      const testId = NEI_VIEWS.aicpa.displayName;
      const currentViewId = faker.random.alphaNumeric(10);
      const expectedIsActive = false;
      newEngagementInstanceSlice.selectCurrentViewId.mockReturnValue(currentViewId);
      render(getComponentToRender());
      expect(screen.getByTestId(testId)).toHaveAttribute('isActive', expectedIsActive.toString());
    });

    it('sets isActive to true when currentViewId matches the menu item view id', () => {
      const testId = NEI_VIEWS.aicpa.displayName;
      const currentViewId = NEI_VIEWS.aicpa.viewId;
      const expectedIsActive = true;
      newEngagementInstanceSlice.selectCurrentViewId.mockReturnValue(currentViewId);
      render(getComponentToRender());
      expect(screen.getByTestId(testId)).toHaveAttribute('isActive', expectedIsActive.toString());
    });

    describe('functional', () => {
      it('invokes viewChanged with correct view id when clicked', () => {
        const testId = NEI_VIEWS.aicpa.displayName;
        const currentViewId = NEI_VIEWS.aicpa.viewId;
        render(getComponentToRender());
        fireEvent.click(screen.getByTestId(testId));
        expect(newEngagementInstanceSlice.viewChanged).toHaveBeenCalledTimes(1);
        expect(newEngagementInstanceSlice.viewChanged).toHaveBeenCalledWith(currentViewId);
      });
    });
  });

  describe('riskAssessment menu item', () => {
    it('always renders', () => {
      const testId = NEI_VIEWS.riskAssessment.displayName;
      render(getComponentToRender());
      expect(screen.getByTestId(testId)).toBeInTheDocument();
    });

    it('has correct label prop', () => {
      const testId = NEI_VIEWS.riskAssessment.displayName;
      const expectedLabel = NEI_VIEWS.riskAssessment.displayName;
      render(getComponentToRender());
      expect(screen.getByTestId(testId)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct icon prop', () => {
      const testId = NEI_VIEWS.riskAssessment.displayName;
      const expectedIcon = 'fa-solid fa-shield-exclamation';
      render(getComponentToRender());
      expect(screen.getByTestId(testId)).toHaveAttribute('icon', expectedIcon);
    });

    it('sets isActive to false when currentViewId does not match the menu item view id', () => {
      const testId = NEI_VIEWS.riskAssessment.displayName;
      const currentViewId = faker.random.alphaNumeric(10);
      const expectedIsActive = false;
      newEngagementInstanceSlice.selectCurrentViewId.mockReturnValue(currentViewId);
      render(getComponentToRender());
      expect(screen.getByTestId(testId)).toHaveAttribute('isActive', expectedIsActive.toString());
    });

    it('sets isActive to true when currentViewId matches the menu item view id', () => {
      const testId = NEI_VIEWS.riskAssessment.displayName;
      const currentViewId = NEI_VIEWS.riskAssessment.viewId;
      const expectedIsActive = true;
      newEngagementInstanceSlice.selectCurrentViewId.mockReturnValue(currentViewId);
      render(getComponentToRender());
      expect(screen.getByTestId(testId)).toHaveAttribute('isActive', expectedIsActive.toString());
    });

    describe('functional', () => {
      it('invokes viewChanged with correct view id when clicked', () => {
        const testId = NEI_VIEWS.riskAssessment.displayName;
        const currentViewId = NEI_VIEWS.riskAssessment.viewId;
        render(getComponentToRender());
        fireEvent.click(screen.getByTestId(testId));
        expect(newEngagementInstanceSlice.viewChanged).toHaveBeenCalledTimes(1);
        expect(newEngagementInstanceSlice.viewChanged).toHaveBeenCalledWith(currentViewId);
      });
    });
  });

  describe('supplementalRisk menu item', () => {
    it('always renders', () => {
      const testId = NEI_VIEWS.supplementalRisk.displayName;
      render(getComponentToRender());
      expect(screen.getByTestId(testId)).toBeInTheDocument();
    });

    it('has correct label prop', () => {
      const testId = NEI_VIEWS.supplementalRisk.displayName;
      const expectedLabel = NEI_VIEWS.supplementalRisk.displayName;
      render(getComponentToRender());
      expect(screen.getByTestId(testId)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct icon prop', () => {
      const testId = NEI_VIEWS.supplementalRisk.displayName;
      const expectedIcon = 'fa-solid fa-shield-plus';
      render(getComponentToRender());
      expect(screen.getByTestId(testId)).toHaveAttribute('icon', expectedIcon);
    });

    it('sets isActive to false when currentViewId does not match the menu item view id', () => {
      const testId = NEI_VIEWS.supplementalRisk.displayName;
      const currentViewId = faker.random.alphaNumeric(10);
      const expectedIsActive = false;
      newEngagementInstanceSlice.selectCurrentViewId.mockReturnValue(currentViewId);
      render(getComponentToRender());
      expect(screen.getByTestId(testId)).toHaveAttribute('isActive', expectedIsActive.toString());
    });

    it('sets isActive to true when currentViewId matches the menu item view id', () => {
      const testId = NEI_VIEWS.supplementalRisk.displayName;
      const currentViewId = NEI_VIEWS.supplementalRisk.viewId;
      const expectedIsActive = true;
      newEngagementInstanceSlice.selectCurrentViewId.mockReturnValue(currentViewId);
      render(getComponentToRender());
      expect(screen.getByTestId(testId)).toHaveAttribute('isActive', expectedIsActive.toString());
    });

    describe('functional', () => {
      it('invokes viewChanged with correct view id when clicked', () => {
        const testId = NEI_VIEWS.supplementalRisk.displayName;
        const currentViewId = NEI_VIEWS.supplementalRisk.viewId;
        render(getComponentToRender());
        fireEvent.click(screen.getByTestId(testId));
        expect(newEngagementInstanceSlice.viewChanged).toHaveBeenCalledTimes(1);
        expect(newEngagementInstanceSlice.viewChanged).toHaveBeenCalledWith(currentViewId);
      });
    });
  });

  describe('sec menu item', () => {
    it('always renders', () => {
      const testId = NEI_VIEWS.sec.displayName;
      render(getComponentToRender());
      expect(screen.getByTestId(testId)).toBeInTheDocument();
    });

    it('has correct label prop', () => {
      const testId = NEI_VIEWS.sec.displayName;
      const expectedLabel = NEI_VIEWS.sec.displayName;
      render(getComponentToRender());
      expect(screen.getByTestId(testId)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct icon prop', () => {
      const testId = NEI_VIEWS.sec.displayName;
      const expectedIcon = 'fa-solid fa-chart-line-up';
      render(getComponentToRender());
      expect(screen.getByTestId(testId)).toHaveAttribute('icon', expectedIcon);
    });

    it('sets isActive to false when currentViewId does not match the menu item view id', () => {
      const testId = NEI_VIEWS.sec.displayName;
      const currentViewId = faker.random.alphaNumeric(10);
      const expectedIsActive = false;
      newEngagementInstanceSlice.selectCurrentViewId.mockReturnValue(currentViewId);
      render(getComponentToRender());
      expect(screen.getByTestId(testId)).toHaveAttribute('isActive', expectedIsActive.toString());
    });

    it('sets isActive to true when currentViewId matches the menu item view id', () => {
      const testId = NEI_VIEWS.sec.displayName;
      const currentViewId = NEI_VIEWS.sec.viewId;
      const expectedIsActive = true;
      newEngagementInstanceSlice.selectCurrentViewId.mockReturnValue(currentViewId);
      render(getComponentToRender());
      expect(screen.getByTestId(testId)).toHaveAttribute('isActive', expectedIsActive.toString());
    });

    describe('functional', () => {
      it('invokes viewChanged with correct view id when clicked', () => {
        const testId = NEI_VIEWS.sec.displayName;
        const currentViewId = NEI_VIEWS.sec.viewId;
        render(getComponentToRender());
        fireEvent.click(screen.getByTestId(testId));
        expect(newEngagementInstanceSlice.viewChanged).toHaveBeenCalledTimes(1);
        expect(newEngagementInstanceSlice.viewChanged).toHaveBeenCalledWith(currentViewId);
      });
    });
  });

  describe('gao menu item', () => {
    it('always renders', () => {
      const testId = NEI_VIEWS.gao.displayName;
      render(getComponentToRender());
      expect(screen.getByTestId(testId)).toBeInTheDocument();
    });

    it('has correct label prop', () => {
      const testId = NEI_VIEWS.gao.displayName;
      const expectedLabel = NEI_VIEWS.gao.displayName;
      render(getComponentToRender());
      expect(screen.getByTestId(testId)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct icon prop', () => {
      const testId = NEI_VIEWS.gao.displayName;
      const expectedIcon = 'fa-solid fa-comment-arrow-up-right';
      render(getComponentToRender());
      expect(screen.getByTestId(testId)).toHaveAttribute('icon', expectedIcon);
    });

    it('sets isActive to false when currentViewId does not match the menu item view id', () => {
      const testId = NEI_VIEWS.gao.displayName;
      const currentViewId = faker.random.alphaNumeric(10);
      const expectedIsActive = false;
      newEngagementInstanceSlice.selectCurrentViewId.mockReturnValue(currentViewId);
      render(getComponentToRender());
      expect(screen.getByTestId(testId)).toHaveAttribute('isActive', expectedIsActive.toString());
    });

    it('sets isActive to true when currentViewId matches the menu item view id', () => {
      const testId = NEI_VIEWS.gao.displayName;
      const currentViewId = NEI_VIEWS.gao.viewId;
      const expectedIsActive = true;
      newEngagementInstanceSlice.selectCurrentViewId.mockReturnValue(currentViewId);
      render(getComponentToRender());
      expect(screen.getByTestId(testId)).toHaveAttribute('isActive', expectedIsActive.toString());
    });

    describe('functional', () => {
      it('invokes viewChanged with correct view id when clicked', () => {
        const testId = NEI_VIEWS.gao.displayName;
        const currentViewId = NEI_VIEWS.gao.viewId;
        render(getComponentToRender());
        fireEvent.click(screen.getByTestId(testId));
        expect(newEngagementInstanceSlice.viewChanged).toHaveBeenCalledTimes(1);
        expect(newEngagementInstanceSlice.viewChanged).toHaveBeenCalledWith(currentViewId);
      });
    });
  });

  describe('finalApproval menu item', () => {
    it('always renders', () => {
      const testId = NEI_VIEWS.finalApproval.displayName;
      render(getComponentToRender());
      expect(screen.getByTestId(testId)).toBeInTheDocument();
    });

    it('has correct label prop', () => {
      const testId = NEI_VIEWS.finalApproval.displayName;
      const expectedLabel = NEI_VIEWS.finalApproval.displayName;
      render(getComponentToRender());
      expect(screen.getByTestId(testId)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct icon prop', () => {
      const testId = NEI_VIEWS.finalApproval.displayName;
      const expectedIcon = 'fa-solid fa-person-circle-check';
      render(getComponentToRender());
      expect(screen.getByTestId(testId)).toHaveAttribute('icon', expectedIcon);
    });

    it('sets isActive to false when currentViewId does not match the menu item view id', () => {
      const testId = NEI_VIEWS.finalApproval.displayName;
      const currentViewId = faker.random.alphaNumeric(10);
      const expectedIsActive = false;
      newEngagementInstanceSlice.selectCurrentViewId.mockReturnValue(currentViewId);
      render(getComponentToRender());
      expect(screen.getByTestId(testId)).toHaveAttribute('isActive', expectedIsActive.toString());
    });

    it('sets isActive to true when currentViewId matches the menu item view id', () => {
      const testId = NEI_VIEWS.finalApproval.displayName;
      const currentViewId = NEI_VIEWS.finalApproval.viewId;
      const expectedIsActive = true;
      newEngagementInstanceSlice.selectCurrentViewId.mockReturnValue(currentViewId);
      render(getComponentToRender());
      expect(screen.getByTestId(testId)).toHaveAttribute('isActive', expectedIsActive.toString());
    });

    describe('functional', () => {
      it('invokes viewChanged with correct view id when clicked', () => {
        const testId = NEI_VIEWS.finalApproval.displayName;
        const currentViewId = NEI_VIEWS.finalApproval.viewId;
        render(getComponentToRender());
        fireEvent.click(screen.getByTestId(testId));
        expect(newEngagementInstanceSlice.viewChanged).toHaveBeenCalledTimes(1);
        expect(newEngagementInstanceSlice.viewChanged).toHaveBeenCalledWith(currentViewId);
      });
    });
  });

  describe('taxRisk menu item', () => {
    it('always renders', () => {
      const testId = NEI_VIEWS.taxRisk.displayName;
      render(getComponentToRender());
      expect(screen.getByTestId(testId)).toBeInTheDocument();
    });

    it('has correct label prop', () => {
      const testId = NEI_VIEWS.taxRisk.displayName;
      const expectedLabel = NEI_VIEWS.taxRisk.displayName;
      render(getComponentToRender());
      expect(screen.getByTestId(testId)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct icon prop', () => {
      const testId = NEI_VIEWS.taxRisk.displayName;
      const expectedIcon = 'fa-solid fa-shield-minus';
      render(getComponentToRender());
      expect(screen.getByTestId(testId)).toHaveAttribute('icon', expectedIcon);
    });

    it('sets isActive to false when currentViewId does not match the menu item view id', () => {
      const testId = NEI_VIEWS.taxRisk.displayName;
      const currentViewId = faker.random.alphaNumeric(10);
      const expectedIsActive = false;
      newEngagementInstanceSlice.selectCurrentViewId.mockReturnValue(currentViewId);
      render(getComponentToRender());
      expect(screen.getByTestId(testId)).toHaveAttribute('isActive', expectedIsActive.toString());
    });

    it('sets isActive to true when currentViewId matches the menu item view id', () => {
      const testId = NEI_VIEWS.taxRisk.displayName;
      const currentViewId = NEI_VIEWS.taxRisk.viewId;
      const expectedIsActive = true;
      newEngagementInstanceSlice.selectCurrentViewId.mockReturnValue(currentViewId);
      render(getComponentToRender());
      expect(screen.getByTestId(testId)).toHaveAttribute('isActive', expectedIsActive.toString());
    });

    describe('functional', () => {
      it('invokes viewChanged with correct view id when clicked', () => {
        const testId = NEI_VIEWS.taxRisk.displayName;
        const currentViewId = NEI_VIEWS.taxRisk.viewId;
        render(getComponentToRender());
        fireEvent.click(screen.getByTestId(testId));
        expect(newEngagementInstanceSlice.viewChanged).toHaveBeenCalledTimes(1);
        expect(newEngagementInstanceSlice.viewChanged).toHaveBeenCalledWith(currentViewId);
      });
    });
  });

  describe('industryRisk menu item', () => {
    it('always renders', () => {
      const testId = NEI_VIEWS.industryRisk.displayName;
      render(getComponentToRender());
      expect(screen.getByTestId(testId)).toBeInTheDocument();
    });

    it('has correct label prop', () => {
      const testId = NEI_VIEWS.industryRisk.displayName;
      const expectedLabel = NEI_VIEWS.industryRisk.displayName;
      render(getComponentToRender());
      expect(screen.getByTestId(testId)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct icon prop', () => {
      const testId = NEI_VIEWS.industryRisk.displayName;
      const expectedIcon = 'fa-solid fa-building-shield';
      render(getComponentToRender());
      expect(screen.getByTestId(testId)).toHaveAttribute('icon', expectedIcon);
    });

    it('sets isActive to false when currentViewId does not match the menu item view id', () => {
      const testId = NEI_VIEWS.industryRisk.displayName;
      const currentViewId = faker.random.alphaNumeric(10);
      const expectedIsActive = false;
      newEngagementInstanceSlice.selectCurrentViewId.mockReturnValue(currentViewId);
      render(getComponentToRender());
      expect(screen.getByTestId(testId)).toHaveAttribute('isActive', expectedIsActive.toString());
    });

    it('sets isActive to true when currentViewId matches the menu item view id', () => {
      const testId = NEI_VIEWS.industryRisk.displayName;
      const currentViewId = NEI_VIEWS.industryRisk.viewId;
      const expectedIsActive = true;
      newEngagementInstanceSlice.selectCurrentViewId.mockReturnValue(currentViewId);
      render(getComponentToRender());
      expect(screen.getByTestId(testId)).toHaveAttribute('isActive', expectedIsActive.toString());
    });

    describe('functional', () => {
      it('invokes viewChanged with correct view id when clicked', () => {
        const testId = NEI_VIEWS.industryRisk.displayName;
        const currentViewId = NEI_VIEWS.industryRisk.viewId;
        render(getComponentToRender());
        fireEvent.click(screen.getByTestId(testId));
        expect(newEngagementInstanceSlice.viewChanged).toHaveBeenCalledTimes(1);
        expect(newEngagementInstanceSlice.viewChanged).toHaveBeenCalledWith(currentViewId);
      });
    });
  });

  describe('jobSetup menu items', () => {
    const itemCount = faker.datatype.number({ min: 1, max: 10 });
    const jobMenuItemDetails = [...Array(itemCount).keys()].map(() => ({
      viewId: faker.datatype.number(),
      label: faker.random.alphaNumeric(10)
    }));

    beforeEach(() => {
      newEngagementInstanceSlice.selectJobSideBarMenuItemDetails.mockReturnValue(jobMenuItemDetails);
    });

    it('renders one MenuItem for each item in jobMenuItemDetails', () => {
      render(getComponentToRender());
      for (const menuItem of jobMenuItemDetails) {
        const testId = menuItem.label;
        expect(screen.getByTestId(testId)).toBeInTheDocument();
      }
    });

    it('has correct label prop', () => {
      render(getComponentToRender());
      for (const menuItem of jobMenuItemDetails) {
        const testId = menuItem.label;
        const expectedLabel = menuItem.label;
        expect(screen.getByTestId(testId)).toHaveAttribute('label', expectedLabel);
      }
    });

    it('has useLabelAsTitle prop', () => {
      render(getComponentToRender());
      for (const menuItem of jobMenuItemDetails) {
        const testId = menuItem.label;
        expect(screen.getByTestId(testId)).toHaveAttribute('useLabelAsTitle');
      }
    });

    it('has correct icon prop', () => {
      render(getComponentToRender());
      for (const menuItem of jobMenuItemDetails) {
        const testId = menuItem.label;
        const expectedIcon = 'fa-solid fa-briefcase';
        expect(screen.getByTestId(testId)).toHaveAttribute('icon', expectedIcon);
      }
    });

    it('sets isActive to false when currentViewId does not match the menu item view id', () => {
      const currentViewId = faker.random.alphaNumeric(10);
      newEngagementInstanceSlice.selectCurrentViewId.mockReturnValue(currentViewId);
      render(getComponentToRender());
      for (const menuItem of jobMenuItemDetails) {
        const testId = menuItem.label;
        const expectedIsActive = false;
        expect(screen.getByTestId(testId)).toHaveAttribute('isActive', expectedIsActive.toString());
      }
    });

    it('sets isActive to true when currentViewId matches the menu item view id', () => {
      const currentViewId = jobMenuItemDetails[0].viewId;
      const testId = jobMenuItemDetails[0].label;
      const expectedIsActive = true;
      newEngagementInstanceSlice.selectCurrentViewId.mockReturnValue(currentViewId);
      render(getComponentToRender());
      expect(screen.getByTestId(testId)).toHaveAttribute('isActive', expectedIsActive.toString());
    });

    describe('functional', () => {
      it('invokes viewChanged with correct view id when clicked', () => {
        render(getComponentToRender());

        expect(newEngagementInstanceSlice.viewChanged).not.toHaveBeenCalled();

        for (const menuItem of jobMenuItemDetails) {
          const testId = menuItem.label;
          fireEvent.click(screen.getByTestId(testId));
          expect(newEngagementInstanceSlice.viewChanged).toHaveBeenCalledWith(menuItem.viewId);
        }

        expect(newEngagementInstanceSlice.viewChanged).toHaveBeenCalledTimes(jobMenuItemDetails.length);
      });
    });
  });

  describe('billingScheduleSummary menu item', () => {
    it('always renders', () => {
      const testId = NEI_VIEWS.billingScheduleSummary.displayName;
      render(getComponentToRender());
      expect(screen.getByTestId(testId)).toBeInTheDocument();
    });

    it('has correct label prop', () => {
      const testId = NEI_VIEWS.billingScheduleSummary.displayName;
      const expectedLabel = NEI_VIEWS.billingScheduleSummary.displayName;
      render(getComponentToRender());
      expect(screen.getByTestId(testId)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct icon prop', () => {
      const testId = NEI_VIEWS.billingScheduleSummary.displayName;
      const expectedIcon = 'fa-solid fa-file-invoice-dollar';
      render(getComponentToRender());
      expect(screen.getByTestId(testId)).toHaveAttribute('icon', expectedIcon);
    });

    it('sets isActive to false when currentViewId does not match the menu item view id', () => {
      const testId = NEI_VIEWS.billingScheduleSummary.displayName;
      const currentViewId = faker.random.alphaNumeric(10);
      const expectedIsActive = false;
      newEngagementInstanceSlice.selectCurrentViewId.mockReturnValue(currentViewId);
      render(getComponentToRender());
      expect(screen.getByTestId(testId)).toHaveAttribute('isActive', expectedIsActive.toString());
    });

    it('sets isActive to true when currentViewId matches the menu item view id', () => {
      const testId = NEI_VIEWS.billingScheduleSummary.displayName;
      const currentViewId = NEI_VIEWS.billingScheduleSummary.viewId;
      const expectedIsActive = true;
      newEngagementInstanceSlice.selectCurrentViewId.mockReturnValue(currentViewId);
      render(getComponentToRender());
      expect(screen.getByTestId(testId)).toHaveAttribute('isActive', expectedIsActive.toString());
    });

    describe('functional', () => {
      it('invokes viewChanged with correct view id when clicked', () => {
        const testId = NEI_VIEWS.billingScheduleSummary.displayName;
        const currentViewId = NEI_VIEWS.billingScheduleSummary.viewId;
        render(getComponentToRender());
        fireEvent.click(screen.getByTestId(testId));
        expect(newEngagementInstanceSlice.viewChanged).toHaveBeenCalledTimes(1);
        expect(newEngagementInstanceSlice.viewChanged).toHaveBeenCalledWith(currentViewId);
      });
    });
  });

  describe('workflowComments menu item', () => {
    it('always renders', () => {
      const testId = NEI_VIEWS.workflowComments.displayName;
      render(getComponentToRender());
      expect(screen.getByTestId(testId)).toBeInTheDocument();
    });

    it('has correct label prop', () => {
      const testId = NEI_VIEWS.workflowComments.displayName;
      const expectedLabel = NEI_VIEWS.workflowComments.displayName;
      render(getComponentToRender());
      expect(screen.getByTestId(testId)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct icon prop', () => {
      const testId = NEI_VIEWS.workflowComments.displayName;
      const expectedIcon = 'fa-solid fa-message-lines';
      render(getComponentToRender());
      expect(screen.getByTestId(testId)).toHaveAttribute('icon', expectedIcon);
    });

    it('sets isActive to false when currentViewId does not match the menu item view id', () => {
      const testId = NEI_VIEWS.workflowComments.displayName;
      const currentViewId = faker.random.alphaNumeric(10);
      const expectedIsActive = false;
      newEngagementInstanceSlice.selectCurrentViewId.mockReturnValue(currentViewId);
      render(getComponentToRender());
      expect(screen.getByTestId(testId)).toHaveAttribute('isActive', expectedIsActive.toString());
    });

    it('sets isActive to true when currentViewId matches the menu item view id', () => {
      const testId = NEI_VIEWS.workflowComments.displayName;
      const currentViewId = NEI_VIEWS.workflowComments.viewId;
      const expectedIsActive = true;
      newEngagementInstanceSlice.selectCurrentViewId.mockReturnValue(currentViewId);
      render(getComponentToRender());
      expect(screen.getByTestId(testId)).toHaveAttribute('isActive', expectedIsActive.toString());
    });

    describe('functional', () => {
      it('invokes viewChanged with correct view id when clicked', () => {
        const testId = NEI_VIEWS.workflowComments.displayName;
        const currentViewId = NEI_VIEWS.workflowComments.viewId;
        render(getComponentToRender());
        fireEvent.click(screen.getByTestId(testId));
        expect(newEngagementInstanceSlice.viewChanged).toHaveBeenCalledTimes(1);
        expect(newEngagementInstanceSlice.viewChanged).toHaveBeenCalledWith(currentViewId);
      });
    });
  });

  describe('workflowHistory menu item', () => {
    it('always renders', () => {
      const testId = NEI_VIEWS.workflowHistory.displayName;
      render(getComponentToRender());
      expect(screen.getByTestId(testId)).toBeInTheDocument();
    });

    it('has correct label prop', () => {
      const testId = NEI_VIEWS.workflowHistory.displayName;
      const expectedLabel = NEI_VIEWS.workflowHistory.displayName;
      render(getComponentToRender());
      expect(screen.getByTestId(testId)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct icon prop', () => {
      const testId = NEI_VIEWS.workflowHistory.displayName;
      const expectedIcon = 'fa-solid fa-timeline-arrow';
      render(getComponentToRender());
      expect(screen.getByTestId(testId)).toHaveAttribute('icon', expectedIcon);
    });

    it('sets isActive to false when currentViewId does not match the menu item view id', () => {
      const testId = NEI_VIEWS.workflowHistory.displayName;
      const currentViewId = faker.random.alphaNumeric(10);
      const expectedIsActive = false;
      newEngagementInstanceSlice.selectCurrentViewId.mockReturnValue(currentViewId);
      render(getComponentToRender());
      expect(screen.getByTestId(testId)).toHaveAttribute('isActive', expectedIsActive.toString());
    });

    it('sets isActive to true when currentViewId matches the menu item view id', () => {
      const testId = NEI_VIEWS.workflowHistory.displayName;
      const currentViewId = NEI_VIEWS.workflowHistory.viewId;
      const expectedIsActive = true;
      newEngagementInstanceSlice.selectCurrentViewId.mockReturnValue(currentViewId);
      render(getComponentToRender());
      expect(screen.getByTestId(testId)).toHaveAttribute('isActive', expectedIsActive.toString());
    });

    describe('functional', () => {
      it('invokes viewChanged with correct view id when clicked', () => {
        const testId = NEI_VIEWS.workflowHistory.displayName;
        const currentViewId = NEI_VIEWS.workflowHistory.viewId;
        render(getComponentToRender());
        fireEvent.click(screen.getByTestId(testId));
        expect(newEngagementInstanceSlice.viewChanged).toHaveBeenCalledTimes(1);
        expect(newEngagementInstanceSlice.viewChanged).toHaveBeenCalledWith(currentViewId);
      });
    });
  });
});
