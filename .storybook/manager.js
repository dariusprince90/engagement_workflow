import React from 'react';
import { addons } from '@storybook/addons';

addons.setConfig({
  isFullscreen: false,
  showNav: true,
  showPanel: true,
  panelPosition: 'bottom',
  enableShortcuts: true,
  showToolbar: true,
  selectedPanel: 'storybook/controls/panel',
  initialActive: 'sidebar',
  sidebar: {
    showRoots: true,
    collapsedRoots: [],
    renderLabel: (item) => <>{item.name}</>
  },
  toolbar: {
    title: { hidden: false },
    zoom: { hidden: false },
    eject: { hidden: false },
    copy: { hidden: false },
    fullscreen: { hidden: false }
  }
});
